// IndexedDB helper for robust persistence of large video files (Blobs) in the browser
const DB_NAME = "CorreioDigitalAngolaDB";
const STORE_NAME = "media";
const VIDEO_KEY = "official_video_data";

export interface StoredVideoMeta {
  blob: Blob;
  name: string;
  size: number;
  type: string;
  savedAt: number;
}

export function openMediaDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      return reject(new Error("IndexedDB is not supported in this browser"));
    }

    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePersistentVideo(file: File | Blob, fileName: string): Promise<StoredVideoMeta> {
  const db = await openMediaDB();
  const meta: StoredVideoMeta = {
    blob: file,
    name: fileName,
    size: file.size,
    type: file.type || "video/mp4",
    savedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(meta, VIDEO_KEY);

    req.onsuccess = () => resolve(meta);
    req.onerror = () => reject(req.error);
  });
}

export async function getPersistentVideo(): Promise<StoredVideoMeta | null> {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(VIDEO_KEY);

      req.onsuccess = () => {
        if (req.result && req.result.blob) {
          resolve(req.result as StoredVideoMeta);
        } else {
          resolve(null);
        }
      };

      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Could not load persistent video from IndexedDB:", err);
    return null;
  }
}

export async function deletePersistentVideo(): Promise<void> {
  try {
    const db = await openMediaDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(VIDEO_KEY);

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("Could not delete persistent video from IndexedDB:", err);
  }
}

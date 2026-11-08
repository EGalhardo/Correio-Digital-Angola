# Correio Digital Angola — Clone e Activação

Clone integral do repositório oficial, sem alterações ao código-fonte.

- Origem: https://github.com/EGalhardo/Correio-Digital-Angola.git
- Commit: b6c537e (fix(carrossel): evitar cartoes escuros quando a imagem ainda nao carregou)

## O que foi feito

1. Clone do repositório (`git clone`), sem qualquer ficheiro extra no código.
2. Instalação das dependências do `package.json` (`npm install`).
3. Verificação de tipos (`npm run lint` → `tsc --noEmit`): sem erros.
4. Build de produção (`npm run build`): concluído com sucesso.
5. Servidor executado em modo produção e rotas testadas (`/`, `/sobre-nos`, `/faq`, `/videos` → 200).

## Activação da chave

O único ponto do código que aceita uma chave é `server.ts`, através da variável de
ambiente `VIDEO_ADMIN_TOKEN` (endpoints `POST`/`DELETE /api/save-video-to-code`).
Não existe nenhuma integração com a API do GitHub no projecto — o código não faz
chamadas autenticadas ao GitHub. Por isso, a chave foi activada nesse ponto, em
`.env` (ficheiro já ignorado pelo `.gitignore` do projecto):

```env
VIDEO_ADMIN_TOKEN="<CHAVE_GUARDADA_APENAS_NO_FICHEIRO_.env_LOCAL>"
MAX_VIDEO_MB="500"
PORT="3000"
```

A chave em texto simples está apenas no `.env` local (ignorado pelo git); este documento
não a reproduz.

O `server.ts` não carrega `.env` por si só (não importa `dotenv`), por isso o
arranque deve injectar o ficheiro:

```bash
node --env-file=.env --import tsx server.ts
```

## Teste de activação (executado)

| Pedido | Sem token | Com a chave |
| --- | --- | --- |
| `DELETE /api/save-video-to-code` | 403 | 200 `{"success":true,...}` |
| `POST /api/save-video-to-code` | 403 | autorizado |

## Credenciais de commit e push (GitHub)

A chave foi validada na API do GitHub: pertence ao utilizador **EGalhardo** e o
repositório devolve `permissions: {admin, maintain, push, triage, pull}`.

Configuração aplicada:

- `~/.git-credentials` (permissões `600`) com
  `https://EGalhardo:<CHAVE>@github.com`
- `git config --global credential.helper store`
- `user.name = EGalhardo`, `user.email = 206576119+EGalhardo@users.noreply.github.com`
- `origin` mantém-se limpo: `https://github.com/EGalhardo/Correio-Digital-Angola.git`

Testes executados (já revertidos, sem vestígios no repositório):

| Operação | Resultado |
| --- | --- |
| `git fetch origin` | OK (autenticado) |
| `git push origin HEAD:refs/heads/teste-credenciais` | OK |
| `git commit` + `git push origin teste-credenciais` | OK |
| `git push origin --delete teste-credenciais` | OK |

Estado final do GitHub: apenas o ramo `main` em `b6c537e`, igual ao clone local.

## Comandos

```bash
cd Correio-Digital-Angola
npm install                 # dependências
npm run dev                 # desenvolvimento (http://localhost:3000)
npm run build               # build de produção
node --env-file=.env --import tsx server.ts   # produção com a chave activa

# GitHub (credenciais já guardadas)
git add -A && git commit -m "mensagem"
git push origin main
```

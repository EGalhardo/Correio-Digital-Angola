import { ArrowLeft, Repeat, LayoutGrid, Download, Brain, ShieldAlert, CheckCircle2, Volume2, UserCheck, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <main id="howitworks-container" className="flex-grow max-w-5xl mx-auto w-full px-6 py-16">
      {/* Back navigation */}
      <div className="mb-12">
        <Link id="howitworks-back-link" to="/" className="text-red-600 font-bold flex items-center gap-2 mb-8 hover:text-red-700 transition-colors">
          <ArrowLeft size={18} />
          Voltar ao Início
        </Link>
        <span className="text-red-600 font-black text-xs uppercase tracking-[0.2em] block mb-2">Manual de Funcionalidades</span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight uppercase">
          Funcionamento da Plataforma
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed font-semibold max-w-3xl">
          Conheça cada pilar tecnológico do Correio Digital Angola e como garantimos uma experiência simples, inteligente e 100% segura para todos.
        </p>
      </div>

      <div className="space-y-16">
        
        {/* Section: Como Funciona o Aplicativo */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-transform hover:-translate-y-1">
              <span className="text-red-600 font-black uppercase text-xs tracking-widest block mb-4">Passo O1 • Acesso Exclusivo</span>
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Smartphone size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-gray-950 mb-3 uppercase tracking-tight">Registo com BI</h3>
              <p className="text-gray-700 leading-relaxed">
                Cada cidadão terá uma conta digital oficial associada ao seu Bilhete de Identidade. O acesso poderá ser realizado com reconhecimento facial (biometria) ou PIN numérico de alta segurança.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-transform hover:-translate-y-1">
              <span className="text-red-600 font-black uppercase text-xs tracking-widest block mb-4">Passo O2 • Organização</span>
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <LayoutGrid size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-gray-950 mb-3 uppercase tracking-tight">Canais Verificados</h3>
              <p className="text-gray-700 leading-relaxed">
                Dentro do aplicativo, você encontra uma caixa de correspondência organizada. Cada instituição pública ou parceira credenciada aparece como um canal oficial verificado.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-lg transition-transform hover:-translate-y-1">
              <span className="text-red-600 font-black uppercase text-xs tracking-widest block mb-4">Passo O3 • Acção</span>
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Download size={24} />
              </div>
              <h3 className="text-xl font-extrabold text-gray-950 mb-3 uppercase tracking-tight">Notificações em Tempo Real</h3>
              <p className="text-gray-700 leading-relaxed">
                Sempre que houver uma atualização sobre seus documentos (SME, AGT, ENDE, hospitais públicos), você é notificado imediatamente com os dados de localização, horários ou códigos necessários.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Inteligência Artificial */}
        <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex flex-col justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center text-white mb-6 shadow-xl shadow-red-600/30">
                <Brain size={32} />
              </div>
              <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-none">Inteligência Artificial</h2>
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest">O Coração Tecnológico</span>
            </div>

            <div className="md:col-span-8 space-y-6 text-red-100/90 text-lg leading-relaxed">
              <p>
                A inteligência artificial do sistema não serve apenas para automatizar processos internos — ela é o canal que <strong className="text-white font-extrabold">simplifica a comunicação entre o Estado de Angola e o Cidadão</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold pt-4 text-white uppercase tracking-wider">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-red-500 shrink-0" />
                  <span>Tradução de Termos Jurídicos / Fiscais</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                  <Volume2 size={18} className="text-red-500 shrink-0" />
                  <span>Suporte Activo por Voz (Inclusão Local)</span>
                </div>
              </div>
              <p className="text-sm italic opacity-85 mt-4">
                "Nosso assistente virtual responde perguntas como: 'Meu BI está pronto?', 'Tenho multas pendentes?', 'Onde posso levantar o passaporte?' ou 'O que significa esta notificação?'."
              </p>
            </div>
          </div>
        </section>

        {/* Section: Círculo de Confiança e Emergências */}
        <section className="bg-gray-50 border border-gray-100 rounded-[36px] p-8 md:p-12">
          <div className="max-w-3xl">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldAlert size={26} />
            </div>
            <h2 className="text-3xl font-black text-gray-950 mb-4 uppercase tracking-tight">Círculo de Confiança e Emergências</h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Uma das funcionalidades sociais mais inovadoras do projecto será o <strong className="text-gray-950 font-black">Sistema do Círculo de Confiança</strong>. Cada cidadão poderá configurar familiares, amigos ou pessoas de sua extrema confiança para receber alertas em situações críticas.
              </p>
              <p>
                Em casos de acidentes, ocorrências policiais ou admissões hospitalares emergenciais, as autoridades de resgate e segurança médica poderão consultar instantaneamente o perfil na plataforma e notificar o círculo cadastrado, enviando de imediato a localização de emergência, as necessidades médicas críticas e garantindo o contato direto.
              </p>
              <div className="flex flex-wrap gap-3 font-semibold text-xs uppercase tracking-wider text-red-600 mt-6">
                <span className="bg-red-50 border border-red-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <UserCheck size={14} /> Contactos prioritários
                </span>
                <span className="bg-red-50 border border-red-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} /> Alertas de localização
                </span>
                <span className="bg-red-50 border border-red-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <CheckCircle2 size={14} /> Autorizações de saúde
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Fine-print branding */}
        <section className="pt-4 border-t border-gray-100">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-black text-gray-900 tracking-tighter leading-none">CORREIO DIGITAL</span>
            <span className="text-red-700 font-bold uppercase tracking-[0.3em] text-[10px] leading-none mt-2">República de Angola</span>
          </div>
        </section>
      </div>
    </main>
  );
}

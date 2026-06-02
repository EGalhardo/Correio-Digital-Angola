import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQ() {
  return (
    <main id="faq-container" className="flex-grow max-w-4xl mx-auto w-full px-6 py-16">
      <div className="mb-12">
        <Link id="faq-back-link" to="/" className="text-red-600 font-bold flex items-center gap-2 mb-8 hover:text-red-700 transition-colors">
          <ArrowLeft size={18} />
          Voltar ao Início
        </Link>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight uppercase">
          Perguntas Frequentes
        </h1>
      </div>

      <div className="space-y-16">
        <section className="space-y-12">
          <div>
            <h3 className="text-lg font-bold text-gray-990 uppercase mb-2 tracking-wider">Como associar o meu Bilhete de Identidade (BI)?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Aceda à opção de Registo ou Emparelhamento, insira o seu número de BI, realize a correspondente verificação biométrica de segurança física ou PIN de acesso e confirme o vínculo para activar o dispositivo móvel.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-990 uppercase mb-2 tracking-wider">Como recebo as notificações de órgãos oficiais?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              As entidades do Estado (como SME, AGT, ENDE, EPAL) estão ligadas via canais oficiais verificados. Assim que uma nova notificação ou documento oficial for emitido para o seu número de BI, ele aparecerá de forma segura na sua caixa de correspondência digital.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-990 uppercase mb-2 tracking-wider">Os meus dados pessoais são partilhados publicamente?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Não. O Correio Digital Angola opera sob rigorosos padrões de segurança nacional e protecção de dados do cidadão. Os seus dados e correspondências ficam encriptados localmente no seu dispositivo e apenas podem ser visualizados por si.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-990 uppercase mb-2 tracking-wider">Como funciona o suporte offline da plataforma?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Todas as correspondências e guias oficiais consultadas em rede passam a ficar encriptadas e guardadas localmente (LocalStorage do navegador ou armazenamento seguro do dispositivo), permitindo que as consulte quando estiver sem ligação de dados ativa.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-990 uppercase mb-2 tracking-wider">O que é a activação de planos para parceiros e empresas?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Embora a plataforma seja Gratuita para cidadãos individuais, as empresas privadas, instituições académicas ou agências governamentais necessitam de activar planos específicos para aceder às APIs de envio em lote, monitorização e validação de documentos oficiais.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-990 uppercase mb-2 tracking-wider">A licença de parceiro continua activa ao reiniciar o dispositivo?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Sim. A licença offline e o registo de parceiro comercial ou governamental são guardados de forma segura localmente e permanecem plenamente operacionais mesmo após reiniciar o equipamento, sem necessidade de nova validação constante.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-990 uppercase mb-2 tracking-wider">O que é o Assistente Digital de Voz?</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              É uma funcionalidade baseada em inteligência artificial local que permite a leitura em áudio límpido e compreensão falada de termos formais de correspondência governamental, facilitando o acesso inclusivo a cidadãos com baixa literacia ou deficiências visuais.
            </p>
          </div>
        </section>

        <section className="pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-4xl font-black text-gray-900 tracking-tighter leading-none">CORREIO DIGITAL</span>
            <span className="text-red-700 font-bold uppercase tracking-[0.3em] text-[10px] leading-none mt-2">República de Angola</span>
          </div>
        </section>
      </div>
    </main>
  );
}

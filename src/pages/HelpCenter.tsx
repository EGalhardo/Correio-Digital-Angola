import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function HelpCenter() {
  return (
    <main id="helpcenter-container" className="flex-grow max-w-4xl mx-auto w-full px-6 py-16">
      <div className="mb-12">
        <Link id="helpcenter-back-link" to="/" className="text-red-600 font-bold flex items-center gap-2 mb-8 hover:text-red-700 transition-colors">
          <ArrowLeft size={18} />
          Voltar ao Início
        </Link>        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight uppercase">
          Central de Ajuda — Correio Digital Angola
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed font-medium max-w-3xl">
          Bem-vindo à Central de Ajuda do Correio Digital Angola. Aqui encontra respostas claras sobre como associar o seu Bilhete de Identidade, gerir canais e notificações governamentais, e utilizar a plataforma com segurança nacional.
        </p>
      </div>

      <div className="space-y-16">
        <section className="space-y-12 text-gray-700">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">1. O que é o Correio Digital Angola?</h2>
            <p className="text-lg leading-relaxed">
              O Correio Digital Angola é uma infraestrutura segura de comunicação e correspondência oficial, desenvolvida para interligar as instituições do Estado e entidades privadas verificadas diretamente aos cidadãos de Angola.
            </p>
            <p className="text-lg leading-relaxed font-bold text-red-650">
              O sistema baseia-se no seu Número de Bilhete de Identidade (BI), que passa a atuar como o seu endereço digital único e oficial. Ele pode funcionar offline após a sincronização, garantindo total inclusão.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">2. Como funciona o Correio Digital Angola?</h2>
            <p className="text-lg leading-relaxed">
              O processo de acesso e uso é simplificado em três etapas:
            </p>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="p-6 bg-red-600 text-white rounded-2xl border border-red-500 shadow-lg shadow-red-950/20">
                <h3 className="font-bold text-white mb-2 uppercase text-lg">1. Registo e Autenticação</h3>
                <p className="text-red-50">Associe o seu dispositivo móvel de forma rápida ao seu Bilhete de Identidade através de validação biométrica ou PIN de segurança física.</p>
              </div>
              <div className="p-6 bg-red-600 text-white rounded-2xl border border-red-500 shadow-lg shadow-red-950/20">
                <h3 className="font-bold text-white mb-2 uppercase text-lg">2. Caixa de Entrada Oficial</h3>
                <p className="text-red-50">Aceda à caixa de correspondência digital inteligente. Célere, limpa e organizada por canais oficiais com verificação de identidade ministerial.</p>
              </div>
              <div className="p-6 bg-red-600 text-white rounded-2xl border border-red-500 shadow-lg shadow-red-950/20">
                <h3 className="font-bold text-white mb-2 uppercase text-lg">3. Interação & Apoio de Voz</h3>
                <p className="text-red-50">Receba notificações da AGT, SME e ENDE. Caso precise, utilize o assistente de inteligência artificial com síntese de voz para esclarecer termos administrativos complexos.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">3. O sistema precisa de dados ou internet constante?</h2>
            <p className="text-lg leading-relaxed">
              Não. Uma das grandes inovações do Correio Digital Angola é o suporte offline integral. As suas notificações e correspondências oficiais salvas podem ser acedidas, consultadas e exibidas mesmo em regiões sem cobertura de internet.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">4. Os meus dados pessoais são seguros?</h2>
            <p className="text-lg leading-relaxed">
              Sim. A conformidade de segurança e privacidade do cidadão é prioridade nacional absoluta. Os dados são encriptados localmente no dispositivo e transmitidos através de links governamentais blindados, com hospedagem em servidores nacionais angolanos.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">5. Que tipos de notificações posso receber?</h2>
            <p className="text-lg leading-relaxed">
              La plataforma integra diversos sectores sociais e estatais vitais:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-bold text-gray-900 uppercase text-sm">
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">BI & Passaportes do SME</div>
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">Guias e Notificações Civis da AGT</div>
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">Facturas e Alertas de Consumo ENDE/EPAL</div>
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">Intimações Seguras de Justiça</div>
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">Resultados e Apoio Clínico de Saúde</div>
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">Diplomas Digitais e Académicos</div>
              <div className="p-3 bg-red-50 text-red-700 rounded-lg">Círculo de Emergência e Alertas Médicos</div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">6. Em que formato posso obter os comprovativos oficiais?</h2>
            <p className="text-lg leading-relaxed">
              Qualquer correspondência ou guia de impostos pode ser guardada e partilhada no formato padrão:
            </p>
            <ul className="list-disc list-inside space-y-2 font-bold text-gray-900">
              <li>Formato PDF Oficial (assinado digitalmente pelo órgão emissor)</li>
              <li>Códigos de Referência de Pagamento Rupe ou Bancário</li>
              <li>Comprovativos Digitais Offline</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">7. O que é o Círculo de Confiança?</h2>
            <p className="text-lg leading-relaxed">
              O Círculo de Confiança é uma funcionalidade humanitária integrada. Permite que o cidadão configure amigos e familiares para receber alertas automáticos em situações de acidentes, emergência hospitalar ou segurança pública.
            </p>
            <p className="text-lg leading-relaxed">
              Desta forma, os serviços de saúde prioritária e proteção civil de Angola podem encontrar e entrar em contacto com as pessoas certas de forma instantânea.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">8. Preciso de pagar alguma taxa para utilizar a plataforma?</h2>
            <p className="text-lg leading-relaxed">
              Não. O plano <strong className="text-gray-950 font-black">Cidadão</strong> é 100% gratuito para toda a população de Angola. Os custos operacionais são suportados por acordos estatais ou parcerias privadas (bancos, seguradoras, universidades) que beneficiam da nossa infraestrutura API segura de comunicação verificada.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">9. A segurança reside apenas no software?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold uppercase">
              <div className="p-4 border-2 border-red-650 text-red-650 rounded-xl">Interoperabilidade Estatal Segura</div>
              <div className="p-4 border-2 border-red-650 text-red-650 rounded-xl">Login por Sensor Biométrico do Dispositivo</div>
              <div className="p-4 border-2 border-red-650 text-red-650 rounded-xl">Hospedagem Nacional Governamental</div>
              <div className="p-4 border-2 border-red-650 text-red-650 rounded-xl">Prevenção Total de Extravio de Documentação</div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">10. O Correio Digital Angola funciona offline?</h2>
            <p className="text-lg leading-relaxed">
              Sim. A nossa engenharia armazena correspondências de forma local e encriptada no navegador ou aplicação. Após a primeira sincronização na rede, pode aceder a qualquer notificação sem ligação de dados ativa.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">11. O Correio Digital Angola promove a inclusão social?</h2>
            <p className="text-lg leading-relaxed">
              Sim. Por meio de mecanismos integrados de IA inteligência assistida por voz, cidadãos com níveis diferentes de literacia digital ou limitações físicas podem ouvir as suas notificações e responder de forma natural às solicitações básicas do Estado.
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">12. Como posso obter suporte técnico oficial?</h2>
            <p className="text-lg leading-relaxed">
              Caso necessite de apoio para emparelhar o seu dispositivo ou autenticar o seu Bilhete de Identidade, contacte o suporte oficial ou visite um dos postos ministeriais do Correio Digital Angola autorizados.
            </p>
            <p className="text-xl font-black text-red-600 italic mt-8">
              Correio Digital Angola — Mais rápido. Mais seguro. Mais perto de si.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Unindo a governabilidade nacional e a soberania cidadã através da inovação digital sustentável.
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

import { ArrowLeft, Target, Users, Landmark, AlertTriangle, ShieldCheck, CreditCard, BarChart3, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main id="about-container" className="flex-grow max-w-5xl mx-auto w-full px-6 py-16">
      {/* Back navigation */}
      <div className="mb-12">
        <Link id="about-back-link" to="/" className="text-red-600 font-bold flex items-center gap-2 mb-8 hover:text-red-700 transition-colors">
          <ArrowLeft size={18} />
          Voltar ao Início
        </Link>
        <span className="text-red-600 font-black text-xs uppercase tracking-[0.2em] block mb-2">Apresentação Oficial</span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tighter leading-tight uppercase">
          Correio Digital Angola
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed font-semibold max-w-3xl">
          Uma das mais ambiciosas iniciativas de modernização administrativa e transformação digital já concebidas para o país.
        </p>
      </div>

      <div className="space-y-16">
        
        {/* Section: Visão Estratégica */}
        <section className="bg-red-50/40 border-l-4 border-red-600 p-8 rounded-r-3xl">
          <h2 className="text-2xl font-black text-gray-950 mb-4 uppercase tracking-tight">
            Visão Estratégica do Projecto
          </h2>
          <div className="space-y-4 text-gray-800 text-lg leading-relaxed">
            <p>
              O <strong className="text-gray-950 font-black">Correio Digital Angola</strong> representa uma infraestrutura nacional de comunicação oficial, capaz de aproximar o Estado dos cidadãos através de uma plataforma moderna, inteligente, segura e altamente acessível.
            </p>
            <p>
              Mais do que uma aplicação móvel, esta iniciativa propõe uma mudança estrutural na forma como o Estado comunica, presta serviços e gere a relação institucional com a população. A plataforma introduz um novo paradigma de governação digital, no qual o <strong className="text-red-600 font-black">Número do Bilhete de Identidade deixa de ser apenas um documento físico de identificação e passa a funcionar como o principal endereço digital oficial do cidadão angolano</strong>.
            </p>
            <p>
              O projecto surge num momento estratégico para Angola, alinhando-se com os objectivos nacionais de modernização administrativa, inclusão digital, simplificação de serviços públicos e fortalecimento da eficiência governamental, posicionando Angola entre os países africanos mais inovadores no domínio da governação electrónica.
            </p>
          </div>
        </section>

        {/* Section: O Problema Estrutural */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-center">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 uppercase tracking-tight">O Desafio Histórico</h3>
              <p className="text-gray-700 leading-relaxed">
                Grande parte do território nacional desenvolveu-se sem planeamento urbano formal, resultando na ausência de endereços residenciais formais e gerando enormes custos administrativos relacionados com correspondência física.
              </p>
            </div>
            <div className="md:col-span-7 space-y-6">
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                O Problema Estrutural de Angola
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Milhares de residências encontram-se em zonas sem ruas oficialmente identificadas ou sem numeração adequada. Em muitas localidades, os cidadãos dependem de referências informais para indicar a sua localização.
                </p>
                <p>
                  Actualmente, diversas instituições enfrentam dificuldades significativas para localizar cidadãos, entregar documentos, notificar processos administrativos ou garantir comunicação oficial eficiente. Como consequência, inúmeros documentos importantes nunca chegam ao destinatário ou chegam com atrasos consideráveis.
                </p>
                <p>
                  O modelo tradicional baseado em correspondência física é lento, caro e ineficiente. O Estado continua a suportar elevados custos relacionados com impressão, transporte, armazenamento e distribuição documental, enquanto os cidadãos enfrentam filas extensas, deslocações constantes e riscos de extravio documental.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: A Solução */}
        <section className="bg-gradient-to-br from-red-950 to-red-900 text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-red-950/25">
          <div className="relative z-10 max-w-3xl">
            <span className="text-amber-400 font-extrabold text-xs uppercase tracking-widest block mb-3">A Resposta Inteligente</span>
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">A Solução: Correio Digital</h2>
            <div className="space-y-6 text-red-100/90 text-lg leading-relaxed">
              <p>
                A proposta central consiste em transformar a identidade digital do cidadão no seu novo endereço oficial. Em vez de depender exclusivamente de ruas ou bairros, <strong className="text-white font-extrabold">o sistema utilizará o Número do Bilhete de Identidade</strong> como principal mecanismo de identificação e comunicação institucional.
              </p>
              <p>
                Cada cidadão possuirá uma caixa oficial de correspondência digital associada à sua identidade nacional. Sempre que uma instituição pública necessitar comunicar com um cidadão, bastará inserir o Número do Bilhete de Identidade ou o nome no sistema, e a informação será enviada directamente ao seu dispositivo.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-sm font-black text-white uppercase tracking-wider text-center">
                <div className="bg-white/10 p-3 rounded-xl border border-white/5">Bilhetes de Identidade</div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/5">Passaportes</div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/5">Notificações Fiscais</div>
                <div className="bg-white/10 p-3 rounded-xl border border-white/5">Processos Judiciais</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Objectivos */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Objectivos do Projecto</h2>
            <p className="text-gray-500 font-bold mt-2 uppercase text-xs tracking-widest">Nossos Alvos Estratégicos</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <Target size={20} />
              </div>
              <h3 className="font-bold text-gray-900 uppercase text-lg mb-3">Eliminar Burocracia</h3>
              <p className="text-gray-700">Substituir modelos lentos e ineficientes por uma comunicação digital instantânea, automatizada e totalmente rastreável.</p>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <Users size={20} />
              </div>
              <h3 className="font-bold text-gray-900 uppercase text-lg mb-3">Inclusão Digital</h3>
              <p className="text-gray-700">Permitir que cidadãos de diferentes níveis sociais, económicos e educacionais acedam aos serviços de forma simples, direta e intuitiva.</p>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
                <Landmark size={20} />
              </div>
              <h3 className="font-bold text-gray-900 uppercase text-lg mb-3">Eficiência Pública</h3>
              <p className="text-gray-700">Aumentar a eficiência operacional das instituições públicas, reduzindo drasticamente custos com impressão e atrasos no país.</p>
            </div>
          </div>
        </section>

        {/* Section: Benefícios Bento Grid */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Benefícios Estruturais</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card: Governo */}
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-[36px] flex flex-col justify-between">
              <div>
                <span className="text-red-600 font-extrabold text-[10px] uppercase tracking-widest block mb-2">Para o Executivo</span>
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Benefícios para o Governo</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 mt-2 rounded-full bg-red-600 shrink-0" />
                    <span><strong className="text-gray-900">Poupança milionária:</strong> Elimina a dependência de papel, transporte físico e armazenamento documental.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 mt-2 rounded-full bg-red-600 shrink-0" />
                    <span><strong className="text-gray-900">Rastreabilidade Completa:</strong> Controla exatamente o momento em que a comunicação oficial foi enviada e confirmada.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 mt-2 rounded-full bg-red-600 shrink-0" />
                    <span><strong className="text-gray-900">Descongestionamento:</strong> Reduz drasticamente as filas e a pressão operacional física sobre os postos ministeriais.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card: Cidadão */}
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-[36px] flex flex-col justify-between">
              <div>
                <span className="text-red-600 font-extrabold text-[10px] uppercase tracking-widest block mb-2">Para a População</span>
                <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tight">Benefícios para o Cidadão</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 mt-2 rounded-full bg-red-600 shrink-0" />
                    <span><strong className="text-gray-900">Soberania & Comodidade:</strong> Acesso rápido a notificações e documentos directamente no telemóvel sem deslocações desnecessárias.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 mt-2 rounded-full bg-red-600 shrink-0" />
                    <span><strong className="text-gray-900">Protecção Patrimonial:</strong> Carteira digital que reduz o risco de perda física de documentos e mantém históricos organizados.</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 mt-2 rounded-full bg-red-600 shrink-0" />
                    <span><strong className="text-gray-900">Uso Offline Integral:</strong> Acesso garantido mesmo em regiões com baixa cobertura de dados ou limitações de sinal.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Modelo de Negócio e Impacto */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm md:col-span-1">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
              <CreditCard size={20} />
            </div>
            <h3 className="font-extrabold text-gray-900 uppercase text-lg mb-3">Modelo de Negócio</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              O Correio Digital Angola será gratuito para os cidadãos, promovendo a adopção massiva do ecossistema. A sustentabilidade financeira é baseada no licenciamento de integrações para canais privados (bancos, seguradoras, universidades e redes privadas de saúde) por via de APIs seguras.
            </p>
          </div>
          <div className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm md:col-span-2">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-extrabold text-gray-900 uppercase text-lg mb-3">Impacto Económico e Social</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              O impacto económico e social poderá ser histórico para o país. Além da massiva redução de despesas operacionais governamentais, o projecto atua estimulando o ecossistema tecnológico nacional, gerando empregos especializados nas áreas de engenharia de software, inteligência artificial, cibersegurança e suporte técnico descentralizado pelas províncias.
            </p>
          </div>
        </section>

        {/* Section: Conclusão */}
        <section className="text-center py-8 border-t border-gray-100 max-w-2xl mx-auto">
          <div className="inline-flex py-1.5 px-3 rounded-full bg-red-50 text-red-600 border border-red-100 mb-6 items-center justify-center gap-2">
            <Award size={16} />
            <span className="text-xs font-black uppercase tracking-wider">Liderança Tecnológica em África</span>
          </div>
          <h2 className="text-2xl font-black text-gray-950 uppercase tracking-tight mb-4">Conclusão</h2>
          <p className="text-gray-700 text-lg leading-relaxed italic">
            "Ao transformar o Bilhete de Identidade no novo endereço digital oficial do cidadão, Angola poderá liderar uma nova geração de governação electrónica no continente africano, combinando inclusão social, segurança e inteligência numa única solução integrada."
          </p>
        </section>
        
        {/* Fine-print branding */}
        <section className="pt-4 border-t border-gray-100">
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl font-black text-gray-900 tracking-tighter leading-none">FACILITASCAN</span>
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] leading-none mt-2">Facilitando sua Vida</span>
          </div>
        </section>
      </div>
    </main>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Users, 
  Target, 
  Rocket, 
  Layout, 
  Code2, 
  Search,
  ShieldCheck,
  ArrowRight,
  Zap
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

interface ButtonDetail {
  title: string;
  content?: { label: string; value: string }[];
  subButtons?: string[];
  subButtonDetails?: Record<string, ButtonDetail>;
}

interface Phase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: string;
  milestones: Milestone[];
  timeline: string;
  team: string[];
  customLabel?: string;
  buttons?: string[];
  buttonDetails?: Record<string, ButtonDetail>;
}

const PHASES: Phase[] = [
  {
    id: 1,
    title: "Base",
    subtitle: "Fundamentos e alinhamento estratégico",
    description: "Analisar toda a estrutura existente e ver funcionalidades para estabelecer os alicerces do projeto e garantir que todos os fundamentos estejam sólidos.",
    icon: Search,
    color: "bg-blue-500",
    timeline: "Semanas 1-2",
    team: ["Analista de Negócios", "Gerente de Projeto", "Stakeholders"],
    milestones: [
      { id: "m1", title: "Análise", completed: false },
      { id: "m2", title: "Reunião de Alinhamento", completed: false },
      { id: "m3", title: "Ferramentas de Acompanhamento", completed: false },
      { id: "m4", title: "Definição de Plano", completed: false },
    ],
    customLabel: "Fase 01"
  },
  {
    id: 2,
    title: "Estrutura",
    subtitle: "Arquitetura e organização de processos",
    description: "Atualizar site, atualizar redes sociais, integrar SGA e definir o ICP (Ideal Customer Profile) para consolidar a presença digital e operacional.",
    icon: Layout,
    color: "bg-purple-500",
    timeline: "Semanas 3-5",
    team: ["UX Designer", "UI Designer", "Especialista em Acessibilidade"],
    milestones: [
      { id: "m5", title: "Atualização de redes sociais", completed: false },
      { id: "m6", title: "Atualização de site", completed: false },
      { id: "m7", title: "Integralização do SGA", completed: false },
      { id: "m8", title: "Definição do ICP", completed: false },
    ],
    customLabel: "Fase 02"
  },
  {
    id: 3,
    title: "Estrutura",
    subtitle: "Marketing, Patrocinadas e Orgânicas",
    description: "Criação de toda estrutura de marketing, abrangendo estratégias patrocinadas e orgânicas para maximizar o alcance e engajamento.",
    icon: Code2,
    color: "bg-emerald-500",
    timeline: "Semanas 6-12",
    team: ["Gestor de Tráfego", "Social Media", "Copywriter", "Designer"],
    milestones: [
      { id: "m9", title: "Definição de grade", completed: false },
      { id: "m10", title: "Criação de material", completed: false },
      { id: "m11", title: "Orgânico", completed: false },
      { id: "m12", title: "Patrocinado", completed: false },
    ],
    customLabel: "Fase 03"
  },
  {
    id: 4,
    title: "Funis de Aquisição",
    subtitle: "Jornada do cliente e conversão",
    description: "Implementação e otimização dos funis de vendas, focando na integração da estrutura, mapeamento da jornada do cliente e acompanhamento rigoroso dos leads.",
    icon: ShieldCheck,
    color: "bg-amber-500",
    timeline: "Semanas 13-14",
    team: ["Especialista em CRM", "Analista de Conversão", "Gestor de Leads"],
    milestones: [
      { id: "m13", title: "Integração de estrutura", completed: false },
      { id: "m14", title: "Jornada do cliente", completed: false },
      { id: "m15", title: "Acompanhamento dos leads", completed: false },
    ],
    customLabel: "Fase 04"
  },
  {
    id: 5,
    title: "Indicadores de Sucesso",
    subtitle: "Métricas, KPIs e análise de resultados",
    description: "Monitoramento contínuo através da leitura de dados e traqueamento avançado, utilizando dashboards personalizados para acompanhamento individual e coletivo da performance.",
    icon: Rocket,
    color: "bg-rose-500",
    timeline: "Semana 15+",
    team: ["Analista de Dados", "Especialista em BI", "Gestor de Performance"],
    milestones: [
      { id: "m17", title: "Leitura de dados e traqueamento", completed: false },
      { id: "m18", title: "Dashboard", completed: false },
      { id: "m19", title: "Acompanhamento individual", completed: false },
    ],
    customLabel: "Fase 05"
  },
  {
    id: 6,
    title: "Estratégia MKT",
    subtitle: "Planejamento de Marketing",
    description: "Desenvolvimento do planejamento estratégico de marketing, definindo o posicionamento, canais e cronograma de ações para o próximo ciclo.",
    icon: Target,
    color: "bg-indigo-500",
    timeline: "Semana 16+",
    team: ["Diretor de Marketing", "Estrategista Digital", "Analista de Mercado"],
    customLabel: "Estratégia MKT",
    milestones: [],
    buttons: [
      "Pesquisa de audiência",
      "Sentimentos da audiência",
      "Google Ads",
      "Meta Ads",
      "Orgânico",
      "Outros métodos"
    ],
    buttonDetails: {
      "Pesquisa de audiência": {
        title: "Tabela de Inteligência Profunda — Cliente de Proteção Veicular",
        content: [
          { label: "Idade", value: "25 a 49 anos (pico de conversão entre 30–42). Já conquistou o carro com esforço próprio. Não é adolescente, não é aposentado. Está no “modo responsabilidade máxima”." },
          { label: "Localização geográfica", value: "Capitais e regiões metropolitanas do Nordeste e Sudeste. Bairros populares, classe média emergente, periferias organizadas, cidades com alto índice de roubo/furto de veículos. Ex: Natal, Recife, Fortaleza, São Paulo." },
          { label: "Estado civil", value: "Majoritariamente casado(a) ou união estável. Tem filhos ou planeja. O carro é “patrimônio da família”." },
          { label: "Escolaridade", value: "Ensino médio completo a superior incompleto. Prático. Não é técnico em contratos. Odeia termos jurídicos." },
          { label: "Renda familiar", value: "R$ 3.000 a R$ 9.000/mês (core). Parte aspiracional até R$ 12k. Não tem sobra de caixa para arcar com perda total." },
          { label: "Profissão", value: "Motoristas de app, vendedores externos, representantes, técnicos, pequenos empresários, autônomos, prestadores de serviço, CLT operacional. O carro é ferramenta de trabalho." },
          { label: "Tipo de veículo", value: "Carros populares (Onix, HB20, Argo, Gol, Kwid, Mobi), motos 160–300cc e utilitários leves. Bens financiados." },
          { label: "Interesses", value: "Economia, segurança familiar, mobilidade, renda extra, tecnologia simples, soluções “sem dor de cabeça”." },
          { label: "Estilo de vida", value: "Correria. Pouco tempo. Resolve tudo pelo WhatsApp. Decide rápido se sentir confiança." },
          { label: "Valores pessoais", value: "Responsabilidade, proteção da família, previsibilidade financeira, “não passar vergonha”, independência." },
          { label: "Comportamento online", value: "Pesquisa no Google “proteção veicular vale a pena”, “mais barato que seguro”, “proteção veicular é confiável”. Clica em anúncios com preço. Conversa no WhatsApp antes de fechar." },
          { label: "Preferências de consumo", value: "Parcelado, mensalidade baixa, sem taxa escondida, adesão simples, contrato curto." },
          { label: "Hábitos de compra", value: "Compra por indicação. Confia mais em depoimentos do que em marca. Fecha negócio se o vendedor responder rápido." },
          { label: "Principais motivações", value: "Evitar prejuízo financeiro grande, proteger ferramenta de trabalho, dormir tranquilo, pagar menos que seguro tradicional." },
          { label: "Desafios/problemas", value: "Seguro tradicional caro ou recusado por perfil de risco. Burocracia. Medo de golpe. Desconfiança de contratos longos." },
          { label: "Soluções que já consome", value: "Seguro básico, cooperativas, rastreador barato, bloqueador veicular, proteção informal de associação." },
          { label: "Nível de consciência", value: "Sabe que precisa proteger. Só não sabe em quem confiar." },
          { label: "Influenciadores que acompanha", value: "Primo Rico, Thiago Nigro, Nathalia Arcuri (conteúdo de economia, “não jogue dinheiro fora”)." },
          { label: "Canais do YouTube", value: "Me Poupe!, Auto Super, Acelerados." },
          { label: "Sites que acessa", value: "OLX, Webmotors, Reclame Aqui." },
          { label: "Aplicativos no celular", value: "WhatsApp, Instagram, Facebook, 99, Uber, Nubank." },
          { label: "Podcasts", value: "PrimoCast, Os Sócios Podcast." },
          { label: "Processo de decisão", value: "Vê anúncio → pede preço → pergunta “cobre roubo mesmo?” → quer falar com humano → pede indicação → fecha no mesmo dia se confiar." },
          { label: "Objeções racionais", value: "“Isso é golpe?”, “e se vocês não pagarem?”, “tem taxa escondida?”, “posso cancelar quando quiser?”." },
          { label: "Objeções emocionais", value: "Medo de ser engañado. Medo de pagar e não usar. Trauma de experiências ruins com seguradoras." },
          { label: "Medos profundos", value: "Roubo do carro financiado, não conseguir trabalhar, ficar devendo banco, passar aperto com a família." },
          { label: "Dificuldades", value: "Linguagem técnica, contratos longos, atendimento demorado, sinistro burocrático." },
          { label: "Situações vergonhosas", value: "Carro roubado e ter que pedir carona; não conseguir trabalhar por dias; dizer “não tenho seguro”; depender de parente para pagar prejuízo." },
          { label: "O que acorda pensando", value: "“Se roubarem meu carro eu tô ferrado.”" },
          { label: "O que dorme pensando", value: "“Preciso resolver essa proteção logo, mas não quero cair em cilada.”" },
          { label: "Pensamentos recorrentes", value: "“Seguro é caro demais… deve ter algo mais barato.” / “Só quero algo simples que funcione.”" },
          { label: "Preocupações cotidianas", value: "Assalto, colisão, parcela do financiamento, manutenção do carro, combustível caro." },
          { label: "Falas que escuta ao redor", value: "“Fulano perdeu o carro e ficou sem nada.” / “Seguro não pagou.” / “Proteção veicular é mais barato.”" },
          { label: "Histórias internas (10)", value: "1. “Conquistei meu carro suando.” 2. “Não posso perder isso.” 3. “Seguro tradicional não é pra mim.” 4. “Preciso economizar.” 5. “Se for simples eu fecho.” 6. “O barato pode sair caro.” 7. “Prefiro indicação.” 8. “Quero alguém que atenda no WhatsApp.” 9. “Contrato longo me prende.” 10. “Só quero paz.”" },
          { label: "Desejos explícitos", value: "Mensalidade barata, adesão imediata, proteção contra roubo, guincho rápido, rastreador, suporte 24h." },
          { label: "Desejos ocultos", value: "Sentir-se responsável, respeitado, inteligente financeiramente, protegido como “gente grande”." },
          { label: "Gatilhos de compra", value: "Preço claro, depoimentos reais, “sem burocracia”, “ativação na hora”, atendimento humano local, WhatsApp direto." },
          { label: "Linguagem que converte", value: "Simples, direta, zero juridiquês. “Proteja hoje. Ativação imediata. Sem papelada.”" },
          { label: "Linguagem que afasta", value: "“Cláusula”, “franquia complexa”, “análise cadastral extensa”, “carência”." },
          { label: "Papel da proximidade", value: "Quer empresa “da cidade”, número local, sensação de rosto conhecido. Confiança regional pesa mais que marca nacional." },
          { label: "Perfil psicológico dominante", value: "Protetor, pragmático, desconfiado, orientado a custo-benefício. Decide rápido quando sente segurança." }
        ]
      },
      "Sentimentos da audiência": {
        title: "Mapa de Sentimentos e Psicologia da Audiência",
        content: [
          { label: "🔴 DIFICULDADES", value: "Burocracia absurda para contratar seguro tradicional; Orçamento apertado todo mês (R$ 150–200 é o limite mental); Falta de tempo (resolve tudo pelo WhatsApp); Desconfiança generalizada; Dependência total do carro para renda." },
          { label: "🔴 MEDOS", value: "Roubo e perda total do carro financiado (pagar por algo que não tem); Ficar sem trabalhar; Ser enganado por proteção que não cobre nada; Empresa que desaparece no sinistro; Passar vergonha social." },
          { label: "🔴 DESEJOS", value: "Dormir tranquilo (zero dor de cabeça); Pagar pouco e sentir que foi esperto; Resolver rápido sem papelada; Atendimento humano e próximo; Orgulho de ser responsável." },
          { label: "🔴 OBJEÇÕES", value: "“É confiável ou furada?”; “Vão cobrir quando eu precisar?”; “Tem taxa escondida?”; “Associação funciona igual seguro?”; “Se é barato demais, tem pegadinha?”" },
          { label: "🔴 HISTÓRIAS CONSTRANGEDORAS", value: "Pedir carona pro cunhado por semanas; Atrasar contas por falta do carro; Explicar pro cônjuge que não tinha proteção; Pagar guincho particular caro; Ouvir críticas no trabalho." },
          { label: "🔴 PENSAMENTOS AO DEITAR", value: "“Se roubarem amanhã eu tô lascado”; “Devia ter resolvido isso hoje”; “Tomara que nada aconteça até eu contratar”; “Ficar sem nada é pior que pagar caro”." },
          { label: "🔴 COMENTÁRIOS MALDOSOS", value: "“Tu anda sem proteção? Doido demais”; “Depois perde o carro e vem pedir ajuda”; “Economiza mixaria e chora depois”; “Se fosse responsável já tinha feito”." }
        ]
      },
      "Google Ads": {
        title: "Estratégia de Google Ads — Proteção Veicular",
        content: [
          { label: "✅ PALAVRAS-CHAVE POSITIVAS (FUNDO DE FUNIL)", value: "proteção veicular preço, contratar proteção veicular, proteção veicular barato, proteção veicular mensalidade, proteção veicular adesão imediata, associação proteção veicular confiável, proteção veicular 24 horas, proteção veicular com rastreador, melhor proteção veicular, proteção veicular natal rn." },
          { label: "❌ PALAVRAS-CHAVE NEGATIVAS", value: "grátis, gratuito, emprego, vaga, trabalhe conosco, curso, pdf, reclamação, processo, como cancelar." },
          { label: "🔥 PALAVRAS-CHAVE INDIRETAS (DOR LATENTE)", value: "seguro auto muito caro, seguro auto vale a pena, roubo de carro o que fazer, assistência 24 horas veicular, guincho 24 horas preço, rastreador veicular preço, proteção para carro financiado, como proteger meu carro contra roubo, cooperativa de veículos funciona, alternativa ao seguro auto." },
          { label: "✅ 20 TÍTULOS DE ANÚNCIO", value: "Proteção Veicular 24h, Assistência 24 Horas Já, Guincho 24 Horas Incluso, Zero Burocracia Total, Ativação Imediata Hoje, Atendimento Local Rápido, m2 digital traffic, Proteção m2 digital, Contratar Proteção Já, Orçar Proteção Agora, Proteção Veicular Preço, Orçamento Proteção 24h, Contratar Proteção 24h, Assistência 24h Veicular, Guincho 24h Proteção, Consultar Proteção Hoje, Plano Proteção Veicular, Rastreador + Proteção, Proteção Auto Imediata, Cobertura Total 24h." },
          { label: "✅ 8 DESCRIÇÕES (FOCO NATAL)", value: "1. Proteção veicular 24h em Natal. Orçamento rápido no WhatsApp. Agende agora. 2. Assistência e guincho 24 horas em Natal. Contratar é simples. Solicite análise. 3. Rastreador + proteção veicular completa. Atendimento local em Natal. Orçar já. 4. Proteja seu carro hoje em Natal. Ativação imediata. Agendar consulta gratuita. 5. Planos de proteção 24h com suporte real. Orçamento rápido em Natal. Chame. 6. Cobertura total, guincho 24h e rastreamento. Contratar em Natal é fácil. 7. Evite prejuízo no seu veículo. Proteção veicular em Natal. Consultar agora. 8. Seu carro seguro 24h com suporte local. Orçar proteção em Natal pelo Whats." }
        ]
      },
      "Meta Ads": {
        title: "Estratégia de Meta Ads — Criativos e Roteiros",
        content: [
          { label: "🎯 ANÚNCIO 1 — GANCHO PERGUNTA", value: "🎬 Roteiro | 🎣 Gancho (0–3s): “Se roubassem seu carro HOJE… você teria dinheiro pra comprar outro amanhã?” | 🧠 Corpo (3–25s): “Porque é isso que acontece com quem anda sem proteção. O carro some… e a dívida fica. Financiamento continua. Trabalho para. Conta chega. E aí não adianta rezar. Com a nossa proteção veicular 24 horas, você tem: ✔ assistência, ✔ guincho, ✔ rastreador, ✔ suporte imediato no WhatsApp, ✔ zero burocracia. Sem papelada. Sem enrolação. Sem dor de cabeça. Ativou, rodou, tá protegido.” | 🚀 CTA (25–30s): “Clica em Saiba Mais agora e faz sua cotação. Leva 1 minuto no WhatsApp.” | 🏷 Título: Proteção Veicular 24h Já | 📝 Descrição: Proteja seu carro em Natal. Cotação rápida no WhatsApp. Clique e orce." },
          { label: "🎯 ANÚNCIO 2 — GANCHO HISTÓRIA", value: "🎬 Roteiro | 🎣 Gancho: “Semana passada um cliente nosso acordou 6h pra trabalhar… desceu… e a vaga tava vazia. Roubaram o carro. Ele ainda tava pagando 32 parcelas.” | 🧠 Corpo: “Se não tivesse proteção, ia ficar a pé. Sem renda. Sem carro. Sem saída. Mas como tinha proteção veicular com rastreador, a gente agiu na hora. Atendimento 24h. Localização. Suporte total. É isso que você compra aqui: não é plano. É tranquilidade. É alguém resolvendo quando dá ruim.” | 🚀 CTA: “Faz sua cotação agora. Clica em Saiba Mais e fala com a gente no WhatsApp.” | 🏷 Título: Assistência 24 Horas Já | 📝 Descrição: Guincho, rastreador e proteção em Natal. Orçamento rápido. Fale conosco." },
          { label: "🎯 ANÚNCIO 3 — GANCHO CONTRAINTUITIVO", value: "🎬 Roteiro | 🎣 Gancho: “Seguro caro NÃO é sinônimo de proteção. Na maioria das vezes… é só burocracia.” | 🧠 Corpo: “Você paga caro. Liga. Espera. Preenche formulário. Manda documento. E quando precisa… dor de cabeça. A nossa proteção veicular é o oposto: ✔ mensalidade acessível, ✔ ativação imediata, ✔ atendimento humano, ✔ resolve pelo WhatsApp, ✔ guincho 24 horas. Simples. Sem juridiquês. Sem letra miúda. Sem novela.” | 🚀 CTA: “Quer ver quanto fica no seu carro? Clica em Saiba Mais e faz a cotação agora.” | 🏷 Título: Zero Burocracia Total | 📝 Descrição: Proteção veicular simples em Natal. Ative hoje. Clique e faça sua cotação." },
          { label: "🎯 ANÚNCIO 4 — GANCHO SEGMENTADO", value: "🎬 Roteiro | 🎣 Gancho: “Você que trabalha com Uber, 99 ou usa o carro pra ganhar dinheiro… esse recado é pra você.” | 🧠 Corpo: “Se seu carro para… sua renda para. É simples assim. Um roubo, uma batida ou pane… e você perde dias de trabalho. Com a proteção veicular + guincho 24h + rastreador, você tem suporte imediato. A gente resolve rápido, pra você voltar a rodar. Sem papelada. Sem estresse. Só proteção.” | 🚀 CTA: “Clica agora em Saiba Mais, faz a cotação no WhatsApp e já sai protegido hoje.” | 🏷 Título: Proteção p/ Motoristas App | 📝 Descrição: Motorista de app em Natal? Proteção 24h pro seu carro. Cotação rápida. Clique." }
        ]
      },
      "Orgânico": {
        title: "Estratégia de Conteúdo Orgânico (R.E.T.I.N.A.)",
        content: [
          { 
            label: "🔴 R — RELACIONAMENTO", 
            value: "Tema: “Quem está por trás da proteção do seu carro?”\n🎬 Formato: Vídeo selfie + bastidores + atendimento\n🎤 Roteiro: “Deixa eu te contar uma coisa que quase ninguém mostra… Quando você contrata proteção veicular, você não tá contratando um ‘plano’. Você tá confiando o seu carro… o seu trabalho… e às vezes o sustento da sua família… pra pessoas reais. Aqui não é call center gigante. Somos daqui de Natal. A gente atende no WhatsApp. A gente resolve problema de verdade. Quando um cliente liga de madrugada porque o carro quebrou… é a gente que acorda. Quando roubam um carro… é a gente que corre atrás. Proteção veicular pra mim não é venda. É responsabilidade. Se um dia você falar com a gente, já sabe: tem gente de verdade do outro lado.”\n🏷 Título: Quem protege seu carro?\n📝 Descrição: Somos de Natal, atendimento humano e rápido. Fale com a gente no WhatsApp." 
          },
          { 
            label: "🔵 E — ENGAJAMENTO", 
            value: "Tema: “Você é do time azarado ou prevenido?”\n🎬 Formato: Reels rápido, estilo meme\n🎤 Roteiro: “Todo brasileiro tem dois tipos de motorista: Time 1: ‘Nunca vai acontecer comigo’ 👉 anda sem proteção. Time 2: ‘Prefiro prevenir do que chorar depois’ 👉 já tem proteção veicular. Agora me responde… Você é do time que reza… ou do time que resolve? Comenta aqui: AZAR ou PREVENIDO”\n🏷 Título: Azar ou prevenido?\n📝 Descrição: Você protege seu carro ou conta com a sorte? Comenta 👇" 
          },
          { 
            label: "🟡 T — TRANSFORMAÇÃO", 
            value: "Tema: “O erro que faz você pagar caro no seguro”\n🎬 Formato: Educativo + quadro branco\n🎤 Roteiro: “Se você ainda acha que seguro tradicional é sua única opção… você tá jogando dinheiro fora. Muita gente paga 300, 400, 500 reais por mês… Sem precisar. Proteção veicular funciona assim: ✔ mensalidade menor, ✔ assistência 24h, ✔ guincho, ✔ rastreador, ✔ zero burocracia. Ou seja… Você sai de: ‘caro e complicado’ Pra: ‘acessível e simples’. Informação economiza dinheiro. Agora você já sabe.”\n🏷 Título: Pare de pagar caro\n📝 Descrição: Existe alternativa ao seguro caro. Proteção 24h em Natal. Chama no Whats." 
          },
          { 
            label: "🟣 I — INTERAÇÃO 1x1", 
            value: "Tema: “Quanto custa proteger seu carro?”\n🎬 Formato: Stories + caixa de perguntas\n🎤 Roteiro: “Bora fazer um teste rápido? Responde aqui: Qual seu carro + ano? Eu vou te mandar no direct uma simulação REAL de valor pra proteção veicular. Sem compromisso. Sem pressão. Só pra você saber quanto ficaria proteger seu carro hoje.”\n🏷 Título: Quer simular seu valor?\n📝 Descrição: Comenta seu carro ou chama no direct. Cotação rápida em Natal." 
          },
          { 
            label: "🟠 N — NÍVEL DE CONSCIÊNCIA", 
            value: "Tema: “O dia que o cliente quase perdeu tudo”\n🎬 Formato: Depoimento storytelling\n🎤 Roteiro: “Esse carro aqui foi roubado numa terça, 6h da manhã. O dono trabalha com aplicativo. Se ficasse sem carro… ficava sem renda. Mas ele tinha proteção veicular. Ligou pra gente. Guincho. Rastreamento. Suporte. Problema resolvido. Imagina se não tivesse? É isso que a gente vende: tranquilidade. Se você ainda anda sem proteção… tá correndo um risco desnecessário.”\n🏷 Título: Imagina perder seu carro\n📝 Descrição: Proteção veicular 24h em Natal. Faça sua cotação no WhatsApp agora." 
          },
          { 
            label: "🟢 A — AUTORIDADE", 
            value: "Tema: “Por que somos diferentes?”\n🎬 Formato: Prova social + números + estrutura\n🎤 Roteiro: “Deixa eu ser direto. Proteção veicular não é tudo igual. Aqui a gente trabalha com: ✔ atendimento local em Natal, ✔ suporte 24 horas, ✔ rastreador, ✔ assistência imediata, ✔ centenas de clientes ativos. A gente não promete milagre. A gente resolve problema. Se você quer empresa séria, próxima e rápida… fala com a gente.”\n🏷 Título: Proteção com confiança\n📝 Descrição: Atendimento local, suporte 24h e rapidez. Orçamento agora no WhatsApp." 
          }
        ]
      },
      "Outros métodos": {
        title: "Outros Métodos Estratégicos",
        subButtons: ["AIDA e SPIN", "Light Copy", "VSL"],
        subButtonDetails: {
          "AIDA e SPIN": {
            title: "Frameworks AIDA e SPIN Selling",
            content: [
              { 
                label: "🔴 01 — ANÚNCIO IMAGEM ÚNICA", 
                value: "📸 Imagem: Vaga vazia + chave na mão + choque. Texto: “E se seu carro SUMIR hoje?”\n🧠 Headline: Seu carro protegido 24h\n🔻 Subheadline: Guincho • Rastreador • Zero burocracia\n✍️ Texto: Você ainda sai de casa torcendo pra nada acontecer? Roubo, batida e pane acontecem. Com a MB Proteção, você tem assistência, guincho, rastreador e ativação rápida. Sem papelada. Proteja hoje o que te dá renda.\n📲 CTA: Clique em Saiba mais e faça sua cotação agora.\n🔖 Hashtags: #ProteçãoVeicular #NatalRN #MBProteção" 
              },
              { 
                label: "🔵 02 — CARROSSEL (5 QUADROS)", 
                value: "🎯 Estrutura SPIN:\n1. Situação: Pessoa saindo pra lutar. “Seu carro é seu sustento”.\n2. Problema: Vaga vazia. “Mas e se ele não estiver lá?”.\n3. Implicação: Pessoa preocupada. “Sem carro = sem renda”.\n4. Solução: MB Proteção 24h (Guincho + Rastreador).\n5. Ação: Atendente + WhatsApp. “Faça sua cotação agora”.\n✍️ Texto: Proteja seu carro com assistência local em Natal. Orce agora." 
              },
              { 
                label: "🟣 03 — VÍDEO (40s)", 
                value: "🎬 Conceito: “Do medo ao alívio”.\n🎞️ Cenas:\n1. Rotina: Saindo pra trabalhar.\n2. Sumiu: Vaga vazia (impacto).\n3. Sem Renda: Preocupação com contas.\n4. 24 Horas: MB Proteção (guincho/rastreador).\n5. Zero Burocracia: Alívio e atendimento humano em Natal.\n6. Cote Agora: CTA WhatsApp pulsando.\n✍️ Texto: Não espere o problema acontecer. Proteção 24h em Natal." 
              }
            ]
          },
          "Light Copy": {
            title: "Estratégia de Light Copy",
            content: [
              { 
                label: "🌿 01 — IMAGEM ÚNICA", 
                value: "📸 Imagem: Foto natural (pai/mãe com mochila no carro). Luz da manhã. Sem texto na arte.\n🧠 Headline: Coisas que a gente protege sem pensar\n🔻 Subheadline: Casa. Celular. Família.\n✍️ Texto: Engraçado… A gente coloca película no celular, seguro no cartão, grade na janela. Mas o carro, que leva a gente pra vida, muita gente deixa na sorte. Não é sobre medo, é sobre cuidado. Aqui em Natal, muitos resolvem isso simples: assistência 24h e WhatsApp. Sem drama. Só tranquilidade.\n📲 CTA: Se fizer sentido, chama a gente e vê quanto fica. 🙂\n🔖 Hashtags: #VidaReal #ProteçãoVeicular #NatalRN" 
              },
              { 
                label: "🌿 02 — CARROSSEL (5 QUADROS)", 
                value: "🎯 Conceito: “Pequenas decisões que evitam grandes problemas”\n1. Você tranca a porta todo dia.\n2. Coloca senha no celular pra se proteger.\n3. Mas o carro… muita gente deixa na sorte.\n4. Proteção veicular 24h: simples, sem burocracia.\n5. Resolve em minutos direto no WhatsApp.\n✍️ Texto: Proteção não precisa ser complicada. Em Natal, muitos escolhem assistência 24h e guincho só pra não depender da sorte. Simule sem pressão. 🙂" 
              },
              { 
                label: "🌿 03 — VÍDEO (40s)", 
                value: "🎬 Conceito: “Um dia comum” (Narrativa cotidiana).\n🎞️ Cenas:\n1. Rotina: Sol nascendo, café.\n2. Chave: Saindo pra trabalhar.\n3. Parte da Vida: Trânsito, rádio.\n4. Alerta: Guincho ajudando alguém (tom frio).\n5. Tranquilidade: WhatsApp + motorista calmo.\n6. Cuidar: Carro em casa ao pôr do sol.\n✍️ Texto: Tem coisa que a gente protege no automático. O carro também merece. Proteção simples em Natal. 🙂" 
              }
            ]
          },
          "VSL": {
            title: "Video Sales Letter (VSL)",
            content: [
              { label: "Estrutura", value: "Vídeo de vendas focado em quebra de objeções e apresentação da oferta irresistível." }
            ]
          }
        }
      }
    }
  }
];

export default function App() {
  const [phases, setPhases] = useState<Phase[]>(PHASES);
  const [activePhaseId, setActivePhaseId] = useState<number | 'cover'>('cover');
  const [selectedButtonLabel, setSelectedButtonLabel] = useState<string | null>(null);
  const [selectedSubButtonLabel, setSelectedSubButtonLabel] = useState<string | null>(null);
  const [completedMarketingSessions, setCompletedMarketingSessions] = useState<string[]>([]);

  const activePhase = activePhaseId === 'cover' ? null : phases.find(p => p.id === activePhaseId);
  const selectedDetails = activePhase?.buttonDetails?.[selectedButtonLabel || ''];
  const selectedSubDetails = selectedDetails?.subButtonDetails?.[selectedSubButtonLabel || ''];

  const handleCloseModal = () => {
    setSelectedButtonLabel(null);
    setSelectedSubButtonLabel(null);
  };

  const toggleMilestone = (phaseId: number, milestoneId: string) => {
    setPhases(prevPhases => prevPhases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          milestones: phase.milestones.map(m => 
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          )
        };
      }
      return phase;
    }));
  };

  const toggleMarketingSession = (label: string) => {
    setCompletedMarketingSessions(prev => 
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const calculatePhaseProgress = () => {
    const mainPhases = phases.filter(p => p.id >= 1 && p.id <= 5);
    const totalMilestones = mainPhases.reduce((acc, p) => acc + p.milestones.length, 0);
    const completedMilestones = mainPhases.reduce((acc, p) => acc + p.milestones.filter(m => m.completed).length, 0);
    return totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
  };

  const calculateMarketingProgress = () => {
    const marketingPhase = phases.find(p => p.id === 6);
    if (!marketingPhase || !marketingPhase.buttons) return 0;
    return Math.round((completedMarketingSessions.length / marketingPhase.buttons.length) * 100);
  };

  const phaseProgress = calculatePhaseProgress();
  const marketingProgress = calculateMarketingProgress();

  return (
    <div className="h-screen bg-black text-white flex flex-row p-4 lg:p-6 gap-4 lg:gap-6 overflow-hidden">
      {/* Sidebar Navigation - Fixed Left Panel */}
      <nav className="w-72 lg:w-80 bg-blue-600 rounded-[2.5rem] lg:rounded-[3rem] p-6 lg:p-8 flex flex-col gap-8 z-10 text-white shadow-2xl shadow-blue-900/20 border border-blue-500/50 shrink-0 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-3">
          {/* Project Hub Tab */}
          <button
            onClick={() => setActivePhaseId('cover')}
            className={cn(
              "group flex items-center gap-4 p-4 rounded-[2rem] transition-all duration-300 text-left relative overflow-hidden border",
              activePhaseId === 'cover' 
                ? "bg-white text-blue-600 shadow-2xl scale-[1.02] border-white" 
                : "hover:bg-blue-500/50 text-white border-transparent"
            )}
          >
            <div className={cn(
              "w-10 h-10 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center transition-colors shrink-0",
              activePhaseId === 'cover' ? "bg-blue-50 shadow-inner" : "bg-white"
            )}>
              <img 
                src="https://i.imgur.com/DFiiogE.png" 
                alt="Logo" 
                className="w-6 lg:w-8 h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <p className={cn("font-black text-xs lg:text-sm uppercase tracking-tighter leading-none", activePhaseId === 'cover' ? "text-blue-600" : "text-white")}>Project Hub</p>
              <p className={cn("text-[8px] lg:text-[9px] font-bold uppercase tracking-widest mt-1 opacity-60", activePhaseId === 'cover' ? "text-blue-400" : "text-blue-100")}>MB 2026</p>
            </div>
          </button>

          <div className="h-px bg-blue-400/30 my-2 mx-4" />

          {phases.map((phase) => {
            const Icon = phase.icon;
            const isActive = activePhaseId === phase.id;
            
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhaseId(phase.id)}
                className={cn(
                  "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left relative overflow-hidden",
                  isActive 
                    ? "bg-white text-blue-600 shadow-2xl scale-[1.02]" 
                    : "hover:bg-blue-500/50 text-white"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0",
                  isActive ? "bg-blue-100" : "bg-blue-700 group-hover:bg-blue-800"
                )}>
                  <Icon size={18} className={isActive ? "text-blue-600" : "text-white"} />
                </div>
                <div className="flex-1">
                  <p className="font-black text-[10px] lg:text-xs uppercase tracking-widest leading-tight">
                    {phase.customLabel}
                  </p>
                </div>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-4"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-4 pt-6 border-t border-blue-400/30">
          <div className="bg-blue-700/40 rounded-[2rem] p-5 border border-blue-400/20">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[9px] font-black text-blue-100 uppercase tracking-widest">Status Fases</span>
              <span className="text-sm font-black text-white">{phaseProgress}%</span>
            </div>
            <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${phaseProgress}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>

          <div className="bg-blue-700/40 rounded-[2rem] p-5 border border-blue-400/20">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[9px] font-black text-blue-100 uppercase tracking-widest">Status Estratégia</span>
              <span className="text-sm font-black text-white">{marketingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${marketingProgress}%` }}
                className="h-full bg-emerald-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area - Presentation Right Panel */}
      <main className="flex-1 overflow-y-auto bg-zinc-950 rounded-[2.5rem] lg:rounded-[3rem] border border-zinc-900 shadow-2xl custom-scrollbar relative">
        <div className="max-w-5xl mx-auto min-h-full flex flex-col p-6 lg:p-16">
          <AnimatePresence mode="wait">
            {activePhaseId === 'cover' ? (
              <motion.div
                key="cover"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1 flex flex-col items-start justify-center space-y-12"
              >
                <div className="space-y-6 max-w-2xl">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="w-24 h-24 bg-white p-4 rounded-3xl shadow-2xl flex items-center justify-center border border-zinc-800"
                  >
                    <img 
                      src="https://i.imgur.com/DFiiogE.png" 
                      alt="Logo Marketing MB" 
                      className="w-full h-auto"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                      <Rocket size={12} />
                      Performance Estratégica
                    </motion.div>
                    <motion.h1 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-6xl lg:text-8xl font-display font-black tracking-tighter text-white leading-[0.9]"
                    >
                      MARKETING <br />
                      <span className="text-blue-600">MB 2026</span>
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-zinc-500 font-medium text-lg lg:text-xl max-w-xl"
                    >
                      Bem-vindo ao centro de comando estratégico. Explore as fases do projeto, métricas de sucesso e táticas de marketing de alta performance.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-4"
                  >
                    <button
                      onClick={() => setActivePhaseId(1)}
                      className="group flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:text-blue-600 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-900/40"
                    >
                      Iniciar Apresentação
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => setActivePhaseId(6)}
                      className="group flex items-center gap-4 bg-zinc-900 border border-zinc-800 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all"
                    >
                      Ver Estratégia
                      <Target size={18} className="text-zinc-500" />
                    </button>
                  </motion.div>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
                >
                  {[
                    { label: "Fases do Projeto", value: "06", icon: Layout },
                    { label: "Status Geral", value: `${Math.round((phaseProgress + marketingProgress) / 2)}%`, icon: Rocket },
                  ].map((stat, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-3xl backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                          <stat.icon size={20} />
                        </div>
                        <span className="text-2xl font-black text-white">{stat.value}</span>
                      </div>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            ) : activePhase ? (
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-12"
              >
                {/* Header Section */}
                <header className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest",
                      activePhase.color
                    )}>
                      {activePhase.customLabel || `Fase 0${activePhase.id}`}
                    </span>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight text-white">
                    {activePhase.title}
                  </h2>
                  <p className="text-xl text-zinc-400 font-medium max-w-2xl">
                    {activePhase.subtitle}
                  </p>
                </header>

                {activePhase.buttons ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activePhase.buttons.map((label, index) => {
                      const isCompleted = completedMarketingSessions.includes(label);
                      return (
                        <div key={index} className="relative group">
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedButtonLabel(label)}
                            className={cn(
                              "w-full h-full relative bg-zinc-900 border p-8 rounded-3xl text-left transition-all duration-300 shadow-xl overflow-hidden",
                              isCompleted ? "border-emerald-500/50 hover:bg-emerald-500/10" : "border-zinc-800 hover:bg-blue-600 hover:border-blue-500"
                            )}
                          >
                            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                              <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                                isCompleted ? "bg-emerald-500" : "bg-blue-600 group-hover:bg-white/20"
                              )}>
                                {isCompleted ? <CheckCircle2 size={24} className="text-white" /> : <Target size={24} className="text-white" />}
                              </div>
                              <h3 className="text-2xl font-display font-bold text-white leading-tight">
                                {label}
                              </h3>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight size={24} className="text-white/50" />
                            </div>
                          </motion.button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMarketingSession(label);
                            }}
                            className={cn(
                              "absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all",
                              isCompleted ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
                            )}
                          >
                            {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Description & Info Grid */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-sm backdrop-blur-sm">
                      <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Visão Geral</h3>
                      <p className="text-lg text-zinc-300 leading-relaxed">
                        {activePhase.description}
                      </p>
                    </div>

                    <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 shadow-sm backdrop-blur-sm">
                      <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Marcos e Entregáveis</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activePhase.milestones.map((milestone) => (
                          <button 
                            key={milestone.id}
                            onClick={() => toggleMilestone(activePhase.id, milestone.id)}
                            className={cn(
                              "flex items-center gap-3 p-4 rounded-2xl border transition-all text-left",
                              milestone.completed 
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                                : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
                            )}
                          >
                            {milestone.completed ? (
                              <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                            ) : (
                              <Circle size={20} className="text-zinc-600 shrink-0" />
                            )}
                            <span className="text-sm font-medium">{milestone.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl">
                      <div className="space-y-8">
                        <div>
                          <div className="flex items-center gap-2 mb-3 opacity-60">
                            <Clock size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Cronograma</span>
                          </div>
                          <p className="text-xl font-display font-bold">{activePhase.timeline}</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-3 opacity-60">
                            <Users size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Equipe Chave</span>
                          </div>
                          <ul className="space-y-2">
                            {activePhase.team.map((member, i) => (
                              <li key={i} className="text-sm font-medium flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                {member}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const nextIndex = PHASES.findIndex(p => p.id === activePhase.id) + 1;
                        if (nextIndex < PHASES.length) {
                          setActivePhaseId(PHASES[nextIndex].id);
                        } else {
                          setActivePhaseId('cover');
                        }
                      }}
                      className="w-full group bg-zinc-900 hover:bg-blue-600 text-white p-6 rounded-3xl border border-zinc-800 shadow-sm transition-all duration-300 flex items-center justify-between"
                    >
                      <span className="font-bold text-sm uppercase tracking-widest">
                        {PHASES.findIndex(p => p.id === activePhase.id) === PHASES.length - 1 ? "Voltar ao Início" : "Próxima Fase"}
                      </span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {selectedButtonLabel && selectedDetails && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 bg-black/80 backdrop-blur-md"
                onClick={handleCloseModal}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="bg-zinc-900 border border-zinc-800 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-8 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 sticky top-0 z-10 backdrop-blur-sm">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white">
                        {selectedSubButtonLabel ? selectedSubDetails?.title : selectedDetails.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-zinc-500 text-sm font-medium">{selectedButtonLabel}</p>
                        {selectedSubButtonLabel && (
                          <>
                            <ChevronRight size={14} className="text-zinc-700" />
                            <p className="text-blue-400 text-sm font-bold">{selectedSubButtonLabel}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {selectedSubButtonLabel && (
                        <button 
                          onClick={() => setSelectedSubButtonLabel(null)}
                          className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                          Voltar
                        </button>
                      )}
                      <button 
                        onClick={handleCloseModal}
                        className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white transition-colors"
                      >
                        <ChevronRight size={24} className="rotate-180" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {selectedSubButtonLabel && selectedSubDetails ? (
                      <div className="grid grid-cols-1 gap-4">
                        {selectedSubDetails.content?.map((item, i) => (
                          <div key={i} className="group flex flex-col md:flex-row gap-4 p-6 rounded-2xl bg-zinc-800/30 border border-zinc-800/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all">
                            <div className="md:w-1/3 shrink-0">
                              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{item.label}</span>
                            </div>
                            <div className="md:w-2/3">
                              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : selectedDetails.subButtons ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {selectedDetails.subButtons.map((subLabel, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedSubButtonLabel(subLabel)}
                            className="group relative bg-zinc-800/50 border border-zinc-800 p-8 rounded-3xl text-left hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-xl overflow-hidden"
                          >
                            <div className="relative z-10">
                              <div className="w-10 h-10 rounded-xl bg-blue-600 group-hover:bg-white/20 flex items-center justify-center mb-6 transition-colors">
                                <Zap size={20} className="text-white" />
                              </div>
                              <h4 className="text-xl font-display font-bold text-white leading-tight">
                                {subLabel}
                              </h4>
                            </div>
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight size={20} className="text-white/50" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        {selectedDetails.content?.map((item, i) => (
                          <div key={i} className="group flex flex-col md:flex-row gap-4 p-6 rounded-2xl bg-zinc-800/30 border border-zinc-800/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all">
                            <div className="md:w-1/3 shrink-0">
                              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{item.label}</span>
                            </div>
                            <div className="md:w-2/3">
                              <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 border-t border-zinc-800 bg-zinc-900/50 flex justify-end">
                    <button 
                      onClick={handleCloseModal}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm uppercase tracking-widest transition-all"
                    >
                      Fechar
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export const profile = {
  name: 'Henler Soares',
  role: 'Desenvolvedor Full-Stack',
  tagline: 'Construo produtos digitais que resolvem problemas reais.',
  bio: 'Sou desenvolvedor Full-Stack com foco em React e Node.js. Gosto de trabalhar no ciclo completo — desde a arquitetura até a UI — sempre com atenção a performance e experiência do usuário.',
  location: 'Araçatuba - São Paulo, BR',
  available: true,
  email: 'henlermendes@hotmail.com',
  github: 'https://github.com/henlersoares',
  linkedin: 'https://www.linkedin.com/in/henler-soares-715411197',
}

export type ProjectStatus = 'done' | 'wip'

export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  status: ProjectStatus
  featured: boolean
  year: number
  tech: string[]
  links: { label: string; url: string }[]
  highlights: string[]
  image?: string
  gallery?: string[]
}

export const projects: Project[] = [
  {
    slug: 'audimark',
    title: 'Audimark',
    description: 'Rede social de música para avaliação de discografias, reviews, listas e descoberta de artistas — inspirada no Letterboxd.',
    longDescription: 'O Audimark nasceu da vontade de ter um espaço sério para falar de música além das playlists. O usuário pode avaliar álbuns de 0.5 a 10, escrever reviews, seguir artistas e outros usuários, explorar discografias completas via Spotify API, criar listas de favoritos, comentar com replies e @mentions, e receber notificações em tempo real. O backend é construído com NestJS + Prisma + PostgreSQL, com cache de dados do Spotify no banco para evitar chamadas desnecessárias. O frontend usa Next.js com TypeScript, Tailwind e Framer Motion. Projeto em andamento ativo — deploy previsto no Railway + Vercel.',
    status: 'wip',
    featured: true,
    year: 2026,
    tech: ['Next.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'Prisma', 'Docker', 'Tailwind', 'Spotify API'],
    links: [
      { label: 'GitHub', url: 'https://github.com/henlersoares/audimark' },
    ],
    highlights: [
      'Integração com Spotify API e Odesli para discografias e links de streaming',
      'Sistema social completo: feed, follows, likes, comentários com replies e @mentions',
      'Avaliações de 0.5 a 10 com score médio por álbum e notificações em tempo real',
    ],
  },
  {
    slug: 'premium-barber',
    title: 'Premium Barber',
    description: 'Landing page para barbearia com contato direto via WhatsApp, design focado em conversão e já em produção.',
    longDescription: 'Projeto desenvolvido para uma barbearia, com foco em simplicidade e conversão. O visitante encontra as informações essenciais do estabelecimento e entra em contato diretamente pelo WhatsApp com um clique. Já está em produção na Vercel.',
    status: 'done',
    featured: true,
    year: 2026,
    tech: ['HTML', 'CSS', 'JavaScript'],
    links: [
      { label: 'Demo', url: 'https://premium-barber-ten.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/henlersoares/premium-barber' }, // ajusta a URL
    ],
    image: '/projects/premium-barber/01.png',
    gallery: [
      '/projects/premium-barber/01.png',
      '/projects/premium-barber/02.png',
      '/projects/premium-barber/03.png',
      '/projects/premium-barber/04.png',
      '/projects/premium-barber/05.png',
    ],
    highlights: [
      'Contato direto via WhatsApp integrado ao botão principal',
      'Design limpo e focado em conversão',
      'Deploy na Vercel com domínio próprio',
    ],
  },
  {
    slug: 'smartplanix',
    title: 'Smartplanix',
    description: 'Agenda inteligente para usuários verificarem seus compromissos.',
    longDescription: 'É um projeto de agenda pessoal, onde o usuário pode adicionar e verificar seus compromissos de forma diária, semanal e mensal. O aplicativo mostra também quais são os compromissos que estão se aproximando e também possui uma aba de tarefas, funcionando de forma semelhante a uma To-Do List.',
    status: 'done',
    featured: true,
    year: 2026,
    tech: ['Typescript', 'Next.js', 'tailwind-css', 'GitHub Actions'],
    links: [
      { label: 'GitHub', url: 'https://github.com/henlersoares/smartplanix' },
    ],
    image: '/projects/smartplanix/02.png',
    gallery: [
      '/projects/smartplanix/01.png',
      '/projects/smartplanix/02.png',
      '/projects/smartplanix/03.png',
      '/projects/smartplanix/04.png',
      '/projects/smartplanix/05.png',
      '/projects/smartplanix/06.png',
      '/projects/smartplanix/07.png',
      '/projects/smartplanix/08.png',
      '/projects/smartplanix/09.png',
      '/projects/smartplanix/10.png',
    ],
    highlights: [
      'Publicada no npm, 200+ downloads',
      'Setup completo de VPS em menos de 5 minutos',
      'Suporte a múltiplos ambientes (staging, production)',
    ],
  },
]

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  tech: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Assistente Desenvolvedor Full-Stack',
    company: 'Instituto Államo',
    period: 'Fev 2026 – presente',
    description: 'Desenvolvimento Full-Stack em um SaaS de consultoria financeira. Criação de novas telas no frontend, manutenção e evolução do backend, correções de bugs e gestão do banco de dados. Atuo no ciclo completo do produto, do banco de dados à interface final.',
    tech: ['React', 'Node.js', 'Next.js', 'PostgreSQL', 'MongoDB', 'Prisma'],
  },
  {
    role: 'Suporte Técnico',
    company: 'Concept - Automação Comercial',
    period: 'Mai 2025 – Out 2025',
    description: 'Suporte técnico a clientes via telefone, WhatsApp e chamados. Resolução de problemas por acesso remoto, consultas SQL no PostgreSQL, validação de backups, atualizações e migrações fiscais do sistema. Reportei bugs ao setor de qualidade contribuindo para a melhoria contínua do produto.',
    tech: ['PostgreSQL', 'Anydesk', 'DataFlex', 'Crystal Reports'],
  },
]

export interface Skill {
  name: string
  level: number
}

export interface SkillGroup {
  label: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React', level: 92 },
      { name: 'TypeScript', level: 83 },
      { name: 'Next.js', level: 78 },
      { name: 'CSS / Tailwind', level: 80 },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'PostgreSQL', level: 72 },
      { name: 'MongoDB', level: 68 },
    ],
  },
  {
    label: 'Infra & Ferramentas',
    skills: [
      { name: 'Docker', level: 65 },
      { name: 'GitHub Actions', level: 70 },
      { name: 'Linux / VPS', level: 65 },
    ],
  },
]

export const certifications = [
  { name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', year: 2023 },
  { name: 'MongoDB Associate Developer', issuer: 'MongoDB University', year: 2022 },
]

export const education = [
  {
    degree: 'Pós-Graduando em Cloud & DevOps',
    institution: 'Uninter',
    period: '2026',
  },
  {
    degree: 'Bacharelado em Ciência da Computação',
    institution: 'Universidade Paulista',
    period: '2017 – 2021',
  },
]

export const hobbies = [
  { icon: '🎸', label: 'Guitarra' },
  { icon: '♟️', label: 'Xadrez online' },
  { icon: '🏃', label: 'Corrida' },
  { icon: '📚', label: 'Leitura técnica' },
]

export interface Post {
  slug: string
  title: string
  summary: string
  date: string
  readTime: number
  tags: string[]
}

export const posts: Post[] = [
  {
    slug: 'multi-tenant-nodejs',
    title: 'Como estruturei um SaaS multi-tenant com Node.js e PostgreSQL',
    summary: 'Uma análise das estratégias de isolamento de dados — schema-per-tenant, row-level security e banco separado — com prós e contras de cada abordagem.',
    date: '2024-07-10',
    readTime: 8,
    tags: ['Node.js', 'PostgreSQL', 'SaaS', 'Arquitetura'],
  },
  {
    slug: 'react-performance-patterns',
    title: 'Três padrões de performance no React que uso em todo projeto',
    summary: 'Além do memo e do useCallback: como pensar em otimização de forma estrutural, não apenas como remédio para lentidão.',
    date: '2024-05-22',
    readTime: 6,
    tags: ['React', 'Performance', 'Frontend'],
  },
  {
    slug: 'deploy-sem-devops',
    title: 'Deploy em VPS sem DevOps: minha stack de infraestrutura mínima',
    summary: 'Como configurar Nginx, SSL, CI/CD com GitHub Actions e monitoramento básico para projetos solo ou de times pequenos.',
    date: '2024-03-15',
    readTime: 10,
    tags: ['DevOps', 'Linux', 'GitHub Actions'],
  },
]

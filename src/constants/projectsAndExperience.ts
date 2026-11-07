/**
 * The projects and experience module
 * This module is responsible for the projects and work experience shown in the portfolio of the project.
 */
import recommendationLetter from "../assets/CARTA DE RECOMENDAÇÃO PROFISSIONAL.pdf";
import chtCover from "../assets/cht-cover.jpg";
import chtCoverHover from "../assets/cht-cover-hover.jpg";
import even7Cover from "../assets/even7-cover.jpg";
import even7CoverHover from "../assets/even7-cover-hover.jpg";
import mecarvitCover from "../assets/mecarvit-cover.jpg";
import mecarvitCoverHover from "../assets/mecarvit-cover-hover.jpg";
import pasgoCover from "../assets/pasgo-cover.jpg";
import pasgoCoverHover from "../assets/pasgo-cover-hover.jpg";

/** Brand color of each technology that can appear as a tag. */
const TECH_COLORS = {
    Blade: "#F7523F",
    C: "#00599C",
    CSS3: "#1572B6",
    Dart: "#0175C2",
    Docker: "#2496ED",
    Drizzle: "#C5F74F",
    Electron: "#47848F",
    ExpressJS: "#888888",
    Fastify: "#888888",
    Flutter: "#02569B",
    HTML5: "#E34F26",
    JavaScript: "#F7DF1E",
    Laravel: "#FF2D20",
    "Material UI": "#007FFF",
    MongoDB: "#47A248",
    MySQL: "#4479A1",
    "Naive UI": "#18A058",
    Nginx: "#009639",
    "Node.js": "#339933",
    PHP: "#777BB4",
    PostgreSQL: "#336791",
    Python: "#3776AB",
    React: "#61DAFB",
    "React Admin": "#F50057",
    Redis: "#DC382D",
    Shadcn: "#888888",
    SQLite: "#0F80CC",
    "Tailwind CSS": "#06B6D4",
    TypeScript: "#3178C6",
    Vite: "#646CFF",
    Vue: "#4FC08D"
} as const;

export type TechName = keyof typeof TECH_COLORS;

export type Tag = {
    name: TechName;
    color: string;
};

export type PortfolioEntry = {
    name: string;
    /** Text of the badge next to the name. */
    badge: "Trabalho" | "Projeto";
    /** Cover image URL. */
    cover: string;
    /** Image URL shown when the cover is hovered. */
    coverHover: string;
    description: string;
    /** Free text such as "março de 2026 – outubro de 2026". */
    period: string;
    githubUrl: string;
    siteUrl: string;
    /** Full class of the card glow, e.g. "reveal-highlight-blue-500". Never build it from a color name, or Tailwind will not generate it. */
    highlight?: string;
    tags: Tag[];
};

export type Experience = PortfolioEntry & {
    /** Job title. */
    role: string;
    recommendationLetterUrl: string;
};

export type Project = PortfolioEntry & {
    /** Shown on the home page; the rest only on the full projects list. */
    featured: boolean;
};

function tags(...names: TechName[]): Tag[] {
    return names.map((name) => ({ name, color: TECH_COLORS[name] }));
}

export const EXPERIENCES: Experience[] = [
    {
        name: "EVEN7",
        badge: "Trabalho",
        role: "Desenvolvedor front-end Júnior",
        cover: even7Cover,
        coverHover: even7CoverHover,
        description:
            "Ajudou no desenvolvimento de uma plataforma whitelabel de capitalização digital (títulos, sorteios e jogos instantâneos), painéis, jogos interativos (raspadinha, roleta e slot machine) e loja virtual.",
        period: "",
        githubUrl: "",
        siteUrl: "https://even7.com.br",
        recommendationLetterUrl: recommendationLetter,
        highlight: "reveal-highlight-yellow-500/80",
        tags: tags(
            "Vue",
            "React",
            "React Admin",
            "Material UI",
            "TypeScript",
            "Tailwind CSS",
            "Fastify",
            "MongoDB",
            "Redis",
            "Docker"
        )
    }
];

export const PROJECTS: Project[] = [
    {
        name: "CHT Template",
        badge: "Projeto",
        featured: true,
        cover: chtCover,
        coverHover: chtCoverHover,
        description:
            "Base de desenvolvimento para aplicações web com frontend e backend, em quatro repositórios: cht-main (workspace e build), cht-base (núcleo e documentação), cht-design-system (componentes) e cht-shared (tipos compartilhados).",
        period: "",
        githubUrl: "https://github.com/celiy/cht-main",
        siteUrl: "https://cht-dev.netlify.app",
        highlight: "reveal-highlight-blue-500/80",
        tags: tags("TypeScript", "Vue", "Tailwind CSS", "Python", "Electron", "Vite")
    },
    {
        name: "Mecarvit",
        badge: "Projeto",
        featured: true,
        cover: mecarvitCover,
        coverHover: mecarvitCoverHover,
        description:
            "<b>Projeto de TCC:</b> sistema full-stack de gestão, desktop e web, para oficinas mecânicas de pequeno porte (clientes, veículos, ordens de serviço, pagamentos, financeiro e painel de gestão).",
        period: "",
        githubUrl: "https://github.com/celiy/cht-client-mecarvit",
        siteUrl: "",
        highlight: "reveal-highlight-blue-500/80",
        tags: tags("TypeScript", "Vue", "Tailwind CSS", "ExpressJS", "SQLite", "Drizzle")
    },
    {
        name: "Pasgo",
        badge: "Projeto",
        featured: true,
        cover: pasgoCover,
        coverHover: pasgoCoverHover,
        description:
            "<b>Projeto pessoal:</b> sistema full-stack de ERP para micro e pequenas empresas (funcionários, clientes, estoque, vendas, financeiro, ordens de serviço e relatórios). Deploy feito com NGINX.",
        period: "",
        githubUrl: "https://github.com/celiy/Pasgo-public",
        siteUrl: "https://pasgo.com.br",
        highlight: "reveal-highlight-white/80",
        tags: tags(
            "JavaScript",
            "Tailwind CSS",
            "React",
            "Shadcn",
            "Vue",
            "Naive UI",
            "ExpressJS",
            "MongoDB"
        )
    },
    {
        name: "API REST",
        badge: "Projeto",
        featured: false,
        cover: "",
        coverHover: "",
        description: "Trabalho da faculdade de uma API REST.",
        period: "",
        githubUrl: "https://github.com/celiy/Desenvolvimento-API-REST_Laravel",
        siteUrl: "",
        tags: tags("PHP", "Laravel", "Blade", "SQLite")
    },
    {
        name: "Contracheque Online",
        badge: "Projeto",
        featured: false,
        cover: "",
        coverHover: "",
        description: "Sistema de contracheque online.",
        period: "",
        githubUrl: "https://github.com/celiy/SistemaDeContrachequesOnline",
        siteUrl: "",
        tags: tags("PHP", "JavaScript")
    },
    {
        name: "Flutter Todo App",
        badge: "Projeto",
        featured: false,
        cover: "",
        coverHover: "",
        description: "App de lista de tarefas.",
        period: "",
        githubUrl: "https://github.com/celiy/Flutter-todo-app",
        siteUrl: "",
        tags: tags("Dart", "Flutter", "PostgreSQL")
    }
];

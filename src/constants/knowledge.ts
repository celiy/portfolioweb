/**
 * The knowledge module
 * This module is responsible for the technologies shown in the knowledge section of the portfolio of the project.
 */

import reactAdminIcon from "../assets/react-admin.svg";

export type KnowledgeCategory = "languages" | "technologies" | "databases";

export type Knowledge = {
    /** Name shown in the tooltip. */
    name: string;
    image: string;
    /** Brand color. */
    color: string;
    /** Name of the matching project tag, when it differs from `name`. */
    tag?: string;
    category: KnowledgeCategory;
};

/** Options of the title that filters the knowledge list. */
export const KNOWLEDGE_FILTERS = [
    { value: "all", label: "Todos" },
    { value: "languages", label: "Linguagens" },
    { value: "technologies", label: "Tecnologias" },
    { value: "databases", label: "Banco de dados" }
];

export const KNOWLEDGE: Knowledge[] = [
    {
        name: "HTML5",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        color: "#E34F26",
        category: "languages"
    },
    {
        name: "CSS3",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        color: "#1572B6",
        category: "languages"
    },
    {
        name: "Sass",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
        color: "#CC6699",
        category: "languages"
    },
    {
        name: "JavaScript",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        color: "#F7DF1E",
        category: "languages"
    },
    {
        name: "TypeScript",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        color: "#3178C6",
        category: "languages"
    },
    {
        name: "Dart",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
        color: "#0175C2",
        category: "languages"
    },
    {
        name: "PHP",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        color: "#777BB4",
        category: "languages"
    },
    {
        name: "Flutter",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
        color: "#02569B",
        category: "technologies"
    },
    {
        name: "C",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        color: "#00599C",
        category: "languages"
    },
    {
        name: "Python",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        color: "#3776AB",
        category: "languages"
    },
    {
        name: "Java",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        color: "#ED8B00",
        category: "languages"
    },
    {
        name: "Tailwind CSS",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        color: "#06B6D4",
        category: "technologies"
    },
    {
        name: "Node.js",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "#339933",
        category: "technologies"
    },
    {
        name: "Express",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "#888888",
        tag: "ExpressJS",
        category: "technologies"
    },
    {
        name: "Fastify",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastify/fastify-original.svg",
        color: "#888888",
        category: "technologies"
    },
    {
        name: "Vue.js",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
        color: "#4FC08D",
        tag: "Vue",
        category: "technologies"
    },
    {
        name: "React",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "#61DAFB",
        category: "technologies"
    },
    {
        name: "React Admin",
        image: reactAdminIcon,
        color: "#F50057",
        category: "technologies"
    },
    {
        name: "Material UI",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
        color: "#007FFF",
        category: "technologies"
    },
    {
        name: "Laravel",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
        color: "#FF2D20",
        category: "technologies"
    },
    {
        name: "Electron",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg",
        color: "#47848F",
        category: "technologies"
    },
    {
        name: "Docker",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        color: "#2496ED",
        category: "technologies"
    },
    {
        name: "Nginx",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
        color: "#009639",
        category: "technologies"
    },
    {
        name: "Git",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        color: "#F05032",
        category: "technologies"
    },
    {
        name: "PostgreSQL",
        image: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/postgresql.png",
        color: "#336791",
        category: "databases"
    },
    {
        name: "MongoDB",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "#47A248",
        category: "databases"
    },
    {
        name: "MySQL",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        color: "#4479A1",
        category: "databases"
    },
    {
        name: "SQLite",
        image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
        color: "#0F80CC",
        category: "databases"
    }
];

import type { RouteRecordRaw } from "vue-router";

import AboutPage from "./pages/about.vue";
import ContactPage from "./pages/contact.vue";
import IndexPage from "./pages/index.vue";
import ProjectsPage from "./pages/projects.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "index",
        component: IndexPage
    },
    {
        path: "/projects",
        name: "projects",
        component: ProjectsPage
    },
    {
        path: "/about",
        name: "about",
        component: AboutPage
    },
    {
        path: "/contact",
        name: "contact",
        component: ContactPage
    }
];

export default routes;

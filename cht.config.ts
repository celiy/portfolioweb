const colors = {
    colors: {
        primary: "oklch(0.6846 0.2042 24.28)"
    }
};

export default {
    name: "portfolioweb",
    siteTitle: "Portfolioweb",
    theme: {
        default: "dark",
        radius: "xl",
        themes: {
            dark: { ...colors },
            light: { ...colors }
        }
    },
    devTools: true
};

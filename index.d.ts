declare module "*.scss" {
  const content: string
  export = content
}

// dom custom event
interface CustomEventMap {
  nav: CustomEvent<{ url: FullSlug }>
  // themechange: CustomEvent<{ theme: "dark" | "light" }>
  themechange: CustomEvent<{ theme: "dark" }>
}

declare const fetchData: Promise<ContentIndex>

import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "🏜️ XuFei Wiki",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://xuf-95.github.io/xufei-wiki/",
    ignorePatterns: ["private", "templates", ".obsidian", "docs"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f9f9f9",          // 柔和的白色，作为主背景色，保持简洁大气
          lightgray: "#e0e0e0",      // 浅灰色，用于卡片、面板或边界区域的背景
          gray: "#a5a5a5",           // 中灰色，适合作为次要文本、图标或边框
          darkgray: "#5f5f5f",       // 深灰色，用于次要文本或图标的颜色，增强可读性
          dark: "#1e1e1e",           // 深黑灰色，适合作为主文本颜色，提供强烈对比度
          secondary: "#FF7F50",      // 珊瑚橙，作为次要高亮色，与黑色模式中的橙色调和谐
          tertiary: "#FFD700",       // 金黄色，保持与黑色模式一致，用于次要按钮或装饰元素
          highlight: "rgba(255, 165, 0, 0.15)",  // 透明橙黄色高亮，与深色模式一致，用于背景或高亮提示框
          textHighlight: "#FFA500",  // 明亮橙黄色高亮文本颜色，与黑色背景中的文本高亮相协调
        },
        darkMode: {
          light: "#0f0f10",          // 比较深的黑色，减少纯黑的硬度，适合作为主背景色
          lightgray: "#2c2c2e",      // 深灰色，适合卡片背景或分割区域
          gray: "#5a5a5c",           // 中灰色，适合边框、次要文本或图标
          darkgray: "#c8c8ca",       // 亮灰色，适合作为次要文本、提示信息
          dark: "#f0f0f1",           // 非常浅的灰色接近白色，作为主要文本颜色，提高可读性
          secondary: "#FFA500",      // 橙黄色，作为高亮色，用于CTA按钮、链接或重要提示信息
          tertiary: "#FFD700",       // 金黄色，作为次级强调色，用于装饰元素或高优先级提示
          highlight: "rgba(255, 165, 0, 0.15)", // 透明橙黄色，用于背景高亮，突出某些选中状态
          textHighlight: "#FFB347"   // 柔和的黄橙色，用于文本高亮，增强视觉引导效果
        },
        // lightMode: {
        //   light: "#faf8f8",
        //   lightgray: "#e5e5e5",
        //   gray: "#b8b8b8",
        //   darkgray: "#4e4e4e",
        //   dark: "#2b2b2b",
        //   secondary: "#284b63",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#fff23688",
        // },
        // darkMode: {
        //   light: "#161618",
        //   lightgray: "#393639",
        //   gray: "#646464",
        //   darkgray: "#d4d4d4",
        //   dark: "#ebebec",
        //   secondary: "#7b97aa",
        //   tertiary: "#84a59d",
        //   highlight: "rgba(143, 159, 169, 0.15)",
        //   textHighlight: "#b3aa0288",
        // },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config

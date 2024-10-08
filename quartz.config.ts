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
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          background: "#0D0D0D",       // 深黑色背景，确保整体风格沉稳
          light: "#1C1C1C",            // 较浅的黑色，用于局部卡片或面板背景
          lightgray: "#2E2E2E",         // 深灰色，适合边框或分隔线
          gray: "#5C5C5C",              // 灰色，用于次要文本或说明信息
          darkgray: "#CCCCCC",          // 浅灰色，作为次要文本或标题颜色
          primaryText: "#F5F5F5",       // 接近白色的浅色，确保主文本清晰可读
          secondaryText: "#FFD700",     // 金黄色，用于强调文字或链接高亮
          accent: "#FF8C00",            // 深橙色，作为主要强调色，用于按钮、CTA
          highlight: "rgba(255, 165, 0, 0.2)",  // 带透明度的橙色，用于背景高亮或选中状态
          highlightText: "#FFA500",     // 亮橙色，用于文字高亮或特别重要的信息
          warning: "#FFCC00",           // 明黄色，用于警告或提示信息
          success: "#32CD32",           // 亮绿色，代表成功操作
          error: "#FF4500",             // 红橙色，用于错误提示信息
          link: "#FFA07A",              // 浅橙色，用作链接颜色，轻松吸引眼球
        },
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

import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */


const config: QuartzConfig = {

  configuration: {
    pageTitle: "xufei.wiki",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://xuf-95.github.io/xufei-wiki/",
    ignorePatterns: ["private",  "**/templates/", ".obsidian", "docs"],
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
          light: "#10183A",          // 比较深的黑色，减少纯黑的硬度，适合作为主背景色 #14141D #10183A(best VICTOR)
          lightgray: "#204491",      // 搜索框；代码框线（``）；文本分割线；graph 图框；#3e5073
          // gray: "#5a5a5c",           // 中灰色，适合边框、次要文本或图标
          gray: "#3f72af",           // 时间 阅读时间；
          darkgray: "#c8c8ca",       // 亮灰色，适合作为次要文本（文本内容）、提示信息
          dark: "#c8c8ca",              // 文件；目录；加粗文本；链接图标；
          secondary: "#dbe2ef",      // 博客标题；文件夹；  -> 橙黄色，作为高亮色，用于CTA按钮、链接或重要提示信息
          tertiary: "#FF0",       // graphy 图中节点颜色；金黄色，作为次级强调色（悬浮高亮颜色），用于装饰元素或高优先级提示
          highlight: "",     // 标签和Page页路由背景色，透明橙黄色，用于背景高亮，突出某些选中状态 325b8c
          // highlight: 'rgba(143, 159, 169, 0.15)',
          textHighlight: "#ffbe00"   // 柔和的黄橙色，用于文本高亮，增强视觉引导效果#F5C0C0 
        },
        darkMode: {
          light: "#10183A",          // 比较深的黑色，减少纯黑的硬度，适合作为主背景色 #14141D #10183A(best VICTOR)
          lightgray: "#204491",      // 搜索框；代码框线（``）；文本分割线；graph 图框；#3e5073
          // gray: "#5a5a5c",           // 中灰色，适合边框、次要文本或图标
          gray: "#3f72af",           // 时间 阅读时间；
          darkgray: "#c8c8ca",       // 亮灰色，适合作为次要文本（文本内容）、提示信息
          dark: "#c8c8ca",              // 文件；目录；加粗文本；链接图标；
          secondary: "#dbe2ef",      // 博客标题；文件夹；  -> 橙黄色，作为高亮色，用于CTA按钮、链接或重要提示信息
          tertiary: "#FF0",       // graphy 图中节点颜色；金黄色，作为次级强调色（悬浮高亮颜色），用于装饰元素或高优先级提示
          highlight: "",     // 标签和Page页路由背景色，透明橙黄色，用于背景高亮，突出某些选中状态 325b8c
          // highlight: 'rgba(143, 159, 169, 0.15)',
          textHighlight: "#ffbe00"   // 柔和的黄橙色，用于文本高亮，增强视觉引导效果#F5C0C0 
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem", "git"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.RoamFlavoredMarkdown(),
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

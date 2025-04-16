import { link } from "node:fs"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"


// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
  //  Component.LinksHeader(),
  ],
  afterBody: [ 
  ],
  footer: Component.Footer({
    links: {
      "Home": "https://xufei.biz",
      "Tags": "https://xuf-95.github.io/xufei-wiki/tags/",
      "GitHub": "https://github.com/xuf-95",
      "xufei.site": "https://xufei.site",
      "Bento.me": "https://bento.me/xfei",
    },
    
  }),
  
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    // Component.ContentMeta({ showReadingTime: true }),
    // Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    // Component.DesktopOnly(Component.Explorer()),
    // Component.PageTitle(),
    // Component.MobileOnly(Component.Spacer()),
    // Component.Search(),
    // // Component.Darkmode(),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Writing",
        limit: 4,
        filter: (f) =>
          f.slug!.startsWith("bigdata/") && f.slug! !== "bigdata/index" && !f.frontmatter?.noindex,
        linkToMore: "bigdata/" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recent Notes",
        limit: 2,
        filter: (f) => f.slug!.startsWith("thoughts/"),
        linkToMore: "thoughts/" as SimpleSlug,
      }),
    ),
    Component.DesktopOnly(Component.TableOfContents()),

  ],
  right: [
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.Graph({
      localGraph: {
        showTags: false,
      },
      globalGraph: {
        showTags: false,
      },
    }),
    Component.Backlinks(),
    // Component.DesktopOnly(Component.TableOfContents()),
    // Component.ArticleTitle(),
    // Component.ContentMeta({ showReadingTime: true }),
    // Component.Breadcrumbs(),
    // Component.TagList(),
    // Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [ Component.ArticleTitle(), Component.ContentMeta()],//Component.Breadcrumbs(),
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    // Component.DesktopOnly(Component.Explorer()),
    Component.MobileOnly(Component.Spacer()),
  ],
  right: [
  ],
}

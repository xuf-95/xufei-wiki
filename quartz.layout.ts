import { link } from "node:fs"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"


// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
   Component.LinksHeader(),
  ],
  afterBody: [ 
    // Component.LinksHeader(),
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
    // Component.Breadcrumbs(),
    // Component.ArticleTitle(),
    // Component.ContentMeta({ showReadingTime: true }),
    // Component.TagList(),
  ],
  left: [
    // Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.Search(),
    // Component.Darkmode(),
    // Component.RecentNotes({ showTags: false, title: "Recently Notes", showDates: false,}),
    // Component.DesktopOnly(Component.Explorer()),

    Component.Search(),
    Component.ArticleTitle(),
    // Component.ContentMeta({ showReadingTime: true }),
    Component.Breadcrumbs(),
    Component.TagList(),
    // Component.Graph(),
    // Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    // Component.RecentNotes({ showTags: false, title: "Recently Notes", showDates: false,}),


  ],
  right: [
    // Component.Search(),
    // Component.ArticleTitle(),
    // Component.Breadcrumbs(),
    // Component.TagList(),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    // Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [  ],// Component.ArticleTitle(),Component.Breadcrumbs(), Component.ContentMeta()
  left: [
    // Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    // Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}

import { QuartzComponentConstructor, QuartzComponentProps } from "./types"


function HeaderItems({}: QuartzComponentProps) {
  return (
    <div className="header-items">
      <a href="/tags" className="tag-link">标签</a>
    </div>
  )
}

HeaderItems.css = `
.header-items {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tag-link {
  padding: 0.5rem;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #333;
  text-decoration: none;
}

.tag-link:hover {
  background-color: #e0e0e0;
}
`

export default (() => HeaderItems) satisfies QuartzComponentConstructor
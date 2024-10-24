import React from 'react'
import { QuartzComponentProps, QuartzComponent } from './types'


interface TwoColumnLayoutProps extends QuartzComponentProps {
    imageSrc: string
    imageAlt: string
    // 修改 children 的类型定义
    children: (QuartzComponent | JSX.Element)[]
}
  
export default function TwoColumnLayout({ imageSrc, imageAlt, children }: TwoColumnLayoutProps) {
  return (
    <div className="two-column-layout">
      <div className="image-column">
        <img src={imageSrc} alt={imageAlt} />
      </div>
      <div className="text-column">
        {children}
      </div>
    </div>
  )
}

TwoColumnLayout.css = `
.two-column-layout {
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
}

.image-column {
  flex: 1;
}

.image-column img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.text-column {
  flex: 1;
}

@media (max-width: 768px) {
  .two-column-layout {
    flex-direction: column;
  }
}
`
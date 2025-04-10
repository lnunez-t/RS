// app/layout.tsx
import './globals.css'
import React from 'react'
import Layout from './components/Layout' // ajuste le chemin si besoin
import BestsellerSection from './components/BestsellerSection'
import EngagementsSection from './components/EngagementsSection'
import CollectionsSection from './components/CollectionsSection'

export const metadata = {
  title: 'Restrospective Studio',
  description: 'Upcycling et créations responsables',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Layout>
          {children}
        </Layout>
        <BestsellerSection>
            {children}
        </BestsellerSection>
        <EngagementsSection>
            {children}
        </EngagementsSection>
        <CollectionsSection>
            {children}
        </CollectionsSection>
      </body>
    </html>
  )
}

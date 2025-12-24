'use client'
import { Navbar, Welcome, Dock } from '@/app/components'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  )
}

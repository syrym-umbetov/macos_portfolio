'use client'
import { Navbar, Welcome, Dock, Desktop } from '@/app/components'
import gsap from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  ImageFile,
  Contact,
  Photos,
} from '@/app/windows'

gsap.registerPlugin(Draggable)
export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <ImageFile />
      <Contact />
      <Photos />
      <Desktop />
    </main>
  )
}

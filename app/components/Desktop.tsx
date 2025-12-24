import { locations } from '@/constants'
import clsx from 'clsx'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/dist/Draggable'
import useWindowStore from '@/app/store/windows'
import useLocationStore, { type FileItem } from '@/app/store/location'

const projects = locations.work.children ?? []

const Desktop = () => {
  const { setActiveLocation } = useLocationStore()
  const { openWindow } = useWindowStore()

  const handleOpenProjectFinder = (project: FileItem) => {
    setActiveLocation(project as any)
    openWindow('finder')
  }

  useGSAP(() => {
    Draggable.create('.folder')
  }, [])
  return (
    <section id='home'>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx('group folder', project.windowPosition)}
            onClick={() => handleOpenProjectFinder(project)}
          >
            <img src='/images/folder.png' alt={project.name} />
            <p>{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Desktop

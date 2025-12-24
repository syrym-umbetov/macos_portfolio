'use client'

import { WindowControls } from '@/app/components'
import { Search } from 'lucide-react'
import WindowWrapper from '@/app/hoc/WindowWrapper'
import { locations } from '@/constants'
import useLocationStore, {
  type Location,
  type FileItem,
} from '@/app/store/location'
import clsx from 'clsx'
import useWindowStore, { type WindowKey } from '@/app/store/windows'

const Finder = () => {
  const { openWindow } = useWindowStore()
  const { activeLocation, setActiveLocation } = useLocationStore()

  const openItem = (item: FileItem) => {
    if (item.fileType === 'pdf') return openWindow('resume')
    if (item.kind === 'folder') return setActiveLocation(item as any)
    if (['fig', 'url'].includes(item.fileType || '') && item.href)
      return window.open(item.href, '_blank')

    // Map fileType to window key
    const windowKey = item.fileType === 'txt' ? 'txtfile' : item.fileType === 'img' ? 'imgfile' : null
    if (windowKey) {
      openWindow(windowKey as WindowKey, item)
    }
  }

  const renderList = (name: string, items: (Location | FileItem)[]) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item as Location)}
            className={clsx(
              item.id === activeLocation.id ? 'active' : 'not-active'
            )}
          >
            <img src={item.icon} className='w-4' alt={item.name} />
            <p className='text-sm font-medium truncate'>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <div id='window-header'>
        <WindowControls target='finder' />
        <Search className='icon' />
      </div>

      <div className='bg-white flex h-full'>
        <div className='sidebar'>
          {renderList('Favourites', Object.values(locations))}
          {renderList('Work', locations.work.children)}
        </div>
        <ul className='content'>
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const FinderWindow = WindowWrapper(Finder, 'finder')

export default FinderWindow

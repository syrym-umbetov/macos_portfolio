'use client'

import WindowWrapper from '@/app/hoc/WindowWrapper'
import { WindowControls } from '@/app/components'
import { photosLinks } from '@/constants'
import useWindowStore, { type WindowKey } from '@/app/store/windows'
import { useState } from 'react'
import clsx from 'clsx'
import { Grid3X3, LayoutGrid } from 'lucide-react'

// Gallery data organized by category
const galleryData: Record<string, { id: number; name: string; img: string }[]> = {
  Library: [
    { id: 1, name: 'project-1.png', img: '/images/project-1.png' },
    { id: 2, name: 'project-2.png', img: '/images/project-2.png' },
    { id: 3, name: 'project-3.png', img: '/images/project-3.png' },
    { id: 4, name: 'gal1.png', img: '/images/gal1.png' },
    { id: 5, name: 'gal2.png', img: '/images/gal2.png' },
    { id: 6, name: 'gal3.png', img: '/images/gal3.png' },
    { id: 7, name: 'gal4.png', img: '/images/gal4.png' },
  ],
  Memories: [
    { id: 1, name: 'blog1.png', img: '/images/blog1.png' },
    { id: 2, name: 'blog2.png', img: '/images/blog2.png' },
    { id: 3, name: 'blog3.png', img: '/images/blog3.png' },
  ],
  Places: [
    { id: 1, name: 'gal1.png', img: '/images/gal1.png' },
    { id: 2, name: 'gal2.png', img: '/images/gal2.png' },
  ],
  People: [
    { id: 1, name: 'adrian.jpg', img: '/images/adrian.jpg' },
    { id: 2, name: 'adrian-2.jpg', img: '/images/adrian-2.jpg' },
    { id: 3, name: 'adrian-3.jpeg', img: '/images/adrian-3.jpeg' },
  ],
  Favorites: [
    { id: 1, name: 'project-1.png', img: '/images/project-1.png' },
    { id: 2, name: 'gal1.png', img: '/images/gal1.png' },
    { id: 3, name: 'gal3.png', img: '/images/gal3.png' },
  ],
}

const Photos = () => {
  const { openWindow } = useWindowStore()
  const [activeTab, setActiveTab] = useState('Library')
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid')

  const currentGallery = galleryData[activeTab] || []

  const openImage = (item: { name: string; img: string }) => {
    openWindow('imgfile' as WindowKey, {
      id: 0,
      name: item.name,
      icon: '/images/image.png',
      kind: 'file',
      fileType: 'img',
      imageUrl: item.img,
    })
  }

  return (
    <>
      {/* Header with toolbar */}
      <div id='window-header'>
        <WindowControls target='photos' />
        <div className='toolbar'>
          <button
            onClick={() => setViewMode('grid')}
            className={clsx('icon', viewMode === 'grid' && 'active')}
          >
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={() => setViewMode('large')}
            className={clsx('icon', viewMode === 'large' && 'active')}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      <div className='flex h-full bg-white'>
        {/* Sidebar */}
        <div className='sidebar'>
          <h3>Library</h3>
          <ul>
            {photosLinks.map((link) => (
              <li
                key={link.id}
                onClick={() => setActiveTab(link.title)}
                className={clsx(
                  activeTab === link.title ? 'active' : 'not-active'
                )}
              >
                <img src={link.icon} className='w-4' alt={link.title} />
                <p className='text-sm font-medium truncate'>{link.title}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Content - Grid of images like Finder */}
        <div className={clsx('content', viewMode === 'large' && 'large-view')}>
          {currentGallery.map((item) => (
            <div
              key={item.id}
              className='photo-item'
              onClick={() => openImage(item)}
            >
              <div className='photo-preview'>
                <img src={item.img} alt={item.name} />
              </div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const PhotosWindow = WindowWrapper(Photos, 'photos')
export default PhotosWindow

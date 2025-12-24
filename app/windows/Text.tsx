'use client'

import WindowWrapper from '@/app/hoc/WindowWrapper'
import { WindowControls } from '@/app/components'
import useWindowStore, { type FileData } from '@/app/store/windows'
import Image from 'next/image'
import clsx from 'clsx'

const Text = () => {
  const { windows } = useWindowStore()
  const data: FileData | null = windows.txtfile.data

  const name = data?.name
  const image = data?.image
  const subtitle = data?.subtitle
  const description = data?.description

  return (
    <>
      <div id='window-header'>
        <WindowControls target='txtfile' />
        <h2>{name || 'Text File'}</h2>
        <div />
      </div>

      <div className='bg-white p-8 overflow-auto max-h-[70vh] max-w-2xl'>
        {/* Optional Image */}
        {image && (
          <div className='mb-6 flex justify-center'>
            <div className='relative w-32 h-32 rounded-lg overflow-hidden'>
              <Image
                src={image}
                alt={name || 'File image'}
                fill
                className='object-cover'
              />
            </div>
          </div>
        )}

        {/* File Name as Title */}
        {name && <h1 className='text-2xl font-bold text-gray-900 mb-2'>{name}</h1>}

        {/* Optional Subtitle */}
        {subtitle && (
          <p className='text-sm text-gray-500 mb-6 italic'>{subtitle}</p>
        )}

        {/* Description Paragraphs */}
        {description && Array.isArray(description) && description.length > 0 ? (
          <div className='space-y-4'>
            {description.map((paragraph, index) => (
              <p
                key={index}
                className={clsx(
                  'text-gray-700 leading-relaxed',
                  index === 0 && 'text-lg'
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className='text-gray-400 italic'>No content available</p>
        )}
      </div>
    </>
  )
}

const TextWindow = WindowWrapper(Text, 'txtfile')
export default TextWindow

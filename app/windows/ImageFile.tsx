'use client'

import WindowWrapper from '@/app/hoc/WindowWrapper'
import { WindowControls } from '@/app/components'
import useWindowStore, { type FileData } from '@/app/store/windows'
import Image from 'next/image'

const ImageFile = () => {
  const { windows } = useWindowStore()
  const data: FileData | null = windows.imgfile.data

  const name = data?.name
  const imageUrl = data?.imageUrl

  return (
    <>
      <div id='window-header'>
        <WindowControls target='imgfile' />
        <p className='font-bold text-[#5f6266]'>{name || 'Image'}</p>
      </div>

      <div className='preview'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name || 'Image'}
            width={800}
            height={600}
            className='w-full h-fit object-contain object-center'
            priority
          />
        ) : (
          <div className='p-10 text-center text-gray-400'>
            No image available
          </div>
        )}
      </div>
    </>
  )
}

const ImageFileWindow = WindowWrapper(ImageFile, 'imgfile')
export default ImageFileWindow

import useWindowStore, { type WindowKey } from '@/app/store/windows'
import { useRef, type ComponentType } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'

interface WindowWrapperProps {
  [key: string]: any
}

const WindowWrapper = <P extends WindowWrapperProps>(
  Component: ComponentType<P>,
  windowKey: WindowKey
) => {
  const Wrapped = (props: P) => {
    const { focusWindow, windows } = useWindowStore()
    const { isOpen, zIndex } = windows[windowKey]
    const ref = useRef<HTMLElement>(null)

    useGSAP(() => {
      const el = ref.current
      if (!el) return

      if (isOpen) {
        // Animate in
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        )
      }
    }, [isOpen])

    useGSAP(() => {
      const el = ref.current
      if (!el) return

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      })

      return () => instance.kill()
    }, [])

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          display: isOpen ? 'block' : 'none',
        }}
        className='absolute'
      >
        <Component {...props} />
      </section>
    )
  }

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`

  return Wrapped
}

export default WindowWrapper

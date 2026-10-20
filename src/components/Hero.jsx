import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils'
import { useSyncExternalStore } from 'react'

const desktopQuery = '(min-width: 760px)'

const subscribe = (callback) => {
    const mql = window.matchMedia(desktopQuery)
    mql.addEventListener('change', callback)
    return () => mql.removeEventListener('change', callback)
}

const getSnapshot = () => window.matchMedia(desktopQuery).matches

export default function Hero() {

    // large screens get the full-size video, small screens the lighter one
    const isDesktop = useSyncExternalStore(subscribe, getSnapshot, () => true)
    const videoSrc = isDesktop ? heroVideo : smallHeroVideo

    useGSAP(() => {
        gsap.to('#hero', { opacity: 1, delay: 2 })
        gsap.to('#cta', { opacity: 1, y: -50, delay: 2 })
    }, [])

  return (
    <section className="w-full nav-height bg-black relative">
        <div className="h-5/6 w-full flex-center flex-col">
            <p id="hero" className="hero-title">iPhone 15 Pro</p>
        </div>
        <div className="md:w-10/12 w-9/12">
            <video
              className="pointer-events-none"
              autoPlay
              muted
              playsInline
              aria-hidden="true"
              key={videoSrc}
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
        <div
          id="cta"
          className="flex flex-col items-center opacity-0 translate-y-20"
        >
            <a href="#highlights" className='btn'>Buy</a>
            <p className="font-normal text-xl">From $19/month or $999</p>
        </div>
    </section>
  )
}

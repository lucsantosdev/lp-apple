import { useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoCarousel() {

  const containerRef = useRef(null)
  const videoRef = useRef([])
  const fillRef = useRef([])

  const [videoId, setVideoId] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLastVideo, setIsLastVideo] = useState(false)
  // becomes true once the carousel scrolls into view for the first time
  const [started, setStarted] = useState(false)

  const lastIndex = highlightsSlides.length - 1

  // slide the carousel and start playing when it enters the viewport
  useGSAP(() => {
    gsap.to('.slide', {
        overwrite: 'auto',
        xPercent: -100 * videoId,
        duration: 2,
        ease: 'power2.inOut',
    })
  }, { dependencies: [videoId], scope: containerRef })

  useGSAP(() => {
    ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
            setStarted(true)
            setIsPlaying(true)
        },
    })
  }, { scope: containerRef })

  // play only the current video
  useEffect(() => {
    videoRef.current.forEach((el, i) => {
        if(!el) return
        if(i === videoId && started && isPlaying && !isLastVideo) {
            el.play().catch(() => {})
        } else {
            el.pause()
        }
    })
  }, [videoId, started, isPlaying, isLastVideo])

  // progress bar of the active dot follows the video's current time
  useEffect(() => {
    const video = videoRef.current[videoId]
    const fill = fillRef.current[videoId]
    if(!video || !fill) return

    const update = () => {
        const duration = video.duration || highlightsSlides[videoId].videoDuration
        fill.style.width = `${Math.min(video.currentTime / duration, 1) * 100}%`
    }

    update()
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [videoId])

  const goTo = (i) => {
    const video = videoRef.current[i]
    if(video) video.currentTime = 0
    setVideoId(i)
    setIsLastVideo(false)
    setStarted(true)
    setIsPlaying(true)
  }

  const handleEnded = (i) => {
    if(i !== lastIndex) {
        goTo(i + 1)
    } else {
        setIsLastVideo(true)
        setIsPlaying(false)
    }
  }

  const handleControl = () => {
    if(isLastVideo) goTo(0)
    else setIsPlaying((prev) => !prev)
  }

  const controlLabel = isLastVideo ? "Replay" : isPlaying ? "Pause" : "Play"

  return (
    <div ref={containerRef}>
        <div className="flex items-center">
            {highlightsSlides.map((list, i) => (
                <div key={list.id} className="slide sm:pr-20 pr-10">
                    <div className="video-carousel_container">
                        <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                            <video
                              playsInline
                              preload="auto"
                              muted
                              aria-label={list.textLists.join(' ')}
                              className={`pointer-events-none ${list.id === 2 ? 'translate-x-44' : ''}`}
                              ref={(el) => (videoRef.current[i] = el)}
                              onEnded={() => handleEnded(i)}
                            >
                                <source src={list.video} type="video/mp4"/>
                            </video>
                        </div>
                        <div className="absolute top-12 left-[5%] z-10">
                            {list.textLists.map((text) => (
                                <p key={text} className="md:text-2xl text-xl font-medium">
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="relative flex-center mt-10">
            <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                {highlightsSlides.map((list, i) => {
                    const isActive = i === videoId && !isLastVideo
                    const isDone = i < videoId || (isLastVideo && i === videoId)
                    return (
                        <button
                          key={list.id}
                          type="button"
                          aria-label={`Go to slide ${i + 1}`}
                          aria-current={i === videoId}
                          onClick={() => goTo(i)}
                          className={`mx-2 h-3 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden transition-all duration-500 ${
                            isActive ? 'w-[10vw] min-[1200px]:w-[4vw]' : 'w-3'
                          }`}
                        >
                            <span
                              className="absolute left-0 top-0 h-full rounded-full"
                              ref={(el) => (fillRef.current[i] = el)}
                              style={{
                                backgroundColor: isActive ? 'white' : '#AFAFAF',
                                ...(isActive ? {} : { width: isDone ? '100%' : '0%' }),
                              }}
                            />
                        </button>
                    )
                })}
            </div>
            <button
              type="button"
              className="control-btn"
              aria-label={controlLabel}
              onClick={handleControl}
            >
                <img
                  src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                  alt=""
                />
            </button>
        </div>
    </div>
  )
}

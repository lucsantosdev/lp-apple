import { useGSAP } from "@gsap/react"
import ModelView from "./ModelView"
import { useEffect, useRef, useState } from "react"
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models, sizes } from "../constants"
import gsap from "gsap"
import { animateWithGsapTimeline } from "../utils/animations"

export default function Model() {

    const [size, setSize] = useState('small')

    const [model, setModel] = useState(models[0])

    // events of the shared canvas are listened on the app root
    const [eventSource] = useState(() => document.getElementById('root'))

    // camera control for the model view
    const cameraControlSmall = useRef()
    const cameraControlLarge = useRef()

    // model
    const small = useRef(new THREE.Group())
    const large = useRef(new THREE.Group())

    // last rotation (azimuth) of each model, kept between size changes
    const smallRotation = useRef(0)
    const largeRotation = useRef(0)

    useEffect(() => {
        const tl = gsap.timeline()

        if(size === 'large') {
            animateWithGsapTimeline(tl, small, smallRotation.current, '#view1', '#view2', {
                transform: 'translateX(-100%)',
                duration: 2
            })
        }
        if(size === 'small') {
            animateWithGsapTimeline(tl, large, largeRotation.current, '#view2', '#view1', {
                transform: 'translateX(0)',
                duration: 2
            })
        }

        return () => { tl.kill() }
    }, [size])

    useGSAP(() => {
        gsap.to("#heading", { y: 0, opacity: 1})
    }, [])

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">
                    Take a closer look.
                </h1>
                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">

                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={(angle) => { smallRotation.current = angle }}
                            item={model}
                        />

                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={(angle) => { largeRotation.current = angle }}
                            item={model}
                        />

                        <Canvas
                            className="w-full h-full"
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden',
                                pointerEvents: 'none'
                            }}
                            eventSource={eventSource}
                        >
                            <View.Port />
                        </Canvas>

                    </div>
                    <div className="mx-auto w-full">
                        <p className="text-sm font-light text-center mb-5">{model.title}</p>
                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item) => (
                                    <li key={item.id}>
                                        <button
                                          type="button"
                                          aria-label={item.title}
                                          aria-pressed={model.id === item.id}
                                          className="block w-6 h-6 rounded-full mx-2 cursor-pointer transition-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
                                          style={{
                                            backgroundColor: item.color[0],
                                            boxShadow: model.id === item.id ? '0 0 0 2px #000, 0 0 0 4px #fff' : 'none'
                                          }}
                                          onClick={() => setModel(item)}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className="size-btn-container" role="group" aria-label="Screen size">
                                {sizes.map(({ label, value }) => (
                                    <button
                                      type="button"
                                      key={label}
                                      aria-pressed={size === value}
                                      className="size-btn cursor-pointer"
                                      style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white' }}
                                      onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

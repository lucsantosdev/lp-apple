import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "./Lights";
import IPhone from "./IPhone";
import { Suspense } from "react";

export default function ModelView({ index, groupRef, gsapType, controlRef, setRotationState, item}) {
    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? '-right-full' : ''}`}
        >
            {/* --- Ambient Light --- */}
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />

            <Lights />

            <OrbitControls
              makeDefault
              ref={controlRef}
              enableZoom={false}
              enablePan={false}
              rotateSpeed={0.4}
              onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
            />

            <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 0]}>
                <Suspense fallback={null}>
                    <IPhone
                      scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                      item={item}
                    />
                </Suspense>
            </group>
        </View>
    )
}

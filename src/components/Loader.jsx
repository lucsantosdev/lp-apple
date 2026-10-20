import { useProgress } from '@react-three/drei'

// DOM overlay shown over the 3D viewer while the model and textures load
export default function Loader() {
  const { active, progress } = useProgress()

  if (!active && progress >= 100) return null

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none"
      role="status"
    >
        <div className="w-10 h-10 rounded-full border-2 border-gray-200 border-t-transparent animate-spin" />
        <p className="text-sm text-gray">{Math.round(progress)}%</p>
    </div>
  )
}

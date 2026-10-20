import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
        <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 border-t-transparent animate-spin" />
            <p className="text-sm text-gray whitespace-nowrap">{Math.round(progress)}%</p>
        </div>
    </Html>
  )
}

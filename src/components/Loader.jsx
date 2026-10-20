import { Html } from '@react-three/drei'

export default function Loader() {
  return (
    <Html center>
        <div className="flex flex-col items-center gap-3" role="status">
            <div className="w-10 h-10 rounded-full border-2 border-gray-200 border-t-transparent animate-spin" />
            <p className="text-sm text-gray whitespace-nowrap">Loading...</p>
        </div>
    </Html>
  )
}

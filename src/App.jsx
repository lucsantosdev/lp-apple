import { lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Footer from "./components/Footer"

// Three.js is heavy: load the 3D section in its own chunk
const Model = lazy(() => import("./components/Model"))

const App = () => {

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Suspense fallback={<section className="common-padding h-screen" aria-hidden="true" />}>
        <Model />
      </Suspense>
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App

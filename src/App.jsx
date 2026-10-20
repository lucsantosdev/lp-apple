import { lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Features from "./components/Features"
import HowItWorks from "./components/HowItWorks"
import Footer from "./components/Footer"
import ErrorBoundary from "./components/ErrorBoundary"

// Three.js is heavy: load the 3D section in its own chunk
const Model = lazy(() => import("./components/Model"))

const App = () => {

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <ErrorBoundary>
        <Suspense fallback={<section className="common-padding h-screen" aria-hidden="true" />}>
          <Model />
        </Suspense>
      </ErrorBoundary>
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

export default App

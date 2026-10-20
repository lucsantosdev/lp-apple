import { Component } from 'react'

// keeps a failure in the 3D scene (e.g. no WebGL) from taking down the whole page
export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="common-padding">
            <p className="text-center text-gray text-xl">
                The 3D preview isn&apos;t available on this device.
            </p>
        </section>
      )
    }

    return this.props.children
  }
}

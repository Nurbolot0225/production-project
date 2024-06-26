import { Component, type ErrorInfo, type ReactNode, Suspense } from 'react'

import { PageError } from 'widgets/PageError'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError (error: Error) {
        // Update state so the next render will show the fallback UI.
        console.log(error)
        return { hasError: true }
    }

    componentDidCatch (error: Error, info: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, info)
    }

    render () {
        const { children } = this.props
        const { hasError } = this.state

        if (hasError) {
            // You can render any custom fallback UI
            return (
                <Suspense fallback="">
                    <PageError />
                </Suspense>
            )
        }

        return children
    }
}

export default ErrorBoundary

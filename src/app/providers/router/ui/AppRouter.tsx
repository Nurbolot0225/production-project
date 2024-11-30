import { memo, Suspense, useCallback } from 'react'

import { RequireAuth } from 'app/providers/router/ui/RequireAuth'
import { Route, Routes } from 'react-router-dom'
import { type AppRouteProps, routeConfig } from 'shared/config/routerConifg/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            <Suspense fallback={<PageLoader/>}>
                {route.element}
            </Suspense>
        )

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly
                    ? <RequireAuth>{element}</RequireAuth>
                    : element
                }
            />
        )
    }, [])

    return (
        <Routes>
            {Object.values(routeConfig).map(renderWithWrapper)}
        </Routes>
    )
}

export default memo(AppRouter)

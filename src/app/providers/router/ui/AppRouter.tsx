import { memo, Suspense, useMemo } from 'react'

import { getUserAuthData } from 'entities/User'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routerConifg/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

const AppRouter = () => {
    const isAuthenticated = useSelector(getUserAuthData)

    const routes = useMemo(() => {
        return Object.values(routeConfig).filter((route) => {
            if (route.authOnly && !isAuthenticated) {
                return false
            }
            return true
        })
    }, [isAuthenticated])

    return (
        <Routes>
            {routes.map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <Suspense fallback={<PageLoader />}>
                            <div className="page-wrapper">
                                {element}
                            </div>
                        </Suspense>
                    )}
                />
            ))}
        </Routes>
    )
}

export default memo(AppRouter)

export function getQueryParams (queryParams: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search)
    Object.entries(queryParams).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value)
        }
    })
    return `?${searchParams.toString()}`
}

/**
 * Функция добавление параметров сткроки запроса в URL
 * @param queryParams
 */

export const addQueryParams = (queryParams: OptionalRecord<string, string>) => {
    window.history.pushState(null, '', getQueryParams(queryParams))
}

import { useMemo } from 'react'

import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { CreateSliceOptions, SliceCaseReducers } from '@reduxjs/toolkit/dist'
import { useDispatch } from 'react-redux'

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string
> (options: CreateSliceOptions<State, CaseReducers, Name>) {
    const slice = createSlice(options)

    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch()

        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch])
    }

    return {
        ...slice,
        useActions
    }
}

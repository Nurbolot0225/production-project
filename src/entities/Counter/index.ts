import { Counter } from 'entities/Counter/ui/Counter'

import { counterReducer } from './model/slice/counterSlice'
import type { CounterSchema } from './model/types/counterSchema'

export {
    type CounterSchema,
    counterReducer,
    Counter
}

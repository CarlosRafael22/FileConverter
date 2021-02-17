import { DispatchType, ReducerState } from '../reducer'
import { createContext } from 'react'
import { initialState, Action } from '../reducer'

export type ContextType = {
  state: ReducerState
  dispatch: DispatchType | ((action: Action) => void)
}

const ConverterContext = createContext({
  state: initialState,
  dispatch: (action: Action) => {
    console.log(action)
  },
})

export default ConverterContext

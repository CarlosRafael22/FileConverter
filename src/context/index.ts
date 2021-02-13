import { createContext } from 'react'
import { initialState } from '../reducer'

const ConverterContext = createContext(initialState)

export default ConverterContext

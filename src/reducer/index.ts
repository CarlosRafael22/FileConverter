import { useReducer } from 'React'
import * as actions from './actions'

export const initialState = {
  isUploading: false,
  uploadedSuccessfully: false,
  isChoosingFormat: false,
  isConvertingFile: false,
  convertedSuccessfully: false,
  allowDownloadRequest: false,
  progress: 0,
}

const reducer = (state: typeof initialState = initialState, action: Object) => {
  const { type, payload } = action
  switch (type) {
    case actions.UPLOAD_FILE:
      return { ...state, isUploading: true }
    case actions.HAS_UPLOADED_FILE:
      return {
        ...state,
        isUploading: false,
        uploadedSuccessfully: true,
        progress: 0,
      }
    case actions.CHOOSE_FORMAT:
      return { ...state, uploadedSuccessfully: false, isChoosingFormat: true }
    case actions.CONVERT_FILE:
      return {
        ...state,
        isChoosingFormat: false,
        isConvertingFile: true,
      }
    case actions.HAS_CONVERTED_FILE:
      return {
        ...state,
        isChoosingFormat: false,
        isConvertingFile: false,
        convertedSuccessfully: true,
        progress: 0,
      }
    case actions.ALLOW_DOWNLOAD_REQUEST:
      return {
        ...state,
        convertedSuccessfully: false,
        allowDownloadRequest: true,
      }
    case actions.UPDATE_PROGRESS:
      return {
        ...state,
        progress: payload,
      }
    default:
      return state
  }
}

export default reducer

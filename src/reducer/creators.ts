import * as actions from './actions'

export const uploadFile = () => ({ type: actions.UPLOAD_FILE })

export const hasUploadedFile = () => ({ type: actions.HAS_UPLOADED_FILE })

export const chooseFormat = () => ({ type: actions.CHOOSE_FORMAT })

export const convertFile = () => ({ type: actions.CONVERT_FILE })

export const hasConvertedFile = () => ({ type: actions.HAS_CONVERTED_FILE })

export const allowDownloadRequest = () => ({
  type: actions.ALLOW_DOWNLOAD_REQUEST,
})

export const updateProgress = (progress: number) => ({
  type: actions.UPDATE_PROGRESS,
  payload: progress,
})

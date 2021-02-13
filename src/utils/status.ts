import { initialState } from '../reducer'

const retrieveCurrentStatus = (state: typeof initialState) => {
  const {
    isUploading,
    uploadedSuccessfully,
    isChoosingFormat,
    isConvertingFile,
    convertedSuccessfully,
    allowDownloadRequest,
  } = state

  const shouldShowProgress =
    isUploading ||
    uploadedSuccessfully ||
    isConvertingFile ||
    convertedSuccessfully

  const shouldShowFileName =
    shouldShowProgress || isChoosingFormat || allowDownloadRequest

  const shouldShowSupportText = !shouldShowProgress && !allowDownloadRequest

  return [shouldShowProgress, shouldShowFileName, shouldShowSupportText]
}

export default retrieveCurrentStatus

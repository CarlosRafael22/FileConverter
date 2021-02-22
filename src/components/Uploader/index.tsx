import { useReducer, useEffect } from 'react'
import ConverterContext, { ContextType } from '../../context'
import { BackgroundStyle, DropArea, ActionArea } from './styles'
import ContentArea from '../ContentArea'
import ProgressArea from '../ProgressArea'
import ButtonGroup from '../ButtonGroup'
import Button from '../Button'
import reducer, { initialState } from '../../reducer'
import useDragAndDrop from '../../utils/useDragAndDrop'
import { uploadFiles, convertFiles } from '../../utils/filesHandler'
import * as actions from '../../reducer/creators'

const Uploader = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const uploadFilesAndShowProgress = (files: FileList) => {
    dispatch(actions.uploadFile())
    const updateProgress = (progress: number) => {
      dispatch(actions.updateProgress(progress))
    }
    uploadFiles(files, updateProgress)
  }

  const [dropAreaRef, isDraggingFile]: [
    React.RefObject<HTMLDivElement>,
    boolean
  ] = useDragAndDrop(uploadFilesAndShowProgress)

  useEffect(() => {
    if (state.isUploading && state.progress === 100) {
      dispatch(actions.hasUploadedFile())

      setTimeout(() => {
        dispatch(actions.updateProgress(0))
        dispatch(actions.chooseFormat())
      }, 2000)
    }

    if (state.isConvertingFile && state.progress === 100) {
      dispatch(actions.hasConvertedFile())

      setTimeout(() => {
        dispatch(actions.updateProgress(0))
        dispatch(actions.allowDownloadRequest())
      }, 2000)
    }
  })

  const chooseFileFormatToConvert = () => {
    dispatch(actions.convertFile())
    const updateProgress = (progress: number) => {
      dispatch(actions.updateProgress(progress))
    }
    convertFiles('asad', updateProgress)
  }

  const downloadFile = () => alert('Downloading')

  const renderProgressArea = () => {
    const getInfoText = () => {
      if (state.isUploading) return 'Uploading...'
      if (state.isConvertingFile) return 'Converting...'
      return undefined
    }

    return (
      <ProgressArea
        asContainer={true}
        infoText={getInfoText()}
        progress={state.progress}
      />
    )
  }

  const showProgressArea =
    state.isUploading ||
    state.uploadedSuccessfully ||
    state.isConvertingFile ||
    state.convertedSuccessfully
  const showChooseButtons = state.isChoosingFormat
  const showDownloadButton = state.allowDownloadRequest

  const context: ContextType = { state, dispatch }
  return (
    <ConverterContext.Provider value={context}>
      <BackgroundStyle>
        <DropArea ref={dropAreaRef}>
          <ContentArea />
        </DropArea>
        <ActionArea>
          {showProgressArea && renderProgressArea()}
          {showChooseButtons && (
            <ButtonGroup
              options={['STEP', 'STL', 'IGES']}
              onButtonPress={chooseFileFormatToConvert}
            />
          )}
          {showDownloadButton && (
            <Button text="Download" fullWidth onPress={downloadFile} />
          )}
        </ActionArea>
      </BackgroundStyle>
    </ConverterContext.Provider>
  )
}

export default Uploader

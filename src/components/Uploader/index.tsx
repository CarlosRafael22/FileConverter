import { useReducer, useEffect } from 'react'
import ConverterContext from '../../context'
import { BackgroundStyle, DropArea, ActionArea } from './styles'
import ContentArea from '../ContentArea'
import ProgressArea from '../ProgressArea'
import ButtonGroup from '../ButtonGroup'
import Button from '../Button'
import reducer, { initialState } from '../../reducer'
import useDragAndDrop from '../../utils/useDragAndDrop'
import { uploadFiles } from '../../utils/filesHandler'

const Uploader = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [dropAreaRef, isDraggingFile] = useDragAndDrop(uploadFiles)

  useEffect(() => {
    if (state.isUploading) {
      console.log('TA UPLOADING')
      clearInterval(firstAction)
      const firstAction = setTimeout(() => {
        dispatch({ type: 'has_uploaded_file' })
      }, 2000)

      const secondAction = setTimeout(() => {
        dispatch({ type: 'choose_format' })
      }, 4000)
    }

    if (state.isConvertingFile) {
      console.log('ta converting')
      const secondAction = setTimeout(() => {
        dispatch({ type: 'has_converted_file' })
      }, 2000)
    }

    if (state.convertedSuccessfully) {
      console.log('allow download')
      const secondAction = setTimeout(() => {
        dispatch({ type: 'allow_download_request' })
      }, 2000)
    }
  })

  const uploadFile = () => {
    console.log('STATE 1: ', state)
    dispatch({ type: 'upload_file' })
    console.log('STATE 2: ', state)
  }

  const chooseFileFormatToConvert = () => {
    console.log('ESCOLHEU')
    dispatch({ type: 'convert_file' })
  }

  const downloadFile = () => console.log('VAI BAIXAAAAR')

  const renderProgressArea = () => {
    const getInfoText = () => {
      if (state.isUploading) return 'Uploading...'
      if (state.isConvertingFile) return 'Converting...'
      return undefined
    }

    const finishedProgress =
      state.uploadedSuccessfully || state.convertedSuccessfully

    return (
      <ProgressArea
        asContainer={true}
        hasFinishedProgress={finishedProgress}
        infoText={getInfoText()}
        showButtons={false}
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

  console.log('STATE: ', state)
  console.log('O useDragAndDrop: ', dropAreaRef, isDraggingFile)
  return (
    <ConverterContext.Provider value={state}>
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

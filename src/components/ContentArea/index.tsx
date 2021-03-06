import { useContext, useRef } from 'react'
import ConverterContext from '../../context'
import { ContentAreaStyle, ArtWork, TitleStyle, SupportText } from './styles'
import retrieveCurrentStatus from '../../utils/status'
import { uploadFiles, INPUTNAME } from '../../utils/filesHandler'
import * as actions from '../../reducer/creators'

const ContentArea = () => {
  const { state, dispatch } = useContext(ConverterContext)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const uploadFilesAndShowProgress = (files: FileList) => {
    dispatch(actions.uploadFile())
    const updateProgress = (progress: number) => {
      dispatch(actions.updateProgress(progress))
    }
    uploadFiles(files, updateProgress)
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    uploadFilesAndShowProgress(event.target.files)
    formRef.current?.reset()
  }

  const onClickHandler = () => {
    fileRef.current?.click()
  }

  const [, shouldShowFileName, shouldShowSupportText] = retrieveCurrentStatus(state)
  const fileName = 'Red_drone.shapr'

  const titleText = shouldShowFileName
    ? fileName
    : 'Drop your .shapr file here, or browse'

  const supportText = state.isChoosingFormat
    ? 'Convert to'
    : 'Supports: .STEP, .STL, .IGES'

  return (
    <ContentAreaStyle>
      <form ref={formRef} onClick={onClickHandler}>
        <ArtWork>
          <img src={'/shapr3d.jpg'} width={80} height={80} />
        </ArtWork>
        <TitleStyle>{titleText}</TitleStyle>
        {shouldShowSupportText && (
          <SupportText
            isChoosingFormat={state.isChoosingFormat}
          >
            {supportText}
          </SupportText>
        )}
        <input
          name={INPUTNAME}
          onChange={onChangeHandler}
          ref={fileRef}
          type="file"
          style={{ display: 'none' }}
        />
      </form>
    </ContentAreaStyle>
  )
}

export default ContentArea

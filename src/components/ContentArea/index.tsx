import { useContext, useRef } from 'react'
import axios from 'axios'
import ConverterContext from '../../context'
import { ContentAreaStyle, ArtWork, TitleStyle, SupportText } from './styles'
import retrieveCurrentStatus from '../../utils/status'

const ContentArea = () => {
  const state = useContext(ConverterContext)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const sendData = async (formData) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        )
      },
    }

    const response = await axios.post('/api/server', formData, config)

    console.log('response', response.data)
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return
    }

    const formData = new FormData()

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file)
    })

    sendData(formData)

    // formRef.current?.reset()
  }

  const onClickHandler = () => {
    console.log('CLICOU')
    fileRef.current?.click()
  }

  const [
    shouldShowProgress,
    shouldShowFileName,
    shouldShowSupportText,
  ] = retrieveCurrentStatus(state)
  const fileName = 'Red_drone.shapr'

  const titleText = shouldShowFileName
    ? fileName
    : 'Drop your .shapr file here, or browse'

  const supportText = state.isChoosingFormat
    ? 'Convert to'
    : 'Supports: .STEP, .STL, .IGES'
  console.log(
    'STATE NO CONTENTAREA: ',
    shouldShowProgress,
    state.allowDownloadRequest
  )
  return (
    <ContentAreaStyle>
      <form>
        <ArtWork>
          <img src={'/shapr3d.jpg'} width={80} height={80} />
        </ArtWork>
        <TitleStyle>{titleText}</TitleStyle>
        {shouldShowSupportText && (
          <SupportText
            isChoosingFormat={state.isChoosingFormat}
            onClick={onClickHandler}
          >
            {supportText}
          </SupportText>
        )}
        <input
          name="file"
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

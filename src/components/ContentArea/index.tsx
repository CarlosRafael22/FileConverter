import { useContext } from 'react'
import ConverterContext from '../../context'
import { ContentAreaStyle, ArtWork, TitleStyle, SupportText } from './styles'
import retrieveCurrentStatus from '../../utils/status'

const ContentArea = () => {
  const state = useContext(ConverterContext)

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
      <ArtWork>
        <img src={'/shapr3d.jpg'} width={80} height={80} />
      </ArtWork>
      <TitleStyle>{titleText}</TitleStyle>
      {shouldShowSupportText && (
        <SupportText isChoosingFormat={state.isChoosingFormat}>
          {supportText}
        </SupportText>
      )}
    </ContentAreaStyle>
  )
}

export default ContentArea

import { ContentAreaStyle, ArtWork, TitleStyle, SupportText } from './styles'
//import Image from 'next/image'

const ContentArea = () => {
  return (
    <ContentAreaStyle>
      <ArtWork />
      <TitleStyle>Drop your .shapr file here, or browse</TitleStyle>
      <SupportText>Supports: .STEP, .STL, .IGES</SupportText>
    </ContentAreaStyle>
  )
}

export default ContentArea

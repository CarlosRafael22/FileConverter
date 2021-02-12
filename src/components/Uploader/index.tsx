import { BackgroundStyle, DropArea } from './styles'
import ContentArea from '../ContentArea'

const Uploader = () => {
  return (
    <BackgroundStyle>
      <DropArea>
        <ContentArea />
      </DropArea>
    </BackgroundStyle>
  )
}

export default Uploader

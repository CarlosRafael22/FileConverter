import { ButtonStyle, ButtonText } from './styles'

type ButtonProps = {
  text: string
}

const Button = ({ text }: ButtonProps) => {
  return (
    <ButtonStyle>
      <ButtonText>{text}</ButtonText>
    </ButtonStyle>
  )
}

export default Button

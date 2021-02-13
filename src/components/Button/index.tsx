import { ButtonStyle, ButtonText } from './styles'

export type ButtonProps = {
  text: string
  fullWidth: boolean
  onPress: Function
}

const Button = ({ text, fullWidth = false, onPress }: ButtonProps) => {
  return (
    <ButtonStyle fullWidth={fullWidth} onClick={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonStyle>
  )
}

export default Button

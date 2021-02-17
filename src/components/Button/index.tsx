import { ButtonStyle, ButtonText } from './styles'

export type ButtonProps = {
  text: string
  fullWidth?: boolean
  onPress: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ text, fullWidth = false, onPress }: ButtonProps) => {
  return (
    <ButtonStyle fullWidth={fullWidth} onClick={onPress}>
      <ButtonText>{text}</ButtonText>
    </ButtonStyle>
  )
}

export default Button

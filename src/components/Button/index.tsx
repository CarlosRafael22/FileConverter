import { ButtonStyle, ButtonText } from './styles'

export type ButtonProps = {
  text: string
  fullWidth: boolean
}

const Button = ({ text, fullWidth = false }: ButtonProps) => {
  return (
    <ButtonStyle fullWidth={fullWidth}>
      <ButtonText>{text}</ButtonText>
    </ButtonStyle>
  )
}

export default Button

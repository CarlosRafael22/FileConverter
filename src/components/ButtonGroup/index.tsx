import Button from '../Button'
import { ButtonGroupStyle } from './styles'

export type ButtonGroupProps = {
  options: Array<string>
  onButtonPress: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonGroup = ({ options, onButtonPress }: ButtonGroupProps) => {
  return (
    <ButtonGroupStyle>
      {options.map((option, index) => (
        <Button text={option} key={`button_${index}`} onPress={onButtonPress} />
      ))}
    </ButtonGroupStyle>
  )
}

export default ButtonGroup

import Button from '../Button'
import { ButtonGroupStyle } from './styles'

type ButtonGroupProps = {
  options: Array<string>
}

const ButtonGroup = ({ options }: ButtonGroupProps) => {
  return (
    <ButtonGroupStyle>
      {options.map((option) => (
        <Button text={option} />
      ))}
    </ButtonGroupStyle>
  )
}

export default ButtonGroup

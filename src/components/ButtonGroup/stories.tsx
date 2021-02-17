import { Story, Meta } from '@storybook/react/types-6-0'
import ButtonGroup, { ButtonGroupProps } from '.'

export default {
  title: 'ButtonGroup',
  component: ButtonGroup,
} as Meta

const Template: Story<ButtonGroupProps> = (args: ButtonGroupProps) => (
  <ButtonGroup {...args} />
)

export const Default = Template.bind({})
Default.args = {
  options: ['STEP', 'STL', 'IGES'],
}

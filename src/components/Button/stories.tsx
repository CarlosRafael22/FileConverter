import { Story, Meta } from '@storybook/react/types-6-0'
import Button, { ButtonProps } from '.'

export default {
  title: 'Button',
  component: Button,
} as Meta

const Template: Story = (args: ButtonProps) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'STEP',
}

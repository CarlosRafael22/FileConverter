import { Story, Meta } from '@storybook/react'
import ActionArea, { ActionAreaProps } from '.'

export default {
  title: 'Action Area',
  component: ActionArea,
} as Meta

const Template: Story = (args: ActionAreaProps) => <ActionArea {...args} />

export const Default = Template.bind({})
Default.args = {
  asContainer: true,
  hasStartedProgress: false,
}

export const WithInfoText = Template.bind({})
WithInfoText.args = {
  asContainer: true,
  infoText: 'Uploading...',
}

export const HasFinishedProgress = Template.bind({})
HasFinishedProgress.args = {
  hasFinishedProgress: true,
}

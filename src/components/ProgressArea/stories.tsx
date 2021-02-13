import { Story, Meta } from '@storybook/react'
import ProgressArea, { ProgressAreaProps } from '.'

export default {
  title: 'Progress Area',
  component: ProgressArea,
} as Meta

const Template: Story = (args: ProgressAreaProps) => <ProgressArea {...args} />

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

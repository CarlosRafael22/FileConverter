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
  progress: 0,
}

export const WithInfoText = Template.bind({})
WithInfoText.args = {
  asContainer: true,
  progress: 0,
  infoText: 'Uploading...',
}

export const HasFinishedProgress = Template.bind({})
HasFinishedProgress.args = {
  progress: 100,
}

export const WithProgress = Template.bind({})
WithProgress.args = {
  asContainer: true,
  infoText: 'Uploading...',
  progress: 10,
}

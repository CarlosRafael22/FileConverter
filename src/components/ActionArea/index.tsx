import { ActionAreaStyle, ProgressBar, InfoText } from './styles'

export type ActionAreaProps = {
  asContainer: boolean
  hasStartedProgress: boolean
  hasFinishedProgress: boolean
  infoText?: string
}

const ActionArea = ({
  asContainer,
  hasFinishedProgress = false,
  hasStartedProgress = true,
  infoText,
}: ActionAreaProps) => {
  const text = infoText || (hasFinishedProgress && 'Successful')

  return (
    <ActionAreaStyle
      asContainer={asContainer}
      hasFinishedProgress={hasFinishedProgress}
    >
      {text && (
        <InfoText hasFinishedProgress={hasFinishedProgress}>{text}</InfoText>
      )}
      {hasStartedProgress && !hasFinishedProgress && <ProgressBar />}
    </ActionAreaStyle>
  )
}

export default ActionArea

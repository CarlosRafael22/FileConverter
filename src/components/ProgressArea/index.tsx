import { ProgressAreaStyle, ProgressBar, InfoText } from './styles'

export type ProgressAreaProps = {
  asContainer: boolean
  progress: number
  infoText?: string
}

const ProgressArea = ({
  asContainer,
  progress,
  infoText,
}: ProgressAreaProps) => {
  const hasStartedProgress = progress >= 0
  const hasFinishedProgress = progress === 100
  const text = (hasFinishedProgress && 'Successful') || infoText

  return (
    <ProgressAreaStyle
      asContainer={asContainer}
      hasFinishedProgress={hasFinishedProgress}
    >
      {text && (
        <InfoText hasFinishedProgress={hasFinishedProgress}>{text}</InfoText>
      )}
      {hasStartedProgress && !hasFinishedProgress && (
        <ProgressBar progress={progress} data-testid="progressBar" />
      )}
    </ProgressAreaStyle>
  )
}

export default ProgressArea

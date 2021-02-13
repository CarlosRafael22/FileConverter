import { ProgressAreaStyle, ProgressBar, InfoText } from './styles'
import ButtonGroup from '../ButtonGroup'

export type ProgressAreaProps = {
  asContainer: boolean
  hasStartedProgress: boolean
  hasFinishedProgress: boolean
  infoText?: string
}

const ProgressArea = ({
  asContainer,
  hasFinishedProgress = false,
  hasStartedProgress = true,
  infoText,
}: ProgressAreaProps) => {
  const text = (hasFinishedProgress && 'Successful') || infoText

  const showProgress = () => {
    return (
      <>
        {text && (
          <InfoText hasFinishedProgress={hasFinishedProgress}>{text}</InfoText>
        )}
        {hasStartedProgress && !hasFinishedProgress && <ProgressBar />}
      </>
    )
  }

  const showFileFormatButtons = () => (
    <ButtonGroup options={['STEP', 'STL', 'IGES']} />
  )

  console.log('NO ACTION AREA: ', hasFinishedProgress, hasStartedProgress)
  return (
    <ProgressAreaStyle
      asContainer={asContainer}
      hasFinishedProgress={hasFinishedProgress}
    >
      {/*{!showButtons && showProgress()}
      {showButtons && showFileFormatButtons()}*/}
      {text && (
        <InfoText hasFinishedProgress={hasFinishedProgress}>{text}</InfoText>
      )}
      {hasStartedProgress && !hasFinishedProgress && <ProgressBar />}
    </ProgressAreaStyle>
  )
}

export default ProgressArea

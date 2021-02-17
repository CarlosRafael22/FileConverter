import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Default,
  WithInfoText,
  HasFinishedProgress,
  WithProgress,
} from './stories'

describe('<ProgressArea />', () => {
  it('should render only the backgroud with asContainer prop', () => {
    const { container } = render(<Default {...Default.args} />)

    expect(container.firstChild).toHaveStyle({
      background: '#f7fafd',
      'border-radius': '8px',
    })
  })

  it('should render infoText prop', () => {
    render(<WithInfoText {...WithInfoText.args} />)

    expect(screen.getByText(WithInfoText?.args?.infoText)).toBeInTheDocument()
  })

  it('should render Successful message and color when progress is 100%', () => {
    const { container } = render(
      <HasFinishedProgress {...HasFinishedProgress.args} />
    )

    expect(screen.getByText('Successful')).toBeInTheDocument()
    expect(container.firstChild).toHaveStyle({
      background: '#e1fde8',
    })
  })

  it('should render the ProgressBar according to the progress prop', () => {
    render(<WithProgress {...WithProgress.args} />)

    const widthFactor = WithProgress?.args?.progress * 0.01
    expect(screen.getByText(WithProgress?.args?.infoText)).toBeInTheDocument()
    expect(screen.getByTestId('progressBar')).toHaveStyle({
      background: '#00a7ff',
      width: `calc(448px * ${widthFactor})`,
    })
  })
})

import styled, { css } from 'styled-components'
import { ActionAreaProps } from '.'

type ActionAreaStyleProps = Pick<
  ActionAreaProps,
  'asContainer' | 'hasFinishedProgress'
>

type InfoTextProps = Pick<ActionAreaProps, 'hasFinishedProgress'>

export const ActionAreaStyle = styled.div<ActionAreaStyleProps>`
  position: absolute;
  width: 464px;
  height: 56px;
  left: 29px;
  bottom: 28px;

  ${({ asContainer }) =>
    asContainer &&
    css`
      background: #f7fafd;
      border-radius: 8px;
    `}

  ${({ hasFinishedProgress }) =>
    hasFinishedProgress &&
    css`
      background: #e1fde8;
    `}
`
export const InfoText = styled.p<InfoTextProps>`
  position: absolute;
  margin: 0;
  height: 24px;
  left: 10px;
  top: 4px;

  ${({ hasFinishedProgress }) =>
    hasFinishedProgress &&
    css`
      top: 16px;
    `}

  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  /* identical to box height, or 200% */

  letter-spacing: 0.003em;

  color: #334e6c;
`

export const ProgressBar = styled.div`
  position: absolute;
  width: 448px;
  height: 2px;
  left: 6px;
  top: 42px;

  background: #00a7ff;
  opacity: 0.68;
  border-radius: 24px;
`

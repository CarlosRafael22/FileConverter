import styled from 'styled-components'
import { ButtonProps } from '.'

type ButtonStyleProps = Pick<ButtonProps, 'fullWidth'>

export const ButtonStyle = styled.button<ButtonStyleProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '148px')};
  height: 56px;

  border: 2px solid #d6dee6;
  box-sizing: border-box;
  border-radius: 8px;
  background: #ffffff;

  &:hover {
    background: #4fc2fe;
    border: none;
  }
`

export const ButtonText = styled.p`
  margin: 0;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  /* or 200% */

  display: flex;
  flex: 1;
  align-items: center;
  text-align: center;
  justify-content: center;
  letter-spacing: 0.003em;

  color: #334e6c;
`

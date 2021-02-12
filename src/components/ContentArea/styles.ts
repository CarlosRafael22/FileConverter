import styled from 'styled-components'
//import shapr3dImage from '../../../public/shapr3d.jpg'

export const ContentAreaStyle = styled.div`
  position: absolute;
  width: 327px;
  height: 116px;
  left: calc(50% - 327px / 2);
  top: calc(50% - 158px / 2);
`

export const ArtWork = styled.div`
  position: absolute;
  left: calc(50% - 80px / 2);
  bottom: 40.33%;
  background-color: blue;
`

export const TitleStyle = styled.h3`
  position: absolute;
  width: 327px;
  height: 24px;
  left: calc(50% - 327px / 2 + 0.5px);
  top: calc(50% - 24px / 2 + 24px);

  font-family: Work Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  /* identical to box height, or 133% */

  text-align: center;
  letter-spacing: 0.003em;

  color: #334e6c;

  @media (max-width: 500px) {
    width: 95%;
    height: max-content;
    left: 0;
  }
`

export const SupportText = styled.p`
  position: absolute;
  width: 187px;
  height: 16px;
  left: calc(50% - 187px / 2 + 0.5px);
  top: calc(50% - 16px / 2 + 50px);

  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  /* identical to box height, or 133% */

  text-align: center;
  letter-spacing: 0.003em;

  color: rgba(51, 78, 108, 0.4);

  @media (max-width: 500px) {
    top: calc(50% - 16px / 2 + 80px);
  }
`

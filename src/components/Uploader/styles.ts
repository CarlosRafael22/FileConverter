import styled from 'styled-components'

export const BackgroundStyle = styled.div`
  position: absolute;
  width: 520px;
  height: 314px;
  left: calc(50% - 520px / 2);
  top: calc(50% - 314px / 2);

  background: #ffffff;
  box-shadow: 0px 30px 60px rgba(86, 117, 152, 0.2);
  border-radius: 32px;

  @media (max-width: 500px) {
    width: 100%;
    left: 0;
  }
`

export const DropArea = styled.div`
  position: absolute;
  width: 464px;
  height: 258px;
  left: calc(50% - 464px / 2);
  top: calc(50% - 258px / 2);

  border: 2px dashed #d6dee7;
  border-radius: 8px;

  @media (max-width: 500px) {
    left: 0;
    width: 100%;
  }
`

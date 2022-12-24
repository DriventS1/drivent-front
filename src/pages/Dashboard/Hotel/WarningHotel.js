import styled from 'styled-components';

export default function WarningHotel( props ) {
  return(
    <WarningMessage>
      {props.children}
    </WarningMessage>
  );
}

const WarningMessage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #8E8E8E;
    font-size: 20px;
    opacity: 0.8;
    padding: 178px 240px;
    text-align: center;

    span {
        width: 600px;
        line-height: 23px;
    }
`;

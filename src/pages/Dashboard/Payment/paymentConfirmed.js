import { BsFillCheckCircleFill } from 'react-icons/bs';
import styled from 'styled-components';

export default function PaymentConfirmed() {
  return (
    <StyledPaymentConfirmed>
      <BsFillCheckCircleFill />
      <ConfirmedPaymentMessage>
        <span>Pagamento confirmado!</span>
        <h1>Prossiga para escolha de hospedagem e atividades</h1>
      </ConfirmedPaymentMessage>
    </StyledPaymentConfirmed>
  );
}

const StyledPaymentConfirmed = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 40px;
  color: #36b853;
  margin-top: 40px;
`;

const ConfirmedPaymentMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  font-size: 16px;
  line-height: 19px;
  color: #8e8e8e;
  span {
    color: #454545;
  }
`;

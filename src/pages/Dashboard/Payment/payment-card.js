import styled from 'styled-components';
import useEnrollment from '../../../hooks/api/useEnrollment';
import PaymentMethod from './PaymentMethod';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentConfirmed from './paymentConfirmed';

export default function PaymentCard() {
  const navigate = useNavigate();
  const { enrollment } = useEnrollment();

  const location = useLocation();
  const { state } = location;

  if (!state) {
    navigate('/dashboard/payment');
    return <></>;
  }

  const { ticket } = state;

  return (
    <>
      <Title>Ingresso e pagamento</Title>

      {enrollment ? (
        <>
          <Status>Ingresso escolhido</Status>
          {ticket ? (
            <Box key={ticket.TicketType.id}>
              <Description>
                <p>{ticket.TicketType.name}</p>
                <p>R${ticket.TicketType.price}</p>
              </Description>
            </Box>
          ) : (
            ''
          )}
          {ticket.status === 'RESERVED' && <PaymentMethod />}
          {ticket.status === 'PAID' && <PaymentConfirmed />}
        </>
      ) : (
        ''
      )}
    </>
  );
}

export const Title = styled.div`
  font-weight: 400;
  font-size: 34px;
  line-height: 40px;

  margin-bottom: 37px;
`;

export const Status = styled.span`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #8e8e8e;

  font-family: 'Roboto', sans-serif;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 290px;
  height: 108px;
  border: 1px solid #cecece;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
  margin: 25px 20px 10px 0;
  background-color: #ffeed2;
`;

const Description = styled.div`
  width: 167px;
  height: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  p:nth-child(2) {
    font-size: 16px;
    line-height: 16px;

    margin-top: 12px;

    color: #898989;
  }
`;

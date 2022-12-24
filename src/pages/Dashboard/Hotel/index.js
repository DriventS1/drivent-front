import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useHotel from '../../../hooks/api/useHotel';
import { Status, Title } from '../Payment/payment-card';
import { ListHotels } from '../Hotel/listHotels';
import WarningHotel from './WarningHotel';
import useTicket from '../../../hooks/api/useTicket';

import { useLocation } from 'react-router-dom';

export default function Hotel() {
  const { hotels } = useHotel();
  //const { ticket } = useTicket();
  const location = useLocation();
  const ticket = location.state?.ticket;
  //const { paymentWasMade } = location.state;

  //console.log(hotels[0].Rooms);

  const [data, setData] = useState({
    hotelId: null,
  });
  const [paymentHasDone, setPaymentHasDone] = useState(false);

  const [ticketTypeIsRemote, setTicketTypeIsRemote] = useState(false);
  console.log(location);
  //console.log(data);
  useEffect(() => {
    if (location.state) {
      if (ticket?.status === 'PAID') {
        setPaymentHasDone(true);
      }
      if (ticket?.TicketType.isRemote) {
        setTicketTypeIsRemote(true);
      }
    }
  }, [data]);

  return (
    <HotelSpace paymentDone={paymentHasDone}>
      <Title>Escolha de hotel e quarto</Title>

      {!paymentHasDone ? 
        <WarningHotel> 

          <span> Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem </span> 
        </WarningHotel> 
        : 
        ticketTypeIsRemote ? 
          <WarningHotel> 
            <span> Sua modalidade de ingresso não inclui hospedagem </span> 
            <span> Prossiga para a escolha de atividades </span>
          </WarningHotel> 
          :
          <>
            <Status>Primeiro, escolha seu hotel</Status>

            {hotels ? (
              <Container>
                <ListHotels hotels={hotels} setData={setData} data={data} />
              </Container>
            ) : (
              ''
            )}
          </>

      }
    </HotelSpace>
  );
}

const HotelSpace = styled.div`
  overflow-y: ${props => props.paymentDone ? 'scroll' : 'hidden'};
`;

const Container = styled.div`
  height: 80%;
  width: 100%;

  display: flex;
`;

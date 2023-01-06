import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useHotel from '../../../hooks/api/useHotel';
import { Status, Title } from '../Payment/payment-card';
import { ListHotels } from '../Hotel/listHotels';
import WarningHotel from './WarningHotel';
import useTicket from '../../../hooks/api/useTicket';
import { ListRooms } from '../Hotel/listRooms';
import useRoom from '../../../hooks/api/useRoom';
import Booking from './Booking';

import { useLocation } from 'react-router-dom';

export default function Hotel() {
  const { hotels } = useHotel();
  const { ticket } = useTicket();
  const location = useLocation();

  const { getRooms } = useRoom();

  const [dataRoom, setDataRoom] = useState({
    roomId: null,
  });

  const [hotelRooms, setHotelRooms] = useState([]);

  const [data, setData] = useState({
    hotelId: null,
  });

  const [paymentHasDone, setPaymentHasDone] = useState(false);

  const [ticketTypeIsRemote, setTicketTypeIsRemote] = useState(false);

  useEffect(async() => {
    const rooms = await getRooms(data.hotelId);
    if(data.hotelId) {
      setHotelRooms(rooms.Rooms);
    }
  }, [data.hotelId]);

  return (
    <HotelSpace paymentDone={paymentHasDone}>
      <Title>Escolha de hotel e quarto</Title>

      {ticket?.status !== 'PAID' ? 
        <WarningHotel> 

          <span> Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem </span> 
        </WarningHotel> 
        : 
        ticket?.TicketType.isRemote ? 
          <WarningHotel> 
            <span> Sua modalidade de ingresso não inclui hospedagem </span> 
            <span> Prossiga para a escolha de atividades </span>
          </WarningHotel> 
          :
          dataRoom === null?
            <>
              <Status>Primeiro, escolha seu hotel</Status>

              {hotels ? (
                <>
                  <Container>
                    <ListHotels hotels={hotels} setData={setData} data={data} />
                  </Container>
                  {hotelRooms.length > 0 ? (
                    <>
                      <ListRooms rooms={hotelRooms} setDataRoom={setDataRoom} dataRoom={dataRoom}/>
                    </>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                ''
              )}
            </>
            :
            <Booking setDataRoom={setDataRoom}/>
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

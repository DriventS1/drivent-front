import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useHotel from '../../../hooks/api/useHotel';
import { Status, Title } from '../Payment/payment-card';
import { ListHotels } from '../Hotel/listHotels';
import WarningHotel from './WarningHotel';
import useTicket from '../../../hooks/api/useTicket';
import { ListRooms } from '../Hotel/listRooms';
import { getRooms } from '../../../services/roomApi';
import useBooking from '../../../hooks/api/useBooking';
import Booking from './Booking';

import { useLocation } from 'react-router-dom';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  const { userData: data } = useContext(UserContext); 
  const token = useToken();
  const { hotels } = useHotel();
  const { ticket } = useTicket();
  
  const [bookingData, setBookingData] = useState([]);
  const [dataRoom, setDataRoom] = useState({ roomId: null });
  const [hotelRooms, setHotelRooms] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState({
    hotelId: null,
  });
  const [paymentHasDone, setPaymentHasDone] = useState(false);
  const [ticketTypeIsRemote, setTicketTypeIsRemote] = useState(false);

  const { roomBooking } = useBooking(data.user.id);

  useEffect(async() => {
    let rooms = null;
    if(selectedHotel.hotelId !== null && selectedHotel.hotelId !== 'undefined') {
      rooms = await getRooms(token, selectedHotel.hotelId);
      setHotelRooms(rooms.Rooms);
    } 
  }, [selectedHotel.hotelId]);

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
          (roomBooking === null || dataRoom === null)?
            <>
              <Status>Primeiro, escolha seu hotel</Status>

              {hotels ? (
                <>
                  <Container>
                    <ListHotels hotels={hotels} setSelectedHotel={setSelectedHotel} selectedHotel={selectedHotel} />
                  </Container>
                  {(hotelRooms.length > 0 && selectedHotel.hotelId !== null) || bookingData.length !== 0? (
                    <>
                      <ListRooms rooms={hotelRooms} setDataRoom={setDataRoom} dataRoom={dataRoom}/>
                    </>
                  ) : (
                    ''
                  )}
                </>
              ) 
                : 
                ('')
              }
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

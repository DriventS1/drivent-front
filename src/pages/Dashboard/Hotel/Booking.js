import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useBooking from '../../../hooks/api/useBooking';
import { Status, Title } from '../Payment/payment-card';
import useTicket from '../../../hooks/api/useTicket';
import { getHotelById } from '../../../services/hotelApi';
import { getBookings } from '../../../services/bookingApi';
import Button from '../../../components/Form/Button';

import { useLocation, useNavigate } from 'react-router-dom';

export default function Booking({ setDataRoom }) {
  const navigate = useNavigate();
  const { ticket } = useTicket();
  const location = useLocation();
  const [ hotelSelected, setHotelSelected ] = useState([]);
  const { userData: data } = useContext(UserContext);

  const { roomBooking } = useBooking(data.user.id);
  
  useEffect(() => {
    async function getBooking() {
      const promise = await getBookings({ token: data.token, hotelId: roomBooking?.Room.hotelId });
      setHotelSelected(promise);
    }

    getBooking();
  });

  function VacanciesCalculated({ hotel }) {
    let bookingsRoom = 0;
    if(hotel.Rooms && roomBooking.Room) {
      bookingsRoom = Number(hotel?.Rooms[roomBooking?.Room.id-1]._count.Booking) -1;
    }
  
    return(
      <h2>
        {bookingsRoom === 0? 'Você' : `Você e mais ${bookingsRoom}`}
      </h2>
    );
  }

  function BookingRoom() {
    return (
      <StyledHotel key={roomBooking.id} onClick={() => ''}>
        <Image src={hotelSelected.image}></Image>
        <NameHotel>{hotelSelected.name}</NameHotel>
        <SubTitle>Quarto reservado:</SubTitle>
        <StyledSubTitle>{`${roomBooking.Room.name}`}</StyledSubTitle>
        <SubTitle>Pessoas no seu quarto:</SubTitle>
        <StyledSubTitle>
          <VacanciesCalculated hotel={hotelSelected}/>
        </StyledSubTitle>
      </StyledHotel>
    );
  }

  return (
    <HotelSpace>
      <>
        <Status>Você já escolheu seu quarto:</Status>
        <>
          {roomBooking !== null ? (
            <>
              <BookingRoom hotelId={ roomBooking }/>
              <Button onClick={() => setDataRoom(null)}>TROCAR DE QUARTO</Button>
            </>
          ) : (
            ''
          )}
        </>
      </>
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

const StyledHotel = styled.div`
  height: 264px;
  width: 196px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 15px;

  margin-top: 20px;
  margin-right: 20px;

  background: #FFEED2;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 168px;
  height: 109px;

  border-radius: 5px;
`;

const NameHotel = styled.div`
  width: 100%;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  color: #343434;

  margin-top: 10px;
`;

const SubTitle = styled.div`
  width: 100%;

  font-weight: 700;
  font-size: 12px;
  line-height: 14px;

  color: #3c3c3c;

  margin-top: 13px;
`;

const StyledSubTitle = styled(SubTitle)`
  font-weight: 400;
  margin-top: 5px;
`;

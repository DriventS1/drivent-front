import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { getBookings } from '../../../services/bookingApi';

export async function Vacancies({ hotelId }) {
  const [ hotels, setHotels ] = useState(null);
  const [ vacancies, setVacancies ] = useState(0);
  
  const { userData: data } = useContext(UserContext);

  try {
    const hotelsWithRooms = await getBookings({ token: data.token, hotelId });
    setHotels(hotelsWithRooms);
  } catch (error) {
    window.alert(error);
  }

  if(hotels !== null) {
    hotels.map( hotel => {
      hotel.Rooms.map( room => {
        const roomVacancies = Number(room.capacity) - Number(room._count.Booking) + vacancies;
        setVacancies(roomVacancies);
      });
    });
  }

  return(
    hotelId && vacancies !== null?
      <>
        <SubTitle>Vagas Disponíveis</SubTitle>
        <StyledSubTitle>{vacancies}</StyledSubTitle>
      </>
      :
      <></>
  );
}

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

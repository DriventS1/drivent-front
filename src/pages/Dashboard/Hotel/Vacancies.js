import styled from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { getBookings } from '../../../services/bookingApi';

function VacanciesCalculated({ hotel }) {
  let vacancies = 0;
  hotel.Rooms?.forEach( room => {
    const updateVacancies = Number(room.capacity) - Number(room._count.Booking) + Number(vacancies);
    vacancies = updateVacancies;
  });

  return(
    <h2>{vacancies}</h2>
  );
}

export function Vacancies({ hotelId }) {
  const [ hotel, setHotel ] = useState(null);

  const { userData: data } = useContext(UserContext);

  useEffect(() => {
    if(hotelId !== 'undefined') {
      const promise = getBookings({ token: data.token, hotelId });
      promise.then(hotels => setHotel(hotels));
    }
  });

  return(
    hotelId && (hotel !== null)?
      <>
        <SubTitle>Vagas Disponíveis</SubTitle>
        <StyledSubTitle>
          <VacanciesCalculated hotel={hotel}/>
        </StyledSubTitle>
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

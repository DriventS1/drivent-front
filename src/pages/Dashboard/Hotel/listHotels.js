import styled from 'styled-components';
import { Vacancies } from './Vacancies';

export function ListHotels({ hotels, setSelectedHotel, selectedHotel }) {
  function handleHotel(hotelId) {
    setSelectedHotel({
      hotelId,
    });
  }

  return (
    <>
      {hotels.map((hotel, key) => {
        let single,
          double,
          triple = '';
        hotel.Rooms.filter((cpt) => {
          if (cpt.capacity === 1) single = 'Single,';
          if (cpt.capacity === 2) double = 'Double,';
          if (cpt.capacity === 3) triple = 'Triple';
          return false;
        });

        return (
          <StyledHotel key={key} selectedHotel={selectedHotel.hotelId} hotel={hotel.id} onClick={() => handleHotel(hotel.id)}>
            <Image src={hotel.image}></Image>
            <NameHotel>{hotel.name}</NameHotel>
            <SubTitle>Tipos de acomodação:</SubTitle>
            <StyledSubTitle>{`${single} ${double} ${triple}`}</StyledSubTitle>
            <Vacancies hotelId={ hotel.id }/>
          </StyledHotel>
        );
      })}
    </>
  );
}

const StyledHotel = styled.div`
  height: 264px;
  width: 196px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 15px;

  margin-top: 20px;
  margin-right: 20px;

  background: ${(props) => (props.selectedHotel === props.hotel ? '#FFEED2;' : '#e0e0e0')};
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

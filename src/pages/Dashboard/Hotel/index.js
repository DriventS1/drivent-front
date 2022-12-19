import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useHotel from '../../../hooks/api/useHotel';
import { Status, Title } from '../Payment/payment-card';

export default function Hotel() {
  const { hotels } = useHotel();

  //console.log(hotels);

  const [data, setData] = useState({
    hotelId: null,
  });

  function handleHotel(hotelId) {
    setData({
      hotelId,
    });
  }
  //console.log(data);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>

      <Status>Primeiro, escolha seu hotel</Status>

      {hotels ? (
        <Container>
          {hotels.map((hotel, key) => {
            return (
              <StyledHotel key={key} onClick={() => handleHotel(hotel.id)}>
                <Image src={hotel.image}></Image>
                <NameHotel>{hotel.name}</NameHotel>
              </StyledHotel>
            );
          })}
        </Container>
      ) : (
        ''
      )}
    </>
  );
}

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

  background: #ebebeb;
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

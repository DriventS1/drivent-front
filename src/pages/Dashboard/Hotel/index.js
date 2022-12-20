import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useHotel from '../../../hooks/api/useHotel';
import { Status, Title } from '../Payment/payment-card';
import { ListHotels } from '../Hotel/listHotels';

export default function Hotel() {
  const { hotels } = useHotel();

  //console.log(hotels[0].Rooms);

  const [data, setData] = useState({
    hotelId: null,
  });

  //console.log(data);

  return (
    <>
      <Title>Escolha de hotel e quarto</Title>

      <Status>Primeiro, escolha seu hotel</Status>

      {hotels ? (
        <Container>
          <ListHotels hotels={hotels} setData={setData} data={data} />
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

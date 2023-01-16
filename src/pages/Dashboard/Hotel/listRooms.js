import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import UserContext from '../../../contexts/UserContext';
import useBooking from '../../../hooks/api/useRoomBooking';
import { toast } from 'react-toastify';
import { getBooking } from '../../../services/roomBookingApi';
import { createOrUpdateBooking, updateBooking } from '../../../services/roomBookingApi';
import { useNavigate } from 'react-router-dom';
import useToken from '../../../hooks/useToken';

export function ListRooms({ rooms, setDataRoom, dataRoom }) {
  const [bookingData, setBookingData] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState({});
  const { userData: data } = useContext(UserContext);
  const token = useToken();
  const navigate = useNavigate();

  useEffect(async() => {
    const booking = await getBooking(token);
    setBookingData(booking);
  }, [bookingData]);
  
  async function sendRoomData(event) {
    event.preventDefault();
    
    const body = {
      roomId: selectedRoom.id,
    };
    
    try {
      setDataRoom({ roomId: selectedRoom.id });
      if(bookingData !== null) {
        await updateBooking(bookingData.id, body, token);
        toast('Quarto reservado com sucesso!');
        navigate('/dashboard/activities');
        return;
      }
      await createOrUpdateBooking( body, token );
      toast('Quarto reservado com sucesso!');
      navigate('/dashboard/activities');
    } catch (err) {
      toast('Não foi possível reservar o quarto!');
    }
  }

  return (
    <Container>
      {rooms ? (<>
        <StyledRooms>
          <h2>Ótima pedida! Agora escolha seu quarto:</h2>
          <div>
            {rooms.map((room) => (
              <EachRoom
                key={room.id} 
                room={room} 
                selectedRoom={selectedRoom} 
                setSelectedRoom={setSelectedRoom} />
            ))}
          </div>
        </StyledRooms>
        {selectedRoom.id ? 
          (<form onSubmit={sendRoomData}><button onClick={async(e) => await sendRoomData(e)}>Reservar</button></form>)
          : 
          ('')
        }
      </>) : ('')}
    </Container>
  );
}

function EachRoom({ room, selectedRoom, setSelectedRoom }) {
  const { roomBooking } = useBooking(room.id);
  const [iconsList, setIconsList] = useState([]);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    if (roomBooking) {
      const vacancies = {};
      let capacity = room.capacity;
      let bookingLenght = roomBooking.length;
      if (capacity === bookingLenght) setUnavailable(true);

      for (let i = capacity; i > 0; i--) {
        vacancies[capacity] = 'available';
        if (bookingLenght > 0 ) {
          vacancies[capacity] = 'unavailable';
        }
        capacity -=1;
        bookingLenght -=1;
      }
  
      setIconsList(Object.values(vacancies));
    }
  }, [roomBooking]);

  function selectRoom() {
    if (unavailable) {
      return toast('Quarto não disponível!');
    }

    setSelectedRoom({ id: room.id, hotelId: room.hotelId });
    if (selectedRoom.id === room.id) {
      return;
    }

    const icons = [...iconsList];
    const hasSelected = icons.find((icon) => icon === 'selected');
    if (hasSelected) return;
    icons.shift();
    icons.push('selected');

    setIconsList([...icons]);
  }

  return (
    <StyledRoom unavailable={unavailable} selectedRoom={selectedRoom.id} roomId={room.id} onClick={selectRoom}>
      <h5>{room.name}</h5>
      <div>
        {iconsList.map((icon, key) => {
          if (icon === 'selected' && selectedRoom.id === room.id) {
            return <BsPersonFill color="#FF4791" key={key} />;
          } else if (icon === 'unavailable') {
            return <BsPersonFill key={key}/>;
          } else {
            return <BsPerson key={key}/>;
          }
        })}
      </div>
    </StyledRoom>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding-bottom: 80px;
  font-family: 'Roboto', sans-serif;
  
  button  {
  width: 182px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  margin: 0;
  }
`;

const StyledRooms = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding-bottom: 80px;
  font-family: 'Roboto', sans-serif;
  
   div {
    margin-right: 5px;
    display: flex;
    font-size: 18px;
  }
  h2{
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #8e8e8e;
  font-family: 'Roboto', sans-serif;
  margin-bottom: 20px;
  }
`;

const StyledRoom = styled.div`
  width: 190px;
  height: 45px;
  border-radius: 10px;
  border: 1px #cecece solid;
  background-color: ${(props) => {
    if (props.unavailable) {
      return '#E9E9E9';
    } else if (props.selectedRoom === props.roomId) {
      return '#FFEED2';
    } else {
      return '#ffffff';
    }
  }};
  padding: 11px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h5 {
    color: ${(props) => (props.unavailable ? '#9D9D9D' : '#454545')};
    font-size: 15px;
    font-weight: 400;
  }
  svg {
    color: ${(props) => (props.unavailable ? '#8C8C8C' : '#000000')};
    margin-top: 5px;
  }
  &:hover{
    cursor: pointer;
  }
`;

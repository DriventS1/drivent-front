import useAsync from '../useAsync';
import useToken from '../useToken';

import * as roomApi from '../../services/roomApi';

export default function useRoom(hotelId) {
  const token = useToken();
  
  const {
    data: rooms,
    act: getRooms
  } = useAsync((hotelId) => roomApi.getRooms(token, hotelId));

  return {
    rooms,
    getRooms
  };
}

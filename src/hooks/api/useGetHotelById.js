import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelApi from '../../services/hotelApi';

export default function useGetHotelById(hotelId) {
  const token = useToken();
  
  const {
    data: hotel,
    act: getHotels
  } = useAsync(() => hotelApi.getHotelById( token, hotelId ));

  return {
    hotel,
    getHotels
  };
}

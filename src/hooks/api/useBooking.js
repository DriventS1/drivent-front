import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/roomBookingApi.js';

export default function useBookingByUserId(userId) {
  const token = useToken();
  
  const {
    data: roomBooking,
    loading: roomBookingLoading,
    error: roomBookingError,
    act: getRoomBooking
  } = useAsync(() => bookingApi.getBooking(token, userId));
  
  return {
    roomBooking,
    roomBookingLoading,
    roomBookingError,
    getRoomBooking
  };
}

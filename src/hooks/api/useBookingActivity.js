import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useBookingActivity() {
  const token = useToken();
  
  const {
    data: createdBookingActivity,
    act: createBookingActivity
  } = useAsync((data) => activitiesApi.postActivity(token, data));

  return {
    createdBookingActivity,
    createBookingActivity
  };
}

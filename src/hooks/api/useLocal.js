import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useLocalWithActivities(dateId) {
  const token = useToken();
  
  const {
    data: activities,
    act: getActivities
  } = useAsync(() => activitiesApi.getActivitiesWithLocal(token, dateId));

  return {
    activities,
    getActivities
  };
}

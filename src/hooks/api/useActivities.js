import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivities() {
  const token = useToken();
  
  const {
    data: dateActivities,
    act: getDateActivities
  } = useAsync(() => activitiesApi.getDateActivities(token));

  return {
    dateActivities,
    getDateActivities
  };
}

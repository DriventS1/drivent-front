import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTApi from '../../services/ticketApi';

export default function useTicket() {
  const token = useToken();
  
  const {
    data: ticket,
    act: getTicket
  } = useAsync(() => ticketTApi.getTicket(token));

  return {
    ticket,
    getTicket
  };
}

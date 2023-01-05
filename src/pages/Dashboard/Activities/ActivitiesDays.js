import styled from 'styled-components';
import useActivities from '../../../hooks/api/useActivities';
import { Status, Title } from '../Payment/payment-card';
import * as dayjs from 'dayjs';
import useTicket from '../../../hooks/api/useTicket';
import WarningHotel from '../Hotel/WarningHotel';

export default function ActivitiesDays() {
  const { dateActivites } = useActivities();
  const { ticket } = useTicket();
  console.log(ticket);

  function getDate(date) {
    const week = [
      { day: 'Domingo' },
      { day: 'Segunda' },
      { day: 'Terça' },
      { day: 'Quarta' },
      { day: 'Quinta' },
      { day: 'Sexta' },
      { day: 'Sábado' },
    ];

    const dateActivity = date.slice(0, 10);
    const index = dayjs(dateActivity).day();

    return `${week[index].day}, ${dayjs(dateActivity).format('DD/MM')}`;
  }

  return (
    <>
      <Title>Escolha de atividades</Title>

      {ticket?.status === 'RESERVED' && (
        <WarningHotel>
          <span>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</span>
        </WarningHotel>
      )}

      {ticket?.TicketType.isRemote === true ? (
        <WarningHotel>
          <span>
            Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
          </span>
        </WarningHotel>
      ) : ticket?.status === 'PAID' && !ticket?.TicketType.includesHotel ? (
        <>
          <Status>Primeiro, filtre pelo dia do evento: </Status>

          <Container>
            {dateActivites?.map((date, key) => (
              <Date key={key}>{getDate(date.date)}</Date>
            ))}
          </Container>
        </>
      ) : (
        ticket?.status === 'PAID' && (
          <>
            <Status>Primeiro, filtre pelo dia do evento: </Status>

            <Container>
              {dateActivites?.map((date, key) => (
                <Date key={key}>{getDate(date.date)}</Date>
              ))}
            </Container>
          </>
        )
      )}
    </>
  );
}

const Container = styled.div`
  width: 90%;
  height: 80%;

  display: flex;
`;

const Date = styled.div`
  width: 131px;
  height: 37px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin: 25px 20px 20px 0;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #000000;

  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

import styled from 'styled-components';
import { Status, Title } from '../Payment/payment-card';

export default function ActivitiesDays() {
  return (
    <>
      <Title>Escolha de atividades</Title>
      <Status>Primeiro, filtre pelo dia do evento: </Status>
      <Date>Sexta, 22/10</Date>
    </>
  );
}

const Date = styled.div`
  width: 131px;
  height: 37px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #000000;

  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
`;

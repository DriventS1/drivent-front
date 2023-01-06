import styled from 'styled-components';

export default function ActivitiesList() {
  const arr = [
    {
      id: 1,
      name: 'Auditório Principal',
      createdAt: '2022-12-16T02:12:42.501Z',
      updatedAt: '2022-12-16T02:12:42.501Z',
      Activities: [
        {
          id: 1,
          name: 'Minecraft: montando o PC ideal',
          capacity: 30,
          startsAt: '2023-01-16T02:09:00.501Z',
          endsAt: '2023-01-16T02:10:00.501Z',
          dateId: 1,
          localId: 1,
          createdAt: '2022-12-16T02:12:42.501Z',
          updatedAt: '2022-12-16T02:12:42.501Z',
        },
        {
          id: 2,
          name: 'LoL: montando o PC ideal',
          capacity: 5,
          startsAt: '2023-01-16T02:10:00.501Z',
          endsAt: '2023-01-16T02:11:00.501Z',
          dateId: 1,
          localId: 1,
          createdAt: '2022-12-16T02:12:42.501Z',
          updatedAt: '2022-12-16T02:12:42.501Z',
        },
      ],
    },
    {
      id: 2,
      name: 'Auditório Lateral',
      createdAt: '2022-12-16T02:12:42.501Z',
      updatedAt: '2022-12-16T02:12:42.501Z',
      Activities: [
        {
          id: 3,
          name: 'Palestra x',
          capacity: 35,
          startsAt: '2023-01-16T02:09:00.501Z',
          endsAt: '2023-01-16T02:11:00.501Z',
          dateId: 1,
          localId: 2,
          createdAt: '2022-12-16T02:12:42.501Z',
          updatedAt: '2022-12-16T02:12:42.501Z',
        },
      ],
    },
    {
      id: 3,
      name: 'Sala de Workshop',
      createdAt: '2022-12-16T02:12:42.501Z',
      updatedAt: '2022-12-16T02:12:42.501Z',
      Activities: [
        {
          id: 4,
          name: 'Palestra y',
          capacity: 25,
          startsAt: '2023-01-16T02:09:00.501Z',
          endsAt: '2023-01-16T02:10:00.501Z',
          dateId: 1,
          localId: 3,
          createdAt: '2022-12-16T02:12:42.501Z',
          updatedAt: '2022-12-16T02:12:42.501Z',
        },
        {
          id: 5,
          name: 'Palestra z',
          capacity: 15,
          startsAt: '2023-01-16T02:10:00.501Z',
          endsAt: '2023-01-16T02:11:00.501Z',
          dateId: 1,
          localId: 3,
          createdAt: '2022-12-16T02:12:42.501Z',
          updatedAt: '2022-12-16T02:12:42.501Z',
        },
      ],
    },
  ];

  return (
    <Container>
      {arr.map((obj, key) => {
        console.log(obj);
        return (
          <Local key={key}>
            <LocalName>{obj.name}</LocalName>
            <ListActivities>
              {obj.Activities.map((act, key) => {
                let hourStarts = Number(act.startsAt.slice(14, 16));
                let hourEnds = Number(act.endsAt.slice(14, 16));
                let calc = hourEnds - hourStarts;

                return (
                  <Activity key={key} hours={calc}>
                    <div>
                      <p>{act.name}</p>
                      <p>
                        {act.startsAt.slice(14, 19)} - {act.endsAt.slice(14, 19)}
                      </p>
                    </div>

                    <div>VAGAS</div>
                  </Activity>
                );
              })}
            </ListActivities>
          </Local>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  display: flex;
`;

const Local = styled.div`
  width: 288px;
  height: 427px;

  display: flex;
  flex-direction: column;

  font-family: 'Roboto';
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;

  color: #7b7b7b;
`;

const LocalName = styled.div`
  height: 30px;

  display: flex;
  justify-content: center;

  margin-top: 50px;
`;

const ListActivities = styled.div`
  width: 288px;
  height: 392px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;

  border: 1px solid #d7d7d7;
`;

const Activity = styled.div`
  width: 265px;
  height: ${(props) => (props.hours >= 1 ? `${props.hours * 80}px` : '')};

  display: flex;

  padding: 12px;
  margin-bottom: 10px;

  background: #f1f1f1;
  border-radius: 5px;

  div:first-child {
    width: 80%;
    height: 95%;

    border-right: 1px solid #cfcfcf;
  }

  p:first-child {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;

    color: #343434;
  }

  p:nth-child(2) {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #343434;

    margin-top: 8px;
  }
`;

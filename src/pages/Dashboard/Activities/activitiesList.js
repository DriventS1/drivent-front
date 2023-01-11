import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RxEnter } from 'react-icons/rx';

export default function ActivitiesList({ activities }) {
  return (
    <Container>
      {activities.map((obj, key) => {
        return (
          <Local key={key}>
            <LocalName>{obj.name}</LocalName>
            <ListActivities>
              {obj.Activities.map((act, key) => {
                let hourStarts = Number(act.startsAt.slice(14, 16));
                let hourEnds = Number(act.endsAt.slice(14, 16));
                let calc = hourEnds - hourStarts;
                let vagas = act.capacity - act.BookingActivities.length;

                return (
                  <Activity key={key} hours={calc}>
                    <div>
                      <p>{act.name}</p>
                      <p>
                        {act.startsAt.slice(14, 19)} - {act.endsAt.slice(14, 19)}
                      </p>
                    </div>

                    <> 
                      {vagas === 0? 
                        <div className='sold'> <p> <AiOutlineCloseCircle/> </p> <p>Esgotado</p> </div>
                        : 
                        <div className='enter'> <p> <RxEnter/> </p> <p>{vagas} vagas</p> </div>} 
                    </>
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

  .sold {
    margin-left: 5px;
    p:first-child {
      font-size: 20px;
    }
    p {
      color: red;
    }
  }

  .enter {
    margin-left: 5px;
    p:first-child {
      font-size: 20px;
    }
    p {
      color: green;
    }
  }
`;

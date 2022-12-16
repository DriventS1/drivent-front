import styled from 'styled-components';

export default function PaymentCard() {
  const ticket = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status: 'Reserved'
  };

  return (
    <>
      <Title>
        Ingresso e pagamento
      </Title>

      <Status>
        Ingresso escolhido
      </Status>

      <Box>
        {ticket.ticketTypeId === 1 ?
          <Description>
            <p>Online</p>
            <p>R$250</p>
          </Description>
          : 
          ticket.ticketTypeId === 2 ?
            <Description>
              <p>Presencial + Com Hotel </p>
              <p>R$600</p>
            </Description>
            : 
            ticket.ticketTypeId === 3 ?
              <Description>
                <p>Presencial + Sem Hotel </p>
                <p>R$100</p>
              </Description>
              : 
              ''
        }
      </Box>
    </>
  );
}

const Title = styled.div`
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;

    margin-bottom: 37px;
`;

const Status = styled.span`
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;

    color: #8E8E8E;

    font-family: 'Roboto', sans-serif;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  width: 290px;
  height: 145px;
  border: 1px solid #CECECE;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
  margin:  25px 20px 10px 0;
  background-color: #FFEED2;
`;

const Description = styled.div`
    width: 167px;
    height: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;

    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    
    p:nth-child(2){
        font-size: 16px;
        line-height: 16px;
        
        margin-top: 12px;
        
        color: #898989;
    }
`;

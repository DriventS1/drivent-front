import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useTicketType from '../../../hooks/api/useTicketType';
import { Radio } from 'antd';

function ReviewTicketType({ price }) {
  return (
    <div>
      <Subtitle> Fechado! O total ficou em <strong> R$ {price} </strong>. Agora é só confirmar </Subtitle>
      <BookingButton> <div className='button-text'> RESERVAR INGRESSO </div> </BookingButton>
    </div>
  );
}

export default function TicketType() {
  const { userData: data } = useContext(UserContext);  
  const { ticketType } =  useTicketType(data.user.id);
  const [valueId, setValueId] = useState('');
  const [valueHotel, setValueHotel] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [ticketTypeIsRemote, setTicketTypeIsRemote] = useState(false);
  const [price, setPrice] = useState('');
  const [reviewTicketType, setReviewTicketType] = useState(false);

  useEffect(() => {
    console.log(ticketType);
  }, []);

  function selectTicketRemote(type) {
    if (type.isRemote) {
      setShowOptions(false);
      setPrice(type.price);
      setTicketTypeIsRemote(true);
      setReviewTicketType(true); //Logica para finalizar o pedido
    };
  }

  return (
    <>
      <Title>
        Ingresso e pagamento
      </Title>

      <Subtitle>
        Primeiro, escolha sua modalidade de ingresso
      </Subtitle>
      <Radio.Group onChange={e => setValueId(e.target.value)} value={valueId}>
        <Buttons>
          {ticketType?.map(type => {
            return(
              !type.includesHotel? 
                type.isRemote ?
                  <EachButton>

                    <Radio value={type.id} onChange={(e, type) => selectTicketRemote(type)}>
                      <div className='type'>
                        {type.name}
                      </div>
                      <div className='price'>+ R${type.price}</div>
                    </Radio>

                  </EachButton>
                  :
                  <EachButton>

                    <Radio value={0} onChange={e => setShowOptions(true)}>
                      <div className='type'>
                        {type.name}
                      </div>
                      <div className='price'>+ R${type.price}</div>
                    </Radio>

                  </EachButton>
                : 
                ('')
            );
          })}

          {ticketTypeIsRemote ? 
            <ReviewTicketType price={price}/>
            : ('')
          }

        </Buttons>

      </Radio.Group>

      {showOptions ? (<> 
        <Subtitle>
            Ótimo, agora escolha sua modalidade de hospedagem
        </Subtitle>

        <Radio.Group onChange={e => setValueHotel(e.target.value)} value={valueHotel}>

          <Buttons>
            {ticketType?.map(type => {
              return(
                !type.isRemote?
                  <EachButton>

                    <Radio value={type.id} onClick={(e) => setReviewTicketType(true)}>
                      <div className='type'>
                        { !type.isRemote && type.includesHotel? 'Com Hotel' : 'Sem Hotel'}
                      </div>
                      <div className='price'>+ R${Number(type.price) - 250}</div>
                    </Radio>

                  </EachButton>
                  :
                  ('')
              );
            })}

            {reviewTicketType ? 
              <ReviewTicketType price={price} />
              : ('')
            }
        
          </Buttons>

        </Radio.Group>
      </>) : ('')}
    </>
  );
}

// Com o valueId escolhido uma function poderá enviar esse número como ticketId para criar o ticket do usuário

const Title = styled.div`
  font-size: 30px;
  color: black;
  margin-bottom: 40px;
`;

const Subtitle = styled.div`
  font-size: 20px;
  color: gray;
  margin: 10px 0 10px 0;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;

  .type {
  color: black;
  margin: 3px;
}

  .price {
  color: gray;
  margin: 3px;
}
`;

const EachButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 145px;
  height: 145px;
  border: 1px solid #CECECE;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
  margin:  10px 20px 10px 0;
`;

const BookingButton = styled.div`
  width: 162px;
  height: 37px;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border: 1px solid #CECECE;
  background-color: #E0E0E0;
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  scale: 0.95;
  cursor: pointer;

  &:hover {
    scale: 1;
  }

  &:active {
    transform: translateY(2px);
  }

  .button-text {
    font-size: 14px;
    color: #000000; 
  }
`;


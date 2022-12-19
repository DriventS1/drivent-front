import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../../../contexts/UserContext';
import useTicketType from '../../../hooks/api/useTicketType';
import { Radio } from 'antd';

export default function TicketType() {
  const { userData: data } = useContext(UserContext);  
  const { ticketType } =  useTicketType(data.user.id);
  console.log(ticketType);

  const [valueId, setValueId] = useState('');
  const [valueHotel, setValueHotel] = useState('');
  const [showOptions, setShowOptions] = useState(false);

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

                    <Radio value={type.id} onChange={e => setShowOptions(false)}>
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

                    <Radio value={type.id}>
                      <div className='type'>
                        { !type.isRemote && type.includesHotel? 'Com Hotel' : 'Sem Hotel'}
                      </div>
                      <div className='price'>+ R${type.price - 250}</div>
                    </Radio>

                  </EachButton>
                  :
                  ('')
              );
            })}
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


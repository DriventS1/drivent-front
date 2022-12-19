import { useState } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import PaymentForm from '../../../components/Payment/Payment';

export default function Payment() {
// A tabela ticketTypes precisa ser povoada pelas infos abaixo
  const types = [
    {
      id: 3,
      name: 'Online',
      price: 100,
      isRemote: true,
      includesHotel: false,
      createdAt: '2022-12-16T02:12:42.501Z',
      updatedAt: '2022-12-16T02:12:42.501Z'
    },
    {
      id: 2,
      name: 'Presencial',
      price: 600,
      isRemote: false,
      includesHotel: true,
      createdAt: '2022-12-16T02:12:42.501Z',
      updatedAt: '2022-12-16T02:12:42.501Z'
    },
    {
      id: 1,
      name: 'Presencial',
      price: 250,
      isRemote: false,
      includesHotel: false,
      createdAt: '2022-12-16T02:12:42.501Z',
      updatedAt: '2022-12-16T02:12:42.501Z'
    }
  ];

  const [valueId, setValueId] = useState('');
  const [valueHotel, setValueHotel] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  return (
    <Container>
      <div className='title'>Ingresso e pagamento</div>
      <PaymentForm/>
    </Container>
  );
}

// Com o valueId escolhido uma function poderá enviar esse número como ticketId para criar o ticket do usuário

const Container = styled.div`

.title {
  font-size: 30px;
  color: black;
  margin-bottom: 40px;
}

.subtitle {
  font-size: 20px;
  color: gray;
  margin: 10px 0 10px 0;
}

.buttons {
  display: flex;
  flex-direction: row;
}

.each-button {
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
}

.type {
  color: black;
  margin: 3px;
}

.price {
  color: gray;
  margin: 3px;
}

`;

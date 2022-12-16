import { useState } from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';

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
      <div className='subtitle'>Primeiro, escolha sua modalidade de ingresso</div>
      {/* A ideia da radio box aqui é salvar o id do ticketTypes (1, 2 ou 3) para a criação do ticket do usuário */}
      <div className='buttons'>

        {/* Na primeira parte ele poderá escolher entre o id 1 (presencial sem hotel) ou 3 (online com hotel)*/}
        <Radio.Group className='buttons' onChange={e => setValueId(e.target.value)} value={valueId}>
          <Radio className='each-button' value={3} onChange={e => setShowOptions(false)}>
            <div>Online</div>
            <div>R$100</div>
          </Radio>
          <Radio className='each-button' value={1} onChange={e => setShowOptions(true)}>
            <div>Presencial</div>
            <div>R$250</div>
          </Radio>
        </Radio.Group>

      </div>
      {/* Apenas se o usuário escolher o id 1 (presencial sem hotel) a opção seguinte irá aparecer, e só então ele poderá trocar para o id 2 (presencial com hotel) caso desejar */}
      <div>{showOptions ? 
        (<>
          <div className='subtitle'>Ótimo! Agora escolha sua modalidade de hospedagem</div>
          <Radio.Group className='buttons' onChange={e => setValueHotel(e.target.value)} valueHotel={valueId}>
            <Radio className='each-button' value={3} >
              <div>Sem hotel</div>
              <div>+ R$0</div>
            </Radio>
            <Radio className='each-button' value={2} >
              <div>Com hotel</div>
              <div>+ R$350</div>
            </Radio>
          </Radio.Group></>) : 
        ('')}</div>
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

import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import * as Payment from 'payment';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import { savePayment } from '../../../services/paymentApi';
import useTicket from '../../../hooks/api/useTicket';
import useToken from '../../../hooks/useToken';
import 'react-credit-cards/es/styles-compiled.css';

export default function PaymentMethod() {
  const token = useToken();
  const [focus, setFocus] = useState('');
  const [paymentData, setPaymentData] = useState({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
    focus: '',
  });
  const { ticket } = useTicket();

  async function sendPaymentData(event) {
    event.preventDefault();

    const body = {
      focus,
      ticketId: ticket.id,
      cardData: {
        ...paymentData,
        issuer: Payment.fns.cardType(paymentData.number),
      },
    };

    try {
      await savePayment(body, token);
      toast('Pagamento realizado com sucesso!');
    } catch (err) {
      toast('Não foi possível realizar o pagamento!');
    }
  }

  return (
    <PaymentSession>
      <SessionName>
        <h1>Pagamento</h1>
      </SessionName>

      <Form onSubmit={sendPaymentData}>
        <div>
          <Cards
            cvc={paymentData.cvc}
            expiry={paymentData.expiry}
            focused={focus}
            name={paymentData.name}
            number={paymentData.number}
          />
        </div>
        <CardData>
          <div style={{ height: '34%' }}>
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={(e) => setPaymentData({ ...paymentData, number: e.target.value })}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <span>e.g.: 49..., 51..., 36..., 37</span>
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={(e) => setPaymentData({ ...paymentData, name: e.target.value })}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <input
              style={{ width: '65%' }}
              type="tel"
              name="expiry"
              placeholder="Valid Trhu"
              onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
              onFocus={(e) => setPaymentData({ ...paymentData, focus: e.target.name })}
            />
            <input
              style={{ width: '30%' }}
              type="tel"
              name="cvc"
              placeholder="CVC"
              onChange={(e) => setPaymentData({ ...paymentData, cvc: e.target.value })}
              onFocus={(e) => setFocus(e.target.name)}
            />
          </div>
          <Button
            type="submit"
            style={{
              position: 'absolute',
              left: '0',
              bottom: '0',
            }}
            onClick={(e) => sendPaymentData(e)}
          >
            Finalizar pagamento
          </Button>
        </CardData>
      </Form>
    </PaymentSession>
  );
}

const PaymentSession = styled.div`
  height: 50%;
  width: 85%; 
  position: relative;
  margin-top: 40px;
  padding-bottom: 80px;
`;

const SessionName = styled.div`
  color: #b1b1b1;
  margin-bottom: 25px;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
  padding-bottom: 80px;
  position: relative;

  span {
    height: 20px;
    color: #b1b1b1;
    font-size: 15px;
  }
  input {
    height: 40px;
    width: 100%;
    border-radius: 5px;
    border: solid 1px #b1b1b1;
  }
`;

const CardData = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 35px;
`;

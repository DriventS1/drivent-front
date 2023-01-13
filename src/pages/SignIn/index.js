import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import useSignUpWithGitHub from '../../hooks/api/useGitHubSignUp';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codeParam, setCodeParam] = useState(false);
  const [gitHubEmail, setGitHubEmail] = useState(false);

  const { loadingSignIn, signIn } = useSignIn();
  const { loadingSignUp, signUpWithGitHub } = useSignUpWithGitHub();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  
  async function submit(event) {
    event.preventDefault();
    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  } 

  useEffect(async() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');
    setCodeParam(code);

    if(code && !gitHubEmail) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/auth`, { codeParam: code });
        setGitHubEmail(response.data);
      } catch (error) {
        toast('Fazendo login...');
      }
    }

    if(code && gitHubEmail) {
      //const body = { email: gitHubEmail };
      try {
        const userData = await signUpWithGitHub(gitHubEmail, null);
        localStorage.setItem('AccessToken', userData.token);
        setUserData(userData);
        navigate('/dashboard');
        toast('Login realizado com sucesso!');
      } catch (error) {
        toast('Não foi possível fazer o login outra vez!');
      }
    };
  }, [ gitHubEmail ]);

  async function loginWithGithub() {
    const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`;
    window.location.assign(GITHUB_URL);
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
        <Button 
          onClick={loginWithGithub}
          fullWidth disabled={loadingSignUp}
          style={{ backgroundColor: '#24292e', color: '#FFFFFF' }} 
        >
          <BsGithub style={{ color: '#FFFFFF', fontSize: '20px', marginRight: '15px' }}/>
          Continue com o GitHub
        </Button>
      </Row>
    </AuthLayout>
  );
}

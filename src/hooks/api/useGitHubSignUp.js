import useAsync from '../useAsync';

import * as userApi from '../../services/userApi';

export default function useSignUpWithGitHub() {
  const {
    loading: signUpLoading,
    error: signUpError,
    act: signUpWithGitHub,
  } = useAsync(userApi.signUpWithGitHub, false);

  return {
    signUpLoading,
    signUpError,
    signUpWithGitHub,
  };
}

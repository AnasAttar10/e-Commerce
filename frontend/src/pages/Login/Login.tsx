import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@components/common';
import { Input } from '@components/forms';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signInScheam, TSignIn } from '@validations/signInSchema';
import { useSignInMutation } from '@store/auth/authApi';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [signIn, { isLoading, error }] = useSignInMutation();
  let errMsg;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignIn>({ mode: 'onBlur', resolver: zodResolver(signInScheam) });
  const submit: SubmitHandler<TSignIn> = async (data) => {
    if (searchParams.get('message')) setSearchParams('');
    signIn(data)
      .unwrap()
      .then(() => navigate('/'));
  };
  if (error) {
    if ('status' in error) {
      errMsg = 'error' in error ? error.error : JSON.stringify(error.data);
    } else {
      errMsg = error?.message;
    }
  }

  return (
    <>
      <Heading title="Login" />
      {searchParams.get('message') && (
        <Alert variant="success">{searchParams.get('message')}</Alert>
      )}
      <Form onSubmit={handleSubmit(submit)}>
        <Input
          lable="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          lable="password"
          name="password"
          register={register}
          error={errors.password?.message}
        />
        <Button variant="primary" type="submit">
          {isLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            'Submit'
          )}
        </Button>
        {error && (
          <p style={{ color: '#FF3333', margin: '10px 0' }}>{errMsg}</p>
        )}
      </Form>
    </>
  );
};

export default Login;

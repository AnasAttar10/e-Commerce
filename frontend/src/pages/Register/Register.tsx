import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Heading } from '@components/common';
import { Form, Button } from 'react-bootstrap';
import { signUpSchema, TSignUp } from '@validations/signUpSchema';
import { Input } from '@components/forms';
import useCheckingEmail from '@hooks/useCheckingEmail';
import { useSignUpMutation } from '@store/auth/authApi';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const { enteredEmail, emailStatus, handleCheckingEmail, reset } =
    useCheckingEmail();
  const [signUp] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<TSignUp>({ mode: 'onBlur', resolver: zodResolver(signUpSchema) });
  const onSubmit: SubmitHandler<TSignUp> = async (data) => {
    signUp(data)
      .unwrap()
      .then(() => navigate('/login?message=account_created'));
  };
  const handleEmailOnBlue = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger('email');
    const value = e.target.value;
    const { isDirty, invalid } = getFieldState('email');
    if (isDirty && !invalid && enteredEmail !== value) {
      // checking
      handleCheckingEmail(value);
    }
    // to fix , if you entered vaild email then enterd invalid email then enterd the same valid email
    if (isDirty && invalid && enteredEmail) {
      reset();
    }
  };
  return (
    <>
      <Heading title="Your Registration " />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          lable="First Name"
          register={register}
          error={errors.firstName?.message}
        />
        <Input
          name="lastName"
          lable="last Name"
          register={register}
          error={errors.lastName?.message as string}
        />
        <Input
          name="email"
          lable="email"
          register={register}
          error={
            errors.email?.message
              ? (errors.email?.message as string)
              : emailStatus === 'notAvailble'
                ? 'This email is already existent'
                : emailStatus === 'failed'
                  ? 'Error from server'
                  : ''
          }
          onBlue={handleEmailOnBlue}
          formText={
            emailStatus === 'checking'
              ? "we're curently checking the availabilty of this email address , please wait a moment"
              : ''
          }
          succsess={
            emailStatus === 'availble' ? 'This email is available to use ' : ''
          }
          disapled={emailStatus === 'checking'}
        />
        <Input
          name="password"
          lable="password"
          type="password"
          register={register}
          error={errors.password?.message as string}
        />
        <Input
          name="confirmPassword"
          lable="Confirm Password"
          type="password"
          register={register}
          error={errors.confirmPassword?.message as string}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;

import { Form } from 'react-bootstrap';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

type TInput<T extends FieldValues> = {
  lable: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
  onBlue?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  succsess?: string;
  disapled?: boolean;
};
const Input = <T extends FieldValues>({
  name,
  lable,
  type = 'text',
  register,
  error,
  onBlue,
  formText,
  succsess,
  disapled,
}: TInput<T>) => {
  const handleOnBlue = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlue) {
      onBlue(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label>{lable}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        onBlur={handleOnBlue}
        isInvalid={!!error}
        isValid={!!succsess}
        disabled={disapled}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
      {succsess && (
        <Form.Control.Feedback type="valid">{succsess}</Form.Control.Feedback>
      )}
      {formText && <Form.Text>{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;

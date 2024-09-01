import { BASE_URL } from '@util/constatns';
import axios from 'axios';
import { useState } from 'react';

type TEmailStatus = 'idle' | 'checking' | 'availble' | 'notAvailble' | 'failed';
const useCheckingEmail = () => {
  const [enteredEmail, setEnterdEmail] = useState<null | string>(null);
  const [emailStatus, setEmailStatus] = useState<TEmailStatus>('idle');
  const handleCheckingEmail = async (email: string) => {
    setEnterdEmail(email);
    setEmailStatus('checking');
    try {
      const { data } = await axios.get(`${BASE_URL}users?email=${email}`);
      if (!data.length) {
        setEmailStatus('availble');
      } else {
        setEmailStatus('notAvailble');
      }
    } catch (error) {
      setEmailStatus('failed');
    }
  };
  const reset = () => {
    setEmailStatus('idle');
    setEnterdEmail(null);
  };
  return { enteredEmail, emailStatus, handleCheckingEmail, reset };
};
export default useCheckingEmail;

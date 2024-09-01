import { z } from 'zod';

const signInScheam = z.object({
  email: z
    .string()
    .min(1, { message: 'email address is required ' })
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters longs' })
    .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
      message: 'Password should contain at least 1 special character',
    }),
});
type TSignIn = z.infer<typeof signInScheam>;
export { signInScheam, type TSignIn };

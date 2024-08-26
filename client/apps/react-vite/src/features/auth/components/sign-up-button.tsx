import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

export const SignupButton = () => {
  return (
    <Link to="/login" className={buttonVariants({ variant: 'outline' })}>
      Sign up
    </Link>
  );
};

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

export const SignupButton = () => {
  return (
    <Link to="/sign-up" className={buttonVariants({ variant: 'outline' })}>
      Sign up
    </Link>
  );
};

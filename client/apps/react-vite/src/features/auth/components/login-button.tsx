import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/components/ui/link';

export const LoginButton = () => {
  return (
    <Link to="/login" className={buttonVariants({ variant: 'ghost' })}>
      Login
    </Link>
  );
};

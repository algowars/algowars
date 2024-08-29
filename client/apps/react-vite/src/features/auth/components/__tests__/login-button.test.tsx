import { renderApp, screen, userEvent, waitFor } from '@/testing/test-utils';
import { LoginButton } from '../login-button';

test('should navigate to the login route when pressed', async () => {
  await renderApp(<LoginButton />, { user: null, path: '/login' });

  expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
});

test('should navigate to the login route when pressed', async () => {
  await renderApp(<LoginButton />, { user: null, path: '/login' });

  await userEvent.click(screen.getByRole('link', { name: /login/i }));

  await waitFor(() => expect(window.location.pathname).toBe('/login'));
});

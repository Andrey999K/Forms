import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthTextLink } from './AuthTextLink';

describe('AuthTextLink Component', () => {
  test('renders link text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AuthTextLink linkText="Click here" linkTo="/register" />
      </MemoryRouter>
    );

    expect(getByText('Click here')).toBeInTheDocument();
  });

  test('renders additional text when provided', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AuthTextLink text="Already have an account?" linkText="Log in" linkTo="/login" />
      </MemoryRouter>
    );

    expect(getByText('Already have an account?')).toBeInTheDocument();
  });

  test('does not render additional text when not provided', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <AuthTextLink linkText="Sign up" linkTo="/signup" />
      </MemoryRouter>
    );

    expect(queryByText('Already have an account?')).not.toBeInTheDocument();
  });
});

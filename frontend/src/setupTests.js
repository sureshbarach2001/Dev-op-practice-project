import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Ensure correct import
import '@testing-library/jest-dom';
import Home from './Home';

global.TextEncoder = class {
    encode(input) {
        return new Uint8Array(input.length);
    }
    decode() {
        return '';
    }
};

test('renders Home component with heading and paragraph', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check for the heading
  const headingElement = screen.getByRole('heading', { name: /welcome to the home page/i });
  expect(headingElement).toBeInTheDocument();

  // Check for the paragraph
  const paragraphElement = screen.getByText(/this is the main page of your website\./i);
  expect(paragraphElement).toBeInTheDocument();
});

test('renders Login and Sign Up links with correct hrefs', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  // Check for the Login link
  const loginLink = screen.getByRole('link', { name: /login/i });
  expect(loginLink).toBeInTheDocument();
  expect(loginLink).toHaveAttribute('href', '/login');

  // Check for the Sign Up link
  const signUpLink = screen.getByRole('link', { name: /sign up/i });
  expect(signUpLink).toBeInTheDocument();
  expect(signUpLink).toHaveAttribute('href', '/signup');
});

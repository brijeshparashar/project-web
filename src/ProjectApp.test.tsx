import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectApp from './ProjectApp';

test('check if Save Project button exists', () => {
  render(<ProjectApp />);
  const linkElement = screen.getByText("Save Project");
   expect(linkElement).toBeInTheDocument();
});



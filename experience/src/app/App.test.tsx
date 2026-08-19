import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renderiza el título y los elementos principales', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Un pequeño mundo para ti');
    expect(screen.getByRole('button', { name: /rosa azul/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pollito/i })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
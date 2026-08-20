import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renderiza la entrada y los elementos principales', () => {
    render(<App />);

    expect(screen.getByText(/Para Pri/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /rosa azul/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /pollito/i })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
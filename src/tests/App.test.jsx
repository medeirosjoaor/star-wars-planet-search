import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockedData from './mockedData';
import App from '../App';

describe('testa o componente App', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockedData),
    }));
  })

  it('deve renderizar apenas 2 planetas', async () => {
    render(<App />);

    userEvent.type(screen.getByTestId('name-filter'), 'oo');

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(3);
    })
  });

  it('deve remover corretamente o filtro', async () => {
    render(<App />);

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'rotation_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    userEvent.type(screen.getByTestId('value-filter'), '24');
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(4);
    })

    userEvent.click(screen.getByRole('button', { name: /x/i }));

    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('deve remover corretamente os filtros', async () => {
    render(<App />);

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'orbital_period');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'menor que');
    userEvent.type(screen.getByTestId('value-filter'), '1000');
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));

    userEvent.selectOptions(screen.getByTestId('column-filter'), 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'maior que');
    userEvent.type(screen.getByTestId('value-filter'), '1000000');
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(6);
    })

    userEvent.click(screen.getByRole('button', { name: /remover filtros/i }));

    expect(screen.getAllByRole('row')).toHaveLength(11);
  });

  it('deve ordenar os planetas de forma crescente', async () => {
    render(<App />);

    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
    userEvent.click(screen.getByTestId('column-sort-input-asc'));
    userEvent.click(screen.getByRole('button', { name: /ordenar/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(11);
      expect(screen.getAllByRole('row')[1]).toHaveTextContent('Yavin IV');
    })
  });

  it('deve ordenar os planetas de forma decrescente', async () => {
    render(<App />);

    userEvent.selectOptions(screen.getByTestId('column-sort'), 'population');
    userEvent.click(screen.getByTestId('column-sort-input-desc'));
    userEvent.click(screen.getByRole('button', { name: /ordenar/i }));

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(11);
      expect(screen.getAllByRole('row')[1]).toHaveTextContent('Coruscant');
    })
  });
});

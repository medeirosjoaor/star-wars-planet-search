import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import PlanetsContext from '../context';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function fetchResults() {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();

      setPlanets(results.map((result) => {
        delete result.residents;

        return result;
      }));
    }

    fetchResults();
  }, []);

  function handleChange({ target: { value } }) {
    setInput(value);
  }

  const filtered = planets.filter(({ name }) => name.toLowerCase().includes(input));

  return (
    <PlanetsContext.Provider value={ { filtered, input, handleChange } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default PlanetsProvider;

import React from 'react';
import PlanetsProvider from './provider/PlanetsProvider';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Buttons from './components/Buttons';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <SearchBar />
      <FilterBar />
      <Buttons />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

import React from 'react';
import PlanetsProvider from './provider/PlanetsProvider';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <SearchBar />
      <FilterBar />
      <Table />
    </PlanetsProvider>
  );
}

export default App;

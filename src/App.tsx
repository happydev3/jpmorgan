import React, { useState, useEffect } from 'react';
import './App.css';
import FinancialTable from './components/FinancialTable';
import { FetchFinancialData } from './services';

interface FinancialInstrument {
  ticker: string;
  price: number;
  assetClass: string;
}

function App() {
  const [instruments, setInstruments] = useState<FinancialInstrument[]>([]);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = FetchFinancialData();
        setInstruments(response);
      } catch (error) {
        console.log('Error fetching instruments:', error);
      }
    };

    fetchInstruments();
  }, []);

  return (
    <div className="App">
      <h1>Financial Instruments</h1>
      <FinancialTable data={instruments} />
    </div>
  );
}

export default App;

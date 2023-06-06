import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FinancialTable from './components/FinancialTable';

// Mock data for testing
const mockData = [
  { ticker: 'AAPL', price: 150.0, assetClass: 'Equity' },
  { ticker: 'GOOGL', price: 2500.0, assetClass: 'Equity' },
  { ticker: 'MSFT', price: 300.0, assetClass: 'Equity' },
];

describe('FinancialTable', () => {
  it('renders the table with correct data', () => {
    const { getByText } = render(<FinancialTable data={mockData} />);
    
    // Verify that the table headers are rendered
    expect(getByText('Ticker')).toBeInTheDocument();
    expect(getByText('Price')).toBeInTheDocument();
    expect(getByText('Asset Class')).toBeInTheDocument();
    
    // Verify that the table rows are rendered with correct data
    expect(getByText('AAPL')).toBeInTheDocument();
    expect(getByText('150.00')).toBeInTheDocument();
    expect(getByText('Equity')).toBeInTheDocument();
    
    expect(getByText('GOOGL')).toBeInTheDocument();
    expect(getByText('2500.00')).toBeInTheDocument();
    expect(getByText('Equity')).toBeInTheDocument();
    
    expect(getByText('MSFT')).toBeInTheDocument();
    expect(getByText('300.00')).toBeInTheDocument();
    expect(getByText('Equity')).toBeInTheDocument();
  });

  it('updates the table based on search input', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <FinancialTable data={mockData} />
    );
    
    // Enter a search value and verify that the table updates accordingly
    const searchInput = getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'AAPL' } });
    expect(queryByText('AAPL')).toBeInTheDocument();
    expect(queryByText('GOOGL')).not.toBeInTheDocument();
    expect(queryByText('MSFT')).not.toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'Equity' } });
    expect(queryByText('AAPL')).toBeInTheDocument();
    expect(queryByText('GOOGL')).toBeInTheDocument();
    expect(queryByText('MSFT')).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'XYZ' } });
    expect(queryByText('AAPL')).not.toBeInTheDocument();
    expect(queryByText('GOOGL')).not.toBeInTheDocument();
    expect(queryByText('MSFT')).not.toBeInTheDocument();
  });

  it('sorts the table based on column click', () => {
    const { getByText, getAllByRole } = render(<FinancialTable data={mockData} />);
    
    // Verify the initial sorting order
    const priceCells = getAllByRole('cell', { name: 'Price' });
    expect(priceCells[0]).toHaveTextContent('150.00');
    expect(priceCells[1]).toHaveTextContent('2500.00');
    expect(priceCells[2]).toHaveTextContent('300.00');

    // Click on the Price column to change the sorting order
    fireEvent.click(getByText('Price'));
    
    // Verify the updated sorting order
    expect(priceCells[0]).toHaveTextContent('2500.00');
    expect(priceCells[1]).toHaveTextContent('300.00');
    expect(priceCells[2]).toHaveTextContent('150.00');
  });
});
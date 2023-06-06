import React, { useEffect, useState } from 'react';
import { FinancialInstrument, FinancialTableProps } from '../models';

const FinancialTable: React.FC<FinancialTableProps> = ({ data }) => {
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<string>('asc');
    const [instruments, setInstruments] = useState<FinancialInstrument[]>(data);
    const [searchVal, setSearchVal] = useState<any>('');

    const handleSort = (column: string) => {
        setSortColumn(column);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        const result = data.filter((e) => e.ticker.toLowerCase().includes(searchVal.toLowerCase()) || e.assetClass.toLowerCase().includes(searchVal.toLowerCase()) || e.price.toString().includes(searchVal));
        setInstruments(result);
    }, [searchVal]);

    const sortData = (instruments: FinancialInstrument[]) => {
        if (sortColumn === 'Asset Class') {
            return instruments.sort((a, b) => {
                const assetClassA = a.assetClass.toLowerCase();
                const assetClassB = b.assetClass.toLowerCase();
                if (assetClassA < assetClassB) return -1;
                if (assetClassA > assetClassB) return 1;
                return 0;
            });
        } else if (sortColumn === 'Price') {
            return instruments.sort((a, b) => {
                return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
            });
        } else if (sortColumn === 'Ticker') {
            return instruments.sort((a, b) => {
                const tickerA = a.ticker.toLowerCase();
                const tickerB = b.ticker.toLowerCase();
                if (tickerA < tickerB) return -1;
                if (tickerA > tickerB) return 1;
                return 0;
            });
        }
        return instruments;
    };

    const handleSearch = (val: String) => {
        setSearchVal(val);
    }

    const sortedData = sortData(instruments);

    return (
        <div className='container'>
            <div className='search-container'>
                <input type="text" placeholder="Search..." value={searchVal} onChange={(ev) => handleSearch(ev.target.value)}></input>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('Ticker')}>Ticker</th>
                        <th onClick={() => handleSort('Price')}>Price</th>
                        <th onClick={() => handleSort('Asset Class')}>Asset Class</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item) => (
                        <tr key={item.ticker}>
                            <td>{item.ticker}</td>
                            <td className={item.price >= 0 ? 'positive' : 'negative'}>
                                {item.price.toFixed(2)}
                            </td>
                            <td className={item.assetClass.toLowerCase()}>{item.assetClass}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinancialTable;
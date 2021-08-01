import { NextPage } from 'next';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button, Container, FormControl, InputGroup, Navbar, Table } from 'react-bootstrap';
import Link from 'next/link';

import { Stock } from '../models/Stock';
import AutoComplete from '../components/AutoComplete';

const baseURL = 'http://localhost:8000/api';

const Home: NextPage = () => {
  const [tableData, setTableData] = useState<Stock[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const getStock = async (ticker: string): Promise<void> => {
    try {
      const response: AxiosResponse<Stock> = await axios.get<Stock>(`${baseURL}/stock/${ticker.toUpperCase()}`);
      setTableData([response.data]);
    } catch (error) {
      throw error;
    }
  };

  const handleSearch = () => {
    try {
      void getStock(searchInput);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="Home">
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand>Stocks</Navbar.Brand>
        </Container>
      </Navbar>

      <AutoComplete />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Company</th>
            <th>Sector</th>
            <th>Industry</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((stock: Stock) => (
            <tr key={stock.ticker}>
              <td>
                <Link href={`/stock/${encodeURIComponent(stock.ticker)}`}>
                  <a>{stock.ticker}</a>
                </Link>
              </td>
              <td>{stock.company}</td>
              <td>{stock.sector}</td>
              <td>{stock.industry}</td>
              <td>{stock.price}</td>
              <td>{stock.volume}</td>
              <td>{stock.change}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;

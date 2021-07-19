import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button, Container, FormControl, InputGroup, Navbar, Table } from 'react-bootstrap';
import Link from 'next/link';

import { Stock } from '../models/Stock';

const baseURL = 'http://localhost:8000/api';

const Home: React.FC = () => {
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

  const handleSearch = async (): Promise<void> => {
    try {
      getStock(searchInput);
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

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Stock ticker"
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <Button variant="outline-primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

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

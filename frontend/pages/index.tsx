import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Table } from 'react-bootstrap';
import { Stock } from '../models/Stock';

import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = 'http://localhost:8000/api';

export default function Home() {
  const [tableData, setTableData] = useState<Stock[]>([]);

  const getStock = async (): Promise<void> => {
    try {
      const response: AxiosResponse<Stock> = await axios.get<Stock>(`${baseURL}/stock/GM`);
      setTableData([response.data]);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    void getStock();
  }, []);

  return (
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
            <td>{stock.ticker}</td>
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
  );
}

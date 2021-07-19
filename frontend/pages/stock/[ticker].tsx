import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { Stock } from '../../models/Stock';

const baseURL = 'http://localhost:8000/api';

const StockComponent: React.FC = () => {
  const router = useRouter();
  const { ticker } = router.query;
  const [stockData, setStockData] = useState<Stock>();

  const getStock = async (ticker: string): Promise<void> => {
    try {
      const response: AxiosResponse<Stock> = await axios.get<Stock>(`${baseURL}/stock/${ticker.toUpperCase()}`);
      setStockData(response.data);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (ticker) {
      void getStock(ticker as string);
    }
  }, [ticker]);

  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '24rem' }}>
            <Card.Header>{stockData?.ticker}</Card.Header>
            <Card.Body>
              <Card.Title>{stockData?.company}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{stockData?.country}</Card.Subtitle>

              <Card.Text>Industry: {stockData?.industry}</Card.Text>
              <Card.Text>Sector: {stockData?.sector}</Card.Text>
              <Card.Text>Price: {stockData?.price}</Card.Text>
              <Card.Text>Volume: {stockData?.volume}</Card.Text>
              <Card.Text>Change: {stockData?.change}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StockComponent;

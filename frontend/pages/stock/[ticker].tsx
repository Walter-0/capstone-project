import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';
import { Card, Col, Container, Row } from 'react-bootstrap';

import { Stock as StockModel } from '../../models/Stock';
import NavbarComponent from '../components/NavbarComponent';

const baseURL = 'http://localhost:8000/api';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const response: AxiosResponse<StockModel> = await axios.get<StockModel>(
    `${baseURL}/stock/${context.params?.ticker as string}`
  );
  const stock = response.data;

  if (!stock) {
    return {
      notFound: true,
    };
  }

  return {
    props: { stock },
  };
};

const Stock: NextPage<{ stock: StockModel }> = ({ stock }) => {
  const { ticker, company, country, industry, sector, price, volume, change } = stock;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavbarComponent />

      <Container>
        <Row>
          <Col>
            <Card style={{ width: '24rem' }}>
              <Card.Header>{ticker}</Card.Header>
              <Card.Body>
                <Card.Title>{company}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{country}</Card.Subtitle>

                <Card.Text>Industry: {industry}</Card.Text>
                <Card.Text>Sector: {sector}</Card.Text>
                <Card.Text>Price: {price}</Card.Text>
                <Card.Text>Volume: {volume}</Card.Text>
                <Card.Text>Change: {change}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Link href={`/`}>
            <a>Back</a>
          </Link>
        </Row>
      </Container>
    </>
  );
};

export default Stock;

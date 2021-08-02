import { NextPage } from 'next';
import { Container, Navbar } from 'react-bootstrap';

import AutoComplete from '../components/AutoComplete';

const baseURL = 'http://localhost:8000/api';

const Home: NextPage = () => {
  return (
    <div className="Home">
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand>Stocks</Navbar.Brand>
        </Container>
      </Navbar>

      <AutoComplete />
    </div>
  );
};

export default Home;

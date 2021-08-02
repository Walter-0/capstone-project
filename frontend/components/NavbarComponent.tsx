import Link from 'next/link';
import { Container, Navbar } from 'react-bootstrap';

const NavbarComponent: React.FC = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link href={`/`}>Stocks</Link>
        </Navbar.Brand>
        <Link href={`/industries`}>
          <a>Industries</a>
        </Link>

        <Link href={`/`}>
          <a>Top 10 by Volume</a>
        </Link>

        <Link href={`/`}>
          <a>Top 10 Gainers by Industry</a>
        </Link>

        <Link href={`/`}>
          <a>Top 10 Highest Market Cap by Industry</a>
        </Link>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

import { NextPage } from 'next';
import Link from 'next/link';

import AutoComplete from '../components/AutoComplete';
import NavbarComponent from '../components/NavbarComponent';

const baseURL = 'http://localhost:8000/api';

const Home: NextPage = () => {
  return (
    <div className="Home">
      <NavbarComponent />

      <AutoComplete />
    </div>
  );
};

export default Home;

import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';
import axios, { AxiosResponse } from 'axios';

import NavbarComponent from '../components/NavbarComponent';

const baseURL = 'http://localhost:8000/api';

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const response: AxiosResponse<string[]> = await axios.get<string[]>(`${baseURL}/industries`);
  const industries = response.data;

  return {
    props: { industries },
  };
};

const Industries: NextPage<{ industries: string[] }> = ({ industries }) => {
  return (
    <>
      <NavbarComponent />
      <ul>
        {industries.map(industry => (
          <li key={industry}>{industry}</li>
        ))}
      </ul>
    </>
  );
};

export default Industries;

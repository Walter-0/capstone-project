import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Container, Navbar, Table } from 'react-bootstrap';
import Link from 'next/link';

import { Stock } from '../models/Stock';

const baseURL = 'http://localhost:8000/api';

const AutoComplete: React.FC = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<Stock[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState('');

  const searchStocks = async (query: string) => {
    if (query) {
      const response: AxiosResponse<Stock[]> = await axios.get<Stock[]>(`${baseURL}/stocks/search?q=${query}`);
      const suggestions = response.data;
      setFilteredSuggestions(suggestions);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void searchStocks(e.target.value);
    setInput(e.target.value);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setFilteredSuggestions([]);
    setInput(e.currentTarget.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // User pressed the enter key
    if (e.code === 'Enter') {
      setInput(filteredSuggestions[activeSuggestionIndex].ticker + filteredSuggestions[activeSuggestionIndex].company);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
    }
    // User pressed the up arrow
    else if (e.code === 'ArrowUp') {
      if (activeSuggestionIndex === 0) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.code === 'ArrowDown') {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }

      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul>
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = 'suggestion-active';
          }
          return (
            <li className={className} key={suggestion.ticker} onClick={onClick}>
              <Link href={`/stock/${encodeURIComponent(suggestion.ticker.toUpperCase())}`}>
                <a>
                  {suggestion.ticker} {''} {suggestion.company}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions</em>
      </div>
    );
  };

  return (
    <>
      <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={input} style={{ width: '25rem' }} />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoComplete;

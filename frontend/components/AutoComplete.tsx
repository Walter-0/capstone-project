import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { Stock } from '../models/Stock';

const baseURL = 'http://localhost:8000/api';

const AutoComplete: React.FC = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState('');

  const searchStocks = async (query: string) => {
    if (query) {
      const response: AxiosResponse<Stock[]> = await axios.get<Stock[]>(`${baseURL}/stocks/search/?q=${query}`);
      const suggestions = response.data.map(stock => {
        return `${stock.ticker} - ${stock.company}`;
      });
      setFilteredSuggestions(suggestions);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    void searchStocks(e.target.value);
    setInput(e.target.value);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setFilteredSuggestions([]);
    setInput(e.currentTarget.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    // User pressed the enter key
    if (e.code === 'Enter') {
      setInput(filteredSuggestions[activeSuggestionIndex]);
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
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = 'suggestion-active';
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
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
      <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={input} />
      {showSuggestions && input && <SuggestionsListComponent />}
    </>
  );
};
export default AutoComplete;

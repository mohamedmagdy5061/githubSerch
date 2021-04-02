import React, {
  useState,
  useCallback,
  useEffect,
  ChangeEvent,
  memo,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import { RiCloseCircleFill } from 'react-icons/ri';
import githubLogo from '../assets/svgs/github.svg';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import debounce from 'lodash/debounce';
import { useSelector, useDispatch } from 'react-redux';
import { fechData } from '../store/actions/DataFetchActions';
import { SearchOption } from '../types';

const override = css`
  position: absolute;
  right: 120px;
  top: 15px;
`;

const options: SearchOption[] = ['users', 'repositories'];

const SearchBox: React.FC = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState<string>('');
  const [loadSpinner, setLoadSpinner] = useState<boolean>(false);
  const [debounceValue, setDebounceValue] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<SearchOption>('users');
  const { searchParams, isError } = useSelector((state: any) => state.fetchedData);

  const handleClearInput = () => {
    setSearchInput('');
    dispatch({ type: 'RESET_FETCHIN' });
  };

  const handleSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(value as SearchOption);
    if (searchInput?.length < 3) {
      setSearchInput('');
      dispatch({ type: 'RESET_FETCHIN' });
    } else {
      dispatch({ type: 'RESET_FETCHIN' });
      dispatch(fechData(value as SearchOption, debounceValue || searchInput));
    }
  };

  const debounceHandler = useCallback(
    debounce((value) => {
      setDebounceValue(value);
      setLoadSpinner(false);
    }, 1000),
    []
  );

  const onchangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const {
        target: { value },
      } = event;
      setLoadSpinner(true);
      setSearchInput(value);
      debounceHandler(value);
    },
    [debounceHandler]
  );

  const fetchGitHubSearchResults = (debounceValue: string) => {
    dispatch(fechData(selectedOptions, debounceValue || searchInput));
  };

  useEffect(() => {
    if (debounceValue.length > 3) {
      fetchGitHubSearchResults(debounceValue);
    }
    if(debounceValue && debounceValue !== searchParams.searchKeyWord){
      dispatch({ type: 'RESET_FETCHIN' });
     }
  }, [debounceValue]);

  useEffect(() => {
    setSearchInput(searchParams.searchKeyWord);
    setSelectedOptions(searchParams.type);
  }, []);

  return (
    <div className="searchBox__container">
      <div className="search__header">
        <span className="search__header__icon">
          <img
            style={{ width: '40px' }}
            src={githubLogo}
            className="App-logo"
            alt="github"
          />
        </span>
        <div className="search__header__title">
          <div>GitHub Searcher</div>
          <span>Search user or repositories below</span>
        </div>
      </div>
      <div className="input-group__item">
        <span className="input-group__item__left-icon">
          <BsSearch />
        </span>
        <input
          className="text-input"
          type="text"
          placeholder="Start typing to search.."
          value={searchInput}
          onChange={onchangeHandler}
        />


        <div className="input-group__item__select">
          {searchInput && (
            <>
              {!loadSpinner && (
                <button
                  className="input-group__item__right-icon button--icons"
                  onClick={handleClearInput}
                >
                  <RiCloseCircleFill />
                </button>
              )}
              {loadSpinner && (
                <ClipLoader
                  color={'#f64e60'}
                  loading={true}
                  css={override}
                  size={15}
                />
              )}
            </>
          )}
          <select
            name="searchOption"
            id="searchOption"
            className="select"
            value={selectedOptions}
            onChange={handleSelectOption}
          >
            {options.map((option) => (
              <option className="options" key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
     {isError && <span className="search__error">{isError}</span>}
    </div>
  );
};

export default memo(SearchBox);

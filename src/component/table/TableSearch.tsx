import { useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Select, { IOption } from "../Select";

interface IProps {
  searchBy: IOption[];
  onSearch: (value: ISearch) => void;
  currentSearch: ISearch;
}

const DONE_TYPING_TIMER = 1000;

export interface ISearch {
  keyword: string | null;
  value: string | null;
}

const TableSearch = (props: IProps) => {
  const { searchBy, onSearch, currentSearch } = props;
  const defaultKeyword = searchBy[0];
  const typingTimer = useRef<any>();

  const [searchValue, setSearchValue] = useState<ISearch>({
    keyword: defaultKeyword.value as string | null,
    value: "",
  });

  const onKeywordChange = useCallback((key: string | number) => {
    setSearchValue((prevSearch) => {
      return {
        ...prevSearch,
        keyword: key as string | null,
      };
    });
  }, []);

  const onValueChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue((prevSearch) => {
        return {
          ...prevSearch,
          value: event.target.value,
        };
      });
    },
    []
  );

  const onSearchSubmit = useCallback(() => {
    onSearch(searchValue);
  }, [onSearch, searchValue]);

  const onKeyDown = useCallback(() => {
    clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(onSearchSubmit, DONE_TYPING_TIMER);
  }, [onSearchSubmit]);

  return (
    <SearchContainer>
      <SearchByText>Search by:</SearchByText>
      <SearchInput>
        <Select
          onChange={onKeywordChange}
          options={searchBy}
          defaultValue={currentSearch.keyword ?? ""}
        />
        <Input
          defaultValue={currentSearch.value ?? ""}
          onKeyUp={onKeyDown}
          onChange={onValueChange}
          placeholder="Your key word"
        />
      </SearchInput>
    </SearchContainer>
  );
};

export default TableSearch;

//
const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-items: center;
`;
const SearchInput = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  padding: 10px;
  align-items: center;
  border: 1px solid;
  border-radius: 10px;
`;

const SearchByText = styled.div`
  margin-right: 10px;
`;

const Input = styled.input`
  padding: 5px;
  border: none;
  padding: 10px 0px 10px;
  margin-left: 10px;
  &:focus-visible {
    border: none;
    outline: none;
  }
`;

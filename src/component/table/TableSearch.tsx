import { useState, useCallback } from "react";
import styled from "styled-components";
import { Icons } from "../../constants/icons";
import Select, { IOption } from "../Select";

interface IProps {
  searchBy: IOption[];
  onSearch: (value: ISearch) => void;
}

export interface ISearch {
  keyword: string | null;
  value: string | null;
}

const TableSearch = (props: IProps) => {
  const { searchBy, onSearch } = props;
  const defaultKeyword = searchBy[0];

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
    (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <SearchContainer>
      <SearchByText>Search by:</SearchByText>
      <SearchInput>
        <Select onChange={onKeywordChange} options={searchBy} />
        <Input onChange={onValueChange} placeholder="Your key word" />
        <Icon onClick={onSearchSubmit}>
          <Image src={Icons.search} />
        </Icon>
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
  margin-bottom: 10px;
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

const Icon = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 2px;
`;

const Image = styled.img`
  display: inline-block;
`;

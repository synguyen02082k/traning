import { useMemo, useCallback, useState, useEffect } from "react";
import TableData from "../../component/table/table";
import Toggle from "../../component/toggle";
import { useGetAllUserQuery, User } from "../../generated/graphql";
import { useSearchParams } from "react-router-dom";
import TableSearch, { ISearch } from "../../component/table/TableSearch";

const columns = [
  {
    key: "fullName",
    label: "Full name",
  },
  {
    key: "age",
    label: "Age",
  },
  {
    key: "active",
    label: "Active",
    align: "center",
    renderColumn: (value: boolean) => <Toggle status={value} size={18} />,
  },
];

const searchBy = [
  {
    title: "Full name",
    value: "fullName",
  },
];

const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchData, setSearchData] = useState<ISearch & { perPage: number }>({
    keyword: null,
    value: null,
    perPage: 20,
  });

  const updateSearchData = useCallback(() => {
    const keyword = searchParams.get("searchBy");
    const value = searchParams.get("searchValue");
    const perPage = Number.parseInt(searchParams.get("perPage") ?? "20");
    setSearchData({
      keyword: keyword,
      value: value,
      perPage: perPage,
    });
  }, [searchParams]);

  useEffect(() => {
    updateSearchData();
  }, [updateSearchData]);

  const { data, fetchMore, loading } = useGetAllUserQuery({
    variables: {
      input: {
        perPage: searchData.perPage,
        page: 1,
        search: {
          keyword: searchData.keyword as string,
          value: searchData.value,
        },
      },
    },
  });

  const listUser: User[] = useMemo(() => {
    return (data?.["GetAllUser"]?.users ?? []) as User[];
  }, [data]);

  const totalCount = useMemo(() => {
    return data?.["GetAllUser"]?.totalCount as number;
  }, [data]);

  const onSearch = useCallback(
    (value: ISearch) => {
      searchParams.delete("page");
      searchParams.delete("perPage");
      searchParams.set("searchBy", value.keyword ?? "");
      searchParams.set("searchValue", value.value ?? " ");
      setSearchParams(searchParams);
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        ...value,
      }));
    },
    [searchParams, setSearchParams]
  );

  const setPerPage = useCallback(
    (perPage: number | string) => {
      searchParams.set("perPage", perPage.toString());
      setSearchParams(searchParams);
      setSearchData((prevSearchData) => ({
        ...prevSearchData,
        perPage: perPage as number,
      }));
    },
    [searchParams, setSearchParams]
  );

  const fetchPageData = useCallback(
    (page: number) => {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
      setCurrentPage(page);

      fetchMore({
        variables: {
          input: {
            perPage: searchData.perPage,
            search: {
              keyword: searchData.keyword,
              value: searchData.value,
            },
            page,
          },
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => {
          const _typename = previousQueryResult.__typename;
          const {
            page,
            perPage,
            totalPage,
            totalCount,
            users: fetchMoreUsers,
            __typename,
          } = fetchMoreResult.GetAllUser ?? {};
          return {
            __typename: _typename,
            GetAllUser: {
              __typename,
              page,
              perPage,
              totalPage,
              totalCount,
              users: fetchMoreUsers,
            },
          };
        },
      });
    },
    [fetchMore, searchData, searchParams, setSearchParams]
  );

  return (
    <>
      <TableSearch onSearch={onSearch} searchBy={searchBy} />
      <TableData
        isDataLoading={loading}
        data={listUser}
        columns={columns}
        numberPage={totalCount}
        onPage={fetchPageData}
        currentPage={currentPage}
        perPage={searchData.perPage}
        onSetPerPage={setPerPage}
      />
    </>
  );
};

export default UserPage;

import { useMemo, useCallback, useState, useEffect } from "react";
import TableData from "../../component/table/table";
import Toggle from "../../component/toggle";
import {
  useDeleteUserMutation,
  useDeleteUsersMutation,
  useGetAllUserQuery,
  User,
} from "../../generated/graphql";
import { useSearchParams } from "react-router-dom";
import TableSearch, { ISearch } from "../../component/table/TableSearch";
import { SortType } from "../../hooks/useSortArray";
import DeleteButton from "../../component/DeleteButton";

const searchBy = [
  {
    title: "Full name",
    value: "fullName",
  },
];

const UserPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deleteUser] = useDeleteUserMutation();
  const [deleteManyUser] = useDeleteUsersMutation();
  const [sortBy, setSortBy] = useState<{ key: string; type?: SortType }>({
    key: "",
  });

  const [searchData, setSearchData] = useState<
    ISearch & { perPage: number; currentPage: number }
  >({
    keyword: null,
    value: null,
    perPage: 20,
    currentPage: 1,
  });

  const updateSearchData = useCallback(() => {
    const keyword = searchParams.get("searchBy");
    const value = searchParams.get("searchValue");
    const perPage = Number.parseInt(searchParams.get("perPage") ?? "20");
    const currentPage = Number(searchParams.get("page") ?? "1");
    setSearchData({
      keyword: keyword,
      value: value,
      perPage: perPage,
      currentPage,
    });
  }, [searchParams]);

  useEffect(() => {
    updateSearchData();
  }, [updateSearchData]);

  const { data, fetchMore, loading, refetch } = useGetAllUserQuery({
    variables: {
      input: {
        perPage: searchData.perPage,
        page: searchData.currentPage,
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
      searchParams.set("searchValue", (value.value ?? "").trim());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const setPerPage = useCallback(
    (perPage: number | string) => {
      setSearchData((prevSearchData) => {
        const { currentPage, perPage: currentPerPage } = prevSearchData;
        const totalPage = Math.ceil(
          Number(data?.GetAllUser?.totalCount ?? "0") / Number(perPage)
        );

        const page = Math.round(
          currentPage === 1
            ? currentPage
            : currentPage / (Number(perPage) / currentPerPage)
        );
        searchParams.set("perPage", perPage.toString());
        searchParams.set(
          "page",
          (page > totalPage ? 1 : page === 0 ? 1 : page).toString()
        );
        setSearchParams(searchParams);
        return prevSearchData;
      });
    },
    [data?.GetAllUser?.totalCount, searchParams, setSearchParams]
  );

  const onSort = useCallback(
    (key: string) => {
      console.log(key);

      if (key === sortBy.key) {
        setSortBy((prevState) => ({
          ...prevState,
          type: sortBy.type === SortType.ASC ? SortType.DESC : SortType.ASC,
        }));
      } else {
        setSortBy({
          key,
          type: SortType.ASC,
        });
      }
    },
    [sortBy.key, sortBy.type]
  );

  const refetchListData = useCallback(() => {
    const { keyword, perPage, value } = searchData;
    refetch({
      input: {
        perPage: perPage,
        page: searchData.currentPage,
        search: {
          keyword: keyword as string,
          value: value,
        },
      },
    });
  }, [refetch, searchData]);

  const confirmDelete = useCallback(
    (userId: string) => {
      deleteUser({
        variables: {
          input: {
            id: userId,
          },
        },
        onCompleted: () => {
          refetchListData();
        },
      });
    },
    [deleteUser, refetchListData]
  );

  const onDeleteManyUser = useCallback(
    (users: string[]) => {
      deleteManyUser({
        variables: {
          input: {
            ids: users.join(","),
          },
        },
        onCompleted: () => {
          refetchListData();
        },
      });
    },
    [deleteManyUser, refetchListData]
  );

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
    {
      key: "_id",
      label: "Action",
      align: "center",
      renderColumn: (id: string) => (
        <DeleteButton
          id={id}
          messageDelete="Are you sure to delete this user?"
          onDelete={confirmDelete}
          title="Delete"
        />
      ),
    },
  ];

  const fetchPageData = useCallback(
    (page: number) => {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
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
      <TableSearch
        onSearch={onSearch}
        searchBy={searchBy}
        currentSearch={searchData}
      />
      <TableData
        isDataLoading={loading}
        data={listUser}
        columns={columns}
        numberPage={totalCount}
        onPage={fetchPageData}
        currentPage={Number(searchParams.get("page") ?? "1")}
        perPage={searchData.perPage}
        onSetPerPage={setPerPage}
        onSort={onSort}
        sortBy={sortBy}
        onDeleteCheckBox={onDeleteManyUser}
      />
    </>
  );
};

export default UserPage;

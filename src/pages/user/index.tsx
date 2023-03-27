import { useMemo, useCallback, useState, useEffect } from "react";
import TableData from "../../component/table/table";
import Toggle from "../../component/toggle";
import {
  useDeleteUserMutation,
  useDeleteUsersMutation,
  User,
} from "../../generated/graphql";
import { useSearchParams } from "react-router-dom";
import TableSearch, { ISearch } from "../../component/table/TableSearch";
import UserForm from "./UserForm";
import CustomButton from "../../component/form/button";
import styled from "styled-components";
import TableAction from "../../component/table/TableAction";
import Dialog from "../../component/dialog";
import { toast } from "react-toastify";
import Pagination from "../../component/table/pagination";
import { useInfiniteQuery } from "react-query";
import { getUsers, UsersQueryParams } from "../../services/api/user.api";

const searchBy = [
  {
    title: "Full name",
    value: "fullName",
  },
];

const UserPage = () => {
  const [userDialog, setUserDialog] = useState<{
    userId?: string | null;
    enable: boolean;
  }>({
    userId: null,
    enable: false,
  });
  const [formDetailHandle, setFormDetail] = useState<{
    enable: boolean;
    userId?: string | null;
  }>({
    enable: false,
    userId: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageParams] = useState(searchParams.get("page"));

  const [deleteUser, { loading: deleteLoading }] = useDeleteUserMutation();
  const [deleteManyUser] = useDeleteUsersMutation();
  const [searchData, setSearchData] = useState<
    ISearch & { perPage: number; currentPage: number; sort?: ISort }
  >({
    keyword: null,
    value: null,
    perPage: 20,
    currentPage: 0,
  });

  const updateSearchData = useCallback(() => {
    const keyword = searchParams.get("searchBy");
    const value = searchParams.get("searchValue");
    const perPage = Number.parseInt(searchParams.get("perPage") ?? "20");
    const page = Number.parseInt(searchParams.get("page") ?? "1");
    setSearchData((prev) => ({
      ...prev,
      keyword: keyword,
      value: value,
      perPage: perPage,
      currentPage: page,
    }));
  }, [searchParams]);

  useEffect(() => {
    updateSearchData();
  }, [updateSearchData]);

  useEffect(() => {
    if (searchData.currentPage === 0) {
      const currentPage = Number(searchParams.get("page") ?? "1");
      setSearchData((prev) => ({
        ...prev,
        currentPage,
      }));
    }
  }, [searchData.currentPage, searchParams]);

  const {
    data: users,
    fetchNextPage,
    refetch: refetchUser,
    isFetching,
    isLoading,
  } = useInfiniteQuery<
    UsersResponse,
    UsersQueryParams,
    UsersFetchNextPageParams
  >(
    "users",
    ({ pageParam }: { pageParam?: any }) =>
      getUsers({
        pageParam: pageParam ?? Number(pageParams ?? "1"),
        perPage: searchData.perPage,
        search: {
          keyword: searchData.keyword as string,
          value: searchData.value,
        },
      }),
    {
      enabled: !!searchData,
    }
  );

  const loading = isFetching || isLoading;

  const data: UsersFetchNextPageParams = useMemo(
    () => users?.pages?.[users?.pages.length - 1] ?? [],
    [users?.pages]
  );

  const listUser: User[] = useMemo(() => {
    return data?.users ?? [];
  }, [data]);

  const totalCount = useMemo(() => {
    return data?.totalCount;
  }, [data]);

  const handleDialog = useCallback((userId?: string) => {
    setUserDialog((prev) => ({
      enable: !prev.enable,
      userId: userId,
    }));
  }, []);

  const refetchListData = useCallback(() => {
    const { keyword, perPage, value } = searchData;
    const params: any = {
      perPage: perPage,
      pageParams: searchData.currentPage,
      search: {
        keyword: keyword as string,
        value: value,
      },
      sort: searchData.sort,
    };
    refetchUser(params);
  }, [refetchUser, searchData]);

  const onSearch = useCallback(
    (value: ISearch) => {
      searchParams.delete("page");
      searchParams.delete("perPage");
      searchParams.set("searchBy", value.keyword ?? "");
      searchParams.set("searchValue", (value.value ?? "").trim());
      setSearchParams(searchParams);
      refetchListData();
    },
    [refetchListData, searchParams, setSearchParams]
  );

  const setPerPage = useCallback(
    (perPage: number | string) => {
      setSearchData((prevSearchData) => {
        const { currentPage, perPage: currentPerPage } = prevSearchData;
        const totalPage = Math.ceil(
          Number(data?.totalCount ?? "0") / Number(perPage)
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
      refetchUser();
    },
    [data?.totalCount, refetchUser, searchParams, setSearchParams]
  );

  

  const confirmDelete = useCallback(() => {
    deleteUser({
      variables: {
        input: {
          id: userDialog.userId,
        },
      },
      onCompleted: () => {
        refetchListData();
        handleDialog();
        toast("Delete user success!", {
          type: "success",
        });
      },
      onError: () => {
        handleDialog();
        toast("Can't delete this user!", {
          type: "error",
        });
      },
    });
  }, [deleteUser, handleDialog, refetchListData, userDialog.userId]);

  const onEdit = useCallback((userId: string) => {
    setFormDetail({
      enable: true,
      userId: userId,
    });
  }, []);

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

  const handleEnableForm = useCallback(() => {
    setFormDetail((prevDetail) => ({
      enable: !prevDetail.enable,
    }));
  }, []);

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
      haveSort: false,
      align: "center",
      renderColumn: (value: boolean) => <Toggle status={value} size={18} />,
    },
    {
      key: "_id",
      label: "Action",
      haveSort: false,
      align: "center",
      renderColumn: (id: string) => (
        <TableAction rowId={id} onDelete={handleDialog} onEdit={onEdit} />
      ),
    },
  ];

  const fetchPageData = useCallback(
    (page: number) => {
      searchParams.set("page", page.toString());
      setSearchParams(searchParams);
      const params: UsersFetchNextPageParams = {
        perPage: searchData.perPage,
        search: {
          keyword: searchData.keyword,
          value: searchData.value,
        },
        sort: searchData.sort,
      };
      fetchNextPage({
        ...params,
        pageParam: page,
      });
    },
    [
      fetchNextPage,
      searchData.keyword,
      searchData.perPage,
      searchData.sort,
      searchData.value,
      searchParams,
      setSearchParams,
    ]
  );

  const onSort = useCallback((key: "age" | "fullName") => {
    setSearchData((prevSearch) => {
      const sortValue = prevSearch.sort?.[key];
      return {
        ...prevSearch,
        sort: {
          ...prevSearch.sort,
          [key]: sortValue === 1 ? -1 : sortValue === -1 ? undefined : 1,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (searchData.sort !== undefined && !isFetching && !isLoading) {
      fetchPageData(Number(searchParams.get("page") ?? "1"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching, isLoading, searchData.sort]);

  return (
    <div>
      <HeadTable>
        <ButtonWrap>
          <CustomButton onClick={handleEnableForm} buttonType="info">
            New User
          </CustomButton>
        </ButtonWrap>
        <TableSearch
          onSearch={onSearch}
          searchBy={searchBy}
          currentSearch={searchData}
        />
      </HeadTable>
      <TableData
        sort={searchData.sort}
        isDataLoading={loading}
        data={listUser}
        columns={columns}
        numberPage={totalCount ?? 0}
        onPage={fetchPageData}
        currentPage={Number(searchParams.get("page") ?? "1")}
        perPage={searchData.perPage}
        onSetPerPage={setPerPage}
        onSort={onSort}
        onDeleteCheckBox={onDeleteManyUser}
      />
      <Pagination
        currentPage={Number(searchParams.get("page") ?? "1")}
        onPageChange={fetchPageData}
        pageSize={searchData.perPage}
        totalCount={totalCount ?? 0}
        siblingCount={1}
      />
      {formDetailHandle.enable === true && (
        <UserForm
          onCancel={handleEnableForm}
          onSuccess={refetchListData}
          userId={formDetailHandle.userId}
        />
      )}

      <Dialog
        isLoading={deleteLoading}
        enable={userDialog.enable}
        title="Confirm the action?"
        body="Are you sure to delete this user?"
        onConfirm={confirmDelete}
        confirmText="Confirm"
        onCancel={handleDialog}
      />
    </div>
  );
};

export default UserPage;

//styled
const HeadTable = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ButtonWrap = styled.div`
  align-items: center;
  display: flex;
`;

//
interface ISort {
  fullName?: number;
  age?: number;
}

interface UsersFetchNextPageParams {
  search?: any;
  sort?: any;
  perPage?: number;
  totalCount?: number;
  users?: User[];
}

export interface UsersResponse {
  page?: number;
  totalCount: number;
  users: User;
}

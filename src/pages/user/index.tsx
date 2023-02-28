import { useMemo, useState } from "react";
import TableData from "../../component/table";
import Toggle from "../../component/toggle";
import { useGetAllUserQuery, User } from "../../generated/graphql";

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

const UserPage = () => {
  const [paginate] = useState({
    page: 1,
  });

  const { data, fetchMore } = useGetAllUserQuery({
    variables: {
      input: {
        page: paginate.page,
      },
    },
  });
  console.log(data);

  const listUser: User[] = useMemo(() => {
    return (data?.["GetAllUser"]?.users ?? []) as User[];
  }, [data]);

  const numberPage = useMemo(() => {
    return data?.["GetAllUser"]?.totalPage as number;
  }, [data]);

  const fetchPageData = (page: number) =>
    fetchMore({
      variables: {
        input: {
          page: page,
        },
      },
    });

  return (
    <>
      <TableData
        data={listUser}
        columns={columns}
        numberPage={numberPage}
        // eslint-disable-next-line react/jsx-no-bind
        onPage={fetchPageData}
      />
    </>
  );
};

export default UserPage;

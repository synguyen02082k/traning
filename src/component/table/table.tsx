import styled from "styled-components";
import Lottie from "lottie-react";
import tableLoading from "../../assets/lottei/table_loading.json";
import Select from "../Select";
import Pagination from "./pagination";
import { useCallback, useEffect, useState } from "react";

const pageOptions = [
  {
    title: "10",
    value: 10,
  },
  {
    title: "20",
    value: 20,
  },
  {
    title: "50",
    value: 50,
  },
];
interface IProps<T, C> {
  data: T[];
  columns: C[];
  numberPage: number;
  onPage: (page: number) => void;
  isDataLoading?: boolean;
  perPage: number;
  currentPage: number;
  onSetPerPage: (perPage: number | string) => void;
}

const Header = ({
  item,
  onSort,
}: {
  item: any;
  onSort: (name: string) => void;
}) => {
  const onItem = useCallback(() => {
    onSort(item.key);
  }, [item.key, onSort]);

  return (
    <TH onClick={onItem} style={{ textAlign: item?.align }}>
      {item?.label}
    </TH>
  );
};
const TableData = <T, C>(props: IProps<T, C>) => {
  const {
    data,
    columns,
    numberPage,
    onPage,
    isDataLoading = false,
    perPage,
    currentPage,
    onSetPerPage,
  } = props ?? {};

  const [tableData, setTableData] = useState<T[]>();
  const [sortBy, setSortBy] = useState<any>({
    name: "",
    ASC: false,
  });

  const sortData = useCallback(() => {
    const { name, ASC } = sortBy;
    if (name !== "") {
      const sortData = [...(tableData ?? [])];
      sortData.sort((a: any, b: any) => {
        if (a?.[name] > b?.[name]) {
          return ASC ? 1 : -1;
        }
        if (a?.[name] < b?.[name]) {
          return ASC ? -1 : 1;
        }
        return 0;
      });

      setTableData(sortData);
    }
  }, [sortBy, tableData]);

  const onSort = useCallback(
    (key: string) => {
      if (key === sortBy.name) {
        setSortBy((prev: any) => ({
          ...prev,
          ASC: !prev.ASC,
        }));
      } else {
        setSortBy((prev: any) => ({
          ...prev,
          name: key,
          ASC: false,
        }));
      }
      sortData();
    },
    [sortBy.name, sortData]
  );

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <>
      <MarginBottom>
        <Select
          defaultValue={perPage}
          options={pageOptions}
          onChange={onSetPerPage}
        />{" "}
        records per page
      </MarginBottom>

      <Table>
        <TR>
          <TH>No</TH>
          {columns?.map((item: any, index) => (
            <Header item={item} onSort={onSort} key={index} />
          ))}
        </TR>
        {isDataLoading ? (
          <TR>
            <TD style={{ textAlign: "center" }} colSpan={4}>
              <CustomLottie animationData={tableLoading} />
            </TD>
          </TR>
        ) : !!tableData ? (
          tableData?.map((item: any, index) => (
            <TR key={index} style={{ textAlign: "center" }}>
              <TD>{index + 1 + perPage * currentPage - perPage}</TD>
              {columns?.map((column: any, key) => (
                <TD style={{ textAlign: column?.align }} key={key}>
                  {column?.renderColumn
                    ? column?.renderColumn(item[column?.key])
                    : `${item[column?.key]}`}
                </TD>
              ))}
            </TR>
          ))
        ) : (
          <TR>No data</TR>
        )}
      </Table>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPage}
        pageSize={perPage}
        totalCount={numberPage}
        siblingCount={2}
      />
    </>
  );
};

export default TableData;

//style
const TH = styled.th`
  text-align: left;
  border: 1px solid #dddddd;
  padding: 10px 10px 10px 10px;
`;

const TR = styled.tr`
  text-align: center;
  border: 1px solid #dddddd;
`;
const TD = styled.td`
  text-align: left;
  border: 1px solid #dddddd;
  padding: 5px;
`;

const Table = styled.table`
  text-align: left;
  width: 100%;
  border-collapse: collapse;
`;
const CustomLottie = styled(Lottie)`
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  height: 100px;
`;

const MarginBottom = styled.div`
  margin-bottom: 10px;
`;

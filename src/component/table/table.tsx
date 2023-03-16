import styled from "styled-components";
import Lottie from "lottie-react";
import tableLoading from "../../assets/lottei/table_loading.json";
import Select from "../Select";
import { useCallback, useState } from "react";
import { SortType } from "../../hooks/useSortArray";
import { Icons } from "../../constants/icons";
import DeleteButton from "../DeleteButton";
import { isEmpty } from "lodash";
import shortid from "shortid";

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
  sortBy?: {
    key: string;
    type?: SortType;
  };
  onSort: (name: any) => void;
  onDeleteCheckBox: (ids: string[]) => void;
  sort: any;
}

interface IHeaderProps {
  item: any;
  onSort: (name: string) => void;
  typeSort?: number;
  haveSort?: boolean;
}

const Header = ({ item, onSort, typeSort, haveSort = true }: IHeaderProps) => {
  const onItem = useCallback(() => {
    onSort(item.key);
  }, [item.key, onSort]);

  return (
    <TH
      onClick={haveSort ? onItem : undefined}
      style={{ textAlign: item?.align }}
    >
      <Head>
        {item?.label}
        {haveSort && (
          <div>
            <Image
              style={{
                WebkitFilter: typeSort === -1 ? "" : "invert(50%)",
              }}
              src={Icons.arrowDown}
            />
            <Image
              style={{
                WebkitFilter: typeSort === 1 ? "" : "invert(50%)",
              }}
              src={Icons.arrowUp}
            />
          </div>
        )}
      </Head>
    </TH>
  );
};

const CheckBox = ({ value, onChange, checked }: any) => {
  const onChangeValue = useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <Checkbox type="checkbox" checked={checked} onChange={onChangeValue} />
  );
};

const TableData = <T, C>(props: IProps<T, C>) => {
  const {
    data,
    columns,
    isDataLoading = false,
    perPage,
    currentPage,
    onSetPerPage,
    onSort,
    onDeleteCheckBox,
    sort,
  } = props ?? {};

  const [checkboxes, setCheckboxes] = useState<string[]>([]);

  const onChangeCheckbox = useCallback(
    (value: string) => {
      const data = [...checkboxes];
      if (data.includes(value)) {
        setCheckboxes(data.filter((item) => item !== value));
      } else {
        data.push(value);
        setCheckboxes(data);
      }
    },
    [checkboxes]
  );

  const onDeleteCheckboxItem = useCallback(() => {
    onDeleteCheckBox(checkboxes);
    setCheckboxes([]);
  }, [checkboxes, onDeleteCheckBox]);

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
      {!isEmpty(checkboxes) && (
        <TableAction>
          <DeleteButton
            title="Delete all"
            messageDelete="Are you sure to delete all this users?"
            id=""
            onDelete={onDeleteCheckboxItem}
          />
        </TableAction>
      )}

      <Table>
        <thead>
          <TR>
            <TH>No</TH>
            {columns?.map((item: any) => (
              <Header
                typeSort={sort?.[item.key]}
                item={item}
                onSort={onSort}
                key={shortid.generate()}
                haveSort={item.haveSort}
              />
            ))}
          </TR>
        </thead>
        <tbody style={{ position: "relative" }}>
          {!!data ? (
            data?.map((item: any, index) => (
              <TR key={shortid.generate()} style={{ textAlign: "center" }}>
                <TD>
                  {index + 1 + perPage * currentPage - perPage}{" "}
                  <CheckBox
                    value={item?.["_id"]}
                    onChange={onChangeCheckbox}
                    checked={checkboxes.includes(item?.["_id"])}
                  />
                </TD>
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
          <TR>
            {isDataLoading && (
              <Loading
                colSpan={columns.length + 1}
                style={{
                  position: !!data.length ? "absolute" : "relative",
                  display: !!data.length ? "" : "table-cell",
                }}
              >
                <CustomLottie animationData={tableLoading} />
              </Loading>
            )}
          </TR>
        </tbody>
      </Table>
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

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border: 1px solid #dddddd;
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

const Image = styled.img`
  width: 15px;
  filter: brightness(0.25);
`;

const Checkbox = styled.input`
  margin-left: auto;
`;
const TableAction = styled.div`
  margin-top: 20px;
  margin-bottom: 5px;
`;

const Loading = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: gray;
  opacity: 0.3;
`;

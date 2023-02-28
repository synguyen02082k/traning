import styled from "styled-components";

interface IProps<T, C> {
  data: T[];
  columns: C[];
  numberPage: number;
  onPage: (page: number) => void;
}
const TableData = <T, C>(props: IProps<T, C>) => {
  const { data, columns, numberPage, onPage } = props;

  const renderPage = () => {
    const elements = [];
    const numPage = numberPage > 6 ? 6 : numberPage;
    for (let i = 1; i <= numPage; i++) {
      elements.push(
        // eslint-disable-next-line react/jsx-no-bind
        <Page onClick={() => onPage(i)} className="indent" key={i}>
          {i}
        </Page>
      );
    }
    return elements;
  };

  return (
    <>
      <Table>
        <TR>
          {columns?.map((item: any, index) => (
            <TH style={{ textAlign: item?.align }} key={index}>
              {item?.label}
            </TH>
          ))}
        </TR>
        {!!data ? (
          data?.map((item: any, index) => (
            <TR key={index} style={{ textAlign: "center" }}>
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
      {!!numberPage && <PageWrapper>{renderPage()}</PageWrapper>}
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
  padding: 10px 10px 10px 10px;
`;

const Table = styled.table`
  text-align: left;
  width: 100%;
  border-collapse: collapse;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin-left: auto;
`;

const Page = styled.div`
  padding: 5px;
`;

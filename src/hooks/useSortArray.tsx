import { useCallback, useEffect, useState } from "react";

export enum SortType {
  ASC,
  DESC,
}

interface IProps<T> {
  data: T[];
  type: SortType;
  sortKey: string;
}
const useSortArray = <T,>(props: IProps<T>) => {
  const { data: propsData, type, sortKey } = props;
  const [data, setData] = useState<T[]>([]);

  const sort = useCallback(
    (dataSort: T[]) => {
      const sortData = [...dataSort];
      sortData.sort((a: any, b: any) => {
        if (a?.[sortKey] > b?.[sortKey]) {
          return type === SortType.ASC ? 1 : -1;
        }
        if (a?.[sortKey] < b?.[sortKey]) {
          return type === SortType.ASC ? -1 : 1;
        }
        return 0;
      });

      setData(sortData);
    },
    [sortKey, type]
  );

  useEffect(() => {
    sort(propsData);
  }, [propsData, sort]);

  return { data };
};

export default useSortArray;

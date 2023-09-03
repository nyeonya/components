"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface IColumns {
  header: string | React.ReactElement;
  name: string;
  /** 해당 열의 요소들에 배치할 link 요소
   * onClick과 동시에 쓰면 정상적으로 동작하지 않을 수 있습니다.
   */
  link?: {
    /** link의 pathname */
    pathname: string;
    /** 쿼리는 pathname/query[0]?[...query]의 형식으로 링크됨 */
    query?: string[];
  };

  /**
   * 해당 열의 요소의 파싱요소를 집어넣을 수 있습니다.
   * 해당 열에 들어올 수 있는 모든 파싱 가능성을 기입하지 않을 경우 정상적으로 동작하지 않을 수 있습니다.
   * [{ label: '파싱할 값', value: '파싱될 코드값' }, ...]
   * 혹은 해당 열의 요소를 prop으로 받고, 특정 형태로 가공하여 return 하는 함수를 설정할 수 있습니다. 단, 이 경우 배열을 반환하는 함수일 때 에러가 발생할 수 있습니다.
   */
  parse?: any;
  /**
   * 해당 열의 요소에 색깔을 추가합니다.
   * 색깔을 언제나 추가하려면 condition 값을 ''로 보내십시오.
   * 조건에 맞지 않는 요소들은 #000이 됩니다.
   * condition은 열의 요소의 코드값을 집어넣으십시오. ex. {condition : '00', color: '#fff'}
   * 단, link 요소가 있는 요소는 반드시 #34a3db로 지정됩니다.
   * onClick의 경우, 조건에 맞지 않으면 #34a3db로 지정됩니다.
   * {condition: string; color: string;}
   */
  color?: { condition: string; color: string };
  type?: string;
  width?: number;
  zero?: string;
}

interface IProps {
  /**
   * 체크박스를 관리할 배열
   * 사용하기 전, items의 각각의 요소들에 id 속성을 추가하여야 함
   * id 속성은 고유값을 사용하기 바람 (ex. item.id = item.seq)
   */
  idList?: any[] | any;
  columns: IColumns[];
  items: any[];
  isCheckBox?: boolean;
  setIdList?: React.Dispatch<React.SetStateAction<any[]>> | any;
  curItems?: number;
  tableKey?: number | string;
  minWidth?: number;
  emptyMessage?: string;
  total?: any;
}

const Table: React.FC<IProps> = ({
  columns,
  items,
  isCheckBox = false,
  idList,
  setIdList,
  total,
  tableKey = 0,
  minWidth = 1150,
  emptyMessage = "데이터가 존재하지 않습니다.",
}) => {
  const router = useRouter();
  //체크박스 확인용
  const [list, setList] = useState<any>([]);
  //체크박스 전체 확인용
  const [isCheckboxAll, setIsCheckboxAll] = useState<boolean>(false);

  const onChangeAll = (evt: any) => {
    if (evt.target.checked) {
      const ids = items?.map((item) => item.id);
      setList(ids);
      setIdList([...ids]);
      setIsCheckboxAll(true);
    } else {
      setList([]);
      setIdList([]);
      setIsCheckboxAll(false);
    }
  };

  const onChangeEach = (evt: any, id: any) => {
    if (evt.target.checked) {
      setList((prev: any) => {
        return [...prev, id];
      });
      setIdList([...idList, id]);
    } else {
      const filteredIdList = idList.filter((v: any) => v !== id);
      setList(filteredIdList);
      setIdList(idList?.filter((checkedId: any) => checkedId !== id));
    }
  };

  return (
    <>
      <table className={clsx("table-fixed border-t-2 border-black")}>
        <colgroup>
          {isCheckBox && (
            <col key={`table-col-ck-${tableKey}`} width={"60px"} />
          )}
          {columns?.map((column, idx) => {
            return (
              <col
                key={`table-col-${idx}`}
                width={column.width ? column.width + "px" : ""}
              />
            );
          })}
        </colgroup>
        {/*테이블 타이틀 */}
        <thead>
          <tr>
            {isCheckBox && (
              <th className="bg-green-100 whitespace-nowrap h-14 border-r">
                <div className="flex justify-center items-center">
                  <input
                    id={`tableCheckAll-${tableKey}`}
                    type="checkbox"
                    onChange={onChangeAll}
                    checked={isCheckboxAll || total === list.length}
                    className="hidden  [&:checked+label:after]:content-['✔']"
                  />
                  <label
                    htmlFor={`tableCheckAll-${tableKey}`}
                    className="w-5 h-5 flex items-center justify-center border border-black"
                  />
                </div>
              </th>
            )}
            {columns?.map((column, idx) => {
              return (
                <th
                  className="bg-green-100 whitespace-nowrap border-r"
                  key={`table-th-${idx}`}
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        {/* 테이블 내용 */}
        {Array.isArray(items) && (
          <tbody>
            {items?.length === 0 && (
              <tr>
                <td
                  colSpan={isCheckBox ? columns.length + 1 : columns.length}
                  className="w-full py-10 text-center"
                >
                  <div>
                    <p>{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
            {items?.map((item, idx) => {
              return (
                <tr
                  key={`table-tr-td-${idx}`}
                  className="bg-inherit hover:bg-rose-100 border-b last:border-none"
                >
                  {isCheckBox && (
                    <td className="text-center border-r">
                      <div className="flex justify-center items-center gap-2">
                        <input
                          id={`tableCheckEach-${tableKey}-${idx}`}
                          type="checkbox"
                          value={item?.id}
                          onChange={(evt) => onChangeEach(evt, item?.id)}
                          checked={idList?.includes(item?.id)}
                          className="hidden [&:checked+label:after]:content-['✔']"
                        />
                        <label
                          htmlFor={`tableCheckEach-${tableKey}-${idx}`}
                          className="w-4 h-4 bg-white flex justify-center items-center cursor-pointer"
                        />
                      </div>
                    </td>
                  )}
                  {columns?.map((column, idx) => {
                    if (column?.link) {
                      const tempQuery: any = {};
                      column.link.query?.map((el: string) => {
                        tempQuery[el] = item[el];
                      });

                      const params = Object.values(tempQuery)[0];
                      const queryArr = [];
                      for (const variable in tempQuery) {
                        queryArr.push([variable, tempQuery[variable]]);
                      }

                      let query = "";

                      for (let i = 1; i < queryArr.length; i++) {
                        if ((i = 1))
                          query += `${queryArr[i][0]}=${queryArr[i][1]}`;
                        else query += `&${queryArr[i][0]}=${queryArr[i][1]}`;
                      }

                      return column?.parse ? (
                        <td key={`table-td-${idx}`}>
                          <a
                            onClick={() => {
                              router.push(
                                `/${column.link?.pathname}/${params}?${query}`
                              );
                            }}
                          >
                            {Array.isArray(column?.parse)
                              ? column?.parse?.find(
                                  (v) => v.value === item[column?.name]
                                )?.label || "-"
                              : column?.parse(item[column?.name]) || "-"}
                          </a>
                        </td>
                      ) : (
                        <td key={`table-td-${idx}`}>
                          <a
                            onClick={() => {
                              router.push(
                                `/${column.link?.pathname}/${params}?${query}`
                              );
                            }}
                          >
                            {item[column?.name] || "-"}
                          </a>
                        </td>
                      );
                    } else {
                      return column?.parse ? (
                        <td key={`table-td-${idx}`}>
                          {(
                            <span
                              color={
                                column?.color?.condition !== ""
                                  ? column?.color?.condition ===
                                    item[column?.name]
                                    ? column?.color?.color
                                    : "#000"
                                  : column?.color?.color
                              }
                            >
                              {Array.isArray(column?.parse)
                                ? column?.parse?.find(
                                    (v) => v.value === item[column?.name]
                                  )?.label || "-"
                                : column?.parse(item[column?.name]) || "-"}
                            </span>
                          ) || "-"}
                        </td>
                      ) : (
                        <td
                          key={`table-td-${idx}`}
                          className="text-center border-r last:border-none"
                        >
                          {column?.type === "number" ? (
                            <>
                              {item[column?.name]
                                ? item[column?.name].toLocaleString()
                                : item[column?.zero || ""]
                                ? item[column?.zero || ""]
                                : "0"}
                            </>
                          ) : (
                            <>{item[column?.name] || "-"}</>
                          )}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </>
  );
};

export default Table;

// const CheckBoxWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 7px;

//   input {
//     display: none;
//   }

//   input:checked + .theCheckBox::after {
//     content: "✔";
//     font-size: 7.5px;
//   }
// `;

// interface ICheckBox {
//   disabled?: boolean;
// }

// const StyledCheckBox = styled.label<ICheckBox>`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #ffffff;
//   border: 1px solid #bfbfbf;
//   border-radius: 3px;
//   cursor: pointer;
//   width: 15px;
//   height: 15px;

//   ${(props) =>
//     !props.disabled &&
//     css`
//       &:hover {
//         border: 1px solid #000000;
//       }
//     `}

//   ${(props) =>
//     props.disabled &&
//     css`
//       border: 1px solid #bfbfbf;
//       background-color: #f1f1f1;
//     `}
// `;

// const ColoredText = styled.span<{ color: any; onClick?: any }>`
//   color: ${({ color }) => color};
//   ${({ onClick }) =>
//     onClick &&
//     css`
//       cursor: pointer;
//     `}
// `;

// export const StyledTable = styled.table<{ minWidth?: any }>`
//   table-layout: fixed;
//   width: ${({ width }) => (width ? width + "px" : "100%")};
//   border-top: 2px solid #000000;
//   font-size: 13px;
//   min-width: ${({ minWidth }) => (minWidth ? minWidth + "px" : "1150px")};
// `;

// export const StyledThRow = styled.tr`
//   font-size: 14px;
//   background-color: #eff6f9;
//   height: 40px;
//   line-height: 20px;
//   white-space: pre;

//   th {
//     border-left: 1px solid #dbdbdb;
//     border-right: 1px solid #dbdbdb;
//     border-bottom: 1px solid #dbdbdb;

//     &:first-child {
//       border-left: none;
//       /* border-right: none; */
//     }

//     &:last-child {
//       border-left: none;
//       border-right: none;
//     }
//   }
// `;

// export const StyledTdRow = styled.tr<{
//   pointBackGroundColor?: boolean;
// }>`
//   background-color: ${({ pointBackGroundColor }) =>
//     pointBackGroundColor ? "#fffdeb !important;" : "white !important;"};
//   height: 40px;
//   line-height: 20px;
//   white-space: pre;

//   td {
//     border-left: 1px solid #dbdbdb;
//     border-right: 1px solid #dbdbdb;
//     border-bottom: 1px solid #dbdbdb;
//     padding: 0 10px;

//     &:first-child {
//       border-left: none;
//     }

//     &:last-child {
//       border-left: none;
//       border-right: none;
//     }

//     &.sum {
//       background-color: #eff6f9;
//       font-weight: 800;
//     }
//   }

//   &.sum {
//     background-color: #eff6f9;
//     font-weight: 800;
//   }
// `;

// export const Th = styled.th<{ textAlign?: string }>`
//   text-align: ${({ textAlign }) => (textAlign ? textAlign : "center")};
//   vertical-align: middle;
//   font-weight: 800;
//   padding: 10px 10px;
//   white-space: nowrap;
//   background-color: #32677e;
//   border-bottom: 1px solid #dbdbdb;
// `;

// export const Td = styled.td<{
//   sort?: string;
//   color?: string;
//   pointBackGroundColor?: boolean;
// }>`
//   text-align: ${({ sort }) =>
//     (sort === "center" && "center") || (sort === "end" && "end")};
//   vertical-align: middle;
//   padding: 10px 10px;
//   background-color: ${({ pointBackGroundColor }) =>
//     pointBackGroundColor && "red !important;"};

//   color: ${({ color }) => (color ? color : "#000000")};
//   word-wrap: break-word;
//   word-break: break-all;
//   white-space: break-spaces;

//   .border-box td:last-child {
//     border-left: 1px solid #dbdbdb !important;
//     border-right: 1px solid #dbdbdb !important;
//   }

//   &.emptyContent {
//     width: "100%";
//     height: 200px;
//   }
// `;

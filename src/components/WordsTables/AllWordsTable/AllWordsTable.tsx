import css from "./AllWordsTable.module.css";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { type Word } from "../../../redux/types";
import { addWordById } from "../../../redux/words/operations";
import Icon from "../../common/Icon";
import ShowToast from "../../common/ShowToast";

type AllWordTableProps = {
  allWords: Word[];
};

const columnHelper = createColumnHelper<Word>();

const AllWordTable = ({ allWords }: AllWordTableProps) => {
  const dispatch = useAppDispatch();

  const handleAddWord = (id: string) => {
    dispatch(addWordById({ id }))
      .unwrap()
      .then(() => {
        ShowToast({ message: "Word added successfully", type: "success" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const columns = useMemo(
    () => [
      columnHelper.accessor("en", { header: "Word" }),
      columnHelper.accessor("ua", { header: "Translation" }),
      columnHelper.accessor("category", { header: "Category" }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <button
            onClick={() => handleAddWord(row.original._id)}
            className={css.errowBtn}
          >
            <Icon iconName="arrow" className={css.icon} />
          </button>
        ),
      }),
    ],
    [dispatch]
  );

  const table = useReactTable({
    data: allWords,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllWordTable;

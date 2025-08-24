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

type AllWordTablleProps = {
  allWords: Word[];
};

const columnHelper = createColumnHelper<Word>();

const AllWordTablle = ({ allWords }: AllWordTablleProps) => {
  const dispatch = useAppDispatch();

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
            onClick={() => dispatch(addWordById({ id: row.original._id }))}
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

export default AllWordTablle;

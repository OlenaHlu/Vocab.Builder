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
import ShowToast from "../../common/ShowToast";
import Icon from "../../common/Icon";

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
      columnHelper.accessor("en", {
        header: () => (
          <div className={css.withIcon}>
            <p>Word</p>
            <Icon iconName="uk" className={css.iconFlag} />
          </div>
        ),
      }),
      columnHelper.accessor("ua", {
        header: () => (
          <div className={css.withIcon}>
            <p>Translation</p>
            <Icon iconName="ua" className={css.iconFlag} />
          </div>
        ),
      }),
      columnHelper.accessor("category", { header: "Category" }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className={css.addContainer}>
            <p className={css.addText}>Add to dictionary</p>
            <button
              onClick={() => handleAddWord(row.original._id)}
              className={css.errowBtn}
            >
              <Icon iconName="arrow" className={css.icon} />
            </button>
          </div>
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
    <div className={css.tableContainer}>
      <table className={css.table}>
        <thead className={css.tableHeader}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className={css.headerRow} key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={css.headerColumn} key={header.id}>
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

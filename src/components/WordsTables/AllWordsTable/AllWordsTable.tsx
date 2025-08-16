import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { type Word } from "../../../redux/types";

type AllWordTablleProps = {
  allWords: Word[];
};

const columnHelper = createColumnHelper<Word>();

const AllWordTablle = ({ allWords }: AllWordTablleProps) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("en", { header: "Word" }),
      columnHelper.accessor("ua", { header: "Translation" }),
      columnHelper.accessor("category", { header: "Category" }),
      columnHelper.display({ id: "actions", header: "", cell: () => "Action" }),
    ],
    []
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

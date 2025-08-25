import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { type UserWord } from "../../../redux/types";

// import ProgressBar from "./ProgressBar/ProgressBar";
import ActionsMenu from "./ActionsMenu/ActionsMenu";

type OwnWordsTableProps = {
  userWords: UserWord[];
};

const columnHelper = createColumnHelper<UserWord>();

const OwnWordsTable = ({ userWords }: OwnWordsTableProps) => {
  const columns = useMemo(
    () => [
      columnHelper.accessor("en", { header: "Word" }),
      columnHelper.accessor("ua", { header: "Translation" }),
      columnHelper.accessor("progress", {
        header: "Progress",
        //   cell: ({ getValue }) => <ProgressBar value={getValue()} />,
        cell: ({ getValue }) => getValue(),
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <ActionsMenu
            onEdit={() => console.log("Edit", row.original)}
            onDelete={() => console.log("Delete", row.original)}
          />
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: userWords,
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

export default OwnWordsTable;

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { type UserWord } from "../../../redux/types";
import { editWord, deleteWord } from "../../../redux/words/operations";
import { useAppDispatch } from "../../../redux/hooks";
// import ProgressBar from "./ProgressBar/ProgressBar";
import ActionsMenu from "./ActionsMenu/ActionsMenu";
import EditWordModal from "../../Modals/EditWordModal/EditWordModal";
import DeleteWordModal from "../../Modals/DeleteWordModal/DeleteWordModal";

type OwnWordsTableProps = {
  userWords: UserWord[];
};

const columnHelper = createColumnHelper<UserWord>();

const OwnWordsTable = ({ userWords }: OwnWordsTableProps) => {
  const dispatch = useAppDispatch();
  const [editingWord, setEditingWord] = useState<UserWord | null>(null);
  const [deletingWord, setDeletingWord] = useState<UserWord | null>(null);

  const handleSave = async (updatedData: { en: string; ua: string }) => {
    if (!editingWord) return;
    try {
      await dispatch(
        editWord({
          id: editingWord._id,
          data: {
            ...updatedData,
            category: editingWord.category,
          },
        })
      ).unwrap();
    } catch (error) {
      console.error("Edit failed", error);
    } finally {
      setEditingWord(null);
    }
  };

  const handleDelete = async () => {
    if (!deletingWord) return;
    try {
      dispatch(deleteWord({ id: deletingWord._id })).unwrap();
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeletingWord(null);
    }
  };

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
            onEdit={() => setEditingWord(row.original)}
            onDelete={() => setDeletingWord(row.original)}
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

      {editingWord && (
        <EditWordModal
          word={editingWord}
          onClose={() => setEditingWord(null)}
          onSave={handleSave}
        />
      )}
      {deletingWord && (
        <DeleteWordModal
          onClose={() => setDeletingWord(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default OwnWordsTable;

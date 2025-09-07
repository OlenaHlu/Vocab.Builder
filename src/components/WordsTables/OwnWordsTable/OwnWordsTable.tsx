import css from "./OwnWordsTable.module.css";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { type UserWord } from "../../../redux/types";
import {
  editWord,
  deleteWord,
  getUserWords,
} from "../../../redux/words/operations";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectUserWords } from "../../../redux/words/selectors";
// import ProgressBar from "./ProgressBar/ProgressBar";
import ActionsMenu from "./ActionsMenu/ActionsMenu";
import EditWordModal from "../../Modals/EditWordModal/EditWordModal";
import DeleteWordModal from "../../Modals/DeleteWordModal/DeleteWordModal";
import ShowToast from "../../common/ShowToast";

const columnHelper = createColumnHelper<UserWord>();

const OwnWordsTable = () => {
  const dispatch = useAppDispatch();
  const userWords = useAppSelector(selectUserWords);
  const [editingWord, setEditingWord] = useState<UserWord | null>(null);
  const [deletingWord, setDeletingWord] = useState<UserWord | null>(null);

  const handleSave = async (updatedData: { en: string; ua: string }) => {
    if (!editingWord) return;
    try {
      const dataToSend = {
        en: updatedData.en,
        ua: updatedData.ua,
        category: editingWord.category,
        isIrregular: editingWord.isIrregular,
      };
      await dispatch(
        editWord({
          id: editingWord._id,
          data: dataToSend,
        })
      ).unwrap();
      ShowToast({ message: "Word updated successfully", type: "success" });
    } catch (error) {
      console.error("Failed to update word:", error);
    } finally {
      setEditingWord(null);
    }
  };

  const handleDelete = async () => {
    if (!deletingWord) return;
    try {
      dispatch(deleteWord({ id: deletingWord._id })).unwrap();
      ShowToast({ message: "Word deleted successfully", type: "success" });

      dispatch(getUserWords({ page: 1, limit: 7 }));
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

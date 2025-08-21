import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import PaginationItem from "@mui/material/PaginationItem";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectPage,
  selectPerPage,
  selectTotalPages,
} from "../../redux/words/selectors";
import { setPage } from "../../redux/words/slice";
import { getAllWords, getUserWords } from "../../redux/words/operations";
import { useCallback } from "react";

type WordsPaginationProps = {
  variant: "all" | "user";
};

const WordsPagination = ({ variant }: WordsPaginationProps) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage) || 1;
  const totalPages = useAppSelector(selectTotalPages) || 1;
  const perPage = useAppSelector(selectPerPage) || 7;

  const handleChangePage = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      dispatch(setPage(value));

      if (variant === "all") {
        dispatch(getAllWords({ page: value, limit: perPage }));
      } else {
        dispatch(getUserWords({ page: value, limit: perPage }));
      }
    },
    [dispatch, variant, perPage]
  );
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        siblingCount={0}
        boundaryCount={1}
        variant="outlined"
        renderItem={(item) => (
          <PaginationItem
            slots={{
              first: KeyboardDoubleArrowLeftIcon,
              last: KeyboardDoubleArrowRightIcon,
            }}
            {...item}
          />
        )}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default WordsPagination;

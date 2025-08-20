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

type WordsPaginationProps = {
  variant: "all" | "user";
};

const WordsPagination = ({ variant }: WordsPaginationProps) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const totalPages = useAppSelector(selectTotalPages);
  const perPage = useAppSelector(selectPerPage);

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));

    if (variant === "all") {
      dispatch(getAllWords({ page: value, limit: perPage }));
    } else {
      dispatch(getUserWords({ page: value, limit: perPage }));
    }
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        siblingCount={0}
        boundaryCount={1}
        showFirstButton
        showLastButton
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
      />
    </Stack>
  );
};

export default WordsPagination;

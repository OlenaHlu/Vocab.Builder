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
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2, md: 3 }}
      justifyContent="center"
      sx={{
        p: { xs: "32px 0px", sm: "28px 0 48px 0", md: "28px 0 48px 0" },
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        shape="rounded"
        siblingCount={0}
        boundaryCount={1}
        variant="outlined"
        sx={{
          "& .MuiPagination-ul": {
            gap: { xs: "2px", sm: "5px", md: "7px" },
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              first: KeyboardDoubleArrowLeftIcon,
              last: KeyboardDoubleArrowRightIcon,
            }}
            {...item}
            sx={{
              borderRadius: "8px",
              border: "1px solid rgba(18, 20, 23, 0.1);",
              "&.Mui-selected": {
                backgroundColor: "var(--green)",
                color: "var(--white)",
              },
            }}
          />
        )}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default WordsPagination;

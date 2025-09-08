import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import {
  selectUserWords,
  selectWordsIsLoading,
} from "../../redux/words/selectors";
import { getUserWords } from "../../redux/words/operations";
import OwnWordsTable from "../../components/WordsTables/OwnWordsTable/OwnWordsTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import Loader from "../../components/Loader/Loader";

const DictionaryPage = () => {
  const dispatch = useAppDispatch();
  const userWords = useAppSelector(selectUserWords);
  const isLoading = useAppSelector(selectWordsIsLoading);

  useEffect(() => {
    dispatch(getUserWords());
  }, [dispatch]);

  const hasWords = Array.isArray(userWords) && userWords.length > 0;

  return (
    <>
      <Header />
      <main>
        <Dashboard />
        {isLoading && <Loader />}
        {!isLoading && !hasWords && <p>You have no own words yet</p>}
        {!isLoading && hasWords && (
          <>
            <OwnWordsTable />
            <WordsPagination variant="user" />
          </>
        )}
      </main>
    </>
  );
};

export default DictionaryPage;

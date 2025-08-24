import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import {
  selectUserWords,
  selectWordsIsLoading,
  selectWordsError,
} from "../../redux/words/selectors";
import { getUserWords } from "../../redux/words/operations";
import OwnWordsTable from "../../components/WordsTables/OwnWordsTable/OwnWordsTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";

const DictionaryPage = () => {
  const dispatch = useAppDispatch();
  const userWords = useAppSelector(selectUserWords);
  const isLoading = useAppSelector(selectWordsIsLoading);
  const error = useAppSelector(selectWordsError);

  useEffect(() => {
    dispatch(getUserWords());
  }, [dispatch]);

  const hasWords = Array.isArray(userWords) && userWords.length > 0;

  return (
    <>
      <Header />
      <main>
        <Dashboard />
        {isLoading && <p>Loading...</p>}
        {error && <p>Failed to load words: {error}</p>}
        {!isLoading && !error && !hasWords && <p>You have no own words yet</p>}
        {!isLoading && !error && hasWords && (
          <>
            <OwnWordsTable userWords={userWords} />
            <WordsPagination variant="user" />
          </>
        )}
      </main>
    </>
  );
};

export default DictionaryPage;

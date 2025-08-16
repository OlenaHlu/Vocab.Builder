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

const DictionaryPage = () => {
  const dispatch = useAppDispatch();
  const userWords = useAppSelector(selectUserWords);
  const isLoading = useAppSelector(selectWordsIsLoading);
  const error = useAppSelector(selectWordsError);

  useEffect(() => {
    dispatch(getUserWords());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Dashboard />
        {isLoading && <p>Loading...</p>}
        {error && <p>Failed to load words: {error}</p>}
        {!isLoading && !error && userWords.length === 0 && (
          <p>You have no own words yet</p>
        )}
        {!isLoading && !error && userWords.length > 0 && (
          <OwnWordsTable userWords={userWords} />
        )}
      </main>
    </>
  );
};

export default DictionaryPage;

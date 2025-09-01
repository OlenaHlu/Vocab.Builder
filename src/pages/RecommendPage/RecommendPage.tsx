import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import AllWordTablle from "../../components/WordsTables/AllWordsTable/AllWordsTable";
import WordsPagination from "../../components/WordsPagination/WordsPagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { selectWords, selectWordsIsLoading } from "../../redux/words/selectors";
import { getAllWords } from "../../redux/words/operations";

const RecommendPage = () => {
  const dispatch = useAppDispatch();
  const allWords = useAppSelector(selectWords);
  const isLoading = useAppSelector(selectWordsIsLoading);

  useEffect(() => {
    dispatch(getAllWords());
  }, [dispatch]);

  const hasWords = Array.isArray(allWords) && allWords.length > 0;

  return (
    <>
      <Header />
      <main>
        <Dashboard />
        {isLoading && <p>Loading...</p>}
        {!isLoading && !hasWords && <p>You have no own words yet</p>}
        {!isLoading && hasWords && <AllWordTablle allWords={allWords} />}
        <WordsPagination variant="all" />
      </main>
    </>
  );
};

export default RecommendPage;

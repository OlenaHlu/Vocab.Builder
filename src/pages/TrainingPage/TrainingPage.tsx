import Header from "../../components/Header/Header";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";

const TrainingPage = () => {
  return (
    <>
      <Header />
      <main>
        <ProgressBar />
        <TrainingRoom />
      </main>
    </>
  );
};

export default TrainingPage;

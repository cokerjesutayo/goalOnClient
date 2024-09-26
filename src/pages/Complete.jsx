import Completed from "../components/Completed";
import GoalHeader from "../components/GoalHeader";
import Loading from "../components/Loading";
import { useFetch } from "../Hooks/useFetch";
import Empty from "../components/Empty";
import ErrorFetch from "../components/ErrorFetch";
import Goals from "../data/goals";

const Complete = () => {
  const url = "https://goal-server-tayo.onrender.com/api/v1/goals";
  const {
    isLoading,
    data: { goals },
    isError,
  } = useFetch(url);

  const Goals =
    isLoading || isError ? null : goals.filter((g) => g.progress === 100);
  if (!isLoading && isError) {
    return <ErrorFetch />;
  }

  if (!isLoading && Goals.length ===0) {
    return <Empty />;
  }
  return (
    <div className="container mt-2">
      <GoalHeader heading="Completed" />
      {isLoading && <Loading />}
      <div>
        {Goals &&
          Goals.map((g) => {
            return <Completed key={g._id} {...g} />;
          })}
      </div>
    </div>
  );
};

export default Complete;

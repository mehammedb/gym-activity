import { useEffect, useState } from "react";
import WorkoutDetail from "../components/WorkoutDetail";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../context/context";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext(); // Correct context usage
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetch("/api/workouts");
        if (fetchedData.ok) {
          const json = await fetchedData.json();
          dispatch({ type: "set_workout", payload: json });
        } else {
          setError(`Error: ${fetchedData.status} ${fetchedData.statusText}`);
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]); // Add dispatch as a dependency

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-row justify-around">
      <div className="flex flex-col gap-2">
        {workouts && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetail
              key={workout._id}
              title={workout.title}
              reps={workout.reps}
              load={workout.load}
              createdAt={workout.createdAt}
              _id={workout._id}
            />
          ))
        ) : (
          <p>No workouts found.</p>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

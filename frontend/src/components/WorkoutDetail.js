import { useWorkoutContext } from "../context/context";

const WorkoutDetail = ({ _id, title, reps, load, createdAt }) => {
  const { dispatch } = useWorkoutContext();

  const handleClick = async () => {
    const response = await fetch("/api/workouts/" + _id, {
      method: "delete",
    });
    if (response.ok) {
      dispatch({ type: "delete_workouts", payload: _id });
    }
  };

  return (
    <div className="p-4 shadow-md max-w-[600px]">
      <p className="text-lg bol font-bold text-green-400">{title}</p>
      <p>reps: {reps}</p>
      <p>load: {load}</p>
      <p>createdAt: {createdAt}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetail;

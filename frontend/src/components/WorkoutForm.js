import { useReducer, useState } from "react";
import { useWorkoutContext } from "../context/context";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleForm = async (e) => {
    e.preventDefault();

    const body = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "Application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      dispatch({ type: "create_workout", payload: json });
      setEmptyFields([]);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleForm}>
      <div className=" flex flex-row gap-2">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          className={`border p-2 ${
            emptyFields.includes("title") ? "border-red-400" : ""
          }`}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className=" flex flex-row gap-2">
        <label htmlFor="load">Load:</label>
        <input
          type="number"
          name="load"
          className={`border p-2 ${
            emptyFields.includes("load") ? "border-red-400" : ""
          }`}
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          min={1}
        />
      </div>
      <div className=" flex flex-row gap-2">
        <label htmlFor="reps">Reps:</label>
        <input
          type="number"
          name="reps"
          className={`border p-2 ${
            emptyFields.includes("reps") ? "border-red-400" : ""
          }`}
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          min={1}
        />
      </div>
      <button className="border bg-blue-700 text-white p-2 font-bold">
        Add woukout
      </button>
      {error}
    </form>
  );
};

export default WorkoutForm;

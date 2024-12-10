import React, { useContext, useReducer } from "react";

const WorkoutContext = React.createContext();

const initialState = {
  workouts: null, // Default state
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_workout":
      return { workouts: action.payload };
    case "create_workout":
      return { workouts: [action.payload, ...state.workouts] };
    case "delete_workouts":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload),
      };
    default:
      return state;
  }
};

const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkoutContext = () => {
  return useContext(WorkoutContext);
};

export { useWorkoutContext, WorkoutProvider };

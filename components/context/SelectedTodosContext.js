import { createContext, useContext, useEffect, useState } from "react";

export const SelectedTodosContext = createContext();

export default function SelectedTodosContextProvider(props) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <SelectedTodosContext.Provider
      value={[selected, setSelected]}
      {...props}
    ></SelectedTodosContext.Provider>
  );
}

export const useSelectedTodos = () => {
  return useContext(SelectedTodosContext);
};

export const withSelectedTodosContext = (Component) => {
  return function ComponentWithSelectedTodosContext(props) {
    return (
      <SelectedTodosContextProvider>
        <Component {...props}></Component>
      </SelectedTodosContextProvider>
    );
  };
};

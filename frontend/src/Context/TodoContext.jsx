import { createContext, useContext, useState, useMemo } from "react";
import api from "../Utils/api";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Todos
  const fetchTodos = async (selectedDate) => {
    try {
      setLoading(true);

      const date = [
        selectedDate.getFullYear(),
        String(selectedDate.getMonth() + 1).padStart(2, "0"),
        String(selectedDate.getDate()).padStart(2, "0"),
      ].join("-");

      const response = await api.get(`/todos?date=${date}`);

      setTodos(response.data.todos);
    } finally {
      setLoading(false);
    }
  };

  // Add Todos
  const addTodo = async (todoData) => {
    try {
      const response = await api.post("/todos", todoData);

      setTodos((prev) => [...prev, response.data.todo]);

      return response.data;
    } catch (error) {
      console.error("Add Todo Error:", error);
      throw error;
    }
  };

  // Update Todos
  const updateTodo = async (id, updatedData) => {
    try {
      const response = await api.patch(`/todos/${id}`, updatedData);

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data.todo : todo)),
      );

      return response.data;
    } catch (error) {
      console.error("Update Todo Error:", error);
      throw error;
    }
  };

  // Delete Todos
  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Delete Todo Error:", error);
      throw error;
    }
  };

  return (
    <TodoContext.Provider
      value={useMemo(
        () => ({
          todos,
          loading,
          fetchTodos,
          addTodo,
          updateTodo,
          deleteTodo,
        }),
        [todos, loading],
      )}
    >
      {children}
    </TodoContext.Provider>
  );
}

const useTodo = () => {
  return useContext(TodoContext);
};

export { TodoProvider, useTodo };

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TodoCalendar from "../components/Calender";
import TodoForm from "../components/TodoForm";
import TodoCard from "../components/TodoCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

import { useTodo } from "../context/TodoContext";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editingTodo, setEditingTodo] = useState(null);

  const { todos, loading, fetchTodos, addTodo, updateTodo, deleteTodo } =
    useTodo();

  const { user, logout } = useAuth();

  useEffect(() => {
    const loadTodos = async () => {
      await fetchTodos(selectedDate);
    };

    loadTodos();
  }, [selectedDate]);

  const handleAddTodo = async (todoData) => {
    const formattedDate = [
      selectedDate.getFullYear(),
      String(selectedDate.getMonth() + 1).padStart(2, "0"),
      String(selectedDate.getDate()).padStart(2, "0"),
    ].join("-");

    await addTodo({
      ...todoData,
      date: formattedDate,
    });
    await fetchTodos(selectedDate);
  };

  const handleToggleComplete = async (todo) => {
    await updateTodo(todo._id, {
      completed: !todo.completed,
    });
    await fetchTodos(selectedDate);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = async (id, updatedData) => {
    await updateTodo(id, updatedData);
    setEditingTodo(null);
    await fetchTodos(selectedDate);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const renderTodosContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (todos.length === 0) {
      return <EmptyState />;
    }
    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };

    const sortedTodos = [...todos].sort((a, b) => {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    return sortedTodos.map((todo) => (
      <TodoCard
        key={todo._id}
        todo={todo}
        onToggleComplete={handleToggleComplete}
        onEdit={handleEditTodo}
        onDelete={handleDeleteTodo}
      />
    ));
  };

  return (
    <>
      <Navbar userName={user?.name || "User"} onLogout={handleLogout} />

      <div className="min-h-[calc(100vh-72px)] bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
            {/* Left Section */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <TodoCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                disable={!!editingTodo}
              />

              <TodoForm
                onAddTodo={handleAddTodo}
                onUpdateTodo={handleUpdateTodo}
                editingTodo={editingTodo}
                clearEditing={() => setEditingTodo(null)}
              />
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    My Tasks
                  </h1>

                  <p className="text-slate-500 mt-1">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                  <span className="text-sm font-medium text-slate-600">
                    {todos.length} {todos.length === 1 ? "Task" : "Tasks"}
                  </span>
                </div>
              </div>

              <div className="space-y-4">{renderTodosContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;

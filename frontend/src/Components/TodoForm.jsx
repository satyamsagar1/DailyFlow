import { useEffect, useState } from "react";
import { Plus, PencilLine, Flag } from "lucide-react";

function TodoForm({
  onAddTodo,
  onUpdateTodo,
  editingTodo,
  clearEditing,
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setPriority(editingTodo.priority);
    } else {
      setTitle("");
      setPriority("low");
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingTodo) {
      await onUpdateTodo(editingTodo._id, {
        title: title.trim(),
        priority,
      });
    } else {
      await onAddTodo({
        title: title.trim(),
        priority,
      });
    }

    setTitle("");
    setPriority("low");
    clearEditing();
  };

  const handleCancel = () => {
    setTitle("");
    setPriority("low");
    clearEditing();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100">
          {editingTodo ? (
            <PencilLine className="text-indigo-600" size={20} />
          ) : (
            <Plus className="text-indigo-600" size={20} />
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {editingTodo ? "Edit Task" : "Create Task"}
          </h2>

          <p className="text-sm text-slate-500">
            {editingTodo
              ? "Update your task details."
              : "Plan your day with a new task."}
          </p>
        </div>
      </div>

      {/* Task */}
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Task
          </label>

          <input
            type="text"
            placeholder="What do you need to do?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Flag size={16} />
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
          >
            {editingTodo ? "Save Changes" : "Add Task"}
          </button>

          {editingTodo && (
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition-all hover:bg-slate-100 active:scale-95"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default TodoForm;
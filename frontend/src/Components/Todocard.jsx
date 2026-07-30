import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { CalendarDays } from "lucide-react";

function TodoCard({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const priorityStyles = {
    low: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    medium: {
      bg: "bg-amber-100",
      text: "text-amber-700",
      dot: "bg-amber-500",
    },
    high: {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-500",
    },
  };

  // Prevent completing future tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(todo.date);
  taskDate.setHours(0, 0, 0, 0);

  const isFutureTask = taskDate > today;

  return (
    <div
      className={`group rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        todo.completed
          ? "border-green-200 bg-green-50/40"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        {/* Left */}
        <div className="flex flex-1 items-start gap-4">
          <input
            type="checkbox"
            checked={todo.completed}
            disabled={isFutureTask}
            onChange={() => onToggleComplete(todo)}
            title={
              isFutureTask
                ? "You can't complete a future task."
                : ""
            }
            className={`mt-1 h-5 w-5 rounded cursor-pointer accent-indigo-600 transition ${
              isFutureTask
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
          />

          <div className="flex-1">
            <h3
              className={`text-lg font-semibold transition ${
                todo.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-900"
              }`}
            >
              {todo.title}
            </h3>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  priorityStyles[todo.priority].bg
                } ${priorityStyles[todo.priority].text}`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    priorityStyles[todo.priority].dot
                  }`}
                />
                {todo.priority}
              </span>

              <span className="inline-flex items-center gap-1 text-sm text-slate-500">
                <CalendarDays size={15} />
                {new Date(todo.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>

            {isFutureTask && (
              <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-700 border border-amber-200">
                This task can be completed on its scheduled date.
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            onClick={() => onEdit(todo)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
            title="Edit task"
          >
            <FiEdit2 size={18} />
          </button>

          <button
            onClick={() => onDelete(todo._id)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            title="Delete task"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoCard;
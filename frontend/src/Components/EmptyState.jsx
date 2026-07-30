import { ClipboardList } from "lucide-react";

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
        <ClipboardList
          size={38}
          className="text-indigo-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        No Tasks Yet
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        Looks like your schedule is clear for this day.
        Create a new task from the left panel to stay
        organized and productive.
      </p>

      <div className="mt-8 inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
        ✨ Start by adding your first task
      </div>
    </div>
  );
}

export default EmptyState;
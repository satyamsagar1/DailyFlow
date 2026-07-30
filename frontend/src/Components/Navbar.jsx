import { FiLogOut } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar({ userName, onLogout }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-18 px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
            D
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              DailyFlow
            </h1>
            <p className="text-xs text-slate-500">
              Organize your day effortlessly
            </p>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-slate-100 rounded-xl px-4 py-2">
            <FaRegCircleUser className="text-xl text-slate-500" />

            <div className="leading-tight">
              <p className="text-xs text-slate-500">Welcome back</p>
              <p className="font-semibold text-slate-800">{userName}</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-white font-medium shadow-sm transition-all duration-200 hover:bg-red-600 hover:shadow-md active:scale-95"
          >
            <FiLogOut className="text-lg" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
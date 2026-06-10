type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow px-5 py-3 mb-4 flex items-center gap-4">
      <div className="flex gap-4 flex-1 text-sm">
        <span className="text-gray-500">Total: <strong className="text-gray-700">{total}</strong></span>
        <span className="text-emerald-600">Done: <strong>{completedCount}</strong></span>
        <span className="text-indigo-600">Active: <strong>{activeCount}</strong></span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-brand rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs text-gray-400">{percent}%</span>
      </div>
    </div>
  );
}

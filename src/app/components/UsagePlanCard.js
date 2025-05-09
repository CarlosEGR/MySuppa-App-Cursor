export default function UsagePlanCard({ totalUsage }) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#9333EA] to-[#FFB800] p-6 text-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm font-medium opacity-80">CURRENT PLAN</p>
          <h2 className="text-3xl font-semibold mt-2">Researcher</h2>
        </div>
        <button className="text-sm bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg backdrop-blur-sm">
          Manage Plan
        </button>
      </div>
      <div>
        <p className="text-sm font-medium opacity-80 mb-2">API Limit</p>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2" 
            style={{ width: `${(totalUsage / 1000) * 100}%` }}
          />
        </div>
        <p className="text-sm mt-2">{totalUsage} / 1,000 Requests</p>
      </div>
    </div>
  );
} 
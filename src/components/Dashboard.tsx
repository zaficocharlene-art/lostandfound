import { LostFoundItem } from '../types';
import { getStats } from '../store';
import {
  ArrowRight, Heart, Shield, Sparkles, TrendingUp,
  Users, HandHeart, MapPin, Clock,
} from 'lucide-react';

interface DashboardProps {
  items: LostFoundItem[];
  onNavigate: (page: string) => void;
}

const categoryEmojis: Record<string, string> = {
  electronics: '📱', clothing: '👕', accessories: '👜', documents: '📄',
  keys: '🔑', bags: '🎒', pets: '🐾', sports: '⚽',
  books: '📚', jewelry: '💍', tools: '🔧', other: '📦',
};

const Dashboard: React.FC<DashboardProps> = ({ items, onNavigate }) => {
  const stats = getStats(items);
  const recentItems = [...items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const categoryBreakdown = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryBreakdown).sort(([, a], [, b]) => b - a).slice(0, 5);
  const maxCategoryCount = topCategories.length > 0 ? topCategories[0][1] : 1;
  const returnRate = stats.total > 0 ? Math.round(((stats.claimed + stats.returned) / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-amber-500" />
            <h1 className="text-3xl font-extrabold text-gray-900">Community Insights</h1>
          </div>
          <p className="text-gray-500 mt-1 ml-9">See how our neighborhood is making a difference 💚</p>
        </div>
        <button
          onClick={() => onNavigate('report')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
        >
          Post to Board
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard emoji="📋" label="Total Posts" value={stats.total} bg="bg-gray-50" text="text-gray-700" />
        <StatCard emoji="🔴" label="Lost Items" value={stats.lost} bg="bg-rose-50" text="text-rose-700" />
        <StatCard emoji="🟢" label="Found Items" value={stats.found} bg="bg-emerald-50" text="text-emerald-700" />
        <StatCard emoji="🔔" label="Active" value={stats.active} bg="bg-amber-50" text="text-amber-700" />
        <StatCard emoji="🤝" label="Claimed" value={stats.claimed} bg="bg-blue-50" text="text-blue-700" />
        <StatCard emoji="🎉" label="Returned!" value={stats.returned} bg="bg-purple-50" text="text-purple-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Return Rate */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-emerald-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-gray-900">Reunion Rate</h3>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#d1fae5" strokeWidth="10" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={returnRate >= 50 ? '#10b981' : returnRate >= 25 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${returnRate * 2.51} 251`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-gray-900">{returnRate}%</span>
                <span className="text-xs text-gray-400">reunited</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            {stats.claimed + stats.returned} of {stats.total} items found their way home 💛
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-amber-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-gray-900">What's Being Posted</h3>
          </div>
          <div className="space-y-3">
            {topCategories.length === 0 ? (
              <p className="text-gray-400 text-sm">No items yet</p>
            ) : (
              topCategories.map(([cat, count]) => (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-bold">{categoryEmojis[cat]} {cat}</span>
                    <span className="text-gray-400 font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full h-3 transition-all duration-700"
                      style={{ width: `${(count / maxCategoryCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Community Spirit */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-sm border-2 border-emerald-100 p-6">
          <h3 className="font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            💚 Community Spirit
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('report')}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-emerald-50 transition-all text-left cursor-pointer border border-emerald-100 hover:border-emerald-200"
            >
              <div className="bg-rose-100 p-2.5 rounded-xl">
                <HandHeart className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Report Lost Item</p>
                <p className="text-xs text-gray-400">Ask neighbors for help</p>
              </div>
            </button>
            <button
              onClick={() => onNavigate('report')}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-emerald-50 transition-all text-left cursor-pointer border border-emerald-100 hover:border-emerald-200"
            >
              <div className="bg-emerald-100 p-2.5 rounded-xl">
                <Heart className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Report Found Item</p>
                <p className="text-xs text-gray-400">Help a neighbor out</p>
              </div>
            </button>
            <button
              onClick={() => onNavigate('browse')}
              className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-emerald-50 transition-all text-left cursor-pointer border border-emerald-100 hover:border-emerald-200"
            >
              <div className="bg-amber-100 p-2.5 rounded-xl">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Browse the Board</p>
                <p className="text-xs text-gray-400">See what neighbors need</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
            📌 Latest on the Board
          </h3>
          <button
            onClick={() => onNavigate('browse')}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center gap-1 cursor-pointer"
          >
            See Full Board
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {recentItems.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No posts yet — be the first!</p>
        ) : (
          <div className="space-y-3">
            {recentItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`w-1.5 h-12 rounded-full ${item.type === 'lost' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 truncate">{item.title}</p>
                  <p className="text-sm text-gray-400 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  item.type === 'lost' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                </span>
                <span className="text-xs text-gray-300 whitespace-nowrap hidden sm:flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function StatCard({ emoji, label, value, bg, text }: {
  emoji: string; label: string; value: number; bg: string; text: string;
}) {
  return (
    <div className={`rounded-2xl shadow-sm border border-gray-100 p-4 ${bg}`}>
      <div className="text-2xl mb-1">{emoji}</div>
      <p className={`text-2xl font-extrabold ${text}`}>{value}</p>
      <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
    </div>
  );
}

export default Dashboard;

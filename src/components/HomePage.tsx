import { LostFoundItem } from '../types';
import { getStats } from '../store';
import {
  Search,
  AlertTriangle,
  Heart,
  ArrowRight,
  Package,
  Sparkles,
  HandHeart,
  MessageCircleHeart,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface HomePageProps {
  items: LostFoundItem[];
  onNavigate: (page: string) => void;
  onViewItem: (item: LostFoundItem) => void;
}

const categoryEmojis: Record<string, string> = {
  electronics: '📱', clothing: '👕', accessories: '👜', documents: '📄',
  keys: '🔑', bags: '🎒', pets: '🐾', sports: '⚽',
  books: '📚', jewelry: '💍', tools: '🔧', other: '📦',
};

const HomePage: React.FC<HomePageProps> = ({ items, onNavigate, onViewItem }) => {
  const stats = getStats(items);
  const recentItems = [...items]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const returnRate = stats.total > 0 ? Math.round(((stats.claimed + stats.returned) / stats.total) * 100) : 0;

  return (
    <div>
      {/* Hero Section - Community Warmth */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Neighbors helping neighbors since day one
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Lost Something?
              <br />
              <span className="text-amber-300">Your Neighbors</span>
              <br />
              Are Here to Help
            </h1>
            <p className="text-lg sm:text-xl text-emerald-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Our community board connects neighbors who've lost items with those who've found them.
              Together, we look out for each other. 💛
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('report')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-400 text-amber-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <AlertTriangle className="w-5 h-5" />
                I Lost Something
              </button>
              <button
                onClick={() => onNavigate('browse')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white/40 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all cursor-pointer"
              >
                <Search className="w-5 h-5" />
                I Found Something
              </button>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80V30C240 0 480 60 720 30C960 0 1200 60 1440 30V80H0Z" fill="#fefce8" />
          </svg>
        </div>
      </div>

      {/* Community Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-4 mb-12">
        <div className="bg-white rounded-3xl shadow-lg border border-amber-100 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Our Community Impact</h2>
            <p className="text-sm text-gray-500 mt-1">Real neighbors, real results 🤝</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 bg-emerald-50 rounded-2xl">
              <div className="text-3xl mb-1">📋</div>
              <p className="text-3xl font-extrabold text-emerald-700">{stats.total}</p>
              <p className="text-sm text-emerald-600 font-medium">Items Posted</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-2xl">
              <div className="text-3xl mb-1">🔍</div>
              <p className="text-3xl font-extrabold text-red-600">{stats.lost}</p>
              <p className="text-sm text-red-500 font-medium">Looking For</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-2xl">
              <div className="text-3xl mb-1">🎉</div>
              <p className="text-3xl font-extrabold text-green-600">{stats.found}</p>
              <p className="text-sm text-green-500 font-medium">Found Items</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-2xl">
              <div className="text-3xl mb-1">💛</div>
              <p className="text-3xl font-extrabold text-amber-600">{returnRate}%</p>
              <p className="text-sm text-amber-500 font-medium">Reunited!</p>
            </div>
          </div>
        </div>
      </div>

      {/* How Our Community Works */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">How NeighborsHelp Works</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Simple steps to reunite lost items — powered by community spirit
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative bg-white rounded-3xl p-7 shadow-sm border-2 border-amber-100 hover:border-amber-200 transition-all group">
            <div className="absolute -top-4 left-6 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Step 1
            </div>
            <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">Post on the Board</h3>
            <p className="text-gray-500 leading-relaxed">
              Share what you lost or found. Add details, location, and how neighbors can reach you.
            </p>
          </div>
          <div className="relative bg-white rounded-3xl p-7 shadow-sm border-2 border-emerald-100 hover:border-emerald-200 transition-all group">
            <div className="absolute -top-4 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Step 2
            </div>
            <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">Neighbors Search</h3>
            <p className="text-gray-500 leading-relaxed">
              Community members browse the board, filter by area, and look for matches.
            </p>
          </div>
          <div className="relative bg-white rounded-3xl p-7 shadow-sm border-2 border-rose-100 hover:border-rose-200 transition-all group">
            <div className="absolute -top-4 left-6 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Step 3
            </div>
            <div className="bg-rose-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <HandHeart className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-2">Reunite & Celebrate</h3>
            <p className="text-gray-500 leading-relaxed">
              Connect with the owner, verify the item, and return it. Another neighborly win! 🎉
            </p>
          </div>
        </div>
      </div>

      {/* Community Board Preview */}
      <div className="board-bg py-16 border-y-4 border-dashed border-amber-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-3xl font-extrabold text-amber-900">📌 Community Board</h2>
              </div>
              <p className="text-amber-700/70">Latest posts from your neighbors</p>
            </div>
            <button
              onClick={() => onNavigate('browse')}
              className="hidden sm:flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-bold bg-amber-200/60 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              See Full Board
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {recentItems.length === 0 ? (
            <div className="text-center py-16 bg-white/60 rounded-3xl backdrop-blur-sm">
              <div className="text-6xl mb-4">🏘️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">Board is empty!</h3>
              <p className="text-gray-500 mb-5">Be the first to post and help your community.</p>
              <button
                onClick={() => onNavigate('report')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-colors cursor-pointer"
              >
                Post Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {recentItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => onViewItem(item)}
                  className={`pin-card ${item.type === 'found' ? 'pin-card-green' : ''} bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden text-left transition-all hover:-translate-y-1 cursor-pointer border border-gray-100`}
                  style={{ transform: `rotate(${idx % 2 === 0 ? -0.5 : 0.5}deg)` }}
                >
                  <div
                    className={`px-4 py-3 flex items-center justify-between ${
                      item.type === 'lost'
                        ? 'bg-gradient-to-r from-red-500 to-rose-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    }`}
                  >
                    <span className="text-white font-bold text-sm flex items-center gap-1.5">
                      {item.type === 'lost' ? '🔴 LOST' : '🟢 FOUND'}
                    </span>
                    <span className="text-white/90 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      {categoryEmojis[item.category] || '📦'} {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-1.5">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-dashed border-gray-200">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {item.reward && (
                      <div className="mt-3 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1">
                        🎁 Reward: {item.reward}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <button
              onClick={() => onNavigate('browse')}
              className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-800 px-5 py-2.5 rounded-xl font-bold cursor-pointer"
            >
              See Full Board
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Community Values */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">What Makes Us Special</h2>
          <p className="text-gray-500">The heart of our community 💚</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Safe & Trusted</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Verified contact info on every post. Our community looks out for each other.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircleHeart className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Neighborly Spirit</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Every item returned is a connection made. We celebrate each reunion!
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-amber-500" fill="currentColor" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">100% Free</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              No fees, no ads, no sign-ups. Just neighbors helping neighbors, always free.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🏡</div>
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Every Neighbor Matters
          </h2>
          <p className="text-emerald-100 max-w-xl mx-auto mb-8 leading-relaxed">
            Whether it's a lost set of keys or a found backpack — your post could make
            someone's day. Join the community that cares.
          </p>
          <button
            onClick={() => onNavigate('report')}
            className="inline-flex items-center gap-2 bg-amber-400 text-amber-900 px-8 py-3.5 rounded-2xl font-bold text-lg hover:bg-amber-300 transition-colors shadow-lg cursor-pointer"
          >
            <HandHeart className="w-5 h-5" />
            Help a Neighbor Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

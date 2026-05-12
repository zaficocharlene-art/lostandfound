import { useState, useMemo } from 'react';
import { LostFoundItem, FilterOptions, ItemCategory } from '../types';
import { filterItems } from '../store';
import ItemCard from './ItemCard';
import {
  Search, SlidersHorizontal, ChevronDown, X, ArrowUpDown, Pin,
} from 'lucide-react';

interface ItemListProps {
  items: LostFoundItem[];
  onViewItem: (item: LostFoundItem) => void;
  onStatusChange: (id: string, status: LostFoundItem['status']) => void;
  onDelete: (id: string) => void;
}

const categories: { value: ItemCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'electronics', label: '📱 Electronics' },
  { value: 'clothing', label: '👕 Clothing' },
  { value: 'accessories', label: '👜 Accessories' },
  { value: 'documents', label: '📄 Documents' },
  { value: 'keys', label: '🔑 Keys' },
  { value: 'bags', label: '🎒 Bags & Wallets' },
  { value: 'pets', label: '🐾 Pets' },
  { value: 'sports', label: '⚽ Sports' },
  { value: 'books', label: '📚 Books' },
  { value: 'jewelry', label: '💍 Jewelry' },
  { value: 'tools', label: '🔧 Tools' },
  { value: 'other', label: '📦 Other' },
];

const ItemList: React.FC<ItemListProps> = ({ items, onViewItem, onStatusChange, onDelete }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    search: '', type: 'all', category: 'all', status: 'all', sortBy: 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => filterItems(items, filters), [items, filters]);

  const activeFilterCount = [
    filters.type !== 'all', filters.category !== 'all', filters.status !== 'all',
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({ search: '', type: 'all', category: 'all', status: 'all', sortBy: 'newest' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Pin className="w-7 h-7 text-amber-500" />
            <h1 className="text-3xl font-extrabold text-gray-900">Community Board</h1>
          </div>
          <p className="text-gray-500 mt-1 ml-9">
            {filteredItems.length} {filteredItems.length === 1 ? 'post' : 'posts'} on the board
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          placeholder="Search the community board..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-emerald-100 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-gray-900 placeholder-gray-400 text-lg"
        />
        {filters.search && (
          <button
            onClick={() => setFilters((f) => ({ ...f, search: '' }))}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Type Tabs & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center bg-gray-100 rounded-xl p-1">
          {(['all', 'lost', 'found'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilters((f) => ({ ...f, type }))}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                filters.type === type
                  ? type === 'lost' ? 'bg-rose-500 text-white shadow-sm'
                    : type === 'found' ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type === 'all' ? '📋 All' : type === 'lost' ? '🔴 Lost' : '🟢 Found'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value as FilterOptions['sortBy'] }))}
              className="appearance-none pl-8 pr-8 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all cursor-pointer ${
              showFilters || activeFilterCount > 0
                ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-sm border-2 border-emerald-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm">🔍 Filter the Board</h3>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-emerald-600 hover:text-emerald-700 font-bold cursor-pointer">
                Clear All
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value as FilterOptions['category'] }))}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value as FilterOptions['status'] }))}
                className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="active">🔔 Active</option>
                <option value="claimed">🤝 Claimed</option>
                <option value="returned">🎉 Returned</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-amber-200">
          <div className="text-6xl mb-4">📌</div>
          <h3 className="text-xl font-extrabold text-gray-900 mb-1">Board is empty here!</h3>
          <p className="text-gray-500 text-sm mb-4">
            {filters.search || activeFilterCount > 0
              ? 'Try adjusting your search or filters'
              : 'No items have been posted yet'}
          </p>
          {(filters.search || activeFilterCount > 0) && (
            <button onClick={clearFilters} className="text-emerald-600 hover:text-emerald-700 font-bold text-sm cursor-pointer">
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onView={onViewItem}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;

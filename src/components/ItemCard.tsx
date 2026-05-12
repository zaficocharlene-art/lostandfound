import { LostFoundItem } from '../types';
import {
  MapPin, Calendar, Clock, Gift,
  CheckCircle2, RotateCcw, Trash2, Eye, MessageCircle,
} from 'lucide-react';

interface ItemCardProps {
  item: LostFoundItem;
  onView: (item: LostFoundItem) => void;
  onStatusChange: (id: string, status: LostFoundItem['status']) => void;
  onDelete: (id: string) => void;
}

const categoryEmojis: Record<string, string> = {
  electronics: '📱', clothing: '👕', accessories: '👜', documents: '📄',
  keys: '🔑', bags: '🎒', pets: '🐾', sports: '⚽',
  books: '📚', jewelry: '💍', tools: '🔧', other: '📦',
};

const ItemCard: React.FC<ItemCardProps> = ({ item, onView, onStatusChange, onDelete }) => {
  const isLost = item.type === 'lost';

  // Generate avatar initials
  const initials = item.contactName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const avatarColors = [
    'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-blue-500',
    'bg-purple-500', 'bg-teal-500', 'bg-orange-500', 'bg-pink-500',
  ];
  const avatarColor = avatarColors[item.contactName.length % avatarColors.length];

  const getStatusBadge = () => {
    switch (item.status) {
      case 'active':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            🔔 Active
          </span>
        );
      case 'claimed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            🤝 Claimed
          </span>
        );
      case 'returned':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
            🎉 Returned!
          </span>
        );
    }
  };

  const timeAgo = () => {
    const diff = Date.now() - new Date(item.createdAt).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`;
    return new Date(item.createdAt).toLocaleDateString();
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${
        isLost ? 'border-rose-100 hover:border-rose-200' : 'border-emerald-100 hover:border-emerald-200'
      }`}
    >
      {/* Header Banner */}
      <div
        className={`px-5 py-3 flex items-center justify-between ${
          isLost
            ? 'bg-gradient-to-r from-rose-500 to-red-500'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500'
        }`}
      >
        <span className="text-white font-bold text-sm flex items-center gap-1.5">
          {isLost ? '🔴 Lost Item' : '🟢 Found Item'}
        </span>
        {getStatusBadge()}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Emoji */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{item.title}</h3>
          <span className="text-3xl flex-shrink-0 animate-float" title={item.category}>
            {categoryEmojis[item.category] || '📦'}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {item.reward && (
            <div className="flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg w-fit">
              <Gift className="w-4 h-4 flex-shrink-0" />
              <span>Reward: {item.reward}</span>
            </div>
          )}
        </div>

        {/* Neighbor Info */}
        <div className="flex items-center gap-3 pt-3 border-t border-dashed border-gray-200 mb-4">
          <div className={`w-9 h-9 rounded-full ${avatarColor} flex items-center justify-center text-white text-xs font-bold shadow-sm flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate">{item.contactName}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(item)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2.5 px-3 rounded-xl text-sm font-bold transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            View & Contact
          </button>
          {item.status === 'active' && (
            <button
              onClick={() => onStatusChange(item.id, 'claimed')}
              className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
              title="Mark as Claimed"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
          {item.status === 'claimed' && (
            <button
              onClick={() => onStatusChange(item.id, 'returned')}
              className="p-2.5 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 transition-colors cursor-pointer"
              title="Mark as Returned"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          )}
          {item.status !== 'active' && (
            <button
              onClick={() => onStatusChange(item.id, 'active')}
              className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors cursor-pointer"
              title="Reactivate"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onDelete(item.id)}
            className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition-colors cursor-pointer"
            title="Remove from Board"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

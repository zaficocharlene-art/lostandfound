import { LostFoundItem } from '../types';
import {
  X, MapPin, Calendar, Mail, Phone, Clock,
  CheckCircle2, RotateCcw, Trash2, AlertTriangle, Search,
} from 'lucide-react';

interface ItemDetailProps {
  item: LostFoundItem;
  onClose: () => void;
  onStatusChange: (id: string, status: LostFoundItem['status']) => void;
  onDelete: (id: string) => void;
}

const categoryEmojis: Record<string, string> = {
  electronics: '📱', clothing: '👕', accessories: '👜', documents: '📄',
  keys: '🔑', bags: '🎒', pets: '🐾', sports: '⚽',
  books: '📚', jewelry: '💍', tools: '🔧', other: '📦',
};

const ItemDetail: React.FC<ItemDetailProps> = ({ item, onClose, onStatusChange, onDelete }) => {
  const isLost = item.type === 'lost';

  const initials = item.contactName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const avatarColors = ['bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-blue-500', 'bg-purple-500', 'bg-teal-500'];
  const avatarColor = avatarColors[item.contactName.length % avatarColors.length];

  const handleDelete = () => {
    if (window.confirm('Remove this item from the community board?')) {
      onDelete(item.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`px-6 py-5 flex items-center justify-between rounded-t-3xl ${
            isLost
              ? 'bg-gradient-to-r from-rose-500 to-red-500'
              : 'bg-gradient-to-r from-emerald-500 to-teal-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              {isLost ? <AlertTriangle className="w-6 h-6 text-white" /> : <Search className="w-6 h-6 text-white" />}
            </div>
            <div>
              <span className="text-white/80 text-xs uppercase tracking-wider font-bold">
                {isLost ? '🔴 Lost Item' : '🟢 Found Item'}
              </span>
              <h2 className="text-white font-extrabold text-xl leading-tight">{item.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/20 transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1.5 rounded-full text-sm font-bold ${
              item.status === 'active' ? 'bg-amber-100 text-amber-800' :
              item.status === 'claimed' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {item.status === 'active' ? '🔔 Active' : item.status === 'claimed' ? '🤝 Claimed' : '🎉 Returned!'}
            </span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
              {categoryEmojis[item.category]} {item.category}
            </span>
            {item.reward && (
              <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                🎁 Reward: {item.reward}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
            <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">📝 Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <MapPin className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-bold">Location</p>
                <p className="font-semibold text-gray-900 text-sm">{item.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-bold">Date</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
              <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-400 font-bold">Posted</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info - Neighbor Card */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-sm font-bold text-emerald-700 mb-4 flex items-center gap-2">
              🤝 Contact This Neighbor
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl ${avatarColor} flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                {initials}
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-lg">{item.contactName}</p>
                <p className="text-sm text-emerald-600">Community Member</p>
              </div>
            </div>
            <div className="space-y-3">
              <a
                href={`mailto:${item.contactEmail}`}
                className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-emerald-50 transition-colors group"
              >
                <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-semibold text-blue-600 text-sm">{item.contactEmail}</p>
                </div>
              </a>
              <a
                href={`tel:${item.contactPhone}`}
                className="flex items-center gap-3 p-3 bg-white rounded-xl hover:bg-emerald-50 transition-colors group"
              >
                <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-semibold text-green-600 text-sm">{item.contactPhone}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t-2 border-dashed border-gray-200">
            {item.status === 'active' && (
              <button
                onClick={() => onStatusChange(item.id, 'claimed')}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Claimed
              </button>
            )}
            {item.status === 'claimed' && (
              <button
                onClick={() => onStatusChange(item.id, 'returned')}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                🎉 Mark as Returned!
              </button>
            )}
            {item.status !== 'active' && (
              <button
                onClick={() => onStatusChange(item.id, 'active')}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reactivate
              </button>
            )}
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-sm font-bold transition-colors ml-auto cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

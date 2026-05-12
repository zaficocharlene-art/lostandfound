import { useState } from 'react';
import { ItemType, ItemCategory } from '../types';
import { AlertTriangle, Search, X, Gift, Heart } from 'lucide-react';

interface ItemFormProps {
  onSubmit: (data: {
    type: ItemType;
    title: string;
    description: string;
    category: ItemCategory;
    location: string;
    date: string;
    imageUrl: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    reward?: string;
  }) => void;
  onCancel: () => void;
}

const categories: { value: ItemCategory; label: string; emoji: string }[] = [
  { value: 'electronics', label: 'Electronics', emoji: '📱' },
  { value: 'clothing', label: 'Clothing', emoji: '👕' },
  { value: 'accessories', label: 'Accessories', emoji: '👜' },
  { value: 'documents', label: 'Documents', emoji: '📄' },
  { value: 'keys', label: 'Keys', emoji: '🔑' },
  { value: 'bags', label: 'Bags & Wallets', emoji: '🎒' },
  { value: 'pets', label: 'Pets', emoji: '🐾' },
  { value: 'sports', label: 'Sports & Outdoors', emoji: '⚽' },
  { value: 'books', label: 'Books & Stationery', emoji: '📚' },
  { value: 'jewelry', label: 'Jewelry & Watches', emoji: '💍' },
  { value: 'tools', label: 'Tools', emoji: '🔧' },
  { value: 'other', label: 'Other', emoji: '📦' },
];

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState<ItemType>('lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ItemCategory>('other');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [reward, setReward] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Please add a title';
    if (!description.trim()) newErrors.description = 'Please describe the item';
    if (!location.trim()) newErrors.location = 'Where was it lost/found?';
    if (!date) newErrors.date = 'Please add a date';
    if (!contactName.trim()) newErrors.contactName = 'Your name helps neighbors identify you';
    if (!contactEmail.trim()) newErrors.contactEmail = 'Email is needed so neighbors can reach you';
    else if (!/\S+@\S+\.\S+/.test(contactEmail)) newErrors.contactEmail = 'Please enter a valid email';
    if (!contactPhone.trim()) newErrors.contactPhone = 'Phone number is needed';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      type, title: title.trim(), description: description.trim(), category,
      location: location.trim(), date, imageUrl: '',
      contactName: contactName.trim(), contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(), reward: reward.trim() || undefined,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-7xl mb-6 animate-float">🎉</div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Posted to the Board!</h2>
        <p className="text-gray-500 mb-8 text-lg">
          Your {type === 'lost' ? 'lost' : 'found'} item is now visible to the community.
          <br />
          <span className="text-emerald-600 font-medium">Neighbors will be on the lookout! 💚</span>
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => { setSubmitted(false); setTitle(''); setDescription(''); setLocation(''); setReward(''); }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
          >
            Post Another Item
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl font-bold transition-colors cursor-pointer"
          >
            Back to Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <div className="text-4xl mb-3">📌</div>
        <h1 className="text-3xl font-extrabold text-gray-900">Pin It on the Board</h1>
        <p className="text-gray-500 mt-1">Share with your neighbors — someone might be able to help!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-amber-100 p-6">
          <label className="block text-sm font-bold text-gray-700 mb-4">What's happening?</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType('lost')}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                type === 'lost'
                  ? 'border-rose-400 bg-rose-50 shadow-md'
                  : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/50'
              }`}
            >
              <div className={`p-3 rounded-2xl ${type === 'lost' ? 'bg-rose-200' : 'bg-gray-100'}`}>
                <AlertTriangle className={`w-8 h-8 ${type === 'lost' ? 'text-rose-600' : 'text-gray-400'}`} />
              </div>
              <span className={`font-extrabold text-lg ${type === 'lost' ? 'text-rose-700' : 'text-gray-500'}`}>
                I Lost Something
              </span>
              <span className="text-xs text-gray-400">Ask neighbors to keep an eye out</span>
            </button>
            <button
              type="button"
              onClick={() => setType('found')}
              className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                type === 'found'
                  ? 'border-emerald-400 bg-emerald-50 shadow-md'
                  : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50'
              }`}
            >
              <div className={`p-3 rounded-2xl ${type === 'found' ? 'bg-emerald-200' : 'bg-gray-100'}`}>
                <Search className={`w-8 h-8 ${type === 'found' ? 'text-emerald-600' : 'text-gray-400'}`} />
              </div>
              <span className={`font-extrabold text-lg ${type === 'found' ? 'text-emerald-700' : 'text-gray-500'}`}>
                I Found Something
              </span>
              <span className="text-xs text-gray-400">Help return it to its owner</span>
            </button>
          </div>
        </div>

        {/* Item Details */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            📝 Item Details
          </h2>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              What is it? <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Black Leather Wallet, Golden Retriever named Buddy"
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.title ? 'border-rose-300 focus:ring-rose-400' : 'border-gray-200 focus:ring-emerald-400 focus:border-emerald-400'
              } focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
            />
            {errors.title && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Tell us more <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe it — color, size, brand, any unique marks, what's inside..."
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.description ? 'border-rose-300 focus:ring-rose-400' : 'border-gray-200 focus:ring-emerald-400 focus:border-emerald-400'
              } focus:outline-none focus:ring-2 transition-all resize-none bg-gray-50 focus:bg-white`}
            />
            {errors.description && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ItemCategory)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all bg-gray-50 focus:bg-white cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.emoji} {cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                When? <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.date ? 'border-rose-300' : 'border-gray-200 focus:ring-emerald-400 focus:border-emerald-400'
                } focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
              />
              {errors.date && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Where? <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Community Park, Bus Stop on Main St, Library 2nd floor"
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.location ? 'border-rose-300' : 'border-gray-200 focus:ring-emerald-400 focus:border-emerald-400'
              } focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
            />
            {errors.location && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.location}</p>}
          </div>

          {type === 'lost' && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-amber-500" />
                  Offering a reward? (Optional)
                </span>
              </label>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="e.g., $50, Homemade cookies, A big thank you!"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all bg-gray-50 focus:bg-white"
              />
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-6 space-y-5">
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            🤝 How Can Neighbors Reach You?
          </h2>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Your Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="So neighbors know who they're helping"
              className={`w-full px-4 py-3 rounded-xl border-2 ${
                errors.contactName ? 'border-rose-300' : 'border-gray-200 focus:ring-emerald-400 focus:border-emerald-400'
              } focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
            />
            {errors.contactName && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.contactName}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@email.com"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.contactEmail ? 'border-rose-300' : 'border-gray-200 focus:ring-emerald-400 focus:border-emerald-400'
                } focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
              />
              {errors.contactEmail && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.contactEmail}</p>}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">
                Phone <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.contactPhone ? 'border-rose-300' : 'border-gray-200 focus:ring-emerald-400 focus:border-emerald-400'
                } focus:outline-none focus:ring-2 transition-all bg-gray-50 focus:bg-white`}
              />
              {errors.contactPhone && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.contactPhone}</p>}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-extrabold text-white transition-all shadow-lg hover:shadow-xl cursor-pointer ${
              type === 'lost'
                ? 'bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600'
            }`}
          >
            <Heart className="w-4 h-4" fill="white" />
            Post to Community Board
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;

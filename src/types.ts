export type ItemType = 'lost' | 'found';
export type ItemStatus = 'active' | 'claimed' | 'returned';
export type ItemCategory =
  | 'electronics'
  | 'clothing'
  | 'accessories'
  | 'documents'
  | 'keys'
  | 'bags'
  | 'pets'
  | 'sports'
  | 'books'
  | 'jewelry'
  | 'tools'
  | 'other';

export interface LostFoundItem {
  id: string;
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
  status: ItemStatus;
  createdAt: string;
  reward?: string;
}

export interface FilterOptions {
  search: string;
  type: ItemType | 'all';
  category: ItemCategory | 'all';
  status: ItemStatus | 'all';
  sortBy: 'newest' | 'oldest' | 'name';
}

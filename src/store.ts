import { LostFoundItem, FilterOptions } from './types';

const STORAGE_KEY = 'community-lost-found-items';

const sampleItems: LostFoundItem[] = [
  {
    id: '1',
    type: 'lost',
    title: 'Black Leather Wallet',
    description: 'Lost my black leather wallet near the community park. It contains my ID, some cash, and a few credit cards. Very important to me. Please contact if found.',
    category: 'accessories',
    location: 'Community Park, Main Street',
    date: '2026-01-10',
    imageUrl: '',
    contactName: 'John Smith',
    contactEmail: 'john.smith@email.com',
    contactPhone: '(555) 123-4567',
    status: 'active',
    createdAt: '2026-01-10T14:30:00Z',
    reward: '$50',
  },
  {
    id: '2',
    type: 'found',
    title: 'Silver iPhone 15',
    description: 'Found a silver iPhone 15 on the bench near the library. It has a blue case. The phone is locked but I can see notifications. Owner can claim by describing the lock screen.',
    category: 'electronics',
    location: 'City Library, 2nd Floor',
    date: '2026-01-12',
    imageUrl: '',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah.j@email.com',
    contactPhone: '(555) 987-6543',
    status: 'active',
    createdAt: '2026-01-12T09:15:00Z',
  },
  {
    id: '3',
    type: 'lost',
    title: 'Golden Retriever - "Buddy"',
    description: 'My golden retriever "Buddy" ran away from the dog park. He is friendly, about 3 years old, weighs 70 lbs, and is wearing a red collar with a bone-shaped tag. Please call if you see him!',
    category: 'pets',
    location: 'Riverside Dog Park',
    date: '2026-01-14',
    imageUrl: '',
    contactName: 'Mike Davis',
    contactEmail: 'mike.davis@email.com',
    contactPhone: '(555) 456-7890',
    status: 'active',
    createdAt: '2026-01-14T16:45:00Z',
    reward: '$200',
  },
  {
    id: '4',
    type: 'found',
    title: 'Set of Car Keys',
    description: 'Found a set of car keys with a Toyota key fob and 3 other keys on a keychain. Found in the parking lot of the grocery store.',
    category: 'keys',
    location: 'Walmart Parking Lot',
    date: '2026-01-15',
    imageUrl: '',
    contactName: 'Emily Chen',
    contactEmail: 'emily.chen@email.com',
    contactPhone: '(555) 321-0987',
    status: 'active',
    createdAt: '2026-01-15T11:20:00Z',
  },
  {
    id: '5',
    type: 'lost',
    title: 'Blue North Face Backpack',
    description: 'Lost a blue North Face backpack on the bus route 42. It contains my laptop (Dell XPS), notebooks, and a water bottle. Very important for my work.',
    category: 'bags',
    location: 'Bus Route 42, Downtown',
    date: '2026-01-16',
    imageUrl: '',
    contactName: 'Alex Rivera',
    contactEmail: 'alex.r@email.com',
    contactPhone: '(555) 654-3210',
    status: 'active',
    createdAt: '2026-01-16T08:00:00Z',
    reward: '$100',
  },
  {
    id: '6',
    type: 'found',
    title: 'Passport - US',
    description: 'Found a US passport at the airport terminal 2, near gate B14. The passport is in a plastic cover. Please contact to claim.',
    category: 'documents',
    location: 'Airport Terminal 2',
    date: '2026-01-17',
    imageUrl: '',
    contactName: 'Airport Security',
    contactEmail: 'security@airport.com',
    contactPhone: '(555) 111-2222',
    status: 'active',
    createdAt: '2026-01-17T13:00:00Z',
  },
  {
    id: '7',
    type: 'lost',
    title: 'Diamond Engagement Ring',
    description: 'Lost a diamond engagement ring at the beach near the pier. It is a white gold band with a 1-carat diamond. This is very sentimental. Please help!',
    category: 'jewelry',
    location: 'Sunset Beach, Near Pier',
    date: '2026-01-18',
    imageUrl: '',
    contactName: 'Jessica Taylor',
    contactEmail: 'jessica.t@email.com',
    contactPhone: '(555) 777-8888',
    status: 'active',
    createdAt: '2026-01-18T17:30:00Z',
    reward: '$500',
  },
  {
    id: '8',
    type: 'found',
    title: 'Red Bicycle',
    description: 'Found a red mountain bike locked to a fence near the school. It has been there for 3 days. If this is yours, please describe the bike lock combination.',
    category: 'sports',
    location: 'Lincoln High School',
    date: '2026-01-19',
    imageUrl: '',
    contactName: 'Tom Wilson',
    contactEmail: 'tom.wilson@email.com',
    contactPhone: '(555) 333-4444',
    status: 'active',
    createdAt: '2026-01-19T10:00:00Z',
  },
  {
    id: '9',
    type: 'lost',
    title: 'Medical Prescription Glasses',
    description: 'Lost my prescription glasses at the coffee shop on Oak Street. They are black rectangular frames, prescription -3.5. I cannot see well without them.',
    category: 'accessories',
    location: 'Starbucks, Oak Street',
    date: '2026-01-20',
    imageUrl: '',
    contactName: 'David Park',
    contactEmail: 'david.park@email.com',
    contactPhone: '(555) 555-6666',
    status: 'active',
    createdAt: '2026-01-20T15:45:00Z',
  },
  {
    id: '10',
    type: 'found',
    title: 'Leather-bound Journal',
    description: 'Found a brown leather-bound journal at the park gazebo. It appears to contain personal notes and sketches. Would like to return it to the owner.',
    category: 'books',
    location: 'Central Park Gazebo',
    date: '2026-01-21',
    imageUrl: '',
    contactName: 'Lisa Martinez',
    contactEmail: 'lisa.m@email.com',
    contactPhone: '(555) 888-9999',
    status: 'active',
    createdAt: '2026-01-21T12:30:00Z',
  },
];

export function getItems(): LostFoundItem[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleItems));
  return sampleItems;
}

export function saveItems(items: LostFoundItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addItem(item: Omit<LostFoundItem, 'id' | 'createdAt' | 'status'>): LostFoundItem {
  const items = getItems();
  const newItem: LostFoundItem = {
    ...item,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
    status: 'active',
  };
  items.unshift(newItem);
  saveItems(items);
  return newItem;
}

export function updateItem(id: string, updates: Partial<LostFoundItem>): LostFoundItem | null {
  const items = getItems();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  saveItems(items);
  return items[index];
}

export function deleteItem(id: string): boolean {
  const items = getItems();
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  saveItems(filtered);
  return true;
}

export function getItemById(id: string): LostFoundItem | null {
  const items = getItems();
  return items.find((item) => item.id === id) || null;
}

export function filterItems(items: LostFoundItem[], filters: FilterOptions): LostFoundItem[] {
  let result = [...items];

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    result = result.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.contactName.toLowerCase().includes(searchLower)
    );
  }

  if (filters.type !== 'all') {
    result = result.filter((item) => item.type === filters.type);
  }

  if (filters.category !== 'all') {
    result = result.filter((item) => item.category === filters.category);
  }

  if (filters.status !== 'all') {
    result = result.filter((item) => item.status === filters.status);
  }

  switch (filters.sortBy) {
    case 'newest':
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'oldest':
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      break;
    case 'name':
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return result;
}

export function getStats(items: LostFoundItem[]) {
  return {
    total: items.length,
    lost: items.filter((i) => i.type === 'lost').length,
    found: items.filter((i) => i.type === 'found').length,
    active: items.filter((i) => i.status === 'active').length,
    claimed: items.filter((i) => i.status === 'claimed').length,
    returned: items.filter((i) => i.status === 'returned').length,
  };
}

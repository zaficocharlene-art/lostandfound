import { useState, useEffect, useCallback } from 'react';
import { LostFoundItem } from './types';
import { getItems, addItem, updateItem, deleteItem } from './store';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import ItemDetail from './components/ItemDetail';
import Dashboard from './components/Dashboard';
import { Heart } from 'lucide-react';

type Page = 'home' | 'browse' | 'report' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<LostFoundItem | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    setItems(getItems());
  }, []);

  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  }, []);

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAddItem = useCallback(
    (data: Omit<LostFoundItem, 'id' | 'createdAt' | 'status'>) => {
      addItem(data);
      setItems(getItems());
      showNotification(
        `📌 "${data.title}" has been pinned to the community board!`
      );
      setTimeout(() => handleNavigate('browse'), 1500);
    },
    [showNotification, handleNavigate]
  );

  const handleStatusChange = useCallback(
    (id: string, status: LostFoundItem['status']) => {
      const updated = updateItem(id, { status });
      if (updated) {
        setItems(getItems());
        setSelectedItem(updated);
        if (status === 'claimed') showNotification(`🤝 "${updated.title}" has been claimed!`);
        else if (status === 'returned') showNotification(`🎉 "${updated.title}" is back home! Another neighborly win!`);
        else showNotification(`🔔 "${updated.title}" is active again on the board.`);
      }
    },
    [showNotification]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const item = items.find((i) => i.id === id);
      if (deleteItem(id)) {
        setItems(getItems());
        showNotification(`Removed "${item?.title}" from the board.`, 'info');
      }
    },
    [items, showNotification]
  );

  const handleViewItem = useCallback((item: LostFoundItem) => {
    setSelectedItem(item);
  }, []);

  return (
    <div className="min-h-screen bg-amber-50/30">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-sm">
          <div
            className={`px-5 py-3.5 rounded-2xl shadow-xl text-white font-bold text-sm flex items-center gap-2 border-2 ${
              notification.type === 'success'
                ? 'bg-emerald-500 border-emerald-400'
                : notification.type === 'error'
                ? 'bg-rose-500 border-rose-400'
                : 'bg-blue-500 border-blue-400'
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <HomePage items={items} onNavigate={handleNavigate} onViewItem={handleViewItem} />
        )}
        {currentPage === 'browse' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ItemList
              items={items}
              onViewItem={handleViewItem}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </div>
        )}
        {currentPage === 'report' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ItemForm onSubmit={handleAddItem} onCancel={() => handleNavigate('browse')} />
          </div>
        )}
        {currentPage === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Dashboard items={items} onNavigate={handleNavigate} />
          </div>
        )}
      </main>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetail
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onStatusChange={handleStatusChange}
          onDelete={(id) => { handleDelete(id); setSelectedItem(null); }}
        />
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-800 to-teal-800 text-emerald-200 py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl">
              <Heart className="w-5 h-5" fill="white" />
              NeighborsHelp
            </div>
            <p className="text-sm text-emerald-300 max-w-md">
              A community-powered lost & found board. Because neighbors look out for each other. 💛
            </p>
            <div className="flex items-center gap-6 text-xs text-emerald-400">
              <span>🏡 Community First</span>
              <span>🤝 Always Free</span>
              <span>💚 Neighbor Powered</span>
            </div>
            <p className="text-xs text-emerald-500 mt-2">
              © {new Date().getFullYear()} NeighborsHelp Community Lost & Found
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

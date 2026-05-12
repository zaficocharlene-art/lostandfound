import { useState } from 'react';
import { Home, Search, PlusCircle, BarChart3, Menu, X, Heart, Users } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'browse', label: 'Community Board', icon: Search },
    { id: 'report', label: 'Post Item', icon: PlusCircle },
    { id: 'dashboard', label: 'Insights', icon: BarChart3 },
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-white font-bold text-xl hover:opacity-90 transition-opacity cursor-pointer"
          >
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Heart className="w-5 h-5" fill="white" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-lg leading-tight font-extrabold">NeighborsHelp</span>
              <span className="block text-[10px] text-emerald-200 leading-tight -mt-0.5">Community Lost & Found</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-white/25 text-white shadow-inner backdrop-blur-sm'
                    : 'text-emerald-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Community Badge */}
          <div className="hidden md:flex items-center gap-2 bg-amber-400/90 text-amber-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
            <Users className="w-3.5 h-3.5" />
            Community Strong
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-emerald-800 border-t border-emerald-600 px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                currentPage === item.id
                  ? 'bg-white/25 text-white'
                  : 'text-emerald-100 hover:bg-white/15'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

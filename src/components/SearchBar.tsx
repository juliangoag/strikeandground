import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  city: string;
  category: string;
  searchTerm: string;
}

const cities = [
  'Todas las ciudades',
  'Madrid',
  'Barcelona',
  'Valencia',
  'Sevilla',
  'Bilbao',
  'Málaga',
  'Zaragoza',
];

const categories = [
  'Todas las categorías',
  'MMA',
  'Boxeo',
  'Muay Thai',
  'Kickboxing',
  'BJJ',
  'Wrestling',
];

export function SearchBar({ onSearch }: SearchBarProps) {
  const [selectedCity, setSelectedCity] = useState('Todas las ciudades');
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
    notifySearch({ city, category: selectedCategory, searchTerm });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    notifySearch({ city: selectedCity, category, searchTerm });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    notifySearch({ city: selectedCity, category: selectedCategory, searchTerm: value });
  };

  const notifySearch = (filters: SearchFilters) => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl p-4 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ciudad Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCityDropdown(!showCityDropdown);
              setShowCategoryDropdown(false);
            }}
            className="w-full flex items-center justify-between gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors border border-gray-700"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">{selectedCity}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCityDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu - Ciudad */}
          {showCityDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowCityDropdown(false)}
              ></div>
              <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedCity === city
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Categorías Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowCategoryDropdown(!showCategoryDropdown);
              setShowCityDropdown(false);
            }}
            className="w-full flex items-center justify-between gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors border border-gray-700"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-red-500 font-bold text-sm">★</span>
              </div>
              <span className="text-sm font-medium">{selectedCategory}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu - Categorías */}
          {showCategoryDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowCategoryDropdown(false)}
              ></div>
              <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Campo de Búsqueda */}
        <div className="relative">
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700 focus-within:border-red-500 transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar eventos..."
              className="flex-1 bg-transparent text-white text-sm placeholder-gray-400 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


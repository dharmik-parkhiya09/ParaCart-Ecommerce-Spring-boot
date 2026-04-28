'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ProductFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  priceRange: [number, number];
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'popularity';
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    sortBy: 'popularity',
  });

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange: [number, number] = [...filters.priceRange];
    if (type === 'min') newRange[0] = value;
    else newRange[1] = value;

    setFilters({ ...filters, priceRange: newRange });
    onFilterChange({ ...filters, priceRange: newRange });
  };

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    setFilters({ ...filters, sortBy });
    onFilterChange({ ...filters, sortBy });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-lg font-semibold"
      >
        <span>Filters</span>
        <ChevronDown
          size={20}
          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Filter Content */}
      {isExpanded && (
        <div className="mt-4 space-y-6">
          {/* Sort By */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Sort By</h3>
            <div className="space-y-2">
              {[
                { value: 'popularity' as const, label: 'Popularity' },
                { value: 'price-asc' as const, label: 'Price: Low to High' },
                { value: 'price-desc' as const, label: 'Price: High to Low' },
                { value: 'newest' as const, label: 'Newest' },
              ].map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) =>
                      handleSortChange(e.target.value as FilterState['sortBy'])
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Price Range</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Min Price</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Max Price</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="text-sm text-gray-600">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';

interface SidebarFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
      <h3 className="font-bold text-lg text-gray-700 mb-4">Filter by Category</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-gray-700 text-left px-3 py-2 rounded-md cursor-pointer ${!selectedCategory ? 'bg-blue-100 ' : 'hover:bg-gray-100'}`}
          >
            All Categories
          </button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left px-3 py-2 text-gray-700 capitalize cursor-pointer rounded-md ${selectedCategory === category ? 'bg-blue-100 text-gray-700 ' : 'hover:bg-gray-100 text-gray-700 '}`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarFilter;
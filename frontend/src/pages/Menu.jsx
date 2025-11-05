import React, { useEffect, useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import { getMenus } from '../services/api';
import './Menu.css';

export default function Menu(){
  const [menus, setMenus] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMenus()
      .then(r => {
        setMenus(r.data.data);
        setLoading(false);
      })
      .catch(() => {
        setMenus([]);
        setLoading(false);
      });
  }, []);

  const groupedMenus = useMemo(() => {
    const filtered = menus.filter(m => m.name.toLowerCase().includes(q.toLowerCase()));
    return filtered.reduce((acc, menu) => {
      const category = menu.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(menu);
      return acc;
    }, {});
  }, [menus, q]);

  return (
    <div className="menu-container">
      <Navbar />
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>
        <div className="menu-search">
          <span className="search-icon">🔍</span>
          <input 
            className="search-input"
            placeholder="Search our menu..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
        </div>
      </div>

      <div className="menu-categories">
        {loading ? (
          <div className="no-results">Loading menu items...</div>
        ) : Object.keys(groupedMenus).length > 0 ? (
          Object.entries(groupedMenus).map(([category, items]) => (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>
              <div className="menu-grid">
                {items.map(m => <MenuCard key={m.id} menu={m} />)}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">No menu items found matching "{q}"</div>
        )}
      </div>
    </div>
  );
}

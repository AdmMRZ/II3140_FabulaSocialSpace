
import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import api from '../services/api';

export default function MenuScreen() {
  const [menus, setMenus] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/menu')
      .then(r => {
        setMenus(r.data.data || []);
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
      if (!acc[category]) acc[category] = [];
      acc[category].push(menu);
      return acc;
    }, {});
  }, [menus, q]);

  return (
    <ScrollView style={styles.menuContainer}>
      <Navbar />
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>Our Menu</Text>
        <View style={styles.menuSearch}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search our menu..."
            value={q}
            onChangeText={setQ}
            placeholderTextColor="#aaa"
          />
        </View>
      </View>
      <View style={styles.menuCategories}>
        {loading ? (
          <ActivityIndicator size="large" color="#ff4757" style={{marginTop: 32}} />
        ) : Object.keys(groupedMenus).length > 0 ? (
          Object.entries(groupedMenus).map(([category, items]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.menuGrid}>
                {items.map(m => <MenuCard key={m.id} menu={m} />)}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>No menu items found matching "{q}"</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuHeader: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  menuSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: '90%',
    maxWidth: 400,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#888',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 4,
  },
  menuCategories: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    color: '#ff4757',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  noResults: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
});

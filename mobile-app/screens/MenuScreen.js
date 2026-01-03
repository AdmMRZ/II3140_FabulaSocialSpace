import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ActivityIndicator, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import Navbar from '../components/Navbar';
import MenuCard from '../components/MenuCard';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function MenuScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [menus, setMenus] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const listRef = useRef(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const r = await api.get('/menu');
      setMenus(r.data.data || []);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
      setMenus([]);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(menus.map(m => m.category || 'Others'))];
    return cats;
  }, [menus]);

  // Filter menus based on search and category
  const filteredMenus = useMemo(() => {
    return menus.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(q.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || (m.category || 'Others') === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [menus, q, selectedCategory]);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryChip, 
        selectedCategory === item && styles.categoryChipActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryChipText,
        selectedCategory === item && styles.categoryChipTextActive
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderMenu = useCallback(({ item }) => <MenuCard menu={item} />, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Navbar
        user={user}
        onLogout={logout}
        onCartPress={() => navigation.navigate('Checkout')}
      />
      
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Our Menu</Text>
        <Text style={styles.pageSubtitle}>Discover our delicious offerings</Text>
        
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search coffee, food..."
            value={q}
            onChangeText={setQ}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#ff4757" />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={filteredMenus}
          renderItem={renderMenu}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.menuList}
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>No items found</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a1a',
    paddingHorizontal: 20,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f5',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    height: '100%',
  },
  categoriesContainer: {
    marginBottom: 4,
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingRight: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#fff',
    borderColor: '#ff4757',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryChipTextActive: {
    color: '#ff4757',
  },
  menuList: {
    paddingTop: 16,
    paddingBottom: 100, // Space for bottom content if any
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

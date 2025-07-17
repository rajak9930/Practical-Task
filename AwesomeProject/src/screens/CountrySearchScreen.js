import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../store/slices/countrySlice';
import LoadingSpinner from '../component/LoadingSpinner';
import ErrorNotification from '../component/ErrorNotification';

const { width } = Dimensions.get('window');

export default function CountrySearchScreen({ navigation }) {
  const { countries, loading, error } = useSelector(state => state.country);
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (name.trim().length > 0) {
      dispatch(fetchCountries(name));
    }
  };

  const renderCountryCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('CountryDetail', { code: item.cca2 })}
    >
      <View>
        <Text style={styles.countryName}>{item.name.common}</Text>
        <Text style={styles.populationText}>🌍 Population: {item.population.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌐 Country Info Finder</Text>

      <TextInput
        placeholder="Type a country name..."
        placeholderTextColor="#aaa"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>🔍 Search</Text>
      </TouchableOpacity>

      {loading && <LoadingSpinner />}
      {error && <ErrorNotification message={error} />}

      <FlatList
        data={countries}
        keyExtractor={item => item.cca2}
        renderItem={renderCountryCard}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>No countries found. Try another name.</Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1c1c1c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  countryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  populationText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
});
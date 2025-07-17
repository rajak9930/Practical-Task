import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetail } from '../store/slices/countrySlice';
import LoadingSpinner from '../component/LoadingSpinner';

const { width } = Dimensions.get('window');

export default function CountryDetailScreen({ route }) {
  const { code } = route.params;
  const dispatch = useDispatch();
  const { selectedCountry, loading } = useSelector((state) => state.country);

  useEffect(() => {
    dispatch(fetchCountryDetail(code));
  }, [code]);

  if (loading || !selectedCountry) return <LoadingSpinner />;

  const {
    name,
    capital,
    region,
    subregion,
    population,
    flags,
    languages,
    area,
    timezones,
    continents,
  } = selectedCountry;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{name.common}</Text>

      <Image
        source={{ uri: flags?.png }}
        style={styles.flag}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.label}>Capital:</Text>
        <Text style={styles.value}>{capital?.[0]}</Text>

        <Text style={styles.label}>Region:</Text>
        <Text style={styles.value}>{region}</Text>

        <Text style={styles.label}>Subregion:</Text>
        <Text style={styles.value}>{subregion}</Text>

        <Text style={styles.label}>Continent:</Text>
        <Text style={styles.value}>{continents?.join(', ')}</Text>

        <Text style={styles.label}>Timezones:</Text>
        <Text style={styles.value}>{timezones?.join(', ')}</Text>

        <Text style={styles.label}>Population:</Text>
        <Text style={styles.value}>{population?.toLocaleString()}</Text>

        <Text style={styles.label}>Area:</Text>
        <Text style={styles.value}>{area?.toLocaleString()} km²</Text>

        <Text style={styles.label}>Languages:</Text>
        <Text style={styles.value}>
          {Object.values(languages || {}).join(', ')}
        </Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
    textAlign: 'center',
  },
  flag: {
    width: width * 0.8,
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    color: '#444',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
});

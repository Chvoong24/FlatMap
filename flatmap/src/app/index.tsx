import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function HomeScreen() {
  const mapRef = useRef<MapView>(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map} 
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      
      <View style={[styles.searchContainer, { top: Math.max(insets.top, 20) + 10 }]} pointerEvents="box-none">
        <GooglePlacesAutocomplete
          placeholder="Search for a location..."
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const { lat, lng } = details.geometry.location;
              mapRef.current?.animateToRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }, 1000);
            }
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
            language: 'en',
          }}
          onFail={(error) => {
            alert(`Google API Error: ${JSON.stringify(error)}`);
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'transparent',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              height: 48,
              borderRadius: 12,
              paddingHorizontal: 16,
              fontSize: 16,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 5,
            },
            listView: {
              backgroundColor: 'white',
              borderRadius: 12,
              marginTop: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 5,
            },
            row: {
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: StyleSheet.hairlineWidth,
              backgroundColor: '#c8c7cc',
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    zIndex: 1, // Ensure the dropdown renders above the map
  },
});

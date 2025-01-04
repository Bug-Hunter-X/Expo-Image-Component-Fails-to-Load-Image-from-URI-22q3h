import React, { useState, useEffect } from 'react';
import { Image, ActivityIndicator, View } from 'expo-image';

const ImageComponent = ({ uri }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImg = async() => {
      try {
        // Simulate a network request or a delay
        await new Promise(res => setTimeout(res, 1000));
        // Check if the URI is valid
        if (!uri || typeof uri !== 'string') {
          throw new Error('Invalid Image URI');
        }

        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    loadImg();
  }, [uri]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error loading image: {error.message}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: 200, height: 200 }}
      onError={(e) => console.warn('Image loading error', e)}
    />
  );
};

export default ImageComponent;
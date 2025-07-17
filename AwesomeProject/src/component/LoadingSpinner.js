import React from 'react';
import { ActivityIndicator, View } from 'react-native';

 function LoadingSpinner() {
  return (
    <View>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

export default React.memo(LoadingSpinner)
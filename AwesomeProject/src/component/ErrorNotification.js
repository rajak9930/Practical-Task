import React from 'react';
import { Text, View } from 'react-native';

 function ErrorNotification({ message }) {
  return (
    <View>
      <Text style={{ color: 'red' }}>{message}</Text>
    </View>
  );
}

export default React.memo(ErrorNotification)
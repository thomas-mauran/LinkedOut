import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type TextFieldProps = {
  title: string;
  list: string[];
};

const TextField: React.FC<TextFieldProps> = ({ title, list }) => {
  return (
    <View style={{ marginBottom: 5 }}>
      <Text variant='labelLarge' style={{ marginTop: 5 }}>
        {title}
      </Text>
      {list.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
};

export default TextField;

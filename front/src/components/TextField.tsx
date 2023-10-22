import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

type TextFieldProps = {
  title: string;
  list: string[];
  style?: any;
};

const TextField: React.FC<TextFieldProps> = ({ title, list, style }) => {
  return (
    <View style={[style, { marginBottom: 5 }]}>
      <Text variant='labelLarge' style={{ marginTop: 5 }}>
        {title}
      </Text>
      {list.map((item, index) => (
        <Text key={index} style={{ marginBottom: 2, marginTop: 2 }}>
          {item}
        </Text>
      ))}
    </View>
  );
};

export default TextField;

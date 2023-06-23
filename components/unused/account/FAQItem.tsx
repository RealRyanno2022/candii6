import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View>
      <Button onPress={() => setIsCollapsed(!isCollapsed)}>
        {question}
      </Button>
      <Collapsible collapsed={isCollapsed}>
        <Text style={styles.faqAnswer}>{answer}</Text>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  faqTitle: {
    paddingLeft: 20,
    paddingBottom: 10,
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  faqAnswer: {
    paddingLeft: 20,
    paddingBottom: 10,
    color: '#1F1F1F',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default FAQItem;
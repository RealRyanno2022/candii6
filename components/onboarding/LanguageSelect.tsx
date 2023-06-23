import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { StackParamList } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';

type LanguageSelectProps = {
  navigation: NavigationProp<StackParamList, "LanguageSelect">;
  route: RouteProp<StackParamList, 'LanguageSelect'> | undefined;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ navigation, route }) => {
  const [index, setIndex] = useState(0);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const languageData = [
    { language: 'English', flag: require('../pictures/british-flag.png'), translation: 'Select a language' },
    { language: 'Irish', flag: require('../pictures/irish-flag.png'), translation: 'Roghnaigh teanga' },
    { language: 'Chinese', flag: require('../pictures/chinese-flag.png'), translation: '选择语言' },
    { language: 'Lithuanian', flag: require('../pictures/lithuanian-flag.png'), translation: 'Pasirinkite kalbą' },
    { language: 'Spanish', flag: require('../pictures/spanish-flag.png'), translation: 'Seleccione un idioma' },
    { language: 'Polish', flag: require('../pictures/polish-flag.png'), translation: 'Wybierz język' },
    { language: 'French', flag: require('../pictures/french-flag.png'), translation: 'Sélectionnez une langue' },
  ];

  const handleLanguageSelect = (language: string) => {
      navigation.navigate("VerifyAge");
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % languageData.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.typingText}>{languageData[index].translation}</Text>
      <View style={styles.flagContainer}>
        {languageData.slice(0, 4).map((item, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={[styles.flagButton, activeButton === idx ? { backgroundColor: '#FFFFFF' } : {}]}
            onPressIn={() => setActiveButton(idx)}
            onPressOut={() => {
              setActiveButton(null);
              handleLanguageSelect(item.language);
            }}
          >
            <Image source={item.flag} style={styles.flagImage} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.flagContainer}>
        {languageData.slice(4, 8).map((item, idx) => (
          <TouchableOpacity 
            key={idx + 4} 
            style={[styles.flagButton, activeButton === (idx + 4) ? { backgroundColor: '#FFFFFF' } : {}]}
            onPressIn={() => setActiveButton(idx + 4)}
            onPressOut={() => {
              setActiveButton(null);
              handleLanguageSelect(item.language);
            }}
          >
            <Image source={item.flag} style={styles.flagImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCCC7C',
  },
  typingText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  flagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  flagButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff1',
    overflow: 'hidden',
  },
  flagImage: {
    width: Dimensions.get('window').width / 5,
    height: Dimensions.get('window').width / 5,
    borderRadius: 50,
  },
});

export default LanguageSelect;

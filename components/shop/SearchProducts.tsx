// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text, FlatList, StyleSheet, Appearance } from 'react-native';
// import { Header, SearchBar, Icon } from 'react-native-elements'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import ShopFooter from './ShopFooter';
// import { StackParamList } from '../../types/types';
// import { StackActions } from '@react-navigation/native';
// import { NavigationProp } from '@react-navigation/native';


// const colorSchemes = {
//   light: {
//     background: '#F5F5F5',
//     header: '#D3D3D3',
//   },
//   dark: {
//     background: '#333',
//     header: '#666',
//   },
// }

// type BrandDataItem = {
//   id: number;
//   name: string;
//   type: string;
// }

// type SearchProductProps = {
//   navigation: NavigationProp<StackParamList>;
//   brandData: BrandDataItem[];
// }

// const SearchProducts: React.FC<SearchProductProps> = ({ brandData, navigation }) => {
//   const [results, setResults] = useState<BrandDataItem[]>([]);
//   const [hasSearched, setHasSearched] = useState(false);

//   const search = (searchText: string = '') => {
//     setHasSearched(true);

//     let relevantBrands: string[] = [];
//     if (searchText.toLowerCase().includes('disposables')) {
//       relevantBrands = ['Elfbar', 'Elfabar', 'IVGBar', 'LostMary', 'Jewel Mini'];
//     } else if (searchText.toLowerCase().includes('juice')) {
//       relevantBrands = brandData.filter(item => item.type === 'juice').map(item => item.name);
//     }a

//     const filteredResults = brandData.filter(item => 
//       item.name.toLowerCase().includes(searchText.toLowerCase()) && relevantBrands.includes(item.name)
//     );

//     setResults(filteredResults);
//   }

//   const [searchTerm, setSearchTerm] = useState('');

//   return (
//     <View>
//       <View style={styles.container}>
//         <Header
//           leftComponent={{ 
//             // icon: colorScheme === 'light' ? 'moon' : 'sun', 
//             color: '#fff',
//             onPress: () => navigation.dispatch(StackActions.push(('AccountInfo'))) 
//           }}
//           centerComponent={{ 
//             text: 'Candii', 
//             style: { color: '#fff', fontSize: 20 } 
//           }}
//           rightComponent={{ 
//             icon: 'search',
//             color: '#fff',
//             onPress: () => search('') 
//         }}
//         containerStyle={{
//           // backgroundColor: colorSchemes[colorScheme].header,
//           justifyContent: 'space-around',
//         }}
//       />
//       <SearchBar
//           platform="default" // Here is where we add platform
//           placeholder="Search products..."
//           onChangeText={search}
//           value={searchTerm}
//           inputContainerStyle={{ backgroundColor: '#fff' }}
//           searchIcon={{ name: 'search' }}
//           clearIcon={{ name: 'clear' }}
//           onCancel={() => { } }
//           // Add these missing properties...
//           loadingProps={{}} // Customize or leave as an empty object
//           showLoading={false} // Update as needed
//           lightTheme={true} // Update as needed
//           round={false} // Update as needed
//           onClear={() => { } }
//           onFocus={() => { } }
//           onBlur={() => { } } 
//           cancelButtonTitle={''} 
//           cancelButtonProps={{}} 
//           showCancel={false} 
//         />
//       {hasSearched && results.length === 0 && 
//         <Text>No results found for "{searchTerm}"</Text>
//       }
//       <FlatList
//         data={results}
//         keyExtractor={item => item.id.toString()}
//         renderItem={({ item }) => (
//           <Text>{item.name}</Text>
//         )}
//       />
//       <ShopFooter navigation={navigation} />
//     </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5FCFF',
//   },
// });

// export default SearchProducts;
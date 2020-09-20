import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Tabbar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', width: Dimensions.get('window').width, backgroundColor: 'black', height: 48, alignItems: 'center', justifyContent: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getTab = (label) => {
          if (label === 'Home') {
            return (
              <Ionicons
                name={'color-palette-sharp'}
                color={isFocused ? 'white' : '#bdc3c7'}
                size={24} />
            )
          } else if (label === 'Discover') {
            return (
              <Ionicons
                name={'search'}
                color={isFocused ? 'white' : '#bdc3c7'}
                size={24} />
            )
          } else {
            return (
              <Ionicons
                name={'ios-heart'}
                color={isFocused ? 'white' : '#bdc3c7'}
                size={24} />
            )
          }
        }
        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            activeOpacity={0.7}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center' }}>
            {
              getTab(label)
            }
          </TouchableOpacity>
        );
      })}
    </View >
  );
}
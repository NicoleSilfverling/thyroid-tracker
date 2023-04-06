import React, { useRef } from "react";
import { View, FlatList, StyleSheet, Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

const Component1 = () => {
  return (
    <View style={styles.component}>
      <Text>Component 1</Text>
    </View>
  );
};

const Component2 = () => {
  return (
    <View style={styles.component}>
      <Text>Component 2</Text>
    </View>
  );
};

const Component3 = () => {
  return (
    <View style={styles.component}>
      <Text>Component 3</Text>
    </View>
  );
};

const components = [
  { key: 1, component: <Component1 /> },
  { key: 2, component: <Component2 /> },
  { key: 3, component: <Component3 /> },
];

const SwipingViews = () => {
  const flatListRef = useRef(null);

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item.key} style={styles.view}>
        {item.component}
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={components}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  view: {
    width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
  },
  component: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SwipingViews;

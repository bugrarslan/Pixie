import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MasonryFlashList } from "@shopify/flash-list";
import ImageCard from "./imageCard";

export default function ImageGrid({images}) {
  return (
    <View>
        <MasonryFlashList
            data={images}
            numColumns={2}
            renderItem={({ item, index }) => <ImageCard item={item} index={index}/>}
            estimatedItemSize={1000}
        />
    </View>
  );
}

const styles = StyleSheet.create({});

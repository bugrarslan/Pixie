import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Image } from 'expo-image'
import { getImageSize, wp } from '../helpers/common';
import { theme } from '../constants/theme';

const ImageCard = ({item, index, columns, router}) => {

    const getImageHeight = () => {
        let {imageHeight : height, imageWidth: width} = item;
        return {height:getImageSize(height, width)}
    }

    const isLastInRow = () => {
        return (index + 1) % columns === 0;
    }

    return (
        <Pressable 
            style={[styles.imageWrapper, !isLastInRow(index) && styles.spacing]}
            onPress={() => router.push({pathname: "home/image", params: {...item}})}
        >
            <Image 
                source={item?.webformatURL}
                style={[styles.image, getImageHeight()]}
                transition={100}
            />
        </Pressable>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    image:{
        height:300,
        width: '100%',
    },
    imageWrapper:{
        borderRadius: theme.radius.xl,
        backgroundColor: theme.colors.grayBg,
        overflow: 'hidden',
        borderCurve:'continuous',
        marginBottom:wp(2),
    },
    spacing:{
        marginRight:wp(2),
    }
})
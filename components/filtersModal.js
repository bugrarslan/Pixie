import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';
import { OrderView, SectionView } from './filterViews';

const FiltersModal = ({modalRef}) => {
    const snapPoints = useMemo(() => ['75%'], []);

    return (
        <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            backdropComponent={CustomBackdrop}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.content}>
                    <Text style={styles.filterText}>Filters</Text>
                    {
                        Object.keys(sections).map((sectionName, index) => {
                            let sectionView = sections[sectionName];
                            return (
                                <View key={sectionName}>
                                    <SectionView
                                        title={sectionName}
                                        content={sectionView({})}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

const sections = {
    "order": (props) => <OrderView {...props} />,
    "orientation": (props) => <OrderView {...props} />,
    "type": (props) => <OrderView {...props} />,
    "colors": (props) => <OrderView {...props} />
}



const CustomBackdrop = ({animatedIndex, style}) => {

    const containerAnimatedStyle = useAnimatedStyle(() => {
        let opacity = interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 1],
            Extrapolation.CLAMP
        )
        return {opacity}
    })

    const containerStyle = [
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyle
    ]

    return(
        <Animated.View style={containerStyle}>
            {/* blur view */}
            <BlurView
                style={StyleSheet.absoluteFill}
                intensity={25}
                tint="dark"
            />
        </Animated.View>
    )
}

export default FiltersModal;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        // flex:1,
        width: '100%',
        gap: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    filterText: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.8),
        marginBottom:5,
    }
})
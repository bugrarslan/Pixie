import { Pressable, StyleSheet, Text, View } from "react-native"
import { theme } from "../constants/theme"
import { capitilize, hp } from "../helpers/common"
import Animated, { FadeInRight } from "react-native-reanimated"



export const SectionView = ({title, content}) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Animated.View
                entering={FadeInRight.delay(500).springify().damping(11)}
            >
                {content}
            </Animated.View>
        </View>
    )
}

export const CommonFilterRow = ({data, filterName, filters, setFilters}) => {

    const onSelect = (item) => {
        setFilters({...filters, [filterName]: item})
    }

    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {
                    let isActive = filters && filters[filterName] == item;
                    let backgroundColor = isActive ? theme.colors.neutral(0.7) : 'white';
                    let color = isActive ? 'white' : theme.colors.neutral(0.7);
                    return (
                        <Pressable
                            onPress={() => onSelect(item)}
                            key={item}
                            style={[styles.outlinedButton, {backgroundColor}]}
                        >
                            <Text
                                style={[styles.outlinedButtonText, {color}]}
                            >
                                {capitilize(item)}
                            </Text>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

export const ColorFilter = ({data, filterName, filters, setFilters}) => {

    const onSelect = (item) => {
        setFilters({...filters, [filterName]: item})
    }

    return (
        <View style={styles.flexRowWrap}>
            {
                data && data.map((item, index) => {
                    let isActive = filters && filters[filterName] == item;
                    let borderColor = isActive ? theme.colors.neutral(0.4) : 'white';
                    return (
                        <Pressable
                            onPress={() => onSelect(item)}
                            key={item}
                        >
                            <View style={[styles.colorWrapper, {borderColor}]}>
                                <View style={[styles.color, {backgroundColor: item}]}/>
                            </View>
                        </Pressable>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        gap:8
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8),
    },
    flexRowWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    outlinedButton: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBg,
        borderRadius: theme.radius.xs,
        borderCurve: "continuous",
    },
    color: {
        width:40,
        height:30,
        borderRadius: theme.radius.sm-3,
        borderCurve: "continuous",
    },
    colorWrapper: {
        padding:3,
        borderRadius: theme.radius.sm,
        borderWidth:2,
        borderCurve: "continuous",
    }
})
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
        <StatusBar style="light" />
        <Image
            source={require('../assets/images/welcome.png')}
            style={styles.bgImage}
            />
            
            <Animated.View entering={FadeInDown.duration(600)} style={{flex:1}}>
    
                {/* Linear gradient */}
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.5)', 'white', 'white']}
                    start={{x:0.5, y:0}}
                    end={{x:0.5, y:0.8}}
                    style={styles.gradient}
                />

                {/* Content */}
                <View style={styles.contentContainer}>
                    <Animated.Text 
                        entering={FadeInDown.delay(400).springify()}
                        style={styles.title}
                    >
                        Pixie
                    </Animated.Text>
                    <Animated.Text 
                        entering={FadeInDown.delay(500).springify()}
                        style={styles.punchLine}
                    >
                        Unleash Your Walls’ Potential
                    </Animated.Text>
                    <Animated.View
                        entering={FadeInDown.delay(600).springify()}
                    >
                        <Pressable
                            onPress={() => router.push('home')}
                            style={styles.startButton}
                        >
                            <Text style={styles.buttonText}>
                                Start Explore
                            </Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    bgImage:{
        width:wp(100),
        height:hp(100),
        position:'absolute',
    },
    gradient:{
        width:wp(100),
        height:hp(65),
        bottom:0,
        position:'absolute',
    },
    contentContainer:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        gap:14,
    },
    title:{
        fontSize:hp(7),
        fontWeight:theme.fontWeights.bold,
        color:theme.colors.neutral(0.9),
    },
    punchLine:{
        fontSize:hp(2),
        fontWeight:theme.fontWeights.medium,
        letterSpacing:1,
        marginBottom:10,
    },
    startButton:{
        marginBottom:50,
        backgroundColor:theme.colors.neutral(0.9),
        padding:15,
        paddingHorizontal:90,
        borderRadius:theme.radius.xl,
        borderCurve:'continuous',
    },
    buttonText:{
        color:theme.colors.white,
        fontSize:hp(3),
        fontWeight:theme.fontWeights.medium,
        letterSpacing:1,
    }
})
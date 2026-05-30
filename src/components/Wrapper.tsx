import { ImageBackground, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react'
import { IMAGES } from '$assets/images'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$constants/dimensions'

const Wrapper: React.FC<{ children: any, style?: any }> = ({ children, style }) => {
    return (
        <ImageBackground
            source={IMAGES.Background}
            resizeMode={'cover'}
            style={{
                justifyContent: 'center', alignItems: 'center', flex: 1,
                // width : DEVICE_WIDTH,
                //  height : DEVICE_HEIGHT,  
                margin: 0
            }}
        >
            <SafeAreaProvider style={{
                flex: 1,
                paddingTop: 20,
                paddingBottom: 100,
                paddingRight: 20,
                paddingLeft: 20,
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', height: '100%',
                boxSizing : 'border-box', 
                 ...style
            }}>
                {children}
            </SafeAreaProvider>
        </ImageBackground>
    )
}

export default Wrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeArea: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT
    }
})
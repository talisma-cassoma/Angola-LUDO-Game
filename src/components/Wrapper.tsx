import { ImageBackground, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react'
import { IMAGES } from '$assets/images'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$constants/dimensions'

const Wrapper: React.FC<{ children: any, style?: any }> = ({ children, style }) => {
    return (
        <SafeAreaProvider style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground
            source={IMAGES.Background}
            resizeMode={'cover'}
            style={{justifyContent: 'center', alignItems: 'center', flex: 1, height: DEVICE_HEIGHT, width: DEVICE_WIDTH, padding: 50, ...style}}
        >
             <View style={{ flex: 1 }}>
                {children}
             </View>
        </ImageBackground>
        </SafeAreaProvider>
    )
}

export default Wrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    safeArea : {
        width : DEVICE_WIDTH,
        height : DEVICE_HEIGHT
    }
})
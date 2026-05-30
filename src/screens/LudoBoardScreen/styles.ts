import { DEVICE_HEIGHT, DEVICE_WIDTH } from "$constants/dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        top: 60,
        left: 20
    },
    container: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'space-between',
        // height :"auto",
        // width :"auto",
    },
    flexRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
        flex: 1
    },
    ludoBoardContainer: {
        flex: 1,
        // alignItems: 'stretch',
        // justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
    },
    plotContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ccc'
    },
    pathContainer: {
        flexDirection: 'row',
        flex: 1,

        backgroundColor: '#1E5162'
    }
})
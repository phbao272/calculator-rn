import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

const CustomButton = (props) => {
    const { data, onPress } = props
    const color = data.class === '' ? '#6d6d6d' : '#d400ff'

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
                <Text style={{ fontSize: 24, color: color }}>
                    {data.display}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    buttonContainer: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
})

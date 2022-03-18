import React from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'

const CustomButton = (props) => {
    const { data, onPress, darkMode } = props
    const color = data.class === '' ? '#6d6d6d' : '#d400ff'
    const backgroundColor = darkMode ? '#3d3d3d' : '#fafafa'
    return (
        <View style={styles.wrapper}>
            <TouchableOpacity
                style={{
                    width: 76,
                    height: 76,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: backgroundColor,
                    borderRadius: 20,
                }}
                onPress={onPress}
            >
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
    buttonContainer: {},
})

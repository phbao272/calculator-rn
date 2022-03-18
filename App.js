import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native'

import React, { useState } from 'react'

import numberWithCommas from './utils/numberWithCommas'
import CustomButton from './components/CustomButton'

import { btns, BTN_ACTIONS } from './components/configBtn'
import removeImg from './assets/remove.png'

export default function App() {
    const [expression, setExpression] = useState('')
    const [result, setResult] = useState('Hello!!')
    const [darkMode, setDarkMode] = useState(false)
    const [checkCalc, setCheckCalc] = useState(false) // Kiểm tra xem đã ấn = chưa
    const renderItem = ({ item }) => (
        <CustomButton
            data={item}
            onPress={() => handlePressButton(item)}
            darkMode={darkMode}
        />
    )

    const handlePressButton = (item) => {
        console.log(item)

        switch (item.action) {
            case BTN_ACTIONS.THEME:
                setDarkMode(!darkMode)
                break
            case BTN_ACTIONS.ADD:
                const op = item.display === 'x' ? '*' : item.display

                checkCalc
                    ? setExpression(result + op)
                    : setExpression(expression + op)
                // setResult('')
                setCheckCalc(false)
                break
            case BTN_ACTIONS.DELETE:
                setExpression(expression.slice(0, expression.length - 1))
                break
            case BTN_ACTIONS.CLEAR_ALL:
                setExpression('')
                setResult('')
                break
            case BTN_ACTIONS.CALC:
                if (expression.trim().length < 0) return null

                try {
                    const res = eval(expression)
                    setCheckCalc(true)
                    // setResult(res.toString())
                    setResult(Math.round(res * 1000000000) / 1000000000)
                } catch {
                    setResult('Syntax error')
                } finally {
                    console.log('finished')
                }

                break
            default:
                console.log(`Invalid action ${item.action}`)
        }
    }

    return (
        <View
            style={{
                flex: 1,
                paddingLeft: 16,
                paddingRight: 16,
                backgroundColor: darkMode ? '#373737' : '#fff',
            }}
        >
            {/* results Container */}
            <View style={styles.resultsContainer}>
                <Text
                    style={{
                        marginBottom: 12,
                        fontSize: 32,
                        color: darkMode ? '#fff' : '#000',
                    }}
                >
                    {numberWithCommas(result)}
                </Text>
                <Text
                    style={{
                        marginBottom: 12,
                        fontSize: 40,
                        color: darkMode ? '#fff' : '#000',
                    }}
                >
                    {numberWithCommas(expression)}
                </Text>
            </View>
            {/* AC button -- clear all*/}
            <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity
                    onPress={() => handlePressButton({ action: 'CLEAR_ALL' })}
                >
                    <Image
                        source={removeImg}
                        style={{ width: 40, height: 40, marginRight: 32 }}
                    />
                </TouchableOpacity>
            </View>
            {/* button Container */}
            <View style={styles.buttonContainer}>
                <FlatList
                    data={btns}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.display}
                    numColumns={4}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#373737',
        // backgroundColor: '#fff',
    },
    buttonContainer: {
        marginBottom: 16,
    },
    resultsContainer: {
        flex: 2,
        paddingHorizontal: 16,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
})

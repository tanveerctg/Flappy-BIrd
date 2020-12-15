import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Bird({birdBottom,birdLeft}) {
    const birdWidth=60
    const birdHeight=60
    return (
        <View style={{
        position:"absolute",
        alignSelf:"center",
        width:60,
        height:60,
        backgroundColor:'blue',
        bottom:birdBottom-(birdHeight/2),
        left:birdLeft-(birdWidth/2)
    }}></View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})

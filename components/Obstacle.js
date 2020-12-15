import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Obstacle({ color,oblstacleLeft,obstacleNegHeight, obstacleHeight,obstacleWidth,gap}) {
 
  return (
    <>
      <View style={{
         position: "absolute",
        width: obstacleWidth,
        backgroundColor: color,
        height: obstacleHeight,
        bottom:obstacleNegHeight+obstacleHeight + gap,
        left:oblstacleLeft
      }}>
      </View>

      <View style={{
        position: "absolute",
        width: obstacleWidth,
        backgroundColor: color,
        height: obstacleHeight,
        bottom: obstacleNegHeight,
        left:oblstacleLeft
      }}></View>
    </>
  )
}


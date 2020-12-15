import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View,Dimensions,SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Bird from './components/Bird'
import Obstacle from './components/Obstacle'

export default function App() {
  const screenHeight=Dimensions.get("screen").height;
  const screenWidth=Dimensions.get("screen").width;

  const[birdBottom,setBirdBottom]=useState(screenHeight/2);
  const[oblstacleOneLeft,setOblstacleOneLeft]=useState(screenWidth);
  const[oblstacleTwoLeft,setOblstacleTwoLeft]=useState(screenWidth+screenWidth/2+30);
  const[gameOver,setGameOver]=useState(false);
  
  const [obstacleOneNegHeight,setObstacleOneNegHeight]=useState(0)
  const [obstacleTwoNegHeight,setObstacleTwoNegHeight]=useState(0)

  const birdLeft=(screenWidth/2);

  let gameTimerId
  let loopObstacleOne
  let loopObstacleTwo

  const obstacleWidth = 40
  const gap=200
  const obstacleHeight = 300

  const jump = () => {

    if (!gameOver && birdBottom < screenHeight-60-50) {
      setBirdBottom(birdBottom => birdBottom + 50)
      console.log('jumped')
    }
  }
  useEffect(() => {
    if(birdBottom-30>0 ){
      gameTimerId=setInterval(()=>{
        setBirdBottom(birdBottom=>birdBottom-3)
      },30)
    }
    return () => {
      console.log('clear')
      clearInterval(gameTimerId)
    }
  }, [birdBottom])

  useEffect(() => {
    if(oblstacleOneLeft>0){
      loopObstacleOne=setInterval(()=>{
        setOblstacleOneLeft(obstacleLeft=>obstacleLeft-3)
      },30)
      return () => {
        clearInterval(loopObstacleOne)
      }
    }else{
      setOblstacleOneLeft(screenWidth)
      setObstacleOneNegHeight(-Math.random()*100)
    }

  }, [oblstacleOneLeft])



  useEffect(() => {
    if(oblstacleTwoLeft>0){
      loopObstacleTwo=setInterval(()=>{
        setOblstacleTwoLeft(obstacleLeft=>obstacleLeft-3)
      },30)
      return () => {
        clearInterval(loopObstacleTwo)
      }
    }else{
      setOblstacleTwoLeft(screenWidth)
      setObstacleTwoNegHeight(-Math.random()*100)
    }
  
  }, [oblstacleTwoLeft])

  useEffect(()=>{
   
    console.log('obLEFT',oblstacleOneLeft,'left',screenWidth/2-30,'right',screenWidth/2+30)
    if(((birdBottom<obstacleHeight+obstacleOneNegHeight+30 )||( birdBottom>obstacleHeight+obstacleOneNegHeight-30+gap))
      &&   (oblstacleOneLeft > screenWidth/2 -30 && oblstacleOneLeft < screenWidth/2 + 30 )
    ){
      console.log('obLEFT',oblstacleOneLeft,'left',screenWidth/2-30,'right',screenWidth/2+30)
      console.log('gameover')
      clearInterval(loopObstacleOne)
      clearInterval(loopObstacleTwo)
      clearInterval(gameTimerId)
      setGameOver(true)
    }


    if(((birdBottom<obstacleHeight+obstacleTwoNegHeight+30 )||( birdBottom>obstacleHeight+obstacleTwoNegHeight-30+gap))
      && (oblstacleTwoLeft > screenWidth/2 -30 && oblstacleTwoLeft < screenWidth/2 + 30 )
    ){
      console.log('gameover')
      clearInterval(loopObstacleTwo)
      clearInterval(loopObstacleOne)
      clearInterval(gameTimerId)
      setGameOver(true)
    }


  //   if(oblstacleOneLeft<screenWidth/2-30 && oblstacleOneLeft<screenWidth/2+30){
  //     console.log('left boundary',oblstacleOneLeft) 
  //     clearInterval(loopObstacleOne)
  //  }
  })

  return (
    <TouchableWithoutFeedback  onPress={jump}>
      <SafeAreaView style={styles.container}>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft}/>


        <Obstacle obstacleNegHeight={obstacleOneNegHeight} color="red" oblstacleLeft={oblstacleOneLeft} obstacleHeight={obstacleHeight} obstacleWidth={obstacleWidth} gap={gap}/>
        <Obstacle obstacleNegHeight={obstacleTwoNegHeight} color="yellow" oblstacleLeft={oblstacleTwoLeft} obstacleHeight={obstacleHeight} obstacleWidth={obstacleWidth} gap={gap}/>



        <View style={{position:"relative",height:"100%",width:20,left:screenWidth-15}}>
          <View style={styles.obstacleTop}></View>
          <View style={styles.obstacleBottom}></View>
        </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  obstacle:{
    position:"relative",
    height:"100%",
    width:20,
    left:100
  }

});

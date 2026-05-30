import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '$components/Wrapper'
import { IMAGES } from '$assets/images'
import Dice from '$components/Dice'
import { COLORS } from '$constants/colors'
import Pocket from '$components/Pocket'
import VerticalPath from '$components/VerticalPath'
import { plot1data, plot2data, plot3data, plot4data } from '$helpers/PlotData'
import HorizontalPath from '$components/HorizontalPath'
import FourTriangle from '$components/FourTriangle'
import { useAppSelector } from '$hooks/useAppStore'
import { selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4, selectWinner } from '$redux/reducers/gameSelectors'
import { useIsFocused } from '@react-navigation/native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '$constants/dimensions'
import MenuModal from '$components/MenuModal'
import WinnerModal from '$components/WinnerModal'

const LudoBoardScreen = () => {

  const player1 = useAppSelector(selectPlayer1);
  const player2 = useAppSelector(selectPlayer2);
  const player3 = useAppSelector(selectPlayer3);
  const player4 = useAppSelector(selectPlayer4);
  const isDiceTouched = useAppSelector(selectDiceTouch);
  const winner = useAppSelector(selectWinner);

  const isFocused = useIsFocused();

  const [showStartIMG, setShowStartIMG] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFocused) {
      setShowStartIMG(true);
      const blinkAnimation = Animated.loop(Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        })
      ]));

      blinkAnimation.start();

      const timeout = setTimeout(() => {
        blinkAnimation.stop();
        setShowStartIMG(false);
      }, 2500);

      return () => {
        blinkAnimation.stop();
        clearTimeout(timeout);
      }
    }
  }, [isFocused])

  return (
    <Wrapper style={styles.screen}>
      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.6}
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Image
          source={IMAGES.Menu}
          style={styles.menuIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <View
          style={styles.diceRow}
          pointerEvents={isDiceTouched ? 'none' : 'auto'}
        >
          <Dice color={COLORS.green} player={2} data={player2} />
          <Dice color={COLORS.yellow} rotate player={3} data={player3} />
        </View>

        <View style={styles.ludoBoardContainer}>
          <View style={styles.plotContainer}>
            <Pocket color={COLORS.green} player={2} data={player2} />
            <VerticalPath cells={plot2data} color={COLORS.yellow} player={2} />
            <Pocket color={COLORS.yellow} player={3} data={player3} />
          </View>

          <View style={styles.pathContainer}>
            <HorizontalPath cells={plot1data} color={COLORS.green} player={1} />
            <FourTriangle
              player1={player1}
              player2={player2}
              player3={player3}
              player4={player4}
            />
            <HorizontalPath cells={plot3data} color={COLORS.blue} player={3} />
          </View>

          <View style={styles.plotContainer}>
            <Pocket color={COLORS.red} player={1} data={player1} />
            <VerticalPath cells={plot4data} color={COLORS.red} player={4} />
            <Pocket color={COLORS.blue} player={4} data={player4} />
          </View>
        </View>

        <View
          style={styles.diceRow}
          pointerEvents={isDiceTouched ? 'none' : 'auto'}
        >
          <Dice color={COLORS.red} player={1} data={player1} />
          <Dice color={COLORS.blue} rotate player={4} data={player4} />
        </View>
      </View>
    </Wrapper>
  )
}

export default LudoBoardScreen


export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  menuButton: {
    width: 30,
    height: 30,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },

  menuIcon: {
    width: '100%',
    height: '100%',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  diceRow: {
    width: '100%',
    height: 80,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  ludoBoardContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 200,
    minWidth: 100,
    //aspectRatio: 0.6, // mantém o tabuleiro quadrado
    backgroundColor: '#FFF',
    padding: 4,
  },

  plotContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  pathContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
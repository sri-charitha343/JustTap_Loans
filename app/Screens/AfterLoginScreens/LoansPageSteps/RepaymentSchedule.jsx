import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const getRepaymentDates = () => {
  const dates = [];
  const today = new Date();
  let month = today.getMonth(); 
  let year = today.getFullYear(); 

  for (let i = 0; i < 6; i++) {
    const repaymentDate = new Date(year, month + i, 5);
    dates.push(repaymentDate);
  }

  return dates;
};

const getTimeLeft = (date) => {
  const today = new Date();
  const diffTime = date - today;
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)); 
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - diffMonths * 30; 

  if (diffMonths > 0) {
    return `${diffMonths} Month${diffMonths > 1 ? 's' : ''} ${diffDays} Day${diffDays > 1 ? 's' : ''}`;
  }

  return `${diffDays} Day${diffDays > 1 ? 's' : ''}`;
};

const ClickMeBox = ({ onDisappear }) => {
  const [visible, setVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const tapAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const [tapCount, setTapCount] = useState(0);

  useEffect(() => {
    const bounce = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.3,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    bounce.start();

    return () => bounce.stop();
  }, [bounceAnim]);

  useEffect(() => {
    if (tapCount >= 3) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        if (onDisappear) onDisappear();
      });
    }
  }, [tapCount, fadeAnim, onDisappear]);

  const handleTap = () => {
    setTapCount(tapCount + 1);
    Animated.sequence([
      Animated.timing(tapAnim, {
        toValue: 0.7,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(tapAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.clickMeBox, { opacity: fadeAnim }]}>
      <TouchableOpacity onPress={handleTap} activeOpacity={0.7} style={styles.clickMeTouchable}>
        <Text style={styles.clickMeText}>More Info</Text>
        <Animated.View style={{ transform: [{ scale: bounceAnim }, { scale: tapAnim }] }}>
          <MaterialCommunityIcons name="gesture-tap" size={40} color="#0f4a97" />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const RepaymentSchedule = ({ navigation }) => {
  const repaymentDates = getRepaymentDates();
  const amounts = [1000, 1500, 1200, 1100, 900, 1300];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.heading}>⏳Repay Rhythm</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {repaymentDates.map((date, index) => {
          const monthName = date.toLocaleString('default', { month: 'long' });
          const formattedDate = `${date.getDate()} ${monthName}, ${date.getFullYear()}`;
          const timeLeft = getTimeLeft(date);
          const amount = amounts[index];

          return (
            <View key={index} style={styles.box}>
              <LinearGradient 
                colors={['#ffffff', '#ffffff']} 
                style={styles.gradient} 
              >
                <BlurView intensity={80} style={styles.blur}>
                  <Text style={styles.amount}>₹{amount}</Text>
                  <Text style={styles.date}>{formattedDate}</Text>
                  <Text style={styles.timeLeft}>{timeLeft} Left</Text>
                  <ClickMeBox />
                </BlurView>
              </LinearGradient>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RepaymentSchedule;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', 
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
    backgroundColor: '#0f4a97',
    padding: 10,
    borderRadius: 7,
  },

  heading: {
    marginTop: '35%',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 30,
  },

  scrollView: {
    flexDirection: 'row',
  },

  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: width * 0.8,
    height: height * 0.6,
    maxWidth: 320, 
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 3, 
  },

  gradient: {
    borderRadius: 15,
    overflow: 'hidden',
  },

  blur: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  amount: {
    fontSize: 55,
    fontWeight: 'bold',
    color: '#0f4a97',
    textAlign: 'center',
    marginBottom: 5,
  },

  date: {
    fontSize: 20,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 10,
  },

  timeLeft: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'right',
  },

  iconContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clickMeBox: {
    marginTop: 15,
    backgroundColor: '#dbe9f4',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  clickMeTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  clickMeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginRight: 10,
  },
});

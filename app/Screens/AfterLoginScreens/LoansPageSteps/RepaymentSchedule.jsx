import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Dimensions, SafeAreaView, Animated, Modal
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const getRepaymentDates = () => {
  const dates = [];
  const today = new Date();
  let year = today.getFullYear();
  const startMonth = 5;
  if (today.getMonth() > startMonth) year += 1;
  for (let i = 0; i < 6; i++) {
    const repaymentDate = new Date(year, startMonth + i, 5);
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

const infoDataMap = {
  2000: {
    right: [
      { amount: 3000, date: '15th May 2025' },
      { amount: 6000, date: '10th May 2025' }
    ],
    left: [1000, 1000]
  },
  2666.6: {
    right: [
      { amount: 3000, date: '15th May 2025' },
      { amount: 2000, date: '10th June 2025' },
      { amount: 6000, date: '10th May 2025' }
    ],
    left: [1000, 666.6, 1000]
  },
  1666.6: {
    right: [
      { amount: 2000, date: '10th June 2025' },
      { amount: 6000, date: '10th May 2025' }
    ],
    left: [666.6, 1000]
  },
  1000: {
    right: [
      { amount: 6000, date: '10th May 2025' }
    ],
    left: [1000]
  }
};
const InfoModal = ({ visible, onClose, amount }) => {
  if (!amount) return null;

  const { left, right } = infoDataMap[amount] || { left: [], right: [] };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <BlurView intensity={80} tint="light" style={styles.modalBox}>
          <Text style={styles.modalTitle}>Repayment Details</Text>
          <View style={styles.modalContent}>
            <View style={styles.modalColumn}>
              <Text style={styles.columnHeader}>Should be Paid</Text>
              {left.map((amt, idx) => (
                <Text key={idx} style={styles.LeftColumnItem}>₹{amt}</Text>
              ))}
            </View>
            <View style={styles.modalColumn}>
              <Text style={styles.columnHeader}>Taken Amount</Text>
              {right.map((item, idx) => (
                <View key={idx} style={{ marginBottom: 6 }}>
                  <Text style={styles.columnItem}>₹{item.amount}</Text>
                  <Text style={styles.columnSubItem}>{item.date}</Text>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕ Close</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </Modal>
  );
};


const ClickMeBox = ({ onTripleTap }) => {
  const [tapCount, setTapCount] = useState(0);
  const bounceAnim = useRef(new Animated.Value(1)).current;

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
  }, []);

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 1 && onTripleTap) {
      onTripleTap();
      setTapCount(0); // reset
    }
  };

  return (
    <TouchableOpacity onPress={handleTap} style={styles.clickMeBox}>
      <Text style={styles.clickMeText}>More Info</Text>
      <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
        <MaterialCommunityIcons name="gesture-tap" size={40} color="#0f4a97" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const RepaymentSchedule = ({ navigation }) => {
  const repaymentDates = getRepaymentDates();
  const amounts = [2000, 2666.6, 2666.6, 1666.6, 1000, 1000];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleMoreInfo = (amount) => {
    setSelectedAmount(amount);
    setModalVisible(true);
  };

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
              <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.gradient}>
                <BlurView intensity={80} style={styles.blur}>
                  <Text style={styles.amount}>₹{amount}</Text>
                  <Text style={styles.date}>{formattedDate}</Text>
                  <Text style={styles.timeLeft}>{timeLeft} Left</Text>
                  <ClickMeBox onTripleTap={() => handleMoreInfo(amount)} />
                </BlurView>
              </LinearGradient>
            </View>
          );
        })}
      </ScrollView>

      <InfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        amount={selectedAmount}
      />
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

  clickMeBox: {
    marginTop: 15,
    backgroundColor: '#dbe9f4',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  clickMeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f4a97',
    marginRight: 10,
  },
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalBox: {
  width: '85%',
  padding: 20,
  borderRadius: 20,
  backgroundColor: '#fff',
  alignItems: 'center',
},

modalTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#0f4a97',
  marginBottom: 15,
},

modalContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 20,
},

modalColumn: {
  width: '48%',
},

columnHeader: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 10,
  color: '#333',
},
LeftColumnItem: {
  fontSize: 16,
  color: '#0f4a97',
  marginBottom: 27,
},

columnItem: {
  fontSize: 16,
  color: '#0f4a97',
  marginBottom: 4,
},

columnSubItem: {
  fontSize: 12,
  color: '#888',
},

closeButton: {
  backgroundColor: '#0f4a97',
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 30,
},

closeButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
});

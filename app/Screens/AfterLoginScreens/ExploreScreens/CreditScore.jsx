import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = 40;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function CreditScore() {
  const scoreValue = 720;
  const scorePercent = ((scoreValue - 300) / (850 - 300)) * 100;
  const scoreDashArray = (CIRCLE_CIRCUMFERENCE * scorePercent) / 100;

  const animatedScore = useRef(new Animated.Value(0)).current;
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const [displayScore, setDisplayScore] = useState(0);
  const [scoreRating, setScoreRating] = useState('Good');
  const [scoreColor, setScoreColor] = useState('#3b82f6');

  useEffect(() => {
    if (scoreValue < 580) {
      setScoreColor('#ef4444');
      setScoreRating('Poor');
    } else if (scoreValue < 670) {
      setScoreColor('#f59e0b');
      setScoreRating('Fair');
    } else if (scoreValue < 740) {
      setScoreColor('#3b82f6');
      setScoreRating('Good');
    } else {
      setScoreColor('#10b981');
      setScoreRating('Excellent');
    }

    // Animate score and bar
    Animated.timing(animatedScore, {
      toValue: scoreValue,
      duration: 800,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedWidth, {
      toValue: scorePercent,
      duration: 800,
      useNativeDriver: false,
    }).start();

    // Update displayed score on animation progress
    const listenerId = animatedScore.addListener(({ value }) => {
      setDisplayScore(Math.round(value));
    });

    return () => {
      animatedScore.removeListener(listenerId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.gaugeContainer}>
        <Svg height="180" width="180" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            stroke="#e2e8f0"
            strokeWidth="12"
            fill="none"
          />
          <Circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            stroke={scoreColor}
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${scoreDashArray}, ${CIRCLE_CIRCUMFERENCE}`}
            strokeLinecap="round"
            rotation="-90"
            origin="50, 50"
          />
        </Svg>
        <View style={styles.scoreLabel}>
          <Animated.Text style={styles.scoreText}>{displayScore}</Animated.Text>
          <Text style={[styles.scoreRating, { color: scoreColor }]}>
            {scoreRating}
          </Text>
        </View>
      </View>

      {/* Score bar */}
      <View style={styles.labels}>
        <Text style={styles.label}>Poor</Text>
        <Text style={styles.label}>Fair</Text>
        <Text style={styles.label}>Good</Text>
        <Text style={styles.label}>Excellent</Text>
      </View>
      <View style={styles.progressBar}>
        <LinearGradient
          colors={['#ef4444', '#facc15', '#10b981']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fillBar, { width: `${scorePercent}%` }]}
        />
      </View>
      <View style={styles.labels}>
        <Text style={styles.subLabel}>300</Text>
        <Text style={styles.subLabel}>850</Text>
      </View>

      {/* Details */}
      {[
        { title: 'Payment History', level: 'Excellent', color: '#10b981', width: '95%' },
        { title: 'Credit Utilization', level: 'Good', color: '#3b82f6', width: '75%' },
        { title: 'Credit Age', level: 'Fair', color: '#facc15', width: '60%' },
      ].map((item, index) => (
        <View key={index} style={styles.detailContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>{item.title}</Text>
            <Text style={styles.detailLevel}>{item.level}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.fillBar, { width: item.width, backgroundColor: item.color }]} />
          </View>
        </View>
      ))}

      <Text style={styles.footer}>Last updated: May 15, 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f7fa',
    flex: 1,
  },
  gaugeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 180,
    alignSelf: 'center',
  },
  scoreLabel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -20 }],
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 32,
    left: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  scoreRating: {
    fontSize: 14,
    left: 10,
    marginTop: 4,
    fontWeight: '500',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
  },
  subLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 8,
  },
  fillBar: {
    height: '100%',
    borderRadius: 3,
  },
  detailContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailTitle: {
    fontSize: 14,
    color: '#4b5563',
  },
  detailLevel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});

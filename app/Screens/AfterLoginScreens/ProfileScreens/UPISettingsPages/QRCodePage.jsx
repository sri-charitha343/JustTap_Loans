import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

const QRCodePage = () => {
  const viewShotRef = useRef();

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const fileUri = `${FileSystem.cacheDirectory}qr_share.png`;

      await FileSystem.copyAsync({ from: uri, to: fileUri });
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
        <View style={styles.card}>
          <Text style={styles.bankText}>SBI • XXX12345</Text>

          <View style={styles.qrContainer}>
            <Image
              source={require('../../../../../assets/Images/qr-code.png')}
              style={styles.qrImage}
            />
          </View>

        
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.infoText}>Sri Charitha</Text>

            <Text style={styles.label}>UPI ID</Text>
            <Text style={styles.infoText}>9121978725@upi</Text>
          </View>
        </View>
      </ViewShot>

    
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Ionicons name="share-social-outline" size={20} color="#fff" />
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QRCodePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f4a97',
    marginBottom: 10,
  },
  bankText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
  },
  qrContainer: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  infoContainer: {
    width: '100%',
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#0f4a97',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  shareText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 16,
  },
});

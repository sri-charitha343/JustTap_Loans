import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function YourSavingsAccount() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 30, color: "#0f4a97", fontWeight: 'bold', padding: 10 }}>
        Savings Account
      </Text>

      <View style={styles.balanceCard}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceText}>Available Balance</Text>
          <View style={styles.savingsTag}>
            <Text style={styles.savingsText}>Savings</Text>
          </View>
        </View>
        <View style={styles.balanceAmountContainer}>
          <Text style={styles.currency}>₹</Text>
          <Text style={styles.balanceAmount}>0.00</Text>
        </View>
        <TouchableOpacity style={styles.addMoneyBtn} onPress={() => setModalVisible(true)}>
          <Feather name="plus" size={20} color="#0f4a97" />
          <Text style={styles.addMoneyText}>  Add Money</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          {quickActions.map(({ title, bgColor, iconName, IconComponent }, index) => (
            <View key={index} style={styles.quickAction}>
              <View style={[styles.iconWrapper, { backgroundColor: bgColor }]}>
                <IconComponent name={iconName} size={20} color="#000" />
              </View>
              <Text style={styles.quickActionLabel}>{title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Account Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View style={[styles.iconWrapper, { backgroundColor: '#DBEAFE' }]}>
              <Feather name="percent" size={16}  color="#2563EB" />
            </View>
            <Text style={styles.statLabel}>Interest Rate</Text>
          </View>
          <Text style={styles.statValue}>4.5% <Text style={styles.statSub}>p.a.</Text></Text>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <View style={[styles.iconWrapper, { backgroundColor: '#DCFCE7' }]}>
              <MaterialIcons name="trending-up" size={16} color="#16A34A" />
            </View>
            <Text style={styles.statLabel}>Monthly Growth</Text>
          </View>
          <Text style={styles.statValue}>0.00 <Text style={styles.statSub}>₹</Text></Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={styles.transactionsCard}>
          <Feather name="file-text" size={48} color="#D1D5DB" />
          <Text style={styles.emptyStateText}>No transactions yet</Text>
          <Text style={styles.emptyStateSub}>Your recent transactions will appear here</Text>
        </View>
      </View>

      {/* Add Money Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Add Money Modal</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 20 }}>
              <Text style={{ color: 'blue' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const quickActions = [
  {
    title: 'Send',
    bgColor: '#DBEAFE',
    iconName: 'send',
    IconComponent: Feather,
  },
  {
    title: 'Receive',
    bgColor: '#DCFCE7',
    iconName: 'download',
    IconComponent: Feather,
  },
  {
    title: 'Bills',
    bgColor: '#EDE9FE',
    iconName: 'receipt',
    IconComponent: Ionicons,
  },
  {
    title: 'Schedule',
    bgColor: '#FEF3C7',
    iconName: 'calendar',
    IconComponent: Feather,
  },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', marginTop: 20 },
  balanceCard: { backgroundColor: '#0f4a97', borderRadius: 24, padding: 24, marginBottom: 24 },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  balanceText: { color: 'white', opacity: 0.9 },
  savingsTag: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 4 },
  savingsText: { color: 'white', fontSize: 12 },
  balanceAmountContainer: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16 },
  currency: { fontSize: 24, color: 'white', marginRight: 4 },
  balanceAmount: { fontSize: 36, fontWeight: 'bold', color: 'white' },
  addMoneyBtn: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  addMoneyText: { color: '#0f4a97', fontWeight: 'bold' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#1F2937' },
  quickActions: { flexDirection: 'row', justifyContent: 'space-between' },
  quickAction: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
  },
  iconWrapper: { padding: 5, borderRadius: 999, marginBottom: 8 },
  quickActionLabel: { fontSize: 12, color: '#374151' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, flex: 1, marginHorizontal: 4 },
  statHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  statLabel: { fontSize: 14, top: -4, color: '#6B7280', marginLeft: 6 },
  statValue: { fontSize: 20, fontWeight: '600', color: '#1F2937' },
  statSub: { fontSize: 14, fontWeight: '400', color: '#6B7280' },
  transactionsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  viewAll: { color: '#3B82F6', fontSize: 14 },
  transactionsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: { fontSize: 16, color: '#6B7280', marginTop: 12 },
  emptyStateSub: { fontSize: 12, color: '#9CA3AF' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
});

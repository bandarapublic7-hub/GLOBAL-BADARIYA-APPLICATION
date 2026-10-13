import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import BrandHeader from '../components/BrandHeader';
import { COLORS } from '../constants/theme';

export default function AttendanceScreen() {
  return <View style={styles.screen}><BrandHeader title="Attendance" /><View style={styles.empty}><Ionicons name="checkmark-done-outline" size={42} color={COLORS.red} /><Text style={styles.title}>Attendance</Text><Text style={styles.muted}>Your attendance information will appear here when it is connected to campus data.</Text></View></View>;
}

const styles = StyleSheet.create({ screen: { flex: 1, backgroundColor: COLORS.background }, empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28 }, title: { color: COLORS.text, fontSize: 19, fontWeight: '700', marginTop: 12 }, muted: { color: COLORS.muted, fontSize: 13, textAlign: 'center', marginTop: 7, lineHeight: 19 } });

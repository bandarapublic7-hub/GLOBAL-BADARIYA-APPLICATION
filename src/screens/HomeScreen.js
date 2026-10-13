import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BrandHeader from '../components/BrandHeader';
import { useProfile } from '../context/ProfileContext';
import { BRAND, COLORS } from '../constants/theme';

const shortcuts = [
  ['Gate Pass', 'ticket-outline'], ['eLibrary', 'book-outline'], ['Book History', 'time-outline'],
  ['Notice', 'megaphone-outline'], ['Issue Books', 'library-outline'], ['Fees', 'wallet-outline'],
  ['Library', 'library-outline'], ['Attendance', 'checkmark-done-outline'], ['Apply Leave', 'create-outline'],
];

export default function HomeScreen({ navigation }) {
  const { profile } = useProfile();
  const open = (name) => {
    if (name === 'Attendance') navigation.navigate('Attendance');
    else navigation.navigate('Timetable');
  };

  return (
    <View style={styles.screen}>
      <BrandHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome{profile.name ? `, ${profile.name}` : ''}</Text>
          <Text style={styles.welcomeBrand}>{BRAND.name}</Text>
          <Text style={styles.welcomeSub}>{BRAND.institute}</Text>
        </View>
        <Text style={styles.heading}>Campus</Text>
        <View style={styles.summaryRow}>
          <Pressable style={styles.summaryCard} onPress={() => navigation.navigate('Timetable')}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.red} />
            <Text style={styles.cardTitle}>Timetable</Text><Text style={styles.muted}>Your class schedule</Text>
          </Pressable>
          <Pressable style={styles.summaryCard} onPress={() => navigation.navigate('Attendance')}>
            <Ionicons name="checkmark-done-outline" size={24} color={COLORS.red} />
            <Text style={styles.cardTitle}>Attendance</Text><Text style={styles.muted}>Track your classes</Text>
          </Pressable>
        </View>
        <Text style={styles.heading}>Quick access</Text>
        <View style={styles.grid}>
          {shortcuts.map(([name, icon]) => (
            <Pressable key={name} style={({ pressed }) => [styles.tile, pressed && styles.pressed]} onPress={() => open(name)}>
              <Ionicons name={icon} size={23} color={COLORS.red} />
              <Text style={styles.tileLabel}>{name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 28 },
  welcome: { backgroundColor: COLORS.red, borderRadius: 20, padding: 22, minHeight: 142, justifyContent: 'center', marginBottom: 22 },
  welcomeTitle: { color: '#fff', fontSize: 21, fontWeight: '700' },
  welcomeBrand: { color: '#fff', fontSize: 16, fontWeight: '700', marginTop: 10 },
  welcomeSub: { color: '#ffe2df', fontSize: 12, marginTop: 3 },
  heading: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', gap: 11, marginBottom: 20 },
  summaryCard: { flex: 1, minHeight: 112, borderRadius: 15, padding: 13, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, justifyContent: 'center' },
  cardTitle: { color: COLORS.text, fontWeight: '700', fontSize: 14, marginTop: 7 },
  muted: { color: COLORS.muted, fontSize: 11, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: { width: '30.5%', minHeight: 82, borderRadius: 14, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center', padding: 8 },
  tileLabel: { color: COLORS.text, fontSize: 11, fontWeight: '600', textAlign: 'center', marginTop: 6 },
  pressed: { opacity: 0.72 },
});

import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/theme';

export default function InfoRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || 'Not added'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: COLORS.surface, borderRadius: 12, padding: 13, marginBottom: 9, borderWidth: 1, borderColor: COLORS.border },
  label: { color: COLORS.muted, fontSize: 11, marginBottom: 4 },
  value: { color: COLORS.text, fontSize: 15, fontWeight: '500' },
});

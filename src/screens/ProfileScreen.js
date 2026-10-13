import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import BrandHeader from '../components/BrandHeader';
import InfoRow from '../components/InfoRow';
import ProfileAvatar from '../components/ProfileAvatar';
import { useProfile } from '../context/ProfileContext';
import { COLORS } from '../constants/theme';

const fields = [
  ['gno', 'GNo'], ['course', 'Course'], ['branch', 'Branch'], ['father', "Father's name"],
  ['mother', "Mother's name"], ['dob', 'Date of birth'], ['contact', 'Contact number'],
  ['email', 'Email'], ['blood', 'Blood group'], ['samagra', 'Samagra ID'],
  ['address', 'Address'], ['semester', 'Semester'], ['tenth', '10th percentage'],
  ['twelfth', '12th percentage'], ['cgpa', 'Current CGPA'],
];

export default function ProfileScreen({ navigation }) {
  const { profile } = useProfile();
  return (
    <View style={styles.screen}>
      <BrandHeader title="Profile" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ProfileAvatar uri={profile.photo} />
          <View style={styles.heroText}><Text style={styles.greeting}>Hello,</Text><Text style={styles.name}>{profile.name || 'Student'}</Text><Text style={styles.muted}>{[profile.course, profile.branch].filter(Boolean).join(' · ') || 'Add your course details'}</Text></View>
        </View>
        <Pressable onPress={() => navigation.navigate('EditProfile')} style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}><Text style={styles.editText}>Edit profile</Text></Pressable>
        <Text style={styles.heading}>Your information</Text>
        {fields.map(([key, label]) => <InfoRow key={key} label={label} value={profile[key]} />)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background }, content: { padding: 16, paddingBottom: 26 },
  hero: { backgroundColor: COLORS.surface, borderRadius: 18, borderWidth: 1, borderColor: COLORS.border, minHeight: 126, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 14 },
  heroText: { flex: 1 }, greeting: { color: COLORS.muted, fontSize: 13 }, name: { color: COLORS.text, fontSize: 20, fontWeight: '700', marginTop: 3 },
  muted: { color: COLORS.muted, fontSize: 12, marginTop: 4 }, editButton: { alignSelf: 'flex-end', backgroundColor: COLORS.red, paddingHorizontal: 17, paddingVertical: 11, borderRadius: 11, marginTop: 12, marginBottom: 17 },
  editText: { color: '#fff', fontWeight: '700', fontSize: 13 }, heading: { color: COLORS.text, fontSize: 18, fontWeight: '700', marginBottom: 12 }, pressed: { opacity: 0.75 },
});

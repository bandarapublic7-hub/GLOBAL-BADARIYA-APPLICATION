import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProfileAvatar from '../components/ProfileAvatar';
import { useProfile } from '../context/ProfileContext';
import { COLORS } from '../constants/theme';

const fields = [
  ['name', 'Full name'], ['gno', 'GNo'], ['course', 'Course'], ['branch', 'Branch'],
  ['father', "Father's name"], ['mother', "Mother's name"], ['dob', 'Date of birth'],
  ['contact', 'Contact number'], ['email', 'Email'], ['blood', 'Blood group'],
  ['samagra', 'Samagra ID'], ['address', 'Address'], ['semester', 'Semester'],
  ['tenth', '10th percentage'], ['twelfth', '12th percentage'], ['cgpa', 'Current CGPA'],
];

export default function EditProfileScreen({ navigation }) {
  const { profile, loaded, saveProfile } = useProfile();
  const [draft, setDraft] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (loaded) setDraft({ ...profile }); }, [loaded]);
  const change = (key, value) => setDraft((current) => ({ ...current, [key]: value }));

  const choosePhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Photo access needed', 'Allow photo access to choose a profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 0.8 });
    if (!result.canceled) change('photo', result.assets[0].uri);
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveProfile(draft);
      navigation.goBack();
    } catch {
      Alert.alert('Could not save', 'Please check your device storage and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back to profile" onPress={() => navigation.goBack()} style={styles.back}><Ionicons name="arrow-back" size={22} color={COLORS.red} /></Pressable>
        <Text style={styles.headerTitle}>Edit profile</Text><View style={styles.back} />
      </View>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable onPress={choosePhoto} style={styles.photoPicker}><ProfileAvatar uri={draft.photo} /><Text style={styles.photoText}>Choose profile photo</Text></Pressable>
          {fields.map(([key, label]) => (
            <View key={key} style={styles.group}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                value={draft[key] || ''}
                onChangeText={(value) => change(key, value)}
                placeholder={label}
                placeholderTextColor={COLORS.muted}
                style={styles.input}
                keyboardType={key === 'contact' ? 'phone-pad' : key === 'email' ? 'email-address' : 'default'}
                autoCapitalize={key === 'email' ? 'none' : 'words'}
              />
            </View>
          ))}
          <Pressable disabled={saving} onPress={save} style={({ pressed }) => [styles.saveButton, (pressed || saving) && styles.pressed]}>
            <Text style={styles.saveText}>{saving ? 'Saving…' : 'Save profile'}</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background }, flex: { flex: 1 },
  header: { height: 54, backgroundColor: COLORS.surfaceWarm, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 },
  back: { width: 38, height: 40, alignItems: 'center', justifyContent: 'center' }, headerTitle: { flex: 1, textAlign: 'center', color: COLORS.text, fontSize: 18, fontWeight: '700' },
  content: { padding: 16, paddingBottom: 28 }, photoPicker: { alignItems: 'center', paddingVertical: 10, marginBottom: 10 }, photoText: { color: COLORS.red, fontSize: 13, fontWeight: '600', marginTop: 8 },
  group: { marginBottom: 12 }, label: { color: COLORS.muted, fontSize: 12, marginBottom: 6, marginLeft: 3 },
  input: { minHeight: 50, paddingHorizontal: 14, borderRadius: 12, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, color: COLORS.text, fontSize: 15 },
  saveButton: { backgroundColor: COLORS.red, borderRadius: 13, padding: 14, alignItems: 'center', marginTop: 6 }, saveText: { color: '#fff', fontSize: 15, fontWeight: '700' }, pressed: { opacity: 0.75 },
});

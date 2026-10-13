import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'global-badariya-profile-v1';
const EMPTY_PROFILE = {
  name: '', gno: '', course: '', branch: '', father: '', mother: '', dob: '',
  contact: '', email: '', blood: '', samagra: '', photo: '', address: '',
  semester: '', tenth: '', twelfth: '', cgpa: '',
};

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => { if (saved) setProfile({ ...EMPTY_PROFILE, ...JSON.parse(saved) }); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const saveProfile = async (nextProfile) => {
    const next = { ...EMPTY_PROFILE, ...nextProfile, name: (nextProfile.name || '').trim() };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setProfile(next);
  };

  const value = useMemo(() => ({ profile, loaded, saveProfile }), [profile, loaded]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error('useProfile must be used inside ProfileProvider');
  return value;
}

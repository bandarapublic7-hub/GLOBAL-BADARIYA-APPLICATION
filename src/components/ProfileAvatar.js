import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileAvatar({ uri, size = 92 }) {
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? <Image source={{ uri }} style={styles.image} /> : <Text style={styles.placeholder}>👤</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { backgroundColor: '#f5dedb', borderWidth: 3, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  placeholder: { fontSize: 32 },
});

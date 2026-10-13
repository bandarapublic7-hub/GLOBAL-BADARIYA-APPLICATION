import { Image, StyleSheet, Text, View } from 'react-native';
import { BRAND, COLORS } from '../constants/theme';

export default function BrandHeader({ title }) {
  return (
    <View style={styles.header}>
      {title ? <Text style={styles.title}>{title}</Text> : <Image source={require('../../assets/GlobalLogoB.png')} resizeMode="contain" style={styles.logo} accessibilityLabel={`${BRAND.name} ${BRAND.institute}`} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 64, backgroundColor: COLORS.red, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 12 },
  logo: { width: 112, height: 64 },
  title: { color: '#fff', fontSize: 19, fontWeight: '700' },
});

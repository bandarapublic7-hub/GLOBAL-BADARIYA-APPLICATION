import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import TimetableScreen from '../screens/TimetableScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { COLORS } from '../constants/theme';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const icons = {
  Home: ['home-outline', 'home'],
  Timetable: ['calendar-outline', 'calendar'],
  Attendance: ['checkmark-circle-outline', 'checkmark-circle'],
  Profile: ['person-outline', 'person'],
};

function MainTabs() {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.red,
      tabBarInactiveTintColor: COLORS.muted,
      tabBarStyle: { height: 64, paddingTop: 7, paddingBottom: 5, backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
      tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      tabBarIcon: ({ color, size, focused }) => <Ionicons name={icons[route.name][focused ? 1 : 0]} size={size} color={color} />,
    })}>
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Timetable" component={TimetableScreen} />
      <Tabs.Screen name="Attendance" component={AttendanceScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.background } }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ animation: 'slide_from_right' }} />
    </Stack.Navigator>
  );
}

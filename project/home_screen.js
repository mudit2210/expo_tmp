import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const cards = [
    { icon: '📊', title: 'Dashboard', subtitle: 'View your stats' },
    { icon: '🔔', title: 'Notifications', subtitle: '3 new alerts' },
    { icon: '📁', title: 'Projects', subtitle: '5 active projects' },
    { icon: '⚙️', title: 'Settings', subtitle: 'Manage preferences' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.username}>Welcome Back!</Text>
        </View>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Explore MyApp</Text>
        <Text style={styles.bannerSub}>Everything you need in one place</Text>
        <View style={styles.bannerBadge}>
          <Text style={styles.bannerBadgeText}>NEW</Text>
        </View>
      </View>

      {/* Cards Grid */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardSub}>{card.subtitle}</Text>
          </TouchableOpacity>
        ))}

        {/* Go to Profile */}
        <TouchableOpacity
          style={styles.fullCard}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.fullCardText}>Go to Profile →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0720',
    paddingTop: 52,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: '#a78bfa',
    marginBottom: 2,
  },
  username: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  profileBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#4c1d95',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 22,
  },
  banner: {
    marginHorizontal: 24,
    backgroundColor: '#7c3aed',
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  bannerSub: {
    fontSize: 13,
    color: '#ddd6fe',
  },
  bannerBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  bannerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    width: (width - 56) / 2,
    backgroundColor: '#1e0a3c',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3b1d6e',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: '#8b5cf6',
  },
  fullCard: {
    width: '100%',
    backgroundColor: '#7c3aed',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  fullCardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

import React, { useEffect } from "react";
import {Link, Stack, Tabs, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, StatusBar, TouchableOpacity, View } from "react-native";

import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserInactivityProvider } from '@/context/UserInactivity';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


const IntialLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  const router = useRouter();

  const { isLoaded, isSignedIn } = useAuth();
  
  const segments = useSegments();

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
      if (error) throw error;
    }, [error]);
    
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(authenticated)';

    if (isSignedIn && !inAuthGroup) {
      router.replace("/(authenticated)/(tabs)/home");
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return  (   
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ 
        title: "", 
        headerBackTitle: "", 
        headerShadowVisible: false, 
        headerStyle: {backgroundColor: Colors.background}, 
        headerLeft: () =>(
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="arrow-back" size={34} color={Colors.primary} />
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="login" options={{ 
        title: "", 
        headerBackTitle: "", 
        headerShadowVisible: false, 
        headerStyle: {backgroundColor: Colors.background}, 
        headerLeft: () =>(
          <TouchableOpacity onPress={router.back}>
            <Ionicons name="arrow-back" size={34} color={Colors.primary} />
          </TouchableOpacity>
        ),
        headerRight: () =>(
          <Link href="/help" asChild>
            <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={34} color={Colors.dark} />
            </TouchableOpacity>
          </Link>
        )
      }} />
      <Stack.Screen name="help" options={{title: "help", presentation:"modal"}} />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: '',
          headerBackTitle: '',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Stack.Screen name="(authenticated)/(tabs)" options={{ headerShown: false }} /> */}
  </Stack>
  );
}

const RootLayout = () => {
  return (  
    <ClerkProvider
    tokenCache={tokenCache}
    publishableKey={CLERK_PUBLISHABLE_KEY!}>
      <QueryClientProvider client={queryClient}>
      <UserInactivityProvider>
        <GestureHandlerRootView style={{flex:1}}>
          <StatusBar />
          <IntialLayout />
      </GestureHandlerRootView>
      </UserInactivityProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
export default RootLayout;

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);
const DEMO_USER_KEY = 'lils_spun_demo_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to extract or construct profile metadata
  const extractProfile = (authUser) => {
    if (!authUser) return null;
    const meta = authUser.user_metadata || {};
    return {
      id: authUser.id,
      email: authUser.email,
      fullName: meta.full_name || meta.name || authUser.email?.split('@')[0] || 'Patron',
      phone: meta.phone || '',
      address: meta.address || '',
      city: meta.city || '',
      state: meta.state || '',
      pincode: meta.pincode || '',
      avatarUrl: meta.avatar_url || '',
      createdAt: authUser.created_at
    };
  };

  // Initialize auth session
  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.warn('Error fetching Supabase auth session:', error.message);
          }
          if (mounted) {
            if (data?.session?.user) {
              setSession(data.session);
              setUser(data.session.user);
              setProfile(extractProfile(data.session.user));
            } else {
              // Check if a demo user is active in localStorage
              const savedDemo = localStorage.getItem(DEMO_USER_KEY);
              if (savedDemo) {
                try {
                  const parsed = JSON.parse(savedDemo);
                  setUser(parsed);
                  setProfile(extractProfile(parsed));
                } catch {
                  localStorage.removeItem(DEMO_USER_KEY);
                }
              }
            }
          }
        } catch (err) {
          console.warn('Supabase auth init exception:', err);
        } finally {
          if (mounted) setLoading(false);
        }

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
          if (!mounted) return;
          if (currentSession?.user) {
            setSession(currentSession);
            setUser(currentSession.user);
            setProfile(extractProfile(currentSession.user));
            localStorage.removeItem(DEMO_USER_KEY);
          } else {
            // Check if demo user is kept
            const savedDemo = localStorage.getItem(DEMO_USER_KEY);
            if (!savedDemo) {
              setSession(null);
              setUser(null);
              setProfile(null);
            }
          }
          setLoading(false);
        });

        return () => {
          mounted = false;
          authListener?.subscription?.unsubscribe();
        };
      } else {
        // Fallback for offline / non-configured mode
        const savedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (savedDemo) {
          try {
            const parsed = JSON.parse(savedDemo);
            setUser(parsed);
            setProfile(extractProfile(parsed));
          } catch {
            localStorage.removeItem(DEMO_USER_KEY);
          }
        }
        if (mounted) setLoading(false);
      }
    }

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // 1. Sign Up
  const signUp = useCallback(async ({ email, password, fullName, phone }) => {
    if (!isSupabaseConfigured || !supabase) {
      // Demo / simulated sign up
      const mockUser = {
        id: 'usr-' + Date.now(),
        email,
        user_metadata: {
          full_name: fullName,
          phone: phone || ''
        },
        created_at: new Date().toISOString()
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(extractProfile(mockUser));
      return { success: true, user: mockUser, session: null, needsConfirmation: false };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            full_name: fullName?.trim(),
            phone: phone?.trim() || ''
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      const hasSession = Boolean(data.session);
      if (hasSession && data.user) {
        setSession(data.session);
        setUser(data.user);
        setProfile(extractProfile(data.user));
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
        needsConfirmation: !hasSession && Boolean(data.user && !data.user.confirmed_at)
      };
    } catch (err) {
      return { success: false, error: err.message || 'An unexpected sign up error occurred' };
    }
  }, []);

  // 2. Sign In
  const signIn = useCallback(async ({ email, password }) => {
    if (!isSupabaseConfigured || !supabase) {
      const mockUser = {
        id: 'usr-demo',
        email: email.trim().toLowerCase(),
        user_metadata: {
          full_name: email.split('@')[0],
          phone: '+91 98765 43210'
        },
        created_at: new Date().toISOString()
      };
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
      setUser(mockUser);
      setProfile(extractProfile(mockUser));
      return { success: true, user: mockUser };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.user) {
        setSession(data.session);
        setUser(data.user);
        setProfile(extractProfile(data.user));
        localStorage.removeItem(DEMO_USER_KEY);
      }

      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message || 'Unable to sign in. Please verify your credentials.' };
    }
  }, []);

  // 3. Demo Quick Sign In
  const signInDemo = useCallback((role = 'customer') => {
    const demoUser = {
      id: 'usr-demo-patron',
      email: role === 'customer' ? 'priya.sharma@example.com' : 'ananya.mehra@example.com',
      user_metadata: {
        full_name: role === 'customer' ? 'Priya Sharma' : 'Ananya Mehra',
        phone: '+91 98765 43210',
        address: '42, Lotus Villa, Panampilly Nagar',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682036'
      },
      created_at: new Date('2026-01-15T10:00:00Z').toISOString()
    };

    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setProfile(extractProfile(demoUser));
    return { success: true, user: demoUser };
  }, []);

  // 4. Sign Out
  const signOut = useCallback(async () => {
    localStorage.removeItem(DEMO_USER_KEY);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Sign out warning:', err);
      }
    }
    setSession(null);
    setUser(null);
    setProfile(null);
    return { success: true };
  }, []);

  // 5. Reset Password
  const resetPassword = useCallback(async (email) => {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true, simulated: true };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/#/account`
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || 'Failed to send reset instructions.' };
    }
  }, []);

  // 6. Update Profile
  const updateProfile = useCallback(async (updatedFields) => {
    const updatedMetadata = {
      full_name: updatedFields.fullName !== undefined ? updatedFields.fullName : profile?.fullName,
      phone: updatedFields.phone !== undefined ? updatedFields.phone : profile?.phone,
      address: updatedFields.address !== undefined ? updatedFields.address : profile?.address,
      city: updatedFields.city !== undefined ? updatedFields.city : profile?.city,
      state: updatedFields.state !== undefined ? updatedFields.state : profile?.state,
      pincode: updatedFields.pincode !== undefined ? updatedFields.pincode : profile?.pincode
    };

    if (isSupabaseConfigured && supabase && session) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          data: updatedMetadata
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data?.user) {
          setUser(data.user);
          setProfile(extractProfile(data.user));
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    } else {
      // Local demo profile update
      if (user) {
        const updatedUser = {
          ...user,
          user_metadata: {
            ...user.user_metadata,
            ...updatedMetadata
          }
        };
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updatedUser));
        setUser(updatedUser);
        setProfile(extractProfile(updatedUser));
      }
      return { success: true };
    }
  }, [profile, session, user]);

  // 7. Update Password
  const updatePassword = useCallback(async (newPassword) => {
    if (isSupabaseConfigured && supabase && session) {
      try {
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (error) return { success: false, error: error.message };
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      }
    }
    return { success: true, simulated: true };
  }, [session]);

  const value = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: Boolean(user),
    signUp,
    signIn,
    signInDemo,
    signOut,
    resetPassword,
    updateProfile,
    updatePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

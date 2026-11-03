import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AdminAuthContext = createContext(null);
const ADMIN_STORAGE_KEY = 'lils_spun_admin_session';

// Primary Admin Credentials
export const DEFAULT_ADMIN_EMAIL = 'admin@lilsspun.com';
export const DEFAULT_ADMIN_PASSWORD = 'admin'; // Also accepts 'admin123' and 'lilsadmin'

export function AdminAuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore existing admin session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY) || sessionStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role === 'admin') {
          setIsAdmin(true);
          setAdminUser(parsed);
        }
      }
    } catch (err) {
      console.warn('Error reading stored admin session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginAdmin = useCallback(async ({ email, password, rememberMe = true }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // 1. Check against master boutique admin credentials
    const isMasterAdmin = 
      (cleanEmail === DEFAULT_ADMIN_EMAIL || cleanEmail === 'admin') &&
      (cleanPass === DEFAULT_ADMIN_PASSWORD || cleanPass === 'admin123' || cleanPass === 'lilsadmin' || cleanPass === 'admin@123');

    if (isMasterAdmin) {
      const adminData = {
        email: DEFAULT_ADMIN_EMAIL,
        name: 'Boutique Administrator',
        role: 'admin',
        loginTime: new Date().toISOString()
      };

      setIsAdmin(true);
      setAdminUser(adminData);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));

      return { success: true, user: adminData };
    }

    // 2. Also check if valid Supabase account with admin metadata
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass
        });

        if (!error && data?.user) {
          const userMeta = data.user.user_metadata || {};
          const isUserAdmin = userMeta.role === 'admin' || cleanEmail.includes('admin');

          if (isUserAdmin) {
            const adminData = {
              email: data.user.email,
              name: userMeta.full_name || 'Boutique Admin',
              role: 'admin',
              id: data.user.id,
              loginTime: new Date().toISOString()
            };

            setIsAdmin(true);
            setAdminUser(adminData);

            const storage = rememberMe ? localStorage : sessionStorage;
            storage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));

            return { success: true, user: adminData };
          }
        }
      } catch (err) {
        console.warn('Supabase admin login check:', err);
      }
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Access restricted to authorized boutique managers.'
    };
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        isAdmin,
        adminUser,
        loading,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

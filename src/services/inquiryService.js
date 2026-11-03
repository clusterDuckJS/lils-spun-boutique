import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function subscribeNewsletter(email) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email.trim().toLowerCase() }]);

      if (error) {
        // If unique constraint error (already subscribed)
        if (error.code === '23505') {
          return { success: true, message: 'You are already subscribed to our private edit.' };
        }
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  return { success: true, simulated: true };
}

export async function submitContactInquiry({ name, email, phone, message }) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name,
            email,
            phone: phone || null,
            message
          }
        ]);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  return { success: true, simulated: true };
}

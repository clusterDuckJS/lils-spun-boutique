// Supabase Edge Functions - PhonePe V2 Shared Helper
// Environment variables:
// - PHONEPE_CLIENT_ID: SU2611231843590287957906
// - PHONEPE_CLIENT_SECRET: 32e4f7cc-547a-4cc4-a3e1-787917c3299c
// - PHONEPE_CLIENT_VERSION: 1
// - PHONEPE_ENV: production (or sandbox)
// - SUPABASE_URL: automatically provided
// - SUPABASE_SERVICE_ROLE_KEY: automatically provided

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

// In-memory token cache for function warm instances
let cachedToken: { token: string; expiresAt: number } | null = null;

export function getPhonePeConfig() {
  const clientId = Deno.env.get('PHONEPE_CLIENT_ID') || 'SU2611231843590287957906';
  const clientSecret = Deno.env.get('PHONEPE_CLIENT_SECRET') || '32e4f7cc-547a-4cc4-a3e1-787917c3299c';
  const clientVersion = Deno.env.get('PHONEPE_CLIENT_VERSION') || '1';
  const env = Deno.env.get('PHONEPE_ENV') || 'production';

  const isProduction = env === 'production';

  const tokenUrl = isProduction
    ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

  const payUrl = isProduction
    ? 'https://api.phonepe.com/apis/pg/checkout/v2/pay'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';

  const statusBaseUrl = isProduction
    ? 'https://api.phonepe.com/apis/pg/checkout/v2/order'
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order';

  return {
    clientId,
    clientSecret,
    clientVersion,
    isProduction,
    tokenUrl,
    payUrl,
    statusBaseUrl,
  };
}

/**
 * Fetch or reuse cached PhonePe OAuth access token
 */
export async function getPhonePeAuthToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Reuse token if still valid for at least 5 minutes
  if (cachedToken && cachedToken.expiresAt > now + 300) {
    return cachedToken.token;
  }

  const config = getPhonePeConfig();

  const bodyParams = new URLSearchParams({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    client_version: config.clientVersion,
    grant_type: 'client_credentials',
  });

  const response = await fetch(config.tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParams.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('PhonePe OAuth token error:', response.status, errorText);
    throw new Error(`Failed to generate PhonePe token: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const accessToken = data.access_token;
  const expiresAt = data.expires_at || (now + 3600); // default 1 hour if not returned

  cachedToken = {
    token: accessToken,
    expiresAt,
  };

  return accessToken;
}

/**
 * Initialize Supabase Admin Client using Service Role Key
 */
export function getSupabaseAdmin() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined in environment.');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

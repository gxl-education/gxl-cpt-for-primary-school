export const config = { runtime: 'edge' };

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 200, headers });

  try {
    // 删除所有记录（neq id 是 Supabase 删全部的写法）
    await fetch(`${SUPABASE_URL}/rest/v1/cpt_records?ts=gte.0`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
  }
}

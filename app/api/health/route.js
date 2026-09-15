import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { errorLog } from '@/lib/security/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startedAt = Date.now();

  try {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase
      .from('company_stats')
      .select('*', { count: 'exact', head: true })
      .abortSignal(AbortSignal.timeout(3_000));

    if (error) throw error;

    return NextResponse.json({
      status: 'ok',
      checks: { application: 'ok', database: 'ok' },
      responseTimeMs: Date.now() - startedAt,
      timestamp: new Date().toISOString(),
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    errorLog('Health check database failure', { code: error?.code, message: error?.message });
    return NextResponse.json({
      status: 'degraded',
      checks: { application: 'ok', database: 'unavailable' },
      timestamp: new Date().toISOString(),
    }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}

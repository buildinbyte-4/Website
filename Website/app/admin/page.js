'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { DollarSign, TrendingUp, TrendingDown, Clock, Activity, ChevronDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PAYMENT_METHOD_LABELS = {
  card: 'Credit Card',
  upi: 'UPI',
  paypal: 'PayPal',
  bank_transfer: 'Bank Transfer',
};

export default function AdminOverview() {
  const [kpis, setKpis] = useState({ gross_revenue: 0, money_loss: 0, net_revenue: 0, money_pending: 0 });
  const [trendData, setTrendData] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const [kpiRes, trendRes, paymentRes] = await Promise.all([
          supabase.from('admin_financial_kpis').select('*').single(),
          supabase.from('admin_financial_trend').select('*'),
          supabase.from('admin_payment_methods').select('*'),
        ]);

        if (kpiRes.error) throw kpiRes.error;
        if (trendRes.error) throw trendRes.error;
        if (paymentRes.error) throw paymentRes.error;

        setKpis(kpiRes.data || {});
        setTrendData(
          (trendRes.data || []).map((row) => ({
            date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: Number(row.revenue),
            loss: Number(row.loss),
          }))
        );
        setPaymentMethods(
          (paymentRes.data || []).map((row) => ({
            name: PAYMENT_METHOD_LABELS[row.payment_method] || row.payment_method,
            value: Number(row.percentage),
          }))
        );
      } catch (err) {
        console.error('Error fetching admin overview:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  const StatCard = ({ title, amount, icon: Icon }) => (
    <div className="bg-white rounded-xl p-5 border border-zinc-200 shadow-sm flex flex-col justify-between gap-4">
      <div className="flex justify-between items-start">
        <h3 className="font-medium text-sm text-zinc-500">{title}</h3>
        <div className="p-2 rounded-lg bg-zinc-50">
          <Icon size={18} className="text-zinc-600" />
        </div>
      </div>
      <div>
        <p className="font-semibold text-2xl text-zinc-900 tracking-tight">
          ${Number(amount || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );

  const PIE_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'];

  const CleanTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-zinc-200 rounded-lg p-3 shadow-md">
          <p className="font-medium text-zinc-500 text-xs mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold text-sm">
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-sm font-medium text-zinc-500">Loading overview...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Executive Overview</h1>
          <p className="text-sm text-zinc-500 mt-1">Key performance metrics and financial trends</p>
        </div>

        <div className="relative inline-block text-left">
          <select className="appearance-none bg-white border border-zinc-200 text-zinc-700 rounded-md px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm hover:bg-zinc-50 transition-colors">
            <option>Last 30 Days</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Gross Revenue" amount={kpis.gross_revenue} icon={DollarSign} />
        <StatCard title="Money Loss" amount={kpis.money_loss} icon={TrendingDown} />
        <StatCard title="Net Revenue" amount={kpis.net_revenue} icon={TrendingUp} />
        <StatCard title="Pending Holds" amount={kpis.money_pending} icon={Clock} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Area Chart */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white border border-zinc-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
              <Activity size={18} className="text-zinc-500" /> Financial Trends
            </h3>
          </div>

          <div className="h-[300px] w-full">
            {trendData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-zinc-400">No orders in the last 30 days yet.</div>
            ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#71717A', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717A', fontSize: 12}} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip content={<CleanTooltip />} cursor={{ stroke: '#D4D4D8', strokeWidth: 1, strokeDasharray: '4 4' }} />

                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="loss" name="Loss" stroke="#F43F5E" strokeWidth={2} fillOpacity={1} fill="url(#colorLoss)" />
              </AreaChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Payment Methods Donut Chart */}
        <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm flex flex-col">
          <h3 className="font-semibold text-zinc-900 mb-6">Payment Methods</h3>

          {paymentMethods.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-sm text-zinc-400">No paid orders yet.</div>
          ) : (
          <>
          <div className="h-[200px] w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CleanTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 space-y-3">
            {paymentMethods.map((method, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></div>
                  <span className="text-zinc-600">{method.name}</span>
                </div>
                <span className="font-medium text-zinc-900">{method.value}%</span>
              </div>
            ))}
          </div>
          </>
          )}
        </div>

      </div>
    </div>
  );
}

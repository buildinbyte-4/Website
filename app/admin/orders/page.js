'use client';
import { useState } from 'react';
import { ordersData } from '@/lib/adminMockData';
import { Search, Filter, X, ChevronRight, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Failed': return 'bg-red-100 text-red-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  return (
    <div className="space-y-6 relative h-full pb-10">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Orders</h1>
          <p className="text-sm text-zinc-500 mt-1">View and manage customer orders.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative border border-zinc-200 bg-white rounded-md shadow-sm flex items-center px-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-shadow">
            <Search size={16} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search ID, Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none p-2 text-sm text-zinc-900 placeholder-zinc-400 w-full sm:w-56"
            />
          </div>
          
          <div className="relative border border-zinc-200 bg-white rounded-md shadow-sm flex items-center px-3 hover:bg-zinc-50 transition-colors">
            <Filter size={16} className="text-zinc-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-transparent border-none focus:outline-none p-2 text-sm font-medium text-zinc-700 cursor-pointer pr-4"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Order ID</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Amount</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Payment</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-zinc-50 transition-colors duration-150">
                <td className="p-4 text-sm font-medium text-zinc-900">{order.id}</td>
                <td className="p-4">
                  <p className="text-sm font-medium text-zinc-900">{order.customerName}</p>
                  <p className="text-xs text-zinc-500">{order.contact}</p>
                </td>
                <td className="p-4 text-sm font-semibold text-zinc-900">${order.amount.toLocaleString()}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-4 text-sm text-zinc-600">{order.orderStatus}</td>
                <td className="p-4">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    View <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-12 text-center text-sm text-zinc-500">
                  No orders found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Side Drawer Modal for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-zinc-900/40 transition-opacity" 
            onClick={() => setSelectedOrder(null)}
          ></div>
          
          {/* Drawer Content */}
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-zinc-200 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-zinc-900">Order {selectedOrder.id}</h2>
                <p className="text-sm text-zinc-500 mt-1">{new Date(selectedOrder.timestamp).toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-8 flex-1 overflow-y-auto">
              
              {/* Customer Profile */}
              <div>
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Customer Details</h3>
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Name</p>
                      <p className="text-sm font-medium text-zinc-900">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Contact</p>
                      <p className="text-sm font-medium text-zinc-900 break-all">{selectedOrder.contact}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-200">
                    <p className="text-xs text-zinc-500 mb-1">Shipping Address</p>
                    <p className="text-sm text-zinc-700">{selectedOrder.address}</p>
                  </div>
                </div>
              </div>

              {/* Item Breakdown */}
              <div>
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Item Breakdown</h3>
                <div className="border border-zinc-200 rounded-lg overflow-hidden">
                  <div className="divide-y divide-zinc-200">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white">
                        <p className="text-sm text-zinc-700">{item.name}</p>
                        <p className="text-sm font-medium text-zinc-900">${item.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center p-4 bg-zinc-50 border-t border-zinc-200">
                    <p className="text-sm font-medium text-zinc-700">Total</p>
                    <p className="text-lg font-semibold text-zinc-900">
                      ${selectedOrder.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Audit */}
              <div>
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Payment Audit Trail</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Transaction ID</span>
                    <span className="font-mono text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">{selectedOrder.transactionId}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Status</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusStyle(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Gateway Response</span>
                    <span className="text-xs text-zinc-700 font-medium bg-zinc-100 px-2 py-1 rounded">
                      {selectedOrder.paymentStatus === 'Paid' ? '200 OK - CHARGED' : selectedOrder.paymentStatus === 'Failed' ? '402 - DECLINED' : '202 - PENDING'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer / Action Controls */}
            <div className="p-6 border-t border-zinc-200 bg-white grid grid-cols-2 gap-3">
              <button className="flex justify-center items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <CheckCircle size={16} /> Mark Paid
              </button>
              <button className="flex justify-center items-center gap-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 rounded-lg px-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <AlertTriangle size={16} /> Refund
              </button>
              <button className="col-span-2 flex justify-center items-center gap-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 rounded-lg px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <FileText size={16} /> Download Invoice
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

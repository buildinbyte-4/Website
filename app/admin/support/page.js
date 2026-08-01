'use client';
import { useState } from 'react';
import { supportTickets } from '@/lib/adminMockData';
import { MessageSquare, AlertCircle, CheckCircle, RefreshCcw, Send, ExternalLink, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminSupport() {
  const [tickets, setTickets] = useState(supportTickets);
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [replyText, setReplyText] = useState('');

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-zinc-100 text-zinc-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open Disputes': return <ShieldAlert size={14} className="text-red-500" />;
      case 'Pending Queries': return <RefreshCcw size={14} className="text-yellow-500" />;
      case 'Resolved Issues': return <CheckCircle size={14} className="text-green-500" />;
      default: return <MessageSquare size={14} className="text-zinc-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-6rem)] flex flex-col pb-6">
      
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">Support Desk</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage issues, disputes, and customer queries.</p>
      </div>

      {/* Main Two-Pane Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-hidden">
        
        {/* Left Pane: Ticket List */}
        <div className="lg:w-1/3 w-full bg-white border border-zinc-200 rounded-xl shadow-sm flex flex-col min-h-0 overflow-hidden">
          <div className="p-4 border-b border-zinc-200 bg-zinc-50">
            <h2 className="text-sm font-medium text-zinc-600">Inbox ({tickets.length})</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
            {tickets.map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedTicket?.id === ticket.id 
                    ? 'bg-blue-50 relative' 
                    : 'bg-white hover:bg-zinc-50'
                }`}
              >
                {/* Active indicator bar */}
                {selectedTicket?.id === ticket.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r"></div>
                )}
                
                <div className="flex justify-between items-start mb-2">
                  <span className={`font-medium text-sm ${selectedTicket?.id === ticket.id ? 'text-blue-900' : 'text-zinc-900'}`}>
                    {ticket.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityStyle(ticket.severity)}`}>
                    {ticket.severity}
                  </span>
                </div>
                <h3 className={`text-sm line-clamp-1 mb-2 ${selectedTicket?.id === ticket.id ? 'text-blue-800' : 'text-zinc-600'}`}>
                  {ticket.subject}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  {getStatusIcon(ticket.status)}
                  <span className="font-medium">{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Issue Inspector */}
        {selectedTicket ? (
          <div className="lg:w-2/3 w-full bg-white border border-zinc-200 rounded-xl shadow-sm flex flex-col min-h-0 overflow-hidden">
            
            {/* Inspector Header */}
            <div className="p-6 border-b border-zinc-200 bg-white flex-shrink-0 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold text-zinc-900">{selectedTicket.id}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSeverityStyle(selectedTicket.severity)}`}>
                    {selectedTicket.severity}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 flex items-center gap-1.5 border border-zinc-200">
                    {getStatusIcon(selectedTicket.status)} {selectedTicket.status}
                  </span>
                </div>
                <h3 className="text-base text-zinc-600">{selectedTicket.subject}</h3>
              </div>

              {/* Linked Order Info */}
              <div className="text-right">
                <p className="text-xs text-zinc-500 font-medium mb-1">Customer & Order</p>
                <p className="text-sm font-medium text-zinc-900">
                  {selectedTicket.customer}
                </p>
                <Link href="/admin/orders" className="text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline flex items-center gap-1 justify-end mt-0.5 transition-colors">
                  {selectedTicket.orderId} <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* Conversation History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-50/50">
              {selectedTicket.history.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'customer' ? 'items-start' : 'items-end'}`}>
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    <span className="text-xs font-medium text-zinc-500">{msg.sender}</span>
                    <span className="text-xs text-zinc-400">{msg.timestamp}</span>
                  </div>
                  <div className={`p-4 max-w-[80%] shadow-sm ${
                    msg.role === 'customer' 
                      ? 'bg-white border border-zinc-200 text-zinc-900 rounded-2xl rounded-tl-sm' 
                      : msg.role === 'system'
                        ? 'bg-zinc-100 text-zinc-500 text-sm italic rounded-xl border border-zinc-200/50'
                        : 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'
                  }`}>
                    <p className={`text-sm ${msg.role === 'system' ? 'text-xs text-center' : ''}`}>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply & Quick Actions */}
            <div className="p-6 border-t border-zinc-200 bg-white flex-shrink-0">
              <div className="flex gap-3 mb-4">
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply to the customer..."
                  className="flex-1 h-20 p-3 rounded-lg border border-zinc-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-zinc-400 resize-none transition-shadow"
                ></textarea>
                <button className="h-20 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex flex-col items-center justify-center gap-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm">
                  <Send size={18} />
                  <span className="text-sm font-medium">Send</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-white border border-zinc-300 text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    <AlertCircle size={16} /> Refund & Close
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Escalate
                  </button>
                </div>
                <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-white border border-zinc-300 text-green-700 hover:bg-green-50 hover:border-green-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  <CheckCircle size={16} /> Mark Resolved
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:w-2/3 w-full bg-white border border-zinc-200 rounded-xl shadow-sm flex items-center justify-center flex-col text-center p-12">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={32} className="text-zinc-300" />
            </div>
            <h2 className="text-lg font-medium text-zinc-900 mb-1">Select a Ticket</h2>
            <p className="text-sm text-zinc-500">Choose a conversation from the inbox to begin</p>
          </div>
        )}

      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { CreditCard, Calendar, IndianRupee, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import api from '../utils/axios';

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api.get('/payment/history')
      .then(res => {
        setTransactions(res.data.payments || []);
      })
      .catch(() => {
        setError('Failed to load transactions.');
      })
      .finally(() => setLoading(false));
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle className="w-4 h-4" />;
      case 'FAILED':
        return <XCircle className="w-4 h-4" />;
      case 'PENDING':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'FAILED':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
        <div className="max-w-6xl mx-auto p-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-slate-200 rounded-lg mb-6 max-w-xs"></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-slate-100 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800">
              Payment History
            </h1>
          </div>
          <p className="text-slate-600">Track all your payment transactions</p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 overflow-hidden">
          {error ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Something went wrong</h3>
              <p className="text-red-600">{error}</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-full mb-3">
                <CreditCard className="w-6 h-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No transactions found</h3>
              <p className="text-slate-600">Your payment history will appear here</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order Details</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Payment Mode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx, index) => (
                      <tr 
                        key={tx.orderId}
                        className="hover:bg-blue-50/50 transition-colors duration-200 animate-fadeInUp"
                        style={{animationDelay: `${index * 100}ms`}}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <CreditCard className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium text-slate-800">{tx.orderId}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            <span className="text-lg font-semibold text-slate-800">₹{tx.orderAmount?.toLocaleString('en-IN')}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(tx.status)}`}>
                            {getStatusIcon(tx.status)}
                            {tx.status}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{tx.createdAt ? new Date(tx.createdAt).toLocaleString() : '-'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm">
                            {tx.paymentMode || '-'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-3 p-4">
                {transactions.map((tx, index) => (
                  <div 
                    key={tx.orderId}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 animate-fadeInUp"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{tx.orderId}</h3>
                          <p className="text-sm text-slate-500">{tx.createdAt ? new Date(tx.createdAt).toLocaleDateString() : '-'}</p>
                        </div>
                      </div>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tx.status)}`}>
                        {getStatusIcon(tx.status)}
                        {tx.status}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="text-lg font-semibold text-slate-800">₹{tx.orderAmount?.toLocaleString('en-IN')}</span>
                      </div>
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm">
                        {tx.paymentMode || '-'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary Cards */}
        {!error && transactions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Successful Payments</p>
                  <p className="text-2xl font-bold">{transactions.filter(t => t.status === 'PAID').length}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Failed Payments</p>
                  <p className="text-2xl font-bold">{transactions.filter(t => t.status === 'FAILED').length}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Paid Amount</p>
                  <p className="text-2xl font-bold">₹{transactions.filter(t => t.status === 'PAID').reduce((sum, t) => sum + (t.orderAmount || 0), 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentHistory;
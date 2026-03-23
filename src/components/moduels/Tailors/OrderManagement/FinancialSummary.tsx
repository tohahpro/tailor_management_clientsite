

import { BanknoteIcon } from 'lucide-react'
import { IOrder } from '../../../../../types/order.interface'

interface FinancialSummaryProps {
  order: IOrder
}

export function FinancialSummary({ order }: FinancialSummaryProps) {
  const progressPercentage = Math.min(
    100,
    Math.max(0, (order.paidAmount / order.totalAmount) * 100),
  )
  const isFullyPaid = order.dueAmount <= 0


  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-emerald-500" 
    if (percentage >= 70) return "bg-blue-500"    
    if (percentage >= 40) return "bg-yellow-500"   
    return "bg-red-500"                           
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
            <BanknoteIcon className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">
            Financial Summary
          </h2>
        </div>
        {isFullyPaid && (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            FULLY PAID
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
          <p className="text-sm font-medium text-stone-500 mb-1">
            Total Amount
          </p>
          <p className="text-2xl font-bold text-stone-900">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <p className="text-sm font-medium text-emerald-700 mb-1">
            Paid Amount
          </p>
          <p className="text-2xl font-bold text-emerald-700">
            ${order.paidAmount.toFixed(2)}
          </p>
        </div>
        <div
          className={`p-4 rounded-xl border ${isFullyPaid ? 'bg-stone-50 border-stone-100' : 'bg-orange-50 border-orange-100'}`}
        >
          <p
            className={`text-sm font-medium mb-1 ${isFullyPaid ? 'text-stone-500' : 'text-orange-700'}`}
          >
            Due Amount
          </p>
          <p
            className={`text-2xl font-bold ${isFullyPaid ? 'text-stone-900' : 'text-orange-700'}`}
          >
            ${order.dueAmount.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm font-medium mb-2">
          <span className="text-stone-500">Payment Progress</span>
          <span className="text-stone-900">
            {progressPercentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out ${getProgressColor(progressPercentage)}`}
            style={{
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

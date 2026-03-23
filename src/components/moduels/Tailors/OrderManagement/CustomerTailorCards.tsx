
import { UserIcon, PhoneIcon } from 'lucide-react'
import { IOrder } from '../../../../../types/order.interface'


interface CustomerTailorCardsProps {
  order: IOrder
}

export function CustomerTailorCards({ order }: CustomerTailorCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Customer Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110 duration-500"></div>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-stone-100 text-stone-700 rounded-lg">
            <UserIcon className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-900">Customer Details</h2>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-stone-500 mb-1">Full Name</p>
            <p className="text-stone-900 font-semibold text-lg">
              {order.customerName}
            </p>
          </div>

          <div className="flex items-center gap-3 text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-100">
            <PhoneIcon className="w-4 h-4 text-stone-400" />
            <span className="font-medium">{order.phoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

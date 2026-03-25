
import {
  CalendarIcon,
  ClockIcon,
  ScissorsIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react'
import { IOrder } from '../../../../../../types/order.interface'
import OrderStatusBadgeDropdown from '../OrderStatus'

interface OrderHeaderProps {
  order: IOrder
}


export function OrderHeader({ order }: OrderHeaderProps) {
  const createdDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const deliveryDate = new Date(order.deliveryDate).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  )
  // Calculate days until delivery
  const today = new Date()
  const delivery = new Date(order.deliveryDate)
  const diffTime = delivery.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return (

    <>
      <div className='md:flex flex-wrap gap-5 mb-5'>
        <div className="bg-white flex-1 rounded-2xl border border-stone-200 shadow-sm p-6 overflow-hidden group">

          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50 text-amber-700">
              {/* <HashIcon className="w-5 h-5" /> */}
              <ScissorsIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900">
              Order #{order.orderNumber.toString().padStart(3, '0')}
            </h1>

            <OrderStatusBadgeDropdown orderId={order.id} currentStatus={order.status} />
          </div>


          <div className="flex flex-col  items-start gap-4 sm:gap-8 text-sm">
            <div className="flex items-start gap-3">
              <CalendarIcon className="w-5 h-5 text-stone-400 mt-0.5" />
              <div>
                <p className="text-stone-500 font-medium mb-0.5">Order Date</p>
                <p className="text-stone-900">{createdDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${diffDays <= 3 ? 'text-orange-500' : 'text-stone-400'}`}              >
                <ClockIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-stone-500 font-medium mb-0.5">Delivery Date</p>
                <p className="text-stone-900 font-medium">{deliveryDate}</p>
                {diffDays > 0 && (
                  <p className={`text-xs mt-1 font-medium ${diffDays <= 3 ? 'text-orange-600' : 'text-amber-600'}`}                  >
                    Due in {diffDays} day{diffDays !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white flex-1 rounded-2xl border border-stone-200 shadow-sm p-6 relative overflow-hidden group mt-5 md:mt-0">
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

    </>

  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */


import { ShirtIcon, RulerIcon, StickyNoteIcon, PackageIcon } from 'lucide-react'
import { IOrderItem } from '../../../../../types/order.interface'
import Image from 'next/image'

interface OrderItemCardProps {
    item: IOrderItem
    index: number
}

export function OrderItemCard({ item, index }: OrderItemCardProps) {


    return (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-6">
            {/* Header */}
            <div className="bg-stone-50 border-b border-stone-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white shadow-sm text-amber-700 rounded-lg border border-stone-200">
                        {
                            item.clothCategory.image
                                ?
                                <>
                                    <Image className='rounded-md' src={item.clothCategory.image} width={50} height={50} alt={item.clothCategory.name} />
                                </>
                                :
                                <ShirtIcon className="w-5 h-5" />
                        }
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                            Item #{index + 1}: {item.clothCategory.name}
                        </h3>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-stone-200 shadow-sm">
                    <PackageIcon className="w-4 h-4 text-stone-400" />
                    <span className="font-semibold text-stone-700">
                        Qty: {item.quantity}
                    </span>
                </div>
            </div>

            <div className="p-6">
                {/* Measurements Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <RulerIcon className="w-5 h-5 text-stone-400" />
                        <h4 className="font-bold text-stone-900">Measurements</h4>
                    </div>

                    {item ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {item?.measurements?.map((m: any) => (
                                <div
                                    key={m.id}
                                    className="bg-stone-50 rounded-xl p-4 border border-stone-100 flex flex-col items-center justify-center text-center group hover:border-amber-200 hover:bg-amber-50/50 transition-colors"
                                >
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 group-hover:text-amber-600 transition-colors">
                                        {m.measurement.name}
                                    </span>
                                    <span className="text-xl font-bold text-stone-900">
                                        {m.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-stone-500 italic text-sm">
                            No measurements recorded.
                        </p>
                    )}
                </div>

                {/* Notes Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <StickyNoteIcon className="w-5 h-5 text-stone-400" />
                        <h4 className="font-bold text-stone-900">Tailor Notes</h4>
                    </div>

                    {item?.notes.length > 0 ? (
                        <div className="space-y-3">
                            {item?.notes?.map((note: any) => (
                                <div
                                    key={note.id}
                                    className="bg-amber-50/50 rounded-xl p-4 border border-amber-100 text-stone-700 text-sm leading-relaxed relative"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-300 rounded-l-xl"></div>
                                    {note.content}
                                </div>
                            ))}
                        </div>
                    ) : (

                        <div
                            className="bg-amber-50/50 italic rounded-xl p-4 border border-amber-100 text-stone-700 text-sm leading-relaxed relative"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-300 rounded-l-xl"></div>
                            No notes added.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

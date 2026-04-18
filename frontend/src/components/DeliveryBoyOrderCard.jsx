import React from 'react'
import { MdPhone } from 'react-icons/md'

function DeliveryBoyOrderCard({ data }) {
    return (
        <div className='bg-white rounded-lg shadow p-4 space-y-4'>
            <div>
                <h2 className='text-lg font-semibold text-gray-800'>{data.user?.fullName}</h2>
                <p className='text-sm text-gray-500'>{data.user?.email}</p>
                <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'><MdPhone /><span>{data.user?.mobile}</span></p>
            </div>

            <div className='text-sm text-gray-600'>
                <p>{data.deliveryAddress?.text}</p>
            </div>

            <div className='flex space-x-4 overflow-x-auto pb-2'>
                {data.shopOrders?.shopOrderItems?.map((item, index) => (
                    <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
                        {item.item?.image && <img src={item.item.image} alt="" className='w-full h-24 object-cover rounded' />}
                        <p className='text-sm font-semibold mt-1'>{item.name}</p>
                        <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}</p>
                    </div>
                ))}
            </div>

            <div className='flex justify-between items-center pt-3 border-t border-gray-100'>
                <span className='text-sm'>Status: <span className='font-semibold capitalize text-[#ff4d2d]'>{data.shopOrders?.status}</span></span>
                <span className='text-sm font-bold text-gray-800'>Order: ₹{data.shopOrders?.subtotal}</span>
            </div>
            <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
                <span className='text-sm text-gray-500'>Your Earning</span>
                <span className='text-sm font-bold text-green-600'>₹50{data.tip>0?` + ₹${data.tip} tip`:""}</span>
            </div>
        </div>
    )
}

export default DeliveryBoyOrderCard

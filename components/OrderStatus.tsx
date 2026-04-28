'use client';

import { Check } from 'lucide-react';

interface OrderStatusProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export function OrderStatus({ status, createdAt }: OrderStatusProps) {
  const steps = [
    { id: 'pending', label: 'Order Placed', icon: '📦' },
    { id: 'processing', label: 'Processing', icon: '⚙️' },
    { id: 'shipped', label: 'Shipped', icon: '🚚' },
    { id: 'delivered', label: 'Delivered', icon: '✅' },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === status);
  const isCancelled = status === 'cancelled';

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-700 font-semibold">Order Cancelled</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-2 ${
                  index <= currentStepIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {index < currentStepIndex ? '✓' : step.icon}
              </div>
              <p
                className={`text-xs font-medium text-center ${
                  index <= currentStepIndex ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 w-full mt-3 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>Ordered on {new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

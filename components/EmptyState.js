'use client';

import Lottie from 'lottie-react';
import emptyAnimation from './empty.json';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <Lottie
        animationData={emptyAnimation}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
      <p className="text-gray-500 mt-4">No tasks yet, add one to get started!</p>
    </div>
  );
}

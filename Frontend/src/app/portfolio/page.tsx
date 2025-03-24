'use client';
 import { Suspense } from 'react';
import PortfolioContent from './PortfolioContent';

export default function Portfolio() {

    return (
        <Suspense fallback={<div>Loading portfolio...</div>}>
          <PortfolioContent />
        </Suspense>
      );
};
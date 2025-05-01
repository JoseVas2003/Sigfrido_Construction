'use client';
 import { Suspense } from 'react';
import PortfolioContent from './PortfolioContent';
import Footer from '../footer/footer';

export default function Portfolio() {

    return (
        <Suspense fallback={<div>Loading portfolio...</div>}>
          <PortfolioContent />
          <Footer></Footer>
        </Suspense>
      );
};
import { Suspense } from 'react';
import LeaveReviewClient from './LeaveReviewClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Chargement...</div>}>
      <LeaveReviewClient />
    </Suspense>
  );
}

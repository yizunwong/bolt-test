import { notFound } from 'next/navigation';
import { offers } from '@/lib/data/offers';
import AnalyticsClient from './AnalyticsClient';
import type { Offer } from '@/lib/data/offers';

interface Params {
  offerId: string;
}

export function generateStaticParams() {
  return offers.map((o) => ({ offerId: o.id }));
}

export default function AnalyticsPage({ params }: { params: Params }) {
  const offer: Offer | undefined = offers.find((o) => o.id === params.offerId);
  if (!offer) return notFound();
  return <AnalyticsClient offer={offer} />;
}

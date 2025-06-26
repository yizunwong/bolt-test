'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { offers } from '@/lib/data/offers';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  Download,
  TrendingUp,
  DollarSign,
  Gift,
  Percent
} from 'lucide-react';
import { useState } from 'react';

export default function OfferAnalyticsPage() {
  const params = useParams();
  const offerId = params.offerId as string;
  const offer = offers.find((o) => o.id === offerId);

  const [startDate, setStartDate] = useState('2025-01-15');
  const [endDate, setEndDate] = useState('2025-07-15');

  if (!offer) {
    return <div className="p-8">Offer not found</div>;
  }

  const revenueValue = parseFloat(offer.revenue);
  const avgTxValue = offer.redemptions
    ? `${(revenueValue / offer.redemptions).toFixed(2)} ETH`
    : '0 ETH';
  const maxCap = parseFloat(offer.maxDiscount || '4.5');
  const utilized =
    offer.discountType === 'fixed'
      ? offer.discountValue * offer.redemptions
      : 0.2 * offer.redemptions;
  const utilizationPercent = Math.min((utilized / maxCap) * 100, 100);
  const weekTrend = '+2.1%';
  const historicalAvg = 5;
  const redemptionTrend = [1, 2, 0, 3, 1, 2, 1];
  const revenueTrend = [0, 0.5, 0.8, 1.1, 1.4, 2, 3];
  const heatMapValues = [0.1, 0.3, 0.2, 0.4, 0.6, 0.5, 0.3];

  return (
    <div className="section-spacing">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <Link href="/admin/offers" className="text-sm hover:underline">
            Back to Offers
          </Link>
        </div>

        <div className="page-header">
          <div className="page-header-content">
            <div className="page-header-icon">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="page-header-title">{offer.title} Analytics</h1>
              <p className="page-header-subtitle">
                Performance metrics and insights
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-auto"
          />
          <span className="text-slate-600 dark:text-slate-400">to</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-auto"
          />
          <Button
            size="sm"
            className="ml-auto gradient-accent text-white floating-button"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="stats-grid">
          <StatsCard
            title="Conversion Rate"
            value={offer.conversionRate}
            change={weekTrend}
            changeType="positive"
            icon={TrendingUp}
          />
          <StatsCard
            title="Revenue"
            value={offer.revenue}
            change="monthly"
            icon={DollarSign}
          />
          <StatsCard
            title="Redemptions"
            value={`${offer.redemptions}`}
            change={`avg ${historicalAvg}`}
            icon={Gift}
          />
          <StatsCard title="Avg Tx Value" value={avgTxValue} icon={DollarSign} />
        </div>

        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle>Discount Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={utilizationPercent} className="h-4" />
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {utilized.toFixed(2)} ETH used of {maxCap} ETH max
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle>Revenue &amp; Redemptions Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <svg viewBox="0 0 120 60" className="w-full h-32 text-emerald-500">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                points={revenueTrend
                  .map((v, i) => `${i * 20},${60 - v * 10}`)
                  .join(' ')}
              />
            </svg>
            <svg viewBox="0 0 120 60" className="w-full h-32 mt-4 text-blue-500">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                points={redemptionTrend
                  .map((v, i) => `${i * 20},${60 - v * 10}`)
                  .join(' ')}
              />
            </svg>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle>Conversion Rate Heat Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {heatMapValues.map((v, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-sm"
                  style={{ backgroundColor: `rgba(16,185,129,${v})` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle>Actionable Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <ul className="list-disc pl-5 space-y-1">
              <li>Redemption activity peaks in early summer.</li>
              <li>Increase marketing before high-growth weeks.</li>
              <li>Discount utilization below cap; promote further.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

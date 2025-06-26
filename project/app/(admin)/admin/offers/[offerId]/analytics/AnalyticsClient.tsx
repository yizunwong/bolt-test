'use client';

import Link from 'next/link';
import type { Offer } from '@/lib/data/offers';
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

interface Props {
  offer: Offer;
}

export default function OfferAnalyticsClient({ offer }: Props) {

  const [startDate, setStartDate] = useState('2025-01-15');
  const [endDate, setEndDate] = useState('2025-07-15');


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
  const months = [1, 2, 3, 4, 5, 6, 7];
  const heatMapValues = [
    [0.1, 0.3, 0.2, 0.4, 0.6, 0.5, 0.3],
    [0.2, 0.1, 0.4, 0.5, 0.3, 0.6, 0.4],
    [0.3, 0.2, 0.5, 0.6, 0.4, 0.3, 0.5]
  ];

  const heatColor = (v: number) => {
    const hue = 240 - v * 240; // blue (low) to red (high)
    return `hsl(${hue}, 70%, 50%)`;
  };

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
            <svg viewBox="0 0 160 90" className="w-full h-44">
              <line x1="40" y1="10" x2="40" y2="70" className="stroke-slate-300 dark:stroke-slate-700" />
              <line x1="40" y1="70" x2="150" y2="70" className="stroke-slate-300 dark:stroke-slate-700" />
              <polyline
                fill="none"
                stroke="rgb(16,185,129)"
                strokeWidth="2"
                points={revenueTrend
                  .map((v, i) => `${40 + i * 15},${70 - v * 15}`)
                  .join(' ')}
              />
              <polyline
                fill="none"
                stroke="rgb(59,130,246)"
                strokeWidth="2"
                points={redemptionTrend
                  .map((v, i) => `${40 + i * 15},${70 - v * 15}`)
                  .join(' ')}
              />
              {months.map((m, i) => (
                <text
                  key={m}
                  x={40 + i * 15}
                  y="82"
                  className="text-[10px] fill-slate-600 dark:fill-slate-400"
                  textAnchor="middle"
                >
                  {m}
                </text>
              ))}
              {[0, 1, 2, 3].map((a) => (
                <text
                  key={a}
                  x="32"
                  y={70 - a * 15 + 4}
                  className="text-[10px] fill-slate-600 dark:fill-slate-400"
                  textAnchor="end"
                >
                  {`${a} ETH`}
                </text>
              ))}
              <text x="95" y="88" className="text-[10px] fill-slate-600 dark:fill-slate-400" textAnchor="middle">Month</text>
              <text
                x="12"
                y="40"
                className="text-[10px] fill-slate-600 dark:fill-slate-400"
                textAnchor="middle"
                transform="rotate(-90 12 40)"
              >
                Amount (ETH)
              </text>
            </svg>
            <div className="flex justify-end gap-4 text-xs mt-2">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-emerald-500 rounded-sm" /> Revenue
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 bg-blue-500 rounded-sm" /> Redemptions
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle>Conversion Rate Heat Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="border-collapse">
                <thead>
                  <tr>
                    <th className="w-8 text-[10px]" />
                    {months.map((m) => (
                      <th key={m} className="w-8 text-center text-[10px] text-slate-600 dark:text-slate-400">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatMapValues.map((row, r) => (
                    <tr key={r}>
                      <th className="text-right pr-1 text-[10px] text-slate-600 dark:text-slate-400">S{r + 1}</th>
                      {row.map((v, i) => (
                        <td key={i} className="relative group">
                          <div
                            className="w-8 h-8 flex items-center justify-center rounded-sm text-[10px] text-white"
                            style={{ backgroundColor: heatColor(v) }}
                            title={`${(v * 100).toFixed(1)}% conversion`}
                          >
                            {(v * 100).toFixed(0)}%
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center mt-2 gap-2 text-[10px]">
                <span>0%</span>
                <div className="flex-1 h-2 bg-gradient-to-r from-blue-500 via-emerald-500 to-red-500 rounded" />
                <span>100%</span>
              </div>
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

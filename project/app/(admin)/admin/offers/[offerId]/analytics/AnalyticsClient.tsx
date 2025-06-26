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
  Gift
} from 'lucide-react';
import { useState } from 'react';
import { LineChart, ChartsTooltip, ChartsLegend } from '@mui/x-charts';

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

  function heatColor(value: number) {
    const hue = (1 - value) * 240; // blue (240) to red (0)
    return `hsl(${hue}, 80%, 55%)`;
  }


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
            <LineChart
              height={250}
              series={[
                {
                  data: revenueTrend,
                  label: 'Revenue',
                  color: '#10B981'
                },
                {
                  data: redemptionTrend,
                  label: 'Redemptions',
                  color: '#3B82F6'
                }
              ]}
              xAxis={[{ data: months, scaleType: 'point', label: 'Month' }]}
              yAxis={[{ label: 'Amount (ETH)', valueFormatter: (v) => `${v} ETH` }]}
            >
              <ChartsLegend position={{ vertical: 'bottom', horizontal: 'middle' }} />
              <ChartsTooltip />
            </LineChart>
          </CardContent>
        </Card>

        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle>Conversion Rate Heat Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-sm">
                <thead>
                  <tr>
                    <th className="p-1 text-left">Segment</th>
                    {months.map((m) => (
                      <th key={m} className="p-1">
                        {m}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatMapValues.map((row, r) => (
                    <tr key={r} className="border-t border-slate-200 dark:border-slate-700">
                      <th className="p-1 text-left">S{r + 1}</th>
                      {row.map((v, i) => (
                        <td
                          key={i}
                          className="p-1"
                          style={{ backgroundColor: heatColor(v) }}
                          title={`${(v * 100).toFixed(1)}%`}
                        >
                          {(v * 100).toFixed(0)}%
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs">0%</span>
                <div className="flex-1 h-2 rounded bg-gradient-to-r from-blue-500 via-yellow-300 to-red-500" />
                <span className="text-xs">100%</span>
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

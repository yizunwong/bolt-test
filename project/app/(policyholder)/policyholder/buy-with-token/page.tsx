'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';
import { walletBalance } from '@/public/data/policyholder/walletData';
import { logEvent } from '@/lib/analytics';

export default function BuyWithToken() {
  const policyCost = 0.8; // ETH
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleApprove = async () => {
    logEvent('approve_token_start');
    setLoading(true);
    setError(null);
    setTimeout(() => {
      if (parseFloat(walletBalance.eth) < policyCost) {
        setError('Insufficient token balance');
        logEvent('approve_token_failed', 'balance');
      } else {
        setStep(2);
        logEvent('approve_token_success');
      }
      setLoading(false);
    }, 1000);
  };

  const handlePurchase = async () => {
    logEvent('purchase_start');
    setLoading(true);
    setError(null);
    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (success) {
        setTxHash('0xabc123');
        setStep(3);
        logEvent('purchase_success');
      } else {
        setError('Transaction failed due to network issue');
        logEvent('purchase_failed');
      }
      setLoading(false);
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">Balance: {walletBalance.eth} ETH</p>
            <p className="text-slate-700 dark:text-slate-300">Policy cost: {policyCost} ETH</p>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button onClick={handleApprove} disabled={loading} className="gradient-accent text-white w-full">
              {loading ? 'Approving...' : 'Approve Tokens'}
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">Tokens approved.</p>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button onClick={handlePurchase} disabled={loading} className="gradient-accent text-white w-full">
              {loading ? 'Purchasing...' : 'Confirm Purchase'}
            </Button>
          </div>
        );
      case 3:
        return txHash ? (
          <div className="text-center space-y-2">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <p className="font-semibold text-slate-700 dark:text-slate-300">Purchase successful!</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Tx Hash: {txHash}</p>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <XCircle className="w-12 h-12 text-red-600 mx-auto" />
            <p className="font-semibold text-red-600">Transaction failed</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="section-spacing">
      <div className="max-w-md mx-auto">
        <Card className="glass-card rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Buy With Token</CardTitle>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  );
}

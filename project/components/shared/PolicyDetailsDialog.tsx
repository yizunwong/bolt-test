'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface Policy {
  id: string | number;
  name: string;
  category?: string;
  provider?: string;
  coverage?: string | number;
  premium?: string | number;
  sales?: number | string;
  revenue?: string | number;
  created?: Date | string;
  lastUpdated?: Date | string;
  description?: string;
  features?: string[];
  terms?: string;
  status?: 'active' | 'inactive' | string;
}

export interface PolicyDetailsDialogProps {
  policy: Policy;
  open: boolean;
  onClose: () => void;
}

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const numberFormatter = new Intl.NumberFormat('en-US');

function formatValue(value?: string | number, opts?: { currency?: boolean }) {
  if (value === undefined || value === null) return '-';
  if (typeof value === 'number') {
    return opts?.currency ? currency.format(value) : numberFormatter.format(value);
  }
  return value;
}

function formatDate(value?: Date | string) {
  if (!value) return '';
  const date = typeof value === 'string' ? new Date(value) : value;
  return format(date, 'PPP');
}

export default function PolicyDetailsDialog({ policy, open, onClose }: PolicyDetailsDialogProps) {
  const statusClass = policy.status === 'active' ? 'status-active' : 'status-warning';

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center space-x-2 overflow-hidden">
            <DialogTitle className="text-lg font-semibold truncate">
              {policy.name}
            </DialogTitle>
            {policy.status && (
              <Badge className={cn('status-badge', statusClass)}>{
                policy.status.charAt(0).toUpperCase() + policy.status.slice(1)
              }</Badge>
            )}
          </div>
          <button
            onClick={onClose}
            className="ml-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">Basic Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Policy ID</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">{policy.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Category</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">
                  {policy.category || '-'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Provider</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">
                  {policy.provider || '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">Financial Details</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Coverage</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">
                  {formatValue(policy.coverage, { currency: typeof policy.coverage === 'number' })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Premium</p>
                <p className="text-emerald-600 dark:text-emerald-400 truncate">
                  {formatValue(policy.premium, { currency: typeof policy.premium === 'number' })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Sales</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">
                  {formatValue(policy.sales)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Revenue</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">
                  {formatValue(policy.revenue, { currency: typeof policy.revenue === 'number' })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100">Dates</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Created</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">
                  {formatDate(policy.created)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-600 dark:text-slate-400">Last Updated</p>
                <p className="text-slate-800 dark:text-slate-100 truncate">
                  {formatDate(policy.lastUpdated)}
                </p>
              </div>
            </div>
          </div>

          {policy.description && (
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Description</h4>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {policy.description}
              </p>
            </div>
          )}

          {policy.features && policy.features.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Features</h4>
              <div className="flex flex-wrap gap-1">
                {policy.features.map((feature, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-xs bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {policy.terms && (
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-800 dark:text-slate-100">Terms</h4>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {policy.terms}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}


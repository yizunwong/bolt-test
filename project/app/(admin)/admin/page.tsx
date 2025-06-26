'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/shared/StatsCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { 
  Shield, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  DollarSign,
  FileText,
  Eye,
  X
} from 'lucide-react';

export default function AdminDashboard() {
  const recentClaims = [
    { id: 'CL-001', type: 'Health', amount: '$5,200', status: 'pending', submittedBy: 'John Doe', date: '2 hours ago' },
    { id: 'CL-002', type: 'Travel', amount: '$1,800', status: 'approved', submittedBy: 'Jane Smith', date: '4 hours ago' },
    { id: 'CL-003', type: 'Crop', amount: '$25,000', status: 'review', submittedBy: 'Farm Corp', date: '1 day ago' },
    { id: 'CL-004', type: 'Health', amount: '$3,100', status: 'pending', submittedBy: 'Mike Johnson', date: '2 days ago' }
  ];

  const topPolicies = [
    { name: 'Comprehensive Health Coverage', sales: 245, revenue: '196 ETH', trend: '+12%' },
    { name: 'Global Travel Protection', sales: 189, revenue: '37.8 ETH', trend: '+8%' },
    { name: 'Weather-Based Crop Insurance', sales: 156, revenue: '390 ETH', trend: '+15%' },
    { name: 'Premium Health Plus', sales: 98, revenue: '147 ETH', trend: '+5%' }
  ];

  const [selectedClaim, setSelectedClaim] = useState<any>(null);
  const adjusters = ['Alice Brown', 'David Lee', 'Monica Garcia'];
  const [reviewForm, setReviewForm] = useState({
    status: '',
    notes: '',
    adjuster: '',
    reason: '',
    payment: '',
  });
  const [errors, setErrors] = useState({
    status: '',
    notes: '',
    adjuster: '',
    reason: '',
    payment: '',
  });

  const handleApprove = (claimId: string) => {
    setReviewForm({ ...reviewForm, status: 'approved' });
    if (!validateForm()) return;
    console.log('Approving claim:', claimId, reviewForm);
    setSelectedClaim(null);
  };

  const handleReject = (claimId: string) => {
    setReviewForm({ ...reviewForm, status: 'rejected' });
    if (!validateForm()) return;
    console.log('Rejecting claim:', claimId, reviewForm);
    setSelectedClaim(null);
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!reviewForm.status) newErrors.status = 'Status is required';
    if (!reviewForm.adjuster) newErrors.adjuster = 'Select an adjuster';
    if (!reviewForm.notes) newErrors.notes = 'Assessment notes are required';
    if (
      (reviewForm.status === 'rejected' || reviewForm.status === 'under-review') &&
      !reviewForm.reason
    ) {
      newErrors.reason = 'Please provide a reason';
    }
    if (reviewForm.status === 'approved') {
      if (!reviewForm.payment) {
        newErrors.payment = 'Payment amount is required';
      } else if (isNaN(Number(reviewForm.payment))) {
        newErrors.payment = 'Invalid amount';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => {
    if (!validateForm()) return;
    console.log('Saving claim:', selectedClaim.id, reviewForm);
    setSelectedClaim(null);
  };

  const handleRequestInfo = () => {
    setReviewForm({ ...reviewForm, status: 'under-review' });
    if (!validateForm()) return;
    console.log('Requesting additional info for', selectedClaim.id);
    setSelectedClaim(null);
  };

  return (
    <div className="section-spacing">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-content">
            <div className="page-header-icon">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="page-header-title">Insurance Admin Dashboard</h1>
              <p className="page-header-subtitle">Monitor policies, review claims, and manage operations</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <StatsCard
            title="Active Policies"
            value="1,247"
            change="+8.2% from last month"
            changeType="positive"
            icon={Shield}
          />
          <StatsCard
            title="Pending Claims"
            value="23"
            change="3 urgent reviews"
            changeType="neutral"
            icon={AlertCircle}
          />
          <StatsCard
            title="Total Revenue"
            value="2,450 ETH"
            change="+15.3% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatsCard
            title="Active Users"
            value="3,891"
            change="+12.1% from last month"
            changeType="positive"
            icon={Users}
          />
        </div>

        <div className="content-grid">
          {/* Recent Claims */}
          <div className="content-main">
            <Card className="glass-card rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="heading-secondary">Recent Claims</CardTitle>
                <Button variant="outline" className="floating-button">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="element-spacing">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 dark:bg-slate-700/30 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-100">{claim.id}</h3>
                            <Badge variant="secondary" className="bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300">{claim.type}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{claim.submittedBy} • {claim.date}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-100">{claim.amount}</p>
                          <Badge className={`status-badge ${
                            claim.status === 'approved' ? 'status-active' :
                            claim.status === 'pending' ? 'status-pending' :
                            'status-info'
                          }`}>
                            {claim.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {claim.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                            {claim.status === 'review' && <Eye className="w-3 h-3 mr-1" />}
                            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                          </Badge>
                        </div>
                        <Dialog
                          open={selectedClaim?.id === claim.id}
                          onOpenChange={(open) => {
                            if (!open) setSelectedClaim(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="floating-button"
                              onClick={() => {
                                setSelectedClaim(claim);
                                setReviewForm({
                                  status: claim.status,
                                  notes: '',
                                  adjuster: '',
                                  reason: '',
                                  payment: '',
                                });
                                setErrors({ status: '', notes: '', adjuster: '', reason: '', payment: '' });
                              }}
                            >
                              Review
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Claim Review - {selectedClaim?.id}</DialogTitle>
                            </DialogHeader>
                            {selectedClaim && (
                              <div className="space-y-6">
                                {/* Claim Details */}
                                <div className="grid md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Claim Information</h4>
                                    <div className="element-spacing">
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Claim ID:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.id}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Submitted:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.date}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Type:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.type}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Category:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.category || '-'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Amount:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.amount}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Policyholder</h4>
                                    <div className="element-spacing">
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Name:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.submittedBy}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Policy #:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.policyNumber || 'N/A'}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-slate-600 dark:text-slate-400">Contact:</span>
                                        <span className="text-slate-800 dark:text-slate-100">{selectedClaim.contact || 'N/A'}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Incident Details */}
                                <div>
                                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Incident Details</h4>
                                  <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                    {selectedClaim.incidentDetails || 'No additional details'}
                                  </p>
                                </div>

                                {/* Documents */}
                                {selectedClaim.documents && (
                                  <div>
                                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Attachments</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                      {selectedClaim.documents.map((doc: string, index: number) => (
                                        <div key={index} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
                                          <div className="flex items-center space-x-2">
                                            <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">{doc}</span>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Review Form */}
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                                      <Select value={reviewForm.status} onValueChange={(value) => setReviewForm({ ...reviewForm, status: value })}>
                                        <SelectTrigger className="form-input">
                                          <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="under-review">Under Review</SelectItem>
                                          <SelectItem value="approved">Approved</SelectItem>
                                          <SelectItem value="rejected">Rejected</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Claims Adjuster</label>
                                      <Select value={reviewForm.adjuster} onValueChange={(value) => setReviewForm({ ...reviewForm, adjuster: value })}>
                                        <SelectTrigger className="form-input">
                                          <SelectValue placeholder="Assign adjuster" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {adjusters.map((adj) => (
                                            <SelectItem key={adj} value={adj}>{adj}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      {errors.adjuster && <p className="text-sm text-red-600 mt-1">{errors.adjuster}</p>}
                                    </div>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Assessment Notes</label>
                                    <Textarea
                                      value={reviewForm.notes}
                                      onChange={(e) => setReviewForm({ ...reviewForm, notes: e.target.value })}
                                      className="form-input min-h-[100px]"
                                      placeholder="Add notes..."
                                    />
                                    {errors.notes && <p className="text-sm text-red-600 mt-1">{errors.notes}</p>}
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Approval / Rejection Reason</label>
                                    <Textarea
                                      value={reviewForm.reason}
                                      onChange={(e) => setReviewForm({ ...reviewForm, reason: e.target.value })}
                                      className="form-input min-h-[80px]"
                                      placeholder="Reason" />
                                    {errors.reason && <p className="text-sm text-red-600 mt-1">{errors.reason}</p>}
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Approved Payment Amount</label>
                                    <Input
                                      type="number"
                                      value={reviewForm.payment}
                                      onChange={(e) => setReviewForm({ ...reviewForm, payment: e.target.value })}
                                      className="form-input"
                                      placeholder="0.00" />
                                    {errors.payment && <p className="text-sm text-red-600 mt-1">{errors.payment}</p>}
                                  </div>
                                </div>

                                <div className="responsive-stack pt-4 border-t border-slate-200 dark:border-slate-700">
                                  <Button variant="outline" onClick={() => setSelectedClaim(null)} className="flex-1">Cancel</Button>
                                  <Button variant="outline" onClick={handleRequestInfo} className="flex-1">Request Info</Button>
                                  <Button variant="outline" onClick={() => handleReject(selectedClaim.id)} className="flex-1 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20">
                                    <X className="w-4 h-4 mr-2" />
                                    Reject Claim
                                  </Button>
                                  <Button onClick={() => handleApprove(selectedClaim.id)} className="flex-1 gradient-accent text-white floating-button">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve Claim
                                  </Button>
                                  <Button onClick={handleSaveChanges} className="flex-1 gradient-accent text-white floating-button">
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Top Policies */}
          <div className="content-sidebar">
            {/* Quick Actions */}
            <Card className="glass-card rounded-2xl">
              <CardHeader>
                <CardTitle className="heading-tertiary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="element-spacing">
                <Button className="w-full justify-start gradient-accent text-white floating-button">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Claims
                </Button>
                <Button variant="outline" className="w-full justify-start floating-button">
                  <Shield className="w-4 h-4 mr-2" />
                  Create New Policy
                </Button>
                <Button variant="outline" className="w-full justify-start floating-button">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Top Policies */}
            <Card className="glass-card rounded-2xl">
              <CardHeader>
                <CardTitle className="heading-tertiary">Top Performing Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="element-spacing">
                  {topPolicies.map((policy, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{policy.name}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{policy.sales} sales • {policy.revenue}</p>
                      </div>
                      <div className="text-right ml-2">
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{policy.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/shared/Pagination';
import { Shield, Calendar, DollarSign, FileText, AlertCircle, CheckCircle, Clock, Download, Filter } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export default function MyCoverage() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const allPolicies = [
    {
      id: 'POL-001',
      name: 'Comprehensive Health Coverage',
      type: 'Health',
      provider: 'HealthSecure',
      coverage: '$100,000',
      premium: '0.8 ETH/month',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      nextPayment: '2025-02-15',
      utilizationRate: 35,
      claimsUsed: '$35,000',
      benefits: ['Emergency Care', 'Prescription Drugs', 'Mental Health', 'Dental Care', 'Vision Care'],
      recentClaims: [
        { date: '2024-12-10', amount: '$2,500', status: 'approved', description: 'Emergency Room Visit' },
        { date: '2024-11-22', amount: '$450', status: 'approved', description: 'Prescription Medication' }
      ]
    },
    {
      id: 'POL-002',
      name: 'Global Travel Protection',
      type: 'Travel',
      provider: 'TravelChain',
      coverage: '$50,000',
      premium: '0.2 ETH/trip',
      status: 'Active',
      startDate: '2024-12-01',
      endDate: '2025-06-01',
      nextPayment: 'Per Trip',
      utilizationRate: 0,
      claimsUsed: '$0',
      benefits: ['Trip Cancellation', 'Medical Emergency', 'Lost Luggage', '24/7 Support', 'Flight Delay'],
      recentClaims: []
    },
    {
      id: 'POL-003',
      name: 'Weather-Based Crop Insurance',
      type: 'Crop',
      provider: 'AgriBlock',
      coverage: '$200,000',
      premium: '2.5 ETH/season',
      status: 'Claimed',
      startDate: '2024-03-01',
      endDate: '2024-11-30',
      nextPayment: 'Season Ended',
      utilizationRate: 80,
      claimsUsed: '$160,000',
      benefits: ['Weather Oracle', 'Yield Protection', 'Automated Payouts', 'Satellite Monitoring'],
      recentClaims: [
        { date: '2024-08-15', amount: '$160,000', status: 'approved', description: 'Drought Damage Claim' }
      ]
    },
    {
      id: 'POL-004',
      name: 'Family Health Shield',
      type: 'Health',
      provider: 'FamilyCare',
      coverage: '$300,000',
      premium: '1.2 ETH/month',
      status: 'Active',
      startDate: '2024-06-01',
      endDate: '2025-06-01',
      nextPayment: '2025-01-01',
      utilizationRate: 15,
      claimsUsed: '$45,000',
      benefits: ['Family Coverage', 'Pediatric Care', 'Maternity Benefits', 'Preventive Care'],
      recentClaims: [
        { date: '2024-11-15', amount: '$1,200', status: 'approved', description: 'Pediatric Checkup' }
      ]
    },
    {
      id: 'POL-005',
      name: 'Digital Nomad Travel',
      type: 'Travel',
      provider: 'NomadProtect',
      coverage: '$60,000',
      premium: '0.25 ETH/month',
      status: 'Active',
      startDate: '2024-09-01',
      endDate: '2025-09-01',
      nextPayment: '2025-01-01',
      utilizationRate: 8,
      claimsUsed: '$4,800',
      benefits: ['Global Coverage', 'Work Equipment', 'Visa Assistance', 'Remote Work Support'],
      recentClaims: [
        { date: '2024-10-20', amount: '$800', status: 'approved', description: 'Equipment Replacement' }
      ]
    },
    {
      id: 'POL-006',
      name: 'Senior Health Care',
      type: 'Health',
      provider: 'ElderCare',
      coverage: '$200,000',
      premium: '1.0 ETH/month',
      status: 'Expired',
      startDate: '2023-07-01',
      endDate: '2024-07-01',
      nextPayment: 'Expired',
      utilizationRate: 65,
      claimsUsed: '$130,000',
      benefits: ['Senior Specialists', 'Long-term Care', 'Home Health', 'Prescription Coverage'],
      recentClaims: [
        { date: '2024-06-15', amount: '$5,200', status: 'approved', description: 'Specialist Treatment' }
      ]
    },
    {
      id: 'POL-007',
      name: 'Student Health Plan',
      type: 'Health',
      provider: 'StudentCare',
      coverage: '$75,000',
      premium: '0.4 ETH/month',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2025-08-01',
      nextPayment: '2025-01-01',
      utilizationRate: 12,
      claimsUsed: '$9,000',
      benefits: ['Campus Health', 'Mental Health', 'Sports Injuries', 'Prescription Drugs'],
      recentClaims: [
        { date: '2024-11-05', amount: '$350', status: 'approved', description: 'Campus Health Visit' }
      ]
    },
    {
      id: 'POL-008',
      name: 'Luxury Travel Protection',
      type: 'Travel',
      provider: 'LuxuryGuard',
      coverage: '$200,000',
      premium: '0.8 ETH/trip',
      status: 'Active',
      startDate: '2024-04-15',
      endDate: '2025-04-15',
      nextPayment: 'Per Trip',
      utilizationRate: 25,
      claimsUsed: '$50,000',
      benefits: ['Concierge Service', 'Private Medical', 'Luxury Transport', 'VIP Support'],
      recentClaims: [
        { date: '2024-09-10', amount: '$25,000', status: 'approved', description: 'Emergency Evacuation' }
      ]
    },
    {
      id: 'POL-009',
      name: 'Telehealth Plus',
      type: 'Health',
      provider: 'TeleHealth Pro',
      coverage: '$120,000',
      premium: '0.6 ETH/month',
      status: 'Suspended',
      startDate: '2024-10-01',
      endDate: '2025-10-01',
      nextPayment: 'Payment Overdue',
      utilizationRate: 5,
      claimsUsed: '$6,000',
      benefits: ['24/7 Telehealth', 'Remote Monitoring', 'Digital Prescriptions', 'AI Diagnostics'],
      recentClaims: [
        { date: '2024-11-20', amount: '$150', status: 'approved', description: 'Telehealth Consultation' }
      ]
    },
    {
      id: 'POL-010',
      name: 'Vertical Farm Coverage',
      type: 'Crop',
      provider: 'VerticalGrow',
      coverage: '$250,000',
      premium: '2.4 ETH/season',
      status: 'Active',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      nextPayment: '2025-02-01',
      utilizationRate: 0,
      claimsUsed: '$0',
      benefits: ['LED Systems', 'Hydroponic Equipment', 'Climate Control', 'Automation Coverage'],
      recentClaims: []
    },
    {
      id: 'POL-011',
      name: 'Adventure Travel Coverage',
      type: 'Travel',
      provider: 'AdventureSecure',
      coverage: '$75,000',
      premium: '0.3 ETH/trip',
      status: 'Active',
      startDate: '2024-05-01',
      endDate: '2025-05-01',
      nextPayment: 'Per Trip',
      utilizationRate: 40,
      claimsUsed: '$30,000',
      benefits: ['Extreme Sports', 'Mountain Rescue', 'Equipment Coverage', 'Emergency Evacuation'],
      recentClaims: [
        { date: '2024-08-22', amount: '$12,000', status: 'approved', description: 'Mountain Rescue' }
      ]
    },
    {
      id: 'POL-012',
      name: 'Livestock Protection Plan',
      type: 'Crop',
      provider: 'RanchGuard',
      coverage: '$500,000',
      premium: '3.0 ETH/season',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      nextPayment: '2025-01-01',
      utilizationRate: 18,
      claimsUsed: '$90,000',
      benefits: ['Disease Coverage', 'Theft Protection', 'Feed Cost Insurance', 'Veterinary Care'],
      recentClaims: [
        { date: '2024-09-30', amount: '$15,000', status: 'approved', description: 'Veterinary Treatment' }
      ]
    }
  ];

  const filteredPolicies = useMemo(() => {
    let filtered = allPolicies;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(policy => policy.status.toLowerCase() === filterStatus);
    }

    // Sort policies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'oldest':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'coverage-high':
          return parseFloat(b.coverage.replace(/[$,]/g, '')) - parseFloat(a.coverage.replace(/[$,]/g, ''));
        case 'coverage-low':
          return parseFloat(a.coverage.replace(/[$,]/g, '')) - parseFloat(b.coverage.replace(/[$,]/g, ''));
        case 'utilization':
          return b.utilizationRate - a.utilizationRate;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filterStatus, sortBy]);

  const totalPages = Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE);
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Claimed': return 'status-info';
      case 'Expired': return 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300';
      case 'Suspended': return 'status-error';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Health': return 'from-red-500 to-pink-500';
      case 'Travel': return 'from-blue-500 to-cyan-500';
      case 'Crop': return 'from-green-500 to-emerald-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
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
              <h1 className="page-header-title">My Coverage</h1>
              <p className="page-header-subtitle">Manage your active policies and track coverage details</p>
            </div>
          </div>
        </div>

        {/* Coverage Overview */}
        <div className="stats-grid">
          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-active">Active</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {allPolicies.filter(p => p.status === 'Active').length}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Active Policies</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-info">Coverage</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                $1.4M
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Total Coverage</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-warning">Claims</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {allPolicies.reduce((sum, p) => sum + p.recentClaims.length, 0)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Total Claims</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-active">Rate</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">98%</h3>
              <p className="text-slate-600 dark:text-slate-400">Approval Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Sort */}
        <Card className="glass-card rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Your Policies</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Showing {paginatedPolicies.length} of {filteredPolicies.length} policies
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select value={filterStatus} onValueChange={(value) => handleFilterChange(() => setFilterStatus(value))}>
                  <SelectTrigger className="w-32 form-input">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="claimed">Claimed</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value) => handleFilterChange(() => setSortBy(value))}>
                  <SelectTrigger className="w-40 form-input">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="coverage-high">Coverage: High to Low</SelectItem>
                    <SelectItem value="coverage-low">Coverage: Low to High</SelectItem>
                    <SelectItem value="utilization">Utilization Rate</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Policy Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {paginatedPolicies.map((policy) => (
            <Card key={policy.id} className="glass-card rounded-2xl card-hover">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getTypeColor(policy.type)} flex items-center justify-center`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-100">{policy.name}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{policy.provider} • {policy.id}</p>
                    </div>
                  </div>
                  <Badge className={`status-badge ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Coverage Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Coverage Amount</p>
                    <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{policy.coverage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Premium</p>
                    <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{policy.premium}</p>
                  </div>
                </div>

                {/* Utilization */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Coverage Utilized</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{policy.utilizationRate}%</p>
                  </div>
                  <Progress value={policy.utilizationRate} className="h-2 mb-2" />
                  <p className="text-xs text-slate-500 dark:text-slate-500">{policy.claimsUsed} of {policy.coverage} used</p>
                </div>

                {/* Policy Dates */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Policy Period</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {new Date(policy.startDate).toLocaleDateString()} - {new Date(policy.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">Next Payment</p>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{policy.nextPayment}</p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Covered Benefits:</p>
                  <div className="flex flex-wrap gap-1">
                    {policy.benefits.slice(0, 4).map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300">
                        {benefit}
                      </Badge>
                    ))}
                    {policy.benefits.length > 4 && (
                      <Badge variant="secondary" className="text-xs bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300">
                        +{policy.benefits.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Recent Claims */}
                {policy.recentClaims.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Recent Claims:</p>
                    <div className="space-y-2">
                      {policy.recentClaims.slice(0, 2).map((claim, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <div>
                              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{claim.description}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-500">{new Date(claim.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{claim.amount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Button variant="outline" className="flex-1 floating-button">
                    <FileText className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1 floating-button">
                    <Download className="w-4 h-4 mr-2" />
                    Download Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showInfo={true}
          totalItems={filteredPolicies.length}
          itemsPerPage={ITEMS_PER_PAGE}
          className="mt-8"
        />

        {filteredPolicies.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No policies found</h3>
            <p className="text-slate-500 dark:text-slate-500">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
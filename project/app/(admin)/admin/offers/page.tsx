'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Pagination } from '@/components/shared/Pagination';
import EditOfferDialog from '@/components/shared/EditOfferDialog';
import { 
  Gift, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar as CalendarIcon,
  Percent,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Search,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';

const ITEMS_PER_PAGE = 8;

export default function SeasonalOffers() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newOffer, setNewOffer] = useState({
    title: '',
    description: '',
    discountType: 'percentage',
    discountValue: '',
    targetAudience: 'all',
    policyCategories: [''],
    minPurchase: '',
    maxDiscount: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    isActive: true
  });

  const offers = [
    {
      id: 'OFFER-001',
      title: 'New Year Health Protection',
      description: 'Start the year with comprehensive health coverage at 25% off',
      discountType: 'percentage',
      discountValue: 25,
      targetAudience: 'new-customers',
      policyCategories: ['health'],
      minPurchase: '0.5 ETH',
      maxDiscount: '2 ETH',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      status: 'active',
      redemptions: 45,
      revenue: '22.5 ETH',
      conversionRate: '12.3%'
    },
    {
      id: 'OFFER-002',
      title: 'Summer Travel Special',
      description: 'Get ready for summer adventures with discounted travel insurance',
      discountType: 'fixed',
      discountValue: 0.05,
      targetAudience: 'all',
      policyCategories: ['travel'],
      minPurchase: '0.1 ETH',
      maxDiscount: '0.1 ETH',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      status: 'scheduled',
      redemptions: 0,
      revenue: '0 ETH',
      conversionRate: '0%'
    },
    {
      id: 'OFFER-003',
      title: 'Harvest Season Protection',
      description: 'Protect your crops during harvest season with special rates',
      discountType: 'percentage',
      discountValue: 15,
      targetAudience: 'existing-customers',
      policyCategories: ['crop'],
      minPurchase: '1 ETH',
      maxDiscount: '5 ETH',
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      status: 'expired',
      redemptions: 23,
      revenue: '34.5 ETH',
      conversionRate: '18.7%'
    },
    {
      id: 'OFFER-004',
      title: 'Multi-Policy Bundle',
      description: 'Save more when you bundle health and travel insurance',
      discountType: 'percentage',
      discountValue: 20,
      targetAudience: 'all',
      policyCategories: ['health', 'travel'],
      minPurchase: '1 ETH',
      maxDiscount: '3 ETH',
      startDate: '2025-01-15',
      endDate: '2025-03-15',
      status: 'draft',
      redemptions: 0,
      revenue: '0 ETH',
      conversionRate: '0%'
    },
    {
      id: 'OFFER-005',
      title: 'Spring Health Renewal',
      description: 'Renew your health coverage with exclusive spring discounts',
      discountType: 'percentage',
      discountValue: 18,
      targetAudience: 'existing-customers',
      policyCategories: ['health'],
      minPurchase: '0.6 ETH',
      maxDiscount: '1.5 ETH',
      startDate: '2025-03-01',
      endDate: '2025-05-31',
      status: 'scheduled',
      redemptions: 0,
      revenue: '0 ETH',
      conversionRate: '0%'
    },
    {
      id: 'OFFER-006',
      title: 'Winter Sports Coverage',
      description: 'Special rates for winter sports and adventure travel',
      discountType: 'fixed',
      discountValue: 0.08,
      targetAudience: 'all',
      policyCategories: ['travel'],
      minPurchase: '0.2 ETH',
      maxDiscount: '0.15 ETH',
      startDate: '2024-12-01',
      endDate: '2025-02-28',
      status: 'active',
      redemptions: 67,
      revenue: '18.9 ETH',
      conversionRate: '15.2%'
    },
    {
      id: 'OFFER-007',
      title: 'Family Protection Plan',
      description: 'Comprehensive family coverage with significant savings',
      discountType: 'percentage',
      discountValue: 30,
      targetAudience: 'new-customers',
      policyCategories: ['health'],
      minPurchase: '1.5 ETH',
      maxDiscount: '4 ETH',
      startDate: '2025-02-01',
      endDate: '2025-04-30',
      status: 'scheduled',
      redemptions: 0,
      revenue: '0 ETH',
      conversionRate: '0%'
    },
    {
      id: 'OFFER-008',
      title: 'Organic Farm Special',
      description: 'Exclusive discounts for certified organic farming operations',
      discountType: 'percentage',
      discountValue: 22,
      targetAudience: 'all',
      policyCategories: ['crop'],
      minPurchase: '2 ETH',
      maxDiscount: '6 ETH',
      startDate: '2024-10-01',
      endDate: '2024-12-31',
      status: 'expired',
      redemptions: 12,
      revenue: '28.4 ETH',
      conversionRate: '24.1%'
    },
    {
      id: 'OFFER-009',
      title: 'Student Health Discount',
      description: 'Affordable health insurance for students and young professionals',
      discountType: 'percentage',
      discountValue: 35,
      targetAudience: 'new-customers',
      policyCategories: ['health'],
      minPurchase: '0.3 ETH',
      maxDiscount: '1 ETH',
      startDate: '2024-08-01',
      endDate: '2024-12-31',
      status: 'expired',
      redemptions: 89,
      revenue: '45.2 ETH',
      conversionRate: '28.5%'
    },
    {
      id: 'OFFER-010',
      title: 'Business Travel Elite',
      description: 'Premium business travel insurance with corporate discounts',
      discountType: 'fixed',
      discountValue: 0.12,
      targetAudience: 'existing-customers',
      policyCategories: ['travel'],
      minPurchase: '0.4 ETH',
      maxDiscount: '0.2 ETH',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      status: 'active',
      redemptions: 34,
      revenue: '15.6 ETH',
      conversionRate: '19.8%'
    },
    {
      id: 'OFFER-011',
      title: 'Greenhouse Technology',
      description: 'Advanced coverage for high-tech greenhouse operations',
      discountType: 'percentage',
      discountValue: 20,
      targetAudience: 'all',
      policyCategories: ['crop'],
      minPurchase: '1.8 ETH',
      maxDiscount: '4.5 ETH',
      startDate: '2025-01-15',
      endDate: '2025-07-15',
      status: 'active',
      redemptions: 8,
      revenue: '12.3 ETH',
      conversionRate: '16.7%'
    },
    {
      id: 'OFFER-012',
      title: 'Senior Care Plus',
      description: 'Enhanced health coverage for seniors with special benefits',
      discountType: 'percentage',
      discountValue: 25,
      targetAudience: 'existing-customers',
      policyCategories: ['health'],
      minPurchase: '0.8 ETH',
      maxDiscount: '2.5 ETH',
      startDate: '2024-11-01',
      endDate: '2025-01-31',
      status: 'active',
      redemptions: 56,
      revenue: '38.7 ETH',
      conversionRate: '22.4%'
    },
    {
      id: 'OFFER-013',
      title: 'Digital Nomad Package',
      description: 'Complete coverage for remote workers and digital nomads',
      discountType: 'fixed',
      discountValue: 0.06,
      targetAudience: 'new-customers',
      policyCategories: ['travel', 'health'],
      minPurchase: '0.5 ETH',
      maxDiscount: '0.12 ETH',
      startDate: '2025-02-15',
      endDate: '2025-08-15',
      status: 'scheduled',
      redemptions: 0,
      revenue: '0 ETH',
      conversionRate: '0%'
    },
    {
      id: 'OFFER-014',
      title: 'Livestock Protection',
      description: 'Comprehensive livestock and ranch protection with seasonal rates',
      discountType: 'percentage',
      discountValue: 18,
      targetAudience: 'all',
      policyCategories: ['crop'],
      minPurchase: '2.5 ETH',
      maxDiscount: '7 ETH',
      startDate: '2024-06-01',
      endDate: '2024-11-30',
      status: 'expired',
      redemptions: 15,
      revenue: '42.8 ETH',
      conversionRate: '31.2%'
    },
    {
      id: 'OFFER-015',
      title: 'Adventure Sports Special',
      description: 'Extreme sports and adventure travel coverage at reduced rates',
      discountType: 'percentage',
      discountValue: 28,
      targetAudience: 'all',
      policyCategories: ['travel'],
      minPurchase: '0.25 ETH',
      maxDiscount: '0.8 ETH',
      startDate: '2025-03-01',
      endDate: '2025-09-30',
      status: 'scheduled',
      redemptions: 0,
      revenue: '0 ETH',
      conversionRate: '0%'
    },
    {
      id: 'OFFER-016',
      title: 'Telehealth Innovation',
      description: 'Modern telehealth coverage with cutting-edge digital benefits',
      discountType: 'fixed',
      discountValue: 0.15,
      targetAudience: 'new-customers',
      policyCategories: ['health'],
      minPurchase: '0.4 ETH',
      maxDiscount: '0.25 ETH',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      status: 'active',
      redemptions: 23,
      revenue: '9.8 ETH',
      conversionRate: '14.6%'
    }
  ];

  const filteredOffers = useMemo(() => {
    let filtered = offers.filter(offer => {
      const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           offer.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    // Sort by start date (newest first)
    return filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredOffers.length / ITEMS_PER_PAGE);
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'scheduled': return 'status-info';
      case 'expired': return 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300';
      case 'draft': return 'status-pending';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'scheduled': return <Clock className="w-4 h-4" />;
      case 'expired': return <X className="w-4 h-4" />;
      case 'draft': return <Edit className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleCreateOffer = () => {
    console.log('Creating offer:', newOffer);
    setIsCreateDialogOpen(false);
    // Reset form
    setNewOffer({
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: '',
      targetAudience: 'all',
      policyCategories: [''],
      minPurchase: '',
      maxDiscount: '',
      startDate: null,
      endDate: null,
      isActive: true
    });
  };

  return (
    <div className="section-spacing">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-content">
            <div className="page-header-icon">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="page-header-title">Seasonal Offers</h1>
              <p className="page-header-subtitle">Create and manage promotional campaigns</p>
            </div>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-accent text-white floating-button">
                <Plus className="w-4 h-4 mr-2" />
                Create New Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Seasonal Offer</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Offer Title
                    </label>
                    <Input
                      value={newOffer.title}
                      onChange={(e) => setNewOffer({...newOffer, title: e.target.value})}
                      placeholder="Enter offer title"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Target Audience
                    </label>
                    <Select value={newOffer.targetAudience} onValueChange={(value) => setNewOffer({...newOffer, targetAudience: value})}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="new-customers">New Customers</SelectItem>
                        <SelectItem value="existing-customers">Existing Customers</SelectItem>
                        <SelectItem value="premium-customers">Premium Customers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={newOffer.description}
                    onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                    placeholder="Describe the offer and its benefits"
                    className="form-input min-h-[100px]"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Discount Type
                    </label>
                    <Select value={newOffer.discountType} onValueChange={(value) => setNewOffer({...newOffer, discountType: value})}>
                      <SelectTrigger className="form-input">
                        <SelectValue placeholder="Select discount type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Discount Value
                    </label>
                    <Input
                      value={newOffer.discountValue}
                      onChange={(e) => setNewOffer({...newOffer, discountValue: e.target.value})}
                      placeholder={newOffer.discountType === 'percentage' ? 'e.g., 25' : 'e.g., 0.1 ETH'}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Max Discount
                    </label>
                    <Input
                      value={newOffer.maxDiscount}
                      onChange={(e) => setNewOffer({...newOffer, maxDiscount: e.target.value})}
                      placeholder="e.g., 2 ETH"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Start Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal form-input"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      End Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal form-input"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Minimum Purchase Amount
                  </label>
                  <Input
                    value={newOffer.minPurchase}
                    onChange={(e) => setNewOffer({...newOffer, minPurchase: e.target.value})}
                    placeholder="e.g., 0.5 ETH"
                    className="form-input"
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateOffer}
                    className="flex-1 gradient-accent text-white floating-button"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Create Offer
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-active">Active</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {offers.filter(o => o.status === 'active').length}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Active Offers</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-info">Total</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {offers.reduce((sum, o) => sum + o.redemptions, 0)}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Total Redemptions</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-warning">Revenue</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">268.7 ETH</h3>
              <p className="text-slate-600 dark:text-slate-400">Generated Revenue</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-active">Rate</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">19.8%</h3>
              <p className="text-slate-600 dark:text-slate-400">Avg Conversion</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Seasonal Offers</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Showing {paginatedOffers.length} of {filteredOffers.length} offers
                </p>
              </div>
              
              <div className="responsive-stack">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search offers..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
                    className="form-input pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={(value) => handleFilterChange(() => setFilterStatus(value))}>
                  <SelectTrigger className="w-full md:w-48 form-input">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offers Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {paginatedOffers.map((offer) => (
            <Card key={offer.id} className="glass-card rounded-2xl card-hover">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-100">{offer.title}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{offer.id}</p>
                    </div>
                  </div>
                  <Badge className={`status-badge ${getStatusColor(offer.status)}`}>
                    {getStatusIcon(offer.status)}
                    <span className="ml-1 capitalize">{offer.status}</span>
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300">{offer.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Discount</p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `${offer.discountValue} ETH`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Max Discount</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{offer.maxDiscount}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Valid From</p>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{new Date(offer.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Valid Until</p>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{new Date(offer.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {offer.status === 'active' && (
                  <div className="grid grid-cols-3 gap-4 p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Redemptions</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{offer.redemptions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Revenue</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{offer.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Conversion</p>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">{offer.conversionRate}</p>
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Categories:</p>
                  <div className="flex flex-wrap gap-1">
                    {offer.policyCategories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-xs capitalize bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Button
                    variant="outline"
                    className="flex-1 floating-button"
                    onClick={() => {
                      setSelectedOffer(offer);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {offer.status === 'active' && (
                    <Button variant="outline" className="flex-1 floating-button">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Analytics
                    </Button>
                  )}
                  <Button variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20">
                    <Trash2 className="w-4 h-4" />
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
          totalItems={filteredOffers.length}
          itemsPerPage={ITEMS_PER_PAGE}
          className="mb-8"
        />

        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No offers found</h3>
            <p className="text-slate-500 dark:text-slate-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      {selectedOffer && (
        <EditOfferDialog
          offer={selectedOffer}
          open={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedOffer(null);
          }}
          onSave={(o) => {
            console.log('Saving offer:', o);
            setIsEditDialogOpen(false);
            setSelectedOffer(null);
          }}
        />
      )}
    </div>
  );
}
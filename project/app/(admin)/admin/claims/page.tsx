'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ClaimReviewDialog from '@/components/shared/ClaimReviewDialog';
import { Pagination } from '@/components/shared/Pagination';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  X, 
  Clock,
  AlertTriangle,
  Download,
  User,
  Calendar,
  DollarSign,
  Shield
} from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function ClaimsReview() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const claims = [
    {
      id: 'CL-001',
      policyId: 'POL-001',
      policyName: 'Comprehensive Health Coverage',
      claimant: 'John Doe',
      claimantEmail: 'john.doe@email.com',
      type: 'Medical Expense',
      amount: '$5,200',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-12-20',
      description: 'Emergency surgery for appendicitis',
      documents: ['medical_report.pdf', 'hospital_bill.pdf', 'doctor_note.pdf'],
      reviewNotes: '',
      timeline: [
        { step: 'Submitted', date: '2024-12-20', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-21', status: 'current' },
        { step: 'Medical Review', date: null, status: 'pending' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-002',
      policyId: 'POL-002',
      policyName: 'Global Travel Protection',
      claimant: 'Jane Smith',
      claimantEmail: 'jane.smith@email.com',
      type: 'Trip Cancellation',
      amount: '$1,800',
      status: 'under-review',
      priority: 'medium',
      submittedDate: '2024-12-18',
      description: 'Flight cancellation due to weather conditions',
      documents: ['flight_cancellation.pdf', 'weather_report.pdf'],
      reviewNotes: 'Verifying weather conditions with airline records',
      timeline: [
        { step: 'Submitted', date: '2024-12-18', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-19', status: 'completed' },
        { step: 'Documentation Review', date: '2024-12-20', status: 'current' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-003',
      policyId: 'POL-003',
      policyName: 'Weather-Based Crop Insurance',
      claimant: 'Farm Corp Ltd',
      claimantEmail: 'claims@farmcorp.com',
      type: 'Weather Damage',
      amount: '$25,000',
      status: 'approved',
      priority: 'high',
      submittedDate: '2024-12-15',
      processedDate: '2024-12-17',
      description: 'Crop damage due to unexpected frost',
      documents: ['damage_assessment.pdf', 'weather_data.pdf', 'satellite_images.pdf'],
      reviewNotes: 'Weather oracle data confirms frost conditions. Damage assessment verified.',
      timeline: [
        { step: 'Auto-Submitted', date: '2024-12-15', status: 'completed' },
        { step: 'Oracle Verification', date: '2024-12-16', status: 'completed' },
        { step: 'Damage Assessment', date: '2024-12-16', status: 'completed' },
        { step: 'Approved & Paid', date: '2024-12-17', status: 'completed' }
      ]
    },
    {
      id: 'CL-004',
      policyId: 'POL-001',
      policyName: 'Comprehensive Health Coverage',
      claimant: 'Mike Johnson',
      claimantEmail: 'mike.johnson@email.com',
      type: 'Prescription',
      amount: '$3,100',
      status: 'rejected',
      priority: 'low',
      submittedDate: '2024-12-10',
      processedDate: '2024-12-12',
      description: 'Monthly prescription medication costs',
      documents: ['prescription.pdf', 'pharmacy_receipt.pdf'],
      reviewNotes: 'Medication not covered under current policy terms. Alternative treatment options available.',
      timeline: [
        { step: 'Submitted', date: '2024-12-10', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-11', status: 'completed' },
        { step: 'Medical Review', date: '2024-12-11', status: 'completed' },
        { step: 'Rejected', date: '2024-12-12', status: 'completed' }
      ]
    },
    {
      id: 'CL-005',
      policyId: 'POL-002',
      policyName: 'Global Travel Protection',
      claimant: 'Sarah Wilson',
      claimantEmail: 'sarah.wilson@email.com',
      type: 'Medical Emergency',
      amount: '$8,500',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-12-19',
      description: 'Emergency medical treatment abroad',
      documents: ['hospital_bill.pdf', 'medical_report.pdf'],
      reviewNotes: '',
      timeline: [
        { step: 'Submitted', date: '2024-12-19', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-20', status: 'current' },
        { step: 'Medical Review', date: null, status: 'pending' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-006',
      policyId: 'POL-003',
      policyName: 'Weather-Based Crop Insurance',
      claimant: 'Green Valley Farms',
      claimantEmail: 'claims@greenvalley.com',
      type: 'Hail Damage',
      amount: '$45,000',
      status: 'under-review',
      priority: 'high',
      submittedDate: '2024-12-16',
      description: 'Hail damage to corn crops',
      documents: ['damage_photos.pdf', 'weather_data.pdf'],
      reviewNotes: 'Awaiting satellite imagery verification',
      timeline: [
        { step: 'Auto-Submitted', date: '2024-12-16', status: 'completed' },
        { step: 'Oracle Verification', date: '2024-12-17', status: 'completed' },
        { step: 'Damage Assessment', date: '2024-12-18', status: 'current' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-007',
      policyId: 'POL-001',
      policyName: 'Comprehensive Health Coverage',
      claimant: 'Robert Chen',
      claimantEmail: 'robert.chen@email.com',
      type: 'Dental Care',
      amount: '$2,400',
      status: 'approved',
      priority: 'medium',
      submittedDate: '2024-12-14',
      processedDate: '2024-12-16',
      description: 'Root canal treatment',
      documents: ['dental_report.pdf', 'treatment_plan.pdf'],
      reviewNotes: 'Pre-authorized treatment completed successfully',
      timeline: [
        { step: 'Submitted', date: '2024-12-14', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-15', status: 'completed' },
        { step: 'Approved', date: '2024-12-16', status: 'completed' },
        { step: 'Payment Processed', date: '2024-12-16', status: 'completed' }
      ]
    },
    {
      id: 'CL-008',
      policyId: 'POL-002',
      policyName: 'Global Travel Protection',
      claimant: 'Lisa Martinez',
      claimantEmail: 'lisa.martinez@email.com',
      type: 'Lost Luggage',
      amount: '$1,200',
      status: 'pending',
      priority: 'low',
      submittedDate: '2024-12-17',
      description: 'Lost luggage during international flight',
      documents: ['airline_report.pdf', 'luggage_receipt.pdf'],
      reviewNotes: '',
      timeline: [
        { step: 'Submitted', date: '2024-12-17', status: 'completed' },
        { step: 'Airline Verification', date: '2024-12-18', status: 'current' },
        { step: 'Approval', date: null, status: 'pending' },
        { step: 'Payment', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-009',
      policyId: 'POL-001',
      policyName: 'Comprehensive Health Coverage',
      claimant: 'David Thompson',
      claimantEmail: 'david.thompson@email.com',
      type: 'Physical Therapy',
      amount: '$3,600',
      status: 'under-review',
      priority: 'medium',
      submittedDate: '2024-12-13',
      description: 'Physical therapy sessions for back injury',
      documents: ['therapy_plan.pdf', 'progress_notes.pdf'],
      reviewNotes: 'Reviewing treatment necessity and duration',
      timeline: [
        { step: 'Submitted', date: '2024-12-13', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-14', status: 'completed' },
        { step: 'Medical Review', date: '2024-12-15', status: 'current' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-010',
      policyId: 'POL-003',
      policyName: 'Weather-Based Crop Insurance',
      claimant: 'Sunrise Agriculture',
      claimantEmail: 'claims@sunrise-ag.com',
      type: 'Drought Damage',
      amount: '$75,000',
      status: 'rejected',
      priority: 'high',
      submittedDate: '2024-12-08',
      processedDate: '2024-12-11',
      description: 'Drought damage claim for wheat crops',
      documents: ['rainfall_data.pdf', 'yield_report.pdf'],
      reviewNotes: 'Insufficient evidence of drought conditions based on oracle data',
      timeline: [
        { step: 'Auto-Submitted', date: '2024-12-08', status: 'completed' },
        { step: 'Oracle Verification', date: '2024-12-09', status: 'completed' },
        { step: 'Rejected', date: '2024-12-11', status: 'completed' }
      ]
    },
    {
      id: 'CL-011',
      policyId: 'POL-002',
      policyName: 'Global Travel Protection',
      claimant: 'Amanda Foster',
      claimantEmail: 'amanda.foster@email.com',
      type: 'Flight Delay',
      amount: '$800',
      status: 'approved',
      priority: 'low',
      submittedDate: '2024-12-12',
      processedDate: '2024-12-13',
      description: 'Flight delay compensation',
      documents: ['flight_delay_notice.pdf', 'expenses.pdf'],
      reviewNotes: 'Standard delay compensation approved',
      timeline: [
        { step: 'Submitted', date: '2024-12-12', status: 'completed' },
        { step: 'Airline Verification', date: '2024-12-12', status: 'completed' },
        { step: 'Approved', date: '2024-12-13', status: 'completed' },
        { step: 'Payment Processed', date: '2024-12-13', status: 'completed' }
      ]
    },
    {
      id: 'CL-012',
      policyId: 'POL-001',
      policyName: 'Comprehensive Health Coverage',
      claimant: 'Kevin Park',
      claimantEmail: 'kevin.park@email.com',
      type: 'Surgery',
      amount: '$15,000',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-12-11',
      description: 'Arthroscopic knee surgery',
      documents: ['surgical_report.pdf', 'pre_auth.pdf'],
      reviewNotes: '',
      timeline: [
        { step: 'Submitted', date: '2024-12-11', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-12', status: 'completed' },
        { step: 'Medical Review', date: '2024-12-13', status: 'current' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-013',
      policyId: 'POL-003',
      policyName: 'Weather-Based Crop Insurance',
      claimant: 'Mountain View Ranch',
      claimantEmail: 'claims@mvranch.com',
      type: 'Flood Damage',
      amount: '$120,000',
      status: 'under-review',
      priority: 'high',
      submittedDate: '2024-12-09',
      description: 'Flood damage to livestock and crops',
      documents: ['flood_assessment.pdf', 'livestock_report.pdf'],
      reviewNotes: 'Coordinating with emergency services for damage verification',
      timeline: [
        { step: 'Auto-Submitted', date: '2024-12-09', status: 'completed' },
        { step: 'Emergency Assessment', date: '2024-12-10', status: 'completed' },
        { step: 'Damage Verification', date: '2024-12-11', status: 'current' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-014',
      policyId: 'POL-002',
      policyName: 'Global Travel Protection',
      claimant: 'Jennifer Lee',
      claimantEmail: 'jennifer.lee@email.com',
      type: 'Emergency Evacuation',
      amount: '$25,000',
      status: 'approved',
      priority: 'high',
      submittedDate: '2024-12-07',
      processedDate: '2024-12-08',
      description: 'Emergency medical evacuation',
      documents: ['evacuation_report.pdf', 'medical_necessity.pdf'],
      reviewNotes: 'Emergency evacuation pre-approved and completed',
      timeline: [
        { step: 'Emergency Submitted', date: '2024-12-07', status: 'completed' },
        { step: 'Emergency Approval', date: '2024-12-07', status: 'completed' },
        { step: 'Evacuation Completed', date: '2024-12-08', status: 'completed' },
        { step: 'Payment Processed', date: '2024-12-08', status: 'completed' }
      ]
    },
    {
      id: 'CL-015',
      policyId: 'POL-001',
      policyName: 'Comprehensive Health Coverage',
      claimant: 'Maria Rodriguez',
      claimantEmail: 'maria.rodriguez@email.com',
      type: 'Mental Health',
      amount: '$2,800',
      status: 'pending',
      priority: 'medium',
      submittedDate: '2024-12-06',
      description: 'Mental health counseling sessions',
      documents: ['treatment_plan.pdf', 'session_notes.pdf'],
      reviewNotes: '',
      timeline: [
        { step: 'Submitted', date: '2024-12-06', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-07', status: 'completed' },
        { step: 'Mental Health Review', date: '2024-12-08', status: 'current' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-016',
      policyId: 'POL-003',
      policyName: 'Weather-Based Crop Insurance',
      claimant: 'Prairie Winds Farm',
      claimantEmail: 'claims@prairiewinds.com',
      type: 'Wind Damage',
      amount: '$35,000',
      status: 'approved',
      priority: 'medium',
      submittedDate: '2024-12-05',
      processedDate: '2024-12-07',
      description: 'Wind damage to grain storage facilities',
      documents: ['wind_data.pdf', 'structural_assessment.pdf'],
      reviewNotes: 'Weather oracle confirms high wind conditions. Structural damage verified.',
      timeline: [
        { step: 'Auto-Submitted', date: '2024-12-05', status: 'completed' },
        { step: 'Oracle Verification', date: '2024-12-06', status: 'completed' },
        { step: 'Structural Assessment', date: '2024-12-06', status: 'completed' },
        { step: 'Approved & Paid', date: '2024-12-07', status: 'completed' }
      ]
    },
    {
      id: 'CL-017',
      policyId: 'POL-002',
      policyName: 'Global Travel Protection',
      claimant: 'Thomas Anderson',
      claimantEmail: 'thomas.anderson@email.com',
      type: 'Trip Interruption',
      amount: '$4,200',
      status: 'under-review',
      priority: 'medium',
      submittedDate: '2024-12-04',
      description: 'Trip interruption due to family emergency',
      documents: ['emergency_documentation.pdf', 'travel_receipts.pdf'],
      reviewNotes: 'Verifying emergency documentation with authorities',
      timeline: [
        { step: 'Submitted', date: '2024-12-04', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-05', status: 'completed' },
        { step: 'Documentation Review', date: '2024-12-06', status: 'current' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-018',
      policyId: 'POL-001',
      policyName: 'Comprehensive Health Coverage',
      claimant: 'Nancy Williams',
      claimantEmail: 'nancy.williams@email.com',
      type: 'Specialist Consultation',
      amount: '$1,500',
      status: 'rejected',
      priority: 'low',
      submittedDate: '2024-12-03',
      processedDate: '2024-12-05',
      description: 'Specialist consultation for chronic condition',
      documents: ['referral.pdf', 'consultation_report.pdf'],
      reviewNotes: 'Specialist not in approved network. Alternative providers available.',
      timeline: [
        { step: 'Submitted', date: '2024-12-03', status: 'completed' },
        { step: 'Initial Review', date: '2024-12-04', status: 'completed' },
        { step: 'Network Verification', date: '2024-12-04', status: 'completed' },
        { step: 'Rejected', date: '2024-12-05', status: 'completed' }
      ]
    },
    {
      id: 'CL-019',
      policyId: 'POL-003',
      policyName: 'Weather-Based Crop Insurance',
      claimant: 'Golden Harvest Co.',
      claimantEmail: 'claims@goldenharvest.com',
      type: 'Frost Damage',
      amount: '$28,000',
      status: 'pending',
      priority: 'medium',
      submittedDate: '2024-12-02',
      description: 'Unexpected frost damage to citrus crops',
      documents: ['temperature_data.pdf', 'crop_assessment.pdf'],
      reviewNotes: '',
      timeline: [
        { step: 'Auto-Submitted', date: '2024-12-02', status: 'completed' },
        { step: 'Oracle Verification', date: '2024-12-03', status: 'current' },
        { step: 'Damage Assessment', date: null, status: 'pending' },
        { step: 'Final Decision', date: null, status: 'pending' }
      ]
    },
    {
      id: 'CL-020',
      policyId: 'POL-002',
      policyName: 'Global Travel Protection',
      claimant: 'Christopher Davis',
      claimantEmail: 'christopher.davis@email.com',
      type: 'Rental Car Damage',
      amount: '$3,500',
      status: 'approved',
      priority: 'low',
      submittedDate: '2024-12-01',
      processedDate: '2024-12-03',
      description: 'Rental car damage during vacation',
      documents: ['police_report.pdf', 'rental_agreement.pdf'],
      reviewNotes: 'Police report confirms accident. Rental company damage assessment verified.',
      timeline: [
        { step: 'Submitted', date: '2024-12-01', status: 'completed' },
        { step: 'Police Report Review', date: '2024-12-02', status: 'completed' },
        { step: 'Rental Verification', date: '2024-12-02', status: 'completed' },
        { step: 'Approved & Paid', date: '2024-12-03', status: 'completed' }
      ]
    }
  ];

  const filteredClaims = useMemo(() => {
    let filtered = claims.filter(claim => {
      const matchesStatus = filterStatus === 'all' || claim.status === filterStatus;
      const matchesSearch = claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           claim.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });

    // Sort by submitted date (newest first)
    return filtered.sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime());
  }, [searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredClaims.length / ITEMS_PER_PAGE);
  const paginatedClaims = filteredClaims.slice(
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
      case 'pending': return 'status-pending';
      case 'under-review': return 'status-info';
      case 'approved': return 'status-active';
      case 'rejected': return 'status-error';
      default: return 'status-pending';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'status-error';
      case 'medium': return 'status-warning';
      case 'low': return 'status-active';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under-review': return <Eye className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleApprove = (claimId: string) => {
    console.log('Approving claim:', claimId);
  };

  const handleReject = (claimId: string) => {
    console.log('Rejecting claim:', claimId);
  };

  return (
    <div className="section-spacing">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-content">
            <div className="page-header-icon">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="page-header-title">Claims Review</h1>
              <p className="page-header-subtitle">Review and process insurance claims</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-pending">Pending</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {claims.filter(c => c.status === 'pending').length}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Pending Review</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-info">Review</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {claims.filter(c => c.status === 'under-review').length}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Under Review</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-active">Approved</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {claims.filter(c => c.status === 'approved').length}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Approved</p>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                  <X className="w-6 h-6 text-white" />
                </div>
                <Badge className="status-badge status-error">Rejected</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {claims.filter(c => c.status === 'rejected').length}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Claims Review Queue</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Showing {paginatedClaims.length} of {filteredClaims.length} claims
                </p>
              </div>
              
              <div className="responsive-stack">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search claims by ID, claimant, or type..."
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
                    <SelectItem value="all">All Claims</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Claims List */}
        <div className="content-spacing mb-8">
          {paginatedClaims.map((claim) => (
            <Card key={claim.id} className="glass-card rounded-2xl card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{claim.id}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{claim.policyName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={`status-badge ${getPriorityColor(claim.priority)}`}>
                      {claim.priority.toUpperCase()}
                    </Badge>
                    <Badge className={`status-badge ${getStatusColor(claim.status)}`}>
                      {getStatusIcon(claim.status)}
                      <span className="ml-1 capitalize">{claim.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Claimant</p>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{claim.claimant}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Amount</p>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{claim.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Submitted</p>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{new Date(claim.submittedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Type</p>
                      <p className="font-medium text-slate-800 dark:text-slate-100">{claim.type}</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-700 dark:text-slate-300 mb-4">{claim.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <ClaimReviewDialog
                      claim={claim}
                      trigger={
                        <Button variant="outline" className="floating-button">
                          <Eye className="w-4 h-4 mr-2" />
                          Review Details
                        </Button>
                      }
                    />
                  </div>

                  {(claim.status === 'pending' || claim.status === 'under-review') && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(claim.id)}
                        className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(claim.id)}
                        className="gradient-accent text-white floating-button"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
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
          totalItems={filteredClaims.length}
          itemsPerPage={ITEMS_PER_PAGE}
          className="mb-8"
        />

        {filteredClaims.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No claims found</h3>
            <p className="text-slate-500 dark:text-slate-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
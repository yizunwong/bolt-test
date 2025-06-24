'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/shared/StatsCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Pagination } from '@/components/shared/Pagination';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield,
  Crown,
  User,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Ban,
  MoreHorizontal,
  Save,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  FileText,
  Key,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Loader2
} from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function UserRoleManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRoleConfigDialogOpen, setIsRoleConfigDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageTransition, setPageTransition] = useState(false);

  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    location: '',
    company: '',
    notes: ''
  });

  const users = [
    {
      id: 'USR-001',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      phone: '+1 (555) 123-4567',
      role: 'policyholder',
      status: 'active',
      lastLogin: '2024-12-20T10:30:00Z',
      joinDate: '2024-01-15',
      policies: 3,
      claims: 2,
      kycStatus: 'verified',
      location: 'New York, USA',
      loginAttempts: 0,
      twoFactorEnabled: true,
      notes: 'Premium customer with excellent payment history',
      activityLog: [
        { action: 'Login', timestamp: '2024-12-20T10:30:00Z', ip: '192.168.1.100' },
        { action: 'Policy Purchase', timestamp: '2024-12-19T14:22:00Z', ip: '192.168.1.100' },
        { action: 'Claim Submitted', timestamp: '2024-12-18T09:15:00Z', ip: '192.168.1.100' }
      ]
    },
    {
      id: 'USR-002',
      name: 'Sarah Chen',
      email: 'sarah.chen@healthsecure.com',
      phone: '+1 (555) 234-5678',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-12-21T09:15:00Z',
      joinDate: '2024-02-10',
      policies: 245,
      claims: 156,
      kycStatus: 'verified',
      location: 'California, USA',
      company: 'HealthSecure Insurance',
      loginAttempts: 0,
      twoFactorEnabled: true,
      notes: 'Senior claims reviewer with 5+ years experience',
      activityLog: [
        { action: 'Claims Review', timestamp: '2024-12-21T09:15:00Z', ip: '10.0.0.50' },
        { action: 'Policy Approval', timestamp: '2024-12-20T16:45:00Z', ip: '10.0.0.50' },
        { action: 'Report Generated', timestamp: '2024-12-20T11:30:00Z', ip: '10.0.0.50' }
      ]
    },
    {
      id: 'USR-003',
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@farmcorp.com',
      phone: '+1 (555) 345-6789',
      role: 'policyholder',
      status: 'active',
      lastLogin: '2024-12-19T14:22:00Z',
      joinDate: '2024-03-05',
      policies: 1,
      claims: 1,
      kycStatus: 'verified',
      location: 'Texas, USA',
      company: 'Farm Corp Ltd',
      loginAttempts: 0,
      twoFactorEnabled: false,
      notes: 'Agricultural business owner, seasonal policy holder',
      activityLog: [
        { action: 'Claim Payout Received', timestamp: '2024-12-19T14:22:00Z', ip: '203.0.113.45' },
        { action: 'Weather Alert Received', timestamp: '2024-12-18T06:00:00Z', ip: '203.0.113.45' }
      ]
    },
    {
      id: 'USR-004',
      name: 'Emily Watson',
      email: 'emily.watson@travelchain.com',
      phone: '+44 20 7946 0958',
      role: 'admin',
      status: 'pending',
      lastLogin: null,
      joinDate: '2024-12-15',
      policies: 0,
      claims: 0,
      kycStatus: 'pending',
      location: 'London, UK',
      company: 'TravelChain Insurance',
      loginAttempts: 0,
      twoFactorEnabled: false,
      notes: 'New admin account pending verification',
      activityLog: [
        { action: 'Account Created', timestamp: '2024-12-15T10:00:00Z', ip: '198.51.100.25' }
      ]
    },
    {
      id: 'USR-005',
      name: 'David Kim',
      email: 'david.kim@blocksecure.com',
      phone: '+82 2 1234 5678',
      role: 'system-admin',
      status: 'active',
      lastLogin: '2024-12-21T11:45:00Z',
      joinDate: '2024-01-01',
      policies: 0,
      claims: 0,
      kycStatus: 'verified',
      location: 'Seoul, South Korea',
      company: 'BlockSecure',
      loginAttempts: 0,
      twoFactorEnabled: true,
      notes: 'Lead system administrator with full platform access',
      activityLog: [
        { action: 'System Monitoring', timestamp: '2024-12-21T11:45:00Z', ip: '172.16.0.10' },
        { action: 'User Management', timestamp: '2024-12-21T10:30:00Z', ip: '172.16.0.10' },
        { action: 'Security Audit', timestamp: '2024-12-20T15:20:00Z', ip: '172.16.0.10' }
      ]
    },
    {
      id: 'USR-006',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 456-7890',
      role: 'policyholder',
      status: 'suspended',
      lastLogin: '2024-12-10T16:30:00Z',
      joinDate: '2024-06-20',
      policies: 2,
      claims: 5,
      kycStatus: 'flagged',
      location: 'Florida, USA',
      loginAttempts: 3,
      twoFactorEnabled: false,
      notes: 'Account suspended due to suspicious claim activity. Under investigation.',
      activityLog: [
        { action: 'Account Suspended', timestamp: '2024-12-11T09:00:00Z', ip: 'System' },
        { action: 'Failed Login Attempt', timestamp: '2024-12-10T16:35:00Z', ip: '198.51.100.100' },
        { action: 'Claim Submitted', timestamp: '2024-12-10T16:30:00Z', ip: '198.51.100.100' }
      ]
    },
    // Add more users to demonstrate pagination
    ...Array.from({ length: 50 }, (_, i) => ({
      id: `USR-${String(i + 7).padStart(3, '0')}`,
      name: `User ${i + 7}`,
      email: `user${i + 7}@example.com`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      role: ['policyholder', 'admin', 'system-admin'][Math.floor(Math.random() * 3)],
      status: ['active', 'pending', 'suspended'][Math.floor(Math.random() * 3)],
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      policies: Math.floor(Math.random() * 10),
      claims: Math.floor(Math.random() * 5),
      kycStatus: ['verified', 'pending', 'flagged'][Math.floor(Math.random() * 3)],
      location: ['New York, USA', 'California, USA', 'Texas, USA', 'Florida, USA'][Math.floor(Math.random() * 4)],
      loginAttempts: Math.floor(Math.random() * 4),
      twoFactorEnabled: Math.random() > 0.5,
      notes: `Sample user ${i + 7} for testing pagination`,
      activityLog: [
        { action: 'Login', timestamp: new Date().toISOString(), ip: '192.168.1.100' }
      ]
    }))
  ];

  const roles = [
    {
      id: 'policyholder',
      name: 'Policyholder',
      description: 'Individual users who purchase and manage insurance policies',
      permissions: [
        { id: 'view_policies', name: 'View Policies', enabled: true },
        { id: 'purchase_policies', name: 'Purchase Policies', enabled: true },
        { id: 'submit_claims', name: 'Submit Claims', enabled: true },
        { id: 'manage_profile', name: 'Manage Profile', enabled: true },
        { id: 'view_wallet', name: 'View Wallet', enabled: true },
        { id: 'download_documents', name: 'Download Documents', enabled: true }
      ],
      userCount: users.filter(u => u.role === 'policyholder').length,
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      settings: {
        maxPolicies: 10,
        maxClaimsPerMonth: 5,
        requireTwoFactor: false,
        autoApprovalLimit: 1000
      }
    },
    {
      id: 'admin',
      name: 'Insurance Admin',
      description: 'Insurance company administrators who manage policies and claims',
      permissions: [
        { id: 'manage_policies', name: 'Manage Policies', enabled: true },
        { id: 'review_claims', name: 'Review Claims', enabled: true },
        { id: 'view_reports', name: 'View Reports', enabled: true },
        { id: 'manage_offers', name: 'Manage Offers', enabled: true },
        { id: 'approve_claims', name: 'Approve Claims', enabled: true },
        { id: 'access_analytics', name: 'Access Analytics', enabled: true },
        { id: 'manage_customers', name: 'Manage Customers', enabled: true },
        { id: 'export_data', name: 'Export Data', enabled: true }
      ],
      userCount: users.filter(u => u.role === 'admin').length,
      icon: Shield,
      color: 'from-emerald-500 to-teal-500',
      settings: {
        maxClaimApproval: 50000,
        requireTwoFactor: true,
        sessionTimeout: 60,
        ipRestriction: false
      }
    },
    {
      id: 'system-admin',
      name: 'System Administrator',
      description: 'Platform administrators with full system access',
      permissions: [
        { id: 'full_access', name: 'Full System Access', enabled: true },
        { id: 'user_management', name: 'User Management', enabled: true },
        { id: 'system_monitoring', name: 'System Monitoring', enabled: true },
        { id: 'smart_contracts', name: 'Smart Contract Management', enabled: true },
        { id: 'security_settings', name: 'Security Settings', enabled: true },
        { id: 'audit_logs', name: 'Audit Logs', enabled: true },
        { id: 'system_configuration', name: 'System Configuration', enabled: true },
        { id: 'backup_restore', name: 'Backup & Restore', enabled: true }
      ],
      userCount: users.filter(u => u.role === 'system-admin').length,
      icon: Crown,
      color: 'from-purple-500 to-indigo-500',
      settings: {
        requireTwoFactor: true,
        sessionTimeout: 30,
        ipRestriction: true,
        auditLogging: true
      }
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'policyholder': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'admin': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'system-admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'pending': return 'status-pending';
      case 'suspended': return 'status-error';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'suspended': return <Ban className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort by join date (newest first)
    return filtered.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
  }, [searchTerm, filterRole, filterStatus]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const handlePageChange = async (page: number) => {
    setPageTransition(true);
    setCurrentPage(page);
    
    // Simulate loading delay for demonstration
    await new Promise(resolve => setTimeout(resolve, 300));
    setPageTransition(false);
  };

  // Reset to page 1 when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn();
    setCurrentPage(1);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditUserData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      location: user.location,
      company: user.company || '',
      notes: user.notes || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving user:', editUserData);
    setIsLoading(false);
    setIsEditDialogOpen(false);
  };

  const handleConfigureRole = (role: any) => {
    setSelectedRole(role);
    setIsRoleConfigDialogOpen(true);
  };

  const handleViewRoleUsers = (roleId: string) => {
    setFilterRole(roleId);
    // Switch to users tab
  };

  const toggleUserStatus = async (userId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Toggling status for user:', userId);
    setIsLoading(false);
  };

  const resetUserPassword = async (userId: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Resetting password for user:', userId);
    setIsLoading(false);
  };

  return (
    <div className="section-spacing">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="page-header">
          <div className="page-header-content">
            <div className="page-header-icon">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="page-header-title">User & Role Management</h1>
              <p className="page-header-subtitle">Manage users, roles, and permissions across the platform</p>
            </div>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-accent text-white floating-button">
                <UserPlus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Full Name
                    </label>
                    <Input placeholder="Enter full name" className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <Input type="email" placeholder="Enter email" className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Role
                  </label>
                  <Select>
                    <SelectTrigger className="form-input">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="policyholder">Policyholder</SelectItem>
                      <SelectItem value="admin">Insurance Admin</SelectItem>
                      <SelectItem value="system-admin">System Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 gradient-accent text-white floating-button">
                    Create User
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <StatsCard
            title="Total Users"
            value={users.length.toString()}
            change="+12 this month"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Active Users"
            value={users.filter(u => u.status === 'active').length.toString()}
            change="98.2% uptime"
            changeType="positive"
            icon={CheckCircle}
          />
          <StatsCard
            title="Pending Approval"
            value={users.filter(u => u.status === 'pending').length.toString()}
            change="Requires review"
            changeType="neutral"
            icon={Clock}
          />
          <StatsCard
            title="System Admins"
            value={users.filter(u => u.role === 'system-admin').length.toString()}
            change="Security level: High"
            changeType="neutral"
            icon={Crown}
          />
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <TabsTrigger value="users" className="rounded-lg">User Management</TabsTrigger>
            <TabsTrigger value="roles" className="rounded-lg">Role Management</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            {/* Filters */}
            <Card className="glass-card rounded-2xl mb-6">
              <CardContent className="p-6">
                <div className="responsive-stack">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
                      className="form-input pl-10"
                    />
                  </div>
                  <Select value={filterRole} onValueChange={(value) => handleFilterChange(() => setFilterRole(value))}>
                    <SelectTrigger className="w-full md:w-48 form-input">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="policyholder">Policyholder</SelectItem>
                      <SelectItem value="admin">Insurance Admin</SelectItem>
                      <SelectItem value="system-admin">System Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={(value) => handleFilterChange(() => setFilterStatus(value))}>
                    <SelectTrigger className="w-full md:w-48 form-input">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {pageTransition && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                <span className="ml-2 text-slate-600 dark:text-slate-400">Loading users...</span>
              </div>
            )}

            {/* Users List */}
            {!pageTransition && (
              <div className="content-spacing mb-8">
                {paginatedUsers.map((user) => (
                  <Card key={user.id} className="glass-card rounded-2xl card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{user.name}</h3>
                              <Badge className={`status-badge ${getRoleColor(user.role)}`}>
                                {user.role.replace('-', ' ')}
                              </Badge>
                              <Badge className={`status-badge ${getStatusColor(user.status)}`}>
                                {getStatusIcon(user.status)}
                                <span className="ml-1 capitalize">{user.status.replace('-', ' ')}</span>
                              </Badge>
                              {user.twoFactorEnabled && (
                                <Badge className="status-badge bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                  <Lock className="w-3 h-3 mr-1" />
                                  2FA
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-500 mt-1">
                              <span>ID: {user.id}</span>
                              <span>•</span>
                              <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>Last login: {formatLastLogin(user.lastLogin)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-slate-500 dark:text-slate-500">Policies</p>
                                <p className="font-semibold text-slate-800 dark:text-slate-100">{user.policies}</p>
                              </div>
                              <div>
                                <p className="text-slate-500 dark:text-slate-500">Claims</p>
                                <p className="font-semibold text-slate-800 dark:text-slate-100">{user.claims}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="floating-button"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="floating-button"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showInfo={true}
              totalItems={filteredUsers.length}
              itemsPerPage={ITEMS_PER_PAGE}
              className="mb-8"
            />

            {filteredUsers.length === 0 && !pageTransition && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No users found</h3>
                <p className="text-slate-500 dark:text-slate-500">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="roles">
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role) => {
                const RoleIcon = role.icon;
                return (
                  <Card key={role.id} className="glass-card rounded-2xl card-hover">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                          <RoleIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-slate-800 dark:text-slate-100">{role.name}</CardTitle>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{role.userCount} users</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300">{role.description}</p>

                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Key Permissions:</p>
                        <div className="space-y-1">
                          {role.permissions.slice(0, 4).map((permission, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-slate-600 dark:text-slate-400">
                                {permission.name}
                              </span>
                            </div>
                          ))}
                          {role.permissions.length > 4 && (
                            <p className="text-xs text-slate-500 dark:text-slate-500 ml-5">
                              +{role.permissions.length - 4} more permissions
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <Button 
                          variant="outline" 
                          className="flex-1 floating-button"
                          onClick={() => handleConfigureRole(role)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 floating-button"
                          onClick={() => handleViewRoleUsers(role.id)}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          View Users
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* View User Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Details - {selectedUser?.name}</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                {/* User Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Personal Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Full Name</p>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{selectedUser.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Email</p>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{selectedUser.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Phone</p>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{selectedUser.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Location</p>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{selectedUser.location}</p>
                        </div>
                      </div>
                      {selectedUser.company && (
                        <div className="flex items-center space-x-3">
                          <Building className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Company</p>
                            <p className="font-medium text-slate-800 dark:text-slate-100">{selectedUser.company}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Account Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Role</p>
                          <Badge className={`status-badge ${getRoleColor(selectedUser.role)}`}>
                            {selectedUser.role.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Status</p>
                          <Badge className={`status-badge ${getStatusColor(selectedUser.status)}`}>
                            {getStatusIcon(selectedUser.status)}
                            <span className="ml-1 capitalize">{selectedUser.status}</span>
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Join Date</p>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Last Login</p>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{formatLastLogin(selectedUser.lastLogin)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Lock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Two-Factor Auth</p>
                          <Badge className={`status-badge ${selectedUser.twoFactorEnabled ? 'status-active' : 'status-pending'}`}>
                            {selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid md:grid-cols-4 gap-4 p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{selectedUser.policies}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Policies</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{selectedUser.claims}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Claims</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{selectedUser.loginAttempts}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Failed Logins</p>
                  </div>
                  <div className="text-center">
                    <Badge className={`status-badge ${selectedUser.kycStatus === 'verified' ? 'status-active' : selectedUser.kycStatus === 'pending' ? 'status-pending' : 'status-error'}`}>
                      {selectedUser.kycStatus}
                    </Badge>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">KYC Status</p>
                  </div>
                </div>

                {/* Notes */}
                {selectedUser.notes && (
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Notes</h4>
                    <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">{selectedUser.notes}</p>
                  </div>
                )}

                {/* Recent Activity */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {selectedUser.activityLog.slice(0, 5).map((activity: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-100">{activity.action}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(activity.timestamp).toLocaleString()} • IP: {activity.ip}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button 
                    variant="outline" 
                    onClick={() => handleEditUser(selectedUser)}
                    className="floating-button"
                    disabled={isLoading}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit User
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => resetUserPassword(selectedUser.id)}
                    className="floating-button"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Key className="w-4 h-4 mr-2" />}
                    Reset Password
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => toggleUserStatus(selectedUser.id)}
                    className={selectedUser.status === 'active' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}
                    disabled={isLoading}
                  >
                    {selectedUser.status === 'active' ? (
                      <>
                        <UserX className="w-4 h-4 mr-2" />
                        Suspend
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Activate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit User - {selectedUser?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <Input
                    value={editUserData.name}
                    onChange={(e) => setEditUserData({...editUserData, name: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    value={editUserData.email}
                    onChange={(e) => setEditUserData({...editUserData, email: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <Input
                    value={editUserData.phone}
                    onChange={(e) => setEditUserData({...editUserData, phone: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Location
                  </label>
                  <Input
                    value={editUserData.location}
                    onChange={(e) => setEditUserData({...editUserData, location: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Role
                  </label>
                  <Select value={editUserData.role} onValueChange={(value) => setEditUserData({...editUserData, role: value})}>
                    <SelectTrigger className="form-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="policyholder">Policyholder</SelectItem>
                      <SelectItem value="admin">Insurance Admin</SelectItem>
                      <SelectItem value="system-admin">System Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Status
                  </label>
                  <Select value={editUserData.status} onValueChange={(value) => setEditUserData({...editUserData, status: value})}>
                    <SelectTrigger className="form-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {editUserData.role === 'admin' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Company
                  </label>
                  <Input
                    value={editUserData.company}
                    onChange={(e) => setEditUserData({...editUserData, company: e.target.value})}
                    className="form-input"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Notes
                </label>
                <Textarea
                  value={editUserData.notes}
                  onChange={(e) => setEditUserData({...editUserData, notes: e.target.value})}
                  className="form-input min-h-[100px]"
                  placeholder="Add any notes about this user..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1" disabled={isLoading}>
                  Cancel
                </Button>
                <Button onClick={handleSaveUser} className="flex-1 gradient-accent text-white floating-button" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Role Configuration Dialog */}
        <Dialog open={isRoleConfigDialogOpen} onOpenChange={setIsRoleConfigDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configure Role - {selectedRole?.name}</DialogTitle>
            </DialogHeader>
            {selectedRole && (
              <div className="space-y-6">
                {/* Role Info */}
                <div className="flex items-center space-x-4 p-4 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${selectedRole.color} flex items-center justify-center`}>
                    <selectedRole.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{selectedRole.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{selectedRole.description}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{selectedRole.userCount} users with this role</p>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Permissions</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedRole.permissions.map((permission: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-slate-700 dark:text-slate-300">{permission.name}</span>
                        </div>
                        <Switch checked={permission.enabled} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role Settings */}
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">Role Settings</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(selectedRole.settings).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        {typeof value === 'boolean' ? (
                          <Switch checked={value} />
                        ) : (
                          <Input
                            value={String(value)}
                            className="form-input"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="outline" onClick={() => setIsRoleConfigDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button className="flex-1 gradient-accent text-white floating-button">
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
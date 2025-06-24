'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination } from '@/components/shared/Pagination';
import { Heart, Plane, Sprout, Shield, Search, Filter, Star } from 'lucide-react';

const ITEMS_PER_PAGE = 6;

export default function BrowsePolicies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const policyCategories = [
    { id: 'health', name: 'Health Insurance', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 'travel', name: 'Travel Insurance', icon: Plane, color: 'from-blue-500 to-cyan-500' },
    { id: 'crop', name: 'Crop Insurance', icon: Sprout, color: 'from-green-500 to-emerald-500' }
  ];

  const policies = [
    {
      id: 1,
      name: 'Comprehensive Health Coverage',
      category: 'health',
      provider: 'HealthSecure',
      coverage: '$100,000',
      premium: '0.8 ETH/month',
      rating: 4.8,
      features: ['Emergency Care', 'Prescription Drugs', 'Mental Health', 'Dental'],
      popular: true,
      description: 'Complete healthcare coverage with blockchain-verified claims processing'
    },
    {
      id: 2,
      name: 'Global Travel Protection',
      category: 'travel',
      provider: 'TravelChain',
      coverage: '$50,000',
      premium: '0.2 ETH/trip',
      rating: 4.6,
      features: ['Trip Cancellation', 'Medical Emergency', 'Lost Luggage', '24/7 Support'],
      popular: false,
      description: 'Worldwide travel insurance with instant claim verification'
    },
    {
      id: 3,
      name: 'Weather-Based Crop Insurance',
      category: 'crop',
      provider: 'AgriBlock',
      coverage: '$200,000',
      premium: '2.5 ETH/season',
      rating: 4.9,
      features: ['Weather Oracle', 'Yield Protection', 'Automated Payouts', 'Satellite Monitoring'],
      popular: true,
      description: 'Smart contract insurance using IoT and weather data'
    },
    {
      id: 4,
      name: 'Premium Health Plus',
      category: 'health',
      provider: 'MediChain',
      coverage: '$250,000',
      premium: '1.5 ETH/month',
      rating: 4.7,
      features: ['Specialized Care', 'International Coverage', 'Wellness Programs', 'Telemedicine'],
      popular: false,
      description: 'Premium healthcare with global coverage and wellness benefits'
    },
    {
      id: 5,
      name: 'Business Travel Elite',
      category: 'travel',
      provider: 'CorpSecure',
      coverage: '$100,000',
      premium: '0.5 ETH/trip',
      rating: 4.5,
      features: ['Business Equipment', 'Meeting Cancellation', 'Executive Protection', 'Concierge'],
      popular: false,
      description: 'Executive travel insurance for business professionals'
    },
    {
      id: 6,
      name: 'Organic Crop Protection',
      category: 'crop',
      provider: 'GreenChain',
      coverage: '$150,000',
      premium: '1.8 ETH/season',
      rating: 4.8,
      features: ['Organic Certification', 'Pest Protection', 'Quality Guarantee', 'Market Price Shield'],
      popular: true,
      description: 'Specialized insurance for organic farming operations'
    },
    {
      id: 7,
      name: 'Family Health Shield',
      category: 'health',
      provider: 'FamilyCare',
      coverage: '$300,000',
      premium: '1.2 ETH/month',
      rating: 4.6,
      features: ['Family Coverage', 'Pediatric Care', 'Maternity Benefits', 'Preventive Care'],
      popular: false,
      description: 'Comprehensive family health insurance with pediatric focus'
    },
    {
      id: 8,
      name: 'Adventure Travel Coverage',
      category: 'travel',
      provider: 'AdventureSecure',
      coverage: '$75,000',
      premium: '0.3 ETH/trip',
      rating: 4.4,
      features: ['Extreme Sports', 'Mountain Rescue', 'Equipment Coverage', 'Emergency Evacuation'],
      popular: false,
      description: 'Specialized coverage for adventure and extreme sports travel'
    },
    {
      id: 9,
      name: 'Livestock Protection Plan',
      category: 'crop',
      provider: 'RanchGuard',
      coverage: '$500,000',
      premium: '3.0 ETH/season',
      rating: 4.7,
      features: ['Disease Coverage', 'Theft Protection', 'Feed Cost Insurance', 'Veterinary Care'],
      popular: true,
      description: 'Comprehensive livestock and ranch protection insurance'
    },
    {
      id: 10,
      name: 'Senior Health Care',
      category: 'health',
      provider: 'ElderCare',
      coverage: '$200,000',
      premium: '1.0 ETH/month',
      rating: 4.9,
      features: ['Senior Specialists', 'Long-term Care', 'Home Health', 'Prescription Coverage'],
      popular: false,
      description: 'Specialized health insurance designed for seniors'
    },
    {
      id: 11,
      name: 'Digital Nomad Travel',
      category: 'travel',
      provider: 'NomadProtect',
      coverage: '$60,000',
      premium: '0.25 ETH/month',
      rating: 4.5,
      features: ['Global Coverage', 'Work Equipment', 'Visa Assistance', 'Remote Work Support'],
      popular: true,
      description: 'Travel insurance tailored for digital nomads and remote workers'
    },
    {
      id: 12,
      name: 'Greenhouse Crop Insurance',
      category: 'crop',
      provider: 'GreenHouse Pro',
      coverage: '$180,000',
      premium: '2.2 ETH/season',
      rating: 4.6,
      features: ['Climate Control', 'Pest Management', 'Equipment Coverage', 'Yield Guarantee'],
      popular: false,
      description: 'Specialized insurance for greenhouse and controlled environment agriculture'
    },
    {
      id: 13,
      name: 'Student Health Plan',
      category: 'health',
      provider: 'StudentCare',
      coverage: '$75,000',
      premium: '0.4 ETH/month',
      rating: 4.3,
      features: ['Campus Health', 'Mental Health', 'Sports Injuries', 'Prescription Drugs'],
      popular: false,
      description: 'Affordable health insurance designed for students'
    },
    {
      id: 14,
      name: 'Luxury Travel Protection',
      category: 'travel',
      provider: 'LuxuryGuard',
      coverage: '$200,000',
      premium: '0.8 ETH/trip',
      rating: 4.8,
      features: ['Concierge Service', 'Private Medical', 'Luxury Transport', 'VIP Support'],
      popular: true,
      description: 'Premium travel insurance for luxury and high-end travel'
    },
    {
      id: 15,
      name: 'Aquaculture Insurance',
      category: 'crop',
      provider: 'AquaSecure',
      coverage: '$400,000',
      premium: '2.8 ETH/season',
      rating: 4.4,
      features: ['Fish Mortality', 'Equipment Coverage', 'Water Quality', 'Disease Protection'],
      popular: false,
      description: 'Comprehensive insurance for aquaculture and fish farming operations'
    },
    {
      id: 16,
      name: 'Telehealth Plus',
      category: 'health',
      provider: 'TeleHealth Pro',
      coverage: '$120,000',
      premium: '0.6 ETH/month',
      rating: 4.5,
      features: ['24/7 Telehealth', 'Remote Monitoring', 'Digital Prescriptions', 'AI Diagnostics'],
      popular: false,
      description: 'Modern health insurance focused on telehealth and digital care'
    },
    {
      id: 17,
      name: 'Cruise Travel Insurance',
      category: 'travel',
      provider: 'CruiseSecure',
      coverage: '$80,000',
      premium: '0.35 ETH/trip',
      rating: 4.6,
      features: ['Shore Excursions', 'Cabin Coverage', 'Medical at Sea', 'Trip Interruption'],
      popular: false,
      description: 'Specialized travel insurance for cruise vacations'
    },
    {
      id: 18,
      name: 'Vertical Farm Coverage',
      category: 'crop',
      provider: 'VerticalGrow',
      coverage: '$250,000',
      premium: '2.4 ETH/season',
      rating: 4.7,
      features: ['LED Systems', 'Hydroponic Equipment', 'Climate Control', 'Automation Coverage'],
      popular: true,
      description: 'Insurance for vertical farming and indoor agriculture systems'
    }
  ];

  const filteredPolicies = useMemo(() => {
    let filtered = policies.filter(policy => {
      const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           policy.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort policies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.popular ? 1 : -1;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return parseFloat(a.premium.split(' ')[0]) - parseFloat(b.premium.split(' ')[0]);
        case 'price-high':
          return parseFloat(b.premium.split(' ')[0]) - parseFloat(a.premium.split(' ')[0]);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE);
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
              <h1 className="page-header-title">Browse Insurance Policies</h1>
              <p className="page-header-subtitle">Discover and purchase blockchain-secured insurance coverage</p>
            </div>
          </div>
        </div>

        {/* Policy Categories */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {policyCategories.map((category) => (
            <Card 
              key={category.id}
              className={`glass-card rounded-2xl cursor-pointer card-hover ${
                selectedCategory === category.id ? 'ring-2 ring-emerald-500' : ''
              }`}
              onClick={() => handleFilterChange(() => setSelectedCategory(category.id))}
            >
              <CardContent className="flex items-center p-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mr-4`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{category.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {policies.filter(p => p.category === category.id).length} policies available
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="glass-card rounded-2xl mb-8">
          <CardContent className="p-6">
            <div className="responsive-stack">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
                  className="form-input pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={(value) => handleFilterChange(() => setSelectedCategory(value))}>
                <SelectTrigger className="w-full md:w-48 form-input">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="health">Health Insurance</SelectItem>
                  <SelectItem value="travel">Travel Insurance</SelectItem>
                  <SelectItem value="crop">Crop Insurance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value) => handleFilterChange(() => setSortBy(value))}>
                <SelectTrigger className="w-full md:w-48 form-input">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            Showing {paginatedPolicies.length} of {filteredPolicies.length} policies
            {selectedCategory !== 'all' && (
              <span> in {policyCategories.find(c => c.id === selectedCategory)?.name}</span>
            )}
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedPolicies.map((policy) => {
            const categoryInfo = policyCategories.find(cat => cat.id === policy.category);
            return (
              <Card key={policy.id} className="glass-card rounded-2xl card-hover relative overflow-hidden">
                {policy.popular && (
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                    Popular
                  </Badge>
                )}
                
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryInfo?.color} flex items-center justify-center mr-3`}>
                      {categoryInfo && <categoryInfo.icon className="w-6 h-6 text-white" />}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-slate-800 dark:text-slate-100">{policy.name}</CardTitle>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{policy.provider}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-1">{policy.rating}</span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{policy.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Coverage</span>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{policy.coverage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Premium</span>
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{policy.premium}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {policy.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300">
                          {feature}
                        </Badge>
                      ))}
                      {policy.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-slate-200 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300">
                          +{policy.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 floating-button">
                      Details
                    </Button>
                    <Button className="flex-1 gradient-accent text-white floating-button">
                      Buy with Token
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
            <p className="text-slate-500 dark:text-slate-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
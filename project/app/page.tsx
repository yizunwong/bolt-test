'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { 
  Shield, 
  Users, 
  ArrowRight, 
  Zap, 
  Lock, 
  Globe,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  Smartphone,
  Clock,
  DollarSign,
  FileText,
  Heart,
  Plane,
  Sprout,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roles = [
    {
      id: 'policyholder',
      title: 'Individual Coverage',
      description: 'Personal insurance solutions for individuals and families',
      icon: Shield,
      href: '/auth/register?role=policyholder',
      gradient: 'from-blue-500 to-teal-500',
      features: ['Health Insurance', 'Travel Protection', 'Personal Coverage']
    },
    {
      id: 'admin',
      title: 'Insurance Provider',
      description: 'Comprehensive platform for insurance companies and brokers',
      icon: Users,
      href: '/auth/register?role=admin',
      gradient: 'from-emerald-500 to-green-500',
      features: ['Policy Management', 'Claims Processing', 'Analytics Dashboard']
    }
  ];

  const features = [
    {
      icon: Lock,
      title: 'Blockchain Security',
      description: 'Immutable smart contracts ensure transparent and secure transactions with military-grade encryption'
    },
    {
      icon: Zap,
      title: 'Instant Payouts',
      description: 'Automated claim processing with instant ERC-20 token payments - no waiting weeks for approval'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Decentralized network provides worldwide coverage with 24/7 accessibility from anywhere'
    },
    {
      icon: DollarSign,
      title: 'Lower Costs',
      description: 'Eliminate intermediaries and reduce overhead costs by up to 40% compared to traditional insurance'
    },
    {
      icon: FileText,
      title: 'Transparent Claims',
      description: 'Every claim is recorded on the blockchain for complete transparency and audit trail'
    },
    {
      icon: Clock,
      title: 'Real-time Processing',
      description: 'Smart contracts automatically process claims based on predefined conditions and oracle data'
    }
  ];

  const insuranceTypes = [
    {
      icon: Heart,
      title: 'Health Insurance',
      description: 'Comprehensive medical coverage with global network',
      coverage: 'Up to $500K',
      premium: 'From 0.5 ETH/month'
    },
    {
      icon: Plane,
      title: 'Travel Insurance',
      description: 'Worldwide travel protection and emergency assistance',
      coverage: 'Up to $100K',
      premium: 'From 0.1 ETH/trip'
    },
    {
      icon: Sprout,
      title: 'Crop Insurance',
      description: 'Weather-based agricultural protection with IoT monitoring',
      coverage: 'Up to $1M',
      premium: 'From 1.5 ETH/season'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Nomad',
      content: 'BlockSecure made getting travel insurance so simple. The instant payouts saved my trip when my flight was cancelled.',
      rating: 5,
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Farm Owner',
      content: 'The crop insurance with weather oracles is revolutionary. Automatic payouts based on real weather data - no paperwork hassles.',
      rating: 5,
      avatar: '👨‍🌾'
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Healthcare Professional',
      content: 'As a doctor, I appreciate the transparency of blockchain-based health insurance. Claims are processed fairly and quickly.',
      rating: 5,
      avatar: '👩‍⚕️'
    }
  ];

  const stats = [
    { label: 'Active Policies', value: '50K+' },
    { label: 'Claims Processed', value: '$25M+' },
    { label: 'Countries Covered', value: '120+' },
    { label: 'Customer Satisfaction', value: '98%' }
  ];

  const navigationLinks = [
    { href: '#features', label: 'Features' },
    { href: '#insurance', label: 'Insurance Types' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#about', label: 'About' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20 dark:border-slate-700/50">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800 dark:text-slate-200 hidden sm:block">BlockSecure</span>
            </Link>

            {/* Desktop Navigation - Responsive spacing */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 2xl:space-x-6 flex-1 justify-center max-w-4xl mx-8">
              {navigationLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="nav-item whitespace-nowrap px-2 xl:px-3 2xl:px-4"
                >
                  <span className="hidden xl:block">{link.label}</span>
                  <span className="xl:hidden text-xs">{link.label.split(' ')[0]}</span>
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4 flex-shrink-0">
              <ThemeToggle />
              
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-slate-600 dark:text-slate-300 hidden lg:inline-flex">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="gradient-accent text-white floating-button">
                    <span className="hidden lg:inline">Get Started</span>
                    <span className="lg:hidden">Join</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-slate-300 w-9 h-9 p-0"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-white/20 dark:border-slate-700/50 py-4">
              <div className="flex flex-col space-y-4">
                {navigationLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.href}
                    className="nav-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                  </a>
                ))}
                
                <div className="flex flex-col space-y-2 pt-4 border-t border-white/20 dark:border-slate-700/50">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full gradient-accent text-white">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 opacity-5" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="relative w-20 h-20 mx-auto mb-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-white" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 animate-pulse" style={{ transform: 'scale(1.1)' }}></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-emerald-600 to-teal-600 dark:from-slate-200 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            The Future of Insurance
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Secure, transparent, and instant insurance powered by blockchain technology. 
            No paperwork, no delays, just protection when you need it most.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/register">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 px-8 py-4 text-lg"
              >
                Start Your Coverage <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 px-8 py-4 text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Why Choose BlockSecure?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience the next generation of insurance with cutting-edge blockchain technology
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card rounded-2xl p-8 text-center card-hover">
                <CardContent className="pt-6">
                  <div className="relative w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 animate-pulse" style={{ transform: 'scale(1.1)' }}></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{feature.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Types Section */}
      <section id="insurance" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Insurance Coverage Options
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Comprehensive protection for every aspect of your life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {insuranceTypes.map((type, index) => (
              <Card key={index} className="glass-card rounded-2xl p-8 card-hover">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100 text-center">{type.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-center mb-6">{type.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Coverage:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{type.coverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Premium:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{type.premium}</span>
                    </div>
                  </div>
                  <Link href="/auth/register">
                    <Button className="w-full mt-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                      Get Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white/50 dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              See what our customers say about their BlockSecure experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card rounded-2xl p-8 card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">{testimonial.name}</div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection CTA */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 dark:text-slate-100">
              Choose Your Path
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Whether you're seeking coverage or providing insurance services, we have the right solution for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {roles.map((role) => (
              <Link key={role.id} href={role.href}>
                <Card 
                  className={`glass-card rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                    hoveredCard === role.id ? 'scale-105 shadow-2xl' : ''
                  }`}
                  onMouseEnter={() => setHoveredCard(role.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardContent className="pt-6 text-center">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${role.gradient} flex items-center justify-center shadow-lg`}>
                      <role.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{role.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">{role.description}</p>
                    <div className="space-y-2 mb-6">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center text-sm text-slate-600 dark:text-slate-400">
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      Get Started <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">BlockSecure Insurance</span>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Revolutionizing insurance through blockchain technology. Secure, transparent, and instant coverage for the digital age.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                  <Award className="w-3 h-3 mr-1" />
                  Licensed & Regulated
                </Badge>
                <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                  <Shield className="w-3 h-3 mr-1" />
                  Blockchain Secured
                </Badge>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#insurance" className="hover:text-emerald-400 transition-colors">Insurance Types</a></li>
                <li><a href="#testimonials" className="hover:text-emerald-400 transition-colors">Testimonials</a></li>
                <li><Link href="/auth/register" className="hover:text-emerald-400 transition-colors">Get Started</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 BlockSecure Insurance. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-slate-400 text-sm">Powered by Blockchain Technology</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
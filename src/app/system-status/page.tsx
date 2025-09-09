"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Users, 
  GamepadIcon, 
  MessageSquare,
  Server,
  Database,
  Brain,
  Zap,
  Globe,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Gift,
  Shield,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { api, queryKeys } from '@/lib/api/client';

interface SystemStatus {
  status: 'operational' | 'maintenance' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
  lastUpdated: string;
  metrics: {
    totalGames: number;
    activeGames: number;
    totalMessages: number;
    totalParticipants: number;
    recentActivity: number;
  };
  services: Array<{
    name: string;
    description: string;
    status: string;
    uptime: number;
    responseTime: number;
    details: string;
  }>;
  smartContracts: Array<{
    gameId: string;
    gameName: string;
    category: string;
    isFree: boolean;
    prizePool: string;
    gameContract: {
      name: string;
      address: string;
      network: string;
      version: string;
      status: string;
      verified: boolean;
    };
    nftContract: {
      name: string;
      address: string;
      network: string;
      version: string;
      status: string;
      verified: boolean;
    };
  }>;
  recentEvents: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    status: string;
  }>;
  latestActivity: Array<{
    id: string;
    type: string;
    title: string;
    status: string;
    category: string;
    prizePool: string;
    timestamp: string;
  }>;
}

export default function SystemStatusPage() {
  const [error, setError] = useState<string | null>(null);

  const { data: status, isLoading: loading, error: queryError } = useQuery<SystemStatus>({
    queryKey: queryKeys.systemStatus.all,
    queryFn: () => api.systemStatus.get(),
    refetchInterval: 30000, // Update every 30 seconds
  });

  // Use query error if local error state is not set
  const displayError = error || (queryError instanceof Error ? queryError.message : null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'maintenance':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'outage':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-slate-500" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'update':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'incident':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading system status...</p>
        </div>
      </div>
    );
  }

  if (queryError || !status) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center">
        <Card className="max-w-md mx-auto border-red-500/20 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <XCircle className="w-6 h-6" />
              System Status Unavailable
            </CardTitle>
            <CardDescription>
              {queryError instanceof Error ? queryError.message : 'Unable to fetch system status'}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg hover:bg-card/90 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Back to Home
            </span>
          </motion.div>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                System Status
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time monitoring of all Nerix platform components and services
            </p>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl">
              {getStatusIcon(status.status)}
              <div className="text-left">
                <h3 className="text-2xl font-bold capitalize">{status.status}</h3>
                <p className="text-sm text-muted-foreground">
                  Last updated: {new Date(status.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30">
                <div className="text-2xl font-bold text-emerald-500">{status.uptime}%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30">
                <div className="text-2xl font-bold text-blue-500">{status.responseTime}ms</div>
                <div className="text-sm text-muted-foreground">Response</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30">
                <div className="text-2xl font-bold text-purple-500">{status.metrics.activeGames}</div>
                <div className="text-sm text-muted-foreground">Active Games</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30">
                <div className="text-2xl font-bold text-orange-500">{status.metrics.recentActivity}</div>
                <div className="text-sm text-muted-foreground">24h Activity</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16 space-y-12">
        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Games', value: status.metrics.totalGames, icon: GamepadIcon, color: 'text-primary', bgColor: 'bg-primary/10' },
            { label: 'Messages Sent', value: status.metrics.totalMessages, icon: MessageSquare, color: 'text-secondary', bgColor: 'bg-secondary/10' },
            { label: 'Participants', value: status.metrics.totalParticipants, icon: Users, color: 'text-accent', bgColor: 'bg-accent/10' },
            { label: 'Services Online', value: status.services.filter(s => s.status === 'operational').length, icon: CheckCircle, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' }
          ].map((metric, index) => (
            <Card key={index} className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 group">
              <div className={`absolute inset-0 ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <CardContent className="relative p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                    <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                  <Server className="w-6 h-6" />
                </div>
                System Components
              </CardTitle>
              <CardDescription>
                Real-time status of all platform services
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0">
                {status.services.map((service, index) => (
                  <div key={index} className="p-6 border-r border-b border-border/30 last:border-r-0 hover:bg-muted/20 transition-colors duration-200">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {service.name === 'Database' && <Database className="w-6 h-6 text-blue-500" />}
                          {service.name === 'AI Services' && <Brain className="w-6 h-6 text-purple-500" />}
                          {service.name === 'Blockchain Integration' && <Zap className="w-6 h-6 text-yellow-500" />}
                          {service.name === 'API Services' && <Server className="w-6 h-6 text-green-500" />}
                          {service.name === 'Frontend' && <Globe className="w-6 h-6 text-blue-400" />}
                          <div>
                            <h3 className="font-semibold">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                        {getStatusIcon(service.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground mb-1">Uptime</p>
                          <div className="flex items-center gap-2">
                            <Progress value={service.uptime} className="flex-1 h-2" />
                            <span className="font-medium">{service.uptime}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Response</p>
                          <p className="font-medium">{service.responseTime}ms</p>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground p-3 rounded-lg bg-muted/30">
                        {service.details}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart Contracts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
                  <Zap className="w-6 h-6" />
                </div>
                Smart Contracts
              </CardTitle>
              <CardDescription>
                Deployed contracts for each game on BNB Chain Testnet
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {status.smartContracts.map((contract) => (
                <div key={contract.gameId} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative p-6 rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm">
                    {/* Game Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20">
                          <GamepadIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{contract.gameName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={contract.category === 'endless' ? 'default' : 'secondary'} className="text-xs">
                              {contract.category}
                            </Badge>
                            <Badge variant={contract.isFree ? 'outline' : 'default'} className="text-xs">
                              {contract.isFree ? 'Free to Play' : `${contract.prizePool} BNB Pool`}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contracts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Game Contract */}
                      <div className="p-4 rounded-xl border border-border/30 bg-background/50">
                        <div className="flex items-center gap-3 mb-4">
                          <Server className="w-5 h-5 text-green-500" />
                          <span className="font-semibold text-green-500">{contract.gameContract.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {contract.gameContract.version}
                          </Badge>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Network</span>
                            <span className="font-medium">{contract.gameContract.network}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status</span>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="font-medium capitalize">{contract.gameContract.status}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Verified</span>
                            {contract.gameContract.verified ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <div className="pt-3 border-t border-border/30">
                            <p className="text-muted-foreground mb-2">Contract Address</p>
                            <code className="block p-3 bg-muted/50 rounded-lg text-xs font-mono break-all hover:bg-muted transition-colors">
                              {contract.gameContract.address}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* NFT Contract */}
                      <div className="p-4 rounded-xl border border-border/30 bg-background/50">
                        <div className="flex items-center gap-3 mb-4">
                          <Gift className="w-5 h-5 text-purple-500" />
                          <span className="font-semibold text-purple-500">{contract.nftContract.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {contract.nftContract.version}
                          </Badge>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Network</span>
                            <span className="font-medium">{contract.nftContract.network}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Status</span>
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                              <span className="font-medium capitalize">{contract.nftContract.status}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Verified</span>
                            {contract.nftContract.verified ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <div className="pt-3 border-t border-border/30">
                            <p className="text-muted-foreground mb-2">Contract Address</p>
                            <code className="block p-3 bg-muted/50 rounded-lg text-xs font-mono break-all hover:bg-muted transition-colors">
                              {contract.nftContract.address}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Section - Events and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
                    <Calendar className="w-5 h-5" />
                  </div>
                  Recent Events
                </CardTitle>
                <CardDescription>
                  Latest system updates and maintenance
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {status.recentEvents.map((event, index) => (
                  <div key={event.id} className="relative">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <h4 className="font-semibold text-sm">{event.title}</h4>
                          <Badge variant={event.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                            {event.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleDateString()} at {new Date(event.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    {index < status.recentEvents.length - 1 && (
                      <div className="absolute left-2 top-8 bottom-0 w-px bg-border/50" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                    <Activity className="w-5 h-5" />
                  </div>
                  Live Activity
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {status.metrics.recentActivity} in 24h
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Recent game activity and interactions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {status.latestActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <GamepadIcon className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">{activity.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={activity.category === 'endless' ? 'default' : 'secondary'} className="text-xs">
                            {activity.category}
                          </Badge>
                          {!activity.prizePool.includes('0') && (
                            <Badge variant="outline" className="text-xs">
                              {activity.prizePool} BNB
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="outline" className="text-xs">
                        {activity.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Link
            href="/api-docs"
            className="block p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-orange-500" />
              <span className="font-medium">API Documentation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Build and integrate with our API
            </p>
          </Link>
          
          <Link
            href="/system-overview"
            className="block p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="font-medium">Documentation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn about Nerix platform
            </p>
          </Link>
          
          <Link
            href="/support"
            className="block p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="font-medium">Support</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Get help and join community
            </p>
          </Link>
          
          <Link
            href="/games"
            className="block p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <GamepadIcon className="w-4 h-4 text-purple-500" />
              <span className="font-medium">Games</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Challenge AI and win prizes
            </p>
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center py-8 border-t border-border/30"
        >
          <p className="text-sm text-muted-foreground">
            Auto-refreshes every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
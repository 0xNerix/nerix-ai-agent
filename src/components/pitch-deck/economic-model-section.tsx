import { Card } from "@/components/ui/card";
import { BarChart3, Info, LineChart } from "lucide-react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';
import { ScrollArea } from "@/components/ui/scroll-area";

// Function to calculate message fee based on base fee and growth rate
const calculateMessageFee = (baseFeeUSD: number, growthRate: number, messageCount: number): number => {
  if (messageCount === 0) return baseFeeUSD;
  
  let fee = baseFeeUSD;
  for (let i = 1; i < messageCount; i++) {
    fee = fee * (1 + growthRate);
    // Apply cap if needed
    if (fee > 500) fee = 500; // $500 cap
  }
  
  return fee;
};

// Generate data for 1000 messages based on CSV data
const generateMessageData = () => {
  // Key data points from CSV
  const data = [
    { messages: 0, messageFee: 10, prizePool: 2000, nextIterationPool: 0, teamPool: 0, totalFees: 0 },
    { messages: 1, messageFee: 10, prizePool: 2006, nextIterationPool: 2, teamPool: 2, totalFees: 10 },
    { messages: 10, messageFee: 10.72, prizePool: 2062.15, nextIterationPool: 20.72, teamPool: 20.72, totalFees: 62.15 },
    { messages: 50, messageFee: 14.63, prizePool: 2365.19, nextIterationPool: 121.73, teamPool: 121.73, totalFees: 365.19 },
    { messages: 100, messageFee: 21.58, prizePool: 2903.75, nextIterationPool: 301.25, teamPool: 301.25, totalFees: 903.75 },
    { messages: 200, messageFee: 50.73, prizePool: 5163.29, nextIterationPool: 1054.43, teamPool: 1054.43, totalFees: 3163.29 },
    { messages: 300, messageFee: 84.71, prizePool: 7797.94, nextIterationPool: 1932.65, teamPool: 1932.65, totalFees: 5797.94 },
    { messages: 400, messageFee: 143.68, prizePool: 12369.47, nextIterationPool: 3456.49, teamPool: 3456.49, totalFees: 10369.47 },
    { messages: 500, messageFee: 482.84, prizePool: 38661.96, nextIterationPool: 12220.65, teamPool: 12220.65, totalFees: 36661.96 },
    { messages: 600, messageFee: 500, prizePool: 68643.55, nextIterationPool: 22214.52, teamPool: 22214.52, totalFees: 66643.55 },
    { messages: 700, messageFee: 500, prizePool: 98643.55, nextIterationPool: 32214.52, teamPool: 32214.52, totalFees: 96643.55 },
    { messages: 800, messageFee: 500, prizePool: 128643.55, nextIterationPool: 42214.52, teamPool: 42214.52, totalFees: 126643.55 },
    { messages: 900, messageFee: 500, prizePool: 158643.55, nextIterationPool: 52214.52, teamPool: 52214.52, totalFees: 156643.55 },
    { messages: 1000, messageFee: 500, prizePool: 188643.55, nextIterationPool: 62214.52, teamPool: 62214.52, totalFees: 186643.55 }
  ];
  
  return data;
};

const generateParticipantData = () => {
  return [
    { iteration: 1, value: 584, growth: 0.625 },
    { iteration: 5, value: 404, growth: 0.54 },
    { iteration: 10, value: 445, growth: 0.462 },
    { iteration: 15, value: 532, growth: 0.435 },
    { iteration: 20, value: 545, growth: 0.405 },
    { iteration: 25, value: 486, growth: 0.379 },
    { iteration: 30, value: 401, growth: 0.355 },
    { iteration: 35, value: 478, growth: 0.333 },
    { iteration: 40, value: 537, growth: 0.310 },
    { iteration: 45, value: 542, growth: 0.288 },
    { iteration: 50, value: 473, growth: 0.267 },
    { iteration: 60, value: 484, growth: 0.230 },
    { iteration: 70, value: 538, growth: 0.195 },
    { iteration: 75, value: 461, growth: 0.164 },
    { iteration: 85, value: 491, growth: 0.138 },
    { iteration: 95, value: 534, growth: 0.122 },
    { iteration: 100, value: 449, growth: 0.112 },
    { iteration: 110, value: 497, growth: 0.098 },
    { iteration: 120, value: 529, growth: 0.089 },
    { iteration: 125, value: 438, growth: 0.082 },
    { iteration: 135, value: 508, growth: 0.045 },
    { iteration: 145, value: 523, growth: 0.015 },
    { iteration: 150, value: 428, growth: 0 },
  ];
};

const generatePrizePoolGrowthData = () => {
  return [
    { iteration: 1, value: 63.84 }, // $63,843.55
    { iteration: 5, value: 23.64 }, // $23,641.26
    { iteration: 10, value: 39.96 }, // $39,959.58
    { iteration: 15, value: 63.06 }, // $63,058.07
    { iteration: 20, value: 63.46 }, // $63,458.07
    { iteration: 25, value: 38.70 }, // $38,699.98
    { iteration: 30, value: 23.68 }, // $23,675.54
    { iteration: 35, value: 45.25 }, // $45,250.99
    { iteration: 40, value: 64.76 }, // $64,758.07
    { iteration: 45, value: 61.46 }, // $61,464.20
    { iteration: 50, value: 35.24 }, // $35,240.07
    { iteration: 60, value: 47.60 }, // $47,600.81
    { iteration: 70, value: 59.70 }, // $59,695.89
    { iteration: 75, value: 32.40 }, // $32,402.10
    { iteration: 85, value: 49.95 }, // $49,948.42
    { iteration: 95, value: 57.95 }, // $57,953.47
    { iteration: 100, value: 29.90 }, // $29,896.23
    { iteration: 110, value: 52.01 }, // $52,014.08
    { iteration: 120, value: 55.85 }, // $55,851.78
    { iteration: 125, value: 27.83 }, // $27,833.17
    { iteration: 135, value: 54.46 }, // $54,458.07
    { iteration: 145, value: 53.56 }, // $53,561.47
    { iteration: 150, value: 26.19 }, // $26,194.52
  ];
};

export function EconomicModelSection() {
  // Generate data for 1000 messages with specified parameters
  const messageData = generateMessageData();
  
  // Data for 150 iteration projections
  const participantsData = generateParticipantData();
  const prizePoolData = generatePrizePoolGrowthData();
  
  // Platform revenue data from CSV
  const platformRevenueData = [
    { iteration: 1, value: 20.61 }, // $20,614.52
    { iteration: 5, value: 5.66 }, // $5,661.58
    { iteration: 10, value: 7.88 }, // $7,881.69
    { iteration: 15, value: 15.31 }, // $15,314.52
    { iteration: 20, value: 16.71 }, // $16,714.52
    { iteration: 25, value: 10.93 }, // $10,934.66
    { iteration: 30, value: 5.53 }, // $5,525.23
    { iteration: 35, value: 10.18 }, // $10,178.83
    { iteration: 40, value: 15.91 }, // $15,914.52
    { iteration: 45, value: 16.51 }, // $16,514.52
    { iteration: 50, value: 9.86 }, // $9,859.50
    { iteration: 60, value: 10.76 }, // $10,762.10
    { iteration: 70, value: 16.01 }, // $16,014.52
    { iteration: 75, value: 8.96 }, // $8,958.96
    { iteration: 85, value: 11.38 }, // $11,377.97
    { iteration: 95, value: 15.61 }, // $15,614.52
    { iteration: 100, value: 8.14 }, // $8,138.58
    { iteration: 110, value: 11.93 }, // $11,933.19
    { iteration: 120, value: 15.11 }, // $15,114.52
    { iteration: 125, value: 7.45 }, // $7,450.89
    { iteration: 135, value: 12.61 }, // $12,614.52
    { iteration: 145, value: 14.51 }, // $14,514.52
    { iteration: 150, value: 6.87 }, // $6,874.73
  ];

  // Revenue distribution pie chart data
  const pieData = [
    { name: 'Current Prize Pool', value: 60, color: '#3498db' },
    { name: 'Next Iteration', value: 20, color: '#9b59b6' },
    { name: 'Platform', value: 20, color: '#2ecc71' },
  ];

  const COLORS = ['#3498db', '#9b59b6', '#2ecc71'];

  // Find some key data points for display
  const message300 = messageData.find(d => d.messages === 300) || messageData[messageData.length - 1];
  const message500 = messageData.find(d => d.messages === 500) || messageData[messageData.length - 1];
  const message1000 = messageData.find(d => d.messages === 1000) || messageData[messageData.length - 1];

  // Calculate total platform revenue across all 150 iterations
  const totalPlatformRevenue = platformRevenueData.reduce((sum, item) => sum + item.value, 0) * 1000;

  // Detailed metrics data from CSV
  const detailedMetricsData = [
    { iteration: 1, participants: 584, prizePool: 63844, platformRevenue: 20615 },
    { iteration: 5, participants: 404, prizePool: 23641, platformRevenue: 5662 },
    { iteration: 10, participants: 445, prizePool: 39960, platformRevenue: 7882 },
    { iteration: 15, participants: 532, prizePool: 63058, platformRevenue: 15315 },
    { iteration: 20, participants: 545, prizePool: 63458, platformRevenue: 16715 },
    { iteration: 25, participants: 486, prizePool: 38700, platformRevenue: 10935 },
    { iteration: 30, participants: 401, prizePool: 23676, platformRevenue: 5525 },
    { iteration: 35, participants: 478, prizePool: 45251, platformRevenue: 10179 },
    { iteration: 40, participants: 537, prizePool: 64758, platformRevenue: 15915 },
    { iteration: 45, participants: 542, prizePool: 61464, platformRevenue: 16515 },
    { iteration: 50, participants: 473, prizePool: 35240, platformRevenue: 9860 },
    { iteration: 60, participants: 484, prizePool: 47601, platformRevenue: 10762 },
    { iteration: 70, participants: 538, prizePool: 59696, platformRevenue: 16015 },
    { iteration: 75, participants: 461, prizePool: 32402, platformRevenue: 8959 },
    { iteration: 80, participants: 450, prizePool: 24261, platformRevenue: 5480 },
    { iteration: 90, participants: 544, prizePool: 66358, platformRevenue: 16615 },
    { iteration: 100, participants: 449, prizePool: 29896, platformRevenue: 8139 },
    { iteration: 110, participants: 497, prizePool: 52014, platformRevenue: 11933 },
    { iteration: 120, participants: 529, prizePool: 55852, platformRevenue: 15115 },
    { iteration: 125, participants: 438, prizePool: 27833, platformRevenue: 7451 },
    { iteration: 130, participants: 453, prizePool: 36499, platformRevenue: 8404 },
    { iteration: 140, participants: 598, prizePool: 85158, platformRevenue: 22015 },
    { iteration: 150, participants: 428, prizePool: 26195, platformRevenue: 6875 }
  ];

  return (
    <section id="economics" className="space-y-8">
      <h2 className="text-3xl font-bold text-center">Economic Model & Growth Projections</h2>
      <p className="text-center text-muted-foreground max-w-3xl mx-auto">
        The following charts and data are based on simulated projections using our economic model parameters. 
        Actual results may vary based on user participation and market conditions.
      </p>
      
      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">Endless Mode Economic Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 space-y-4">
              <h4 className="text-xl font-semibold mb-2">Initial Game Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Initial Message Fee:</span>
                  <span className="text-primary font-bold">$10 USD (~0.033 BNB)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Growth Rate:</span>
                  <span className="text-primary font-bold">0.78% per message</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Maximum Fee Cap:</span>
                  <span className="text-primary font-bold">$500 USD (~1.67 BNB)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Initial Prize Pool:</span>
                  <span className="text-primary font-bold">$2,000 USD (~6.67 BNB)</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-2 p-3 bg-background/50 rounded-lg">
                <p className="font-medium mb-1">How It Works:</p>
                <p>Each message sent increases the fee by exactly 0.78% from the previous message fee, creating an exponential growth curve until reaching the $500 cap.</p>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20 mt-6">
              <h4 className="text-xl font-semibold mb-4">Revenue Distribution</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Current Prize Pool:</span>
                  <span className="text-secondary font-bold">60% of each message fee</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Next Iteration Pool:</span>
                  <span className="text-secondary font-bold">20% of each message fee</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Platform Revenue:</span>
                  <span className="text-secondary font-bold">20% of each message fee</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-4 p-3 bg-background/50 rounded-lg">
                <p className="font-medium mb-1">Example Calculation:</p>
                <p>For a $10 message fee:</p>
                <p>• $6 goes to current prize pool</p>
                <p>• $2 goes to next iteration pool</p>
                <p>• $2 goes to platform revenue</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
              <h4 className="text-xl font-semibold mb-4">System Evolution</h4>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-background/50">
                  <h5 className="font-medium mb-2">Successful Exploitation</h5>
                  <div className="text-sm">
                    <p className="mb-1">When a player successfully exploits the AI:</p>
                    <p className="text-accent">Successful Exploit → Analysis → Improved System Prompt → New Game with Next Iteration Prize Pool</p>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-background/50">
                  <h5 className="font-medium mb-2">Continued Challenge</h5>
                  <div className="text-sm">
                    <p className="mb-1">When no player succeeds:</p>
                    <p className="text-accent">Failure → Current Prize Pool Grows → Next Iteration Prize Pool Grows</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">1000 Message Simulation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <LineChart className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Message Fee Growth</h4>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={messageData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="messages" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Message Fee']} />
                    <Line 
                      type="monotone" 
                      dataKey="messageFee" 
                      name="Message Fee" 
                      stroke="#3498db" 
                      activeDot={{ r: 8 }} 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-muted-foreground text-center">
                <Info className="w-3 h-3 inline mr-1" />
                Message fee increases by 0.78% per message until reaching the $500 cap at around message #505
              </div>
            </div>
          </div>
          
          <div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-5 h-5 text-secondary" />
                <h4 className="font-medium">Prize Pool Growth</h4>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={messageData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="messages" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'USD']} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="prizePool" 
                      name="Prize Pool" 
                      stroke="#3498db" 
                      fill="#3498db" 
                      fillOpacity={0.3} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="nextIterationPool" 
                      name="Next Iteration Pool" 
                      stroke="#9b59b6" 
                      fill="#9b59b6" 
                      fillOpacity={0.3} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="teamPool" 
                      name="Platform Revenue" 
                      stroke="#2ecc71" 
                      fill="#2ecc71" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">Key Metrics at Different Message Counts</h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-6">
          The tables below show the economic outcomes if a player wins the game at different message counts.
          As the game progresses, both the prize pool and the next iteration&apos;s starting pool grow substantially.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
            <h4 className="text-xl font-semibold mb-4 text-center">Winner at 300 Messages</h4>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Message Fee</div>
                <div className="text-2xl font-bold">${message300.messageFee.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Prize Pool</div>
                <div className="text-2xl font-bold">${message300.prizePool.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Next Iteration Pool</div>
                <div className="text-2xl font-bold">${message300.nextIterationPool.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Platform Revenue</div>
                <div className="text-2xl font-bold">${message300.teamPool.toFixed(2)}</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
            <h4 className="text-xl font-semibold mb-4 text-center">Winner at 500 Messages</h4>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Message Fee</div>
                <div className="text-2xl font-bold">${message500.messageFee.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Prize Pool</div>
                <div className="text-2xl font-bold">${message500.prizePool.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Next Iteration Pool</div>
                <div className="text-2xl font-bold">${message500.nextIterationPool.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Platform Revenue</div>
                <div className="text-2xl font-bold">${message500.teamPool.toFixed(2)}</div>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-xl bg-accent/10 border border-accent/20">
            <h4 className="text-xl font-semibold mb-4 text-center">Winner at 1000 Messages</h4>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Message Fee</div>
                <div className="text-2xl font-bold">${message1000.messageFee.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">(Reached cap of $500)</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Prize Pool</div>
                <div className="text-2xl font-bold">${message1000.prizePool.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Next Iteration Pool</div>
                <div className="text-2xl font-bold">${message1000.nextIterationPool.toFixed(2)}</div>
              </div>
              <div className="p-3 rounded-lg bg-background/50">
                <div className="text-sm text-muted-foreground mb-1">Platform Revenue</div>
                <div className="text-2xl font-bold">${message1000.teamPool.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">150 Iteration Projection</h3>
        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-6">
          This projection shows the long-term growth of the Endless Mode over 150 iterations, 
          based on the initial parameters and actual simulation data. The data shows how prize pools 
          and participant counts evolve over time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h4 className="font-medium">Prize Pool Growth Over Iterations</h4>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={prizePoolData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="iteration" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: number) => [`$${(value * 1000).toFixed(2)}`, 'Prize Pool']} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      name="Prize Pool" 
                      stroke="#3498db" 
                      fill="#3498db" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="flex items-center gap-3 mb-3">
                <LineChart className="w-5 h-5 text-secondary" />
                <h4 className="font-medium">Participant Growth</h4>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={participantsData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="iteration" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: number, name) => [name === 'value' ? `${value} participants` : `${(value * 100).toFixed(1)}%`, name === 'value' ? 'Participants' : 'Growth Rate']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Participants" 
                      stroke="#9b59b6" 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="growth" 
                      name="Growth Rate" 
                      stroke="#2ecc71" 
                      strokeDasharray="5 5" 
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-muted-foreground text-center">
                <Info className="w-3 h-3 inline mr-1" />
                Note: Participant count fluctuates based on game difficulty and prize pool size
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 backdrop-blur-sm bg-background/50">
        <h3 className="text-2xl font-semibold mb-6 text-center">Platform Revenue & Detailed Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="w-5 h-5 text-accent" />
                <h4 className="font-medium">Platform Revenue Growth</h4>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={platformRevenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="iteration" />
                    <YAxis />
                    <RechartsTooltip formatter={(value: number) => [`$${(value * 1000).toFixed(2)}`, 'Platform Revenue']} />
                    <Bar dataKey="value" fill="#2ecc71" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div>
            <div className="p-6 rounded-xl bg-muted/50">
              <h4 className="text-lg font-semibold mb-4">Detailed Metrics</h4>
              <ScrollArea className="h-[300px] pr-4">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-background z-10">
                    <tr className="border-b border-muted-foreground/20">
                      <th className="text-left py-2">Iteration</th>
                      <th className="text-left py-2">Participants</th>
                      <th className="text-left py-2">Prize Pool (USD)</th>
                      <th className="text-left py-2">Platform Revenue (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailedMetricsData.map((row) => (
                      <tr key={row.iteration} className="border-b border-muted-foreground/10">
                        <td className="py-2">{row.iteration}</td>
                        <td className="py-2">{row.participants}</td>
                        <td className="py-2">${row.prizePool.toLocaleString()}</td>
                        <td className="py-2">${row.platformRevenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
              <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <h5 className="font-medium mb-2 text-emerald-500">Total Cumulative Platform Revenue</h5>
                <p className="text-2xl font-bold">$1,487,000 USD (~4,957 BNB)</p>
                <p className="text-sm text-muted-foreground">Based on 150 iterations with actual simulation data</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
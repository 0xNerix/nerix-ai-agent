"use client";

import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Info } from "lucide-react";

// Function to calculate message fee based on base fee and growth rate
const calculateMessageFee = (baseFeeBNB: number, growthRate: number, messageCount: number): number => {
  let fee = baseFeeBNB;
  
  for (let i = 1; i < messageCount; i++) {
    fee = fee * (1 + growthRate);
  }
  
  return fee;
};

// Function to generate data for the chart
const generateMessageFeeData = (
  baseFeeBNB: number = 0.033, // ~$10 USD
  growthRate: number = 0.0078, // 0.78%
  maxMessages: number = 1000,
  prizePoolShare: number = 0.6, // 60%
  nextIterationShare: number = 0.2, // 20%
  teamShare: number = 0.2 // 20%
) => {
  const data = [];
  let cumulativePrizePool = 0;
  let cumulativeNextIterationPool = 0;
  let cumulativeTeamPool = 0;
  
  // Generate data points at regular intervals
  const interval = maxMessages <= 100 ? 1 : maxMessages <= 500 ? 10 : 20;
  
  for (let i = 1; i <= maxMessages; i++) {
    const currentFee = calculateMessageFee(baseFeeBNB, growthRate, i);
    
    // Calculate distribution
    const toPrizePool = currentFee * prizePoolShare;
    const toNextIteration = currentFee * nextIterationShare;
    const toTeam = currentFee * teamShare;
    
    // Update cumulative values
    cumulativePrizePool += toPrizePool;
    cumulativeNextIterationPool += toNextIteration;
    cumulativeTeamPool += toTeam;
    
    // Only add data points at the specified interval to keep the chart manageable
    if (i % interval === 0 || i === 1 || i === maxMessages) {
      data.push({
        messages: i,
        messageFee: currentFee,
        prizePool: cumulativePrizePool,
        nextIterationPool: cumulativeNextIterationPool,
        teamPool: cumulativeTeamPool,
        totalFees: cumulativePrizePool + cumulativeNextIterationPool + cumulativeTeamPool
      });
    }
  }
  
  return data;
};

export function MessageFeeChart() {
  const messageData = generateMessageFeeData();
  
  return (
    <Card className="p-8 backdrop-blur-sm bg-background/50">
      <h3 className="text-2xl font-semibold mb-6 text-center">Message Fee Distribution (1000 Messages)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Message Fee Growth</h4>
              <div className="text-sm text-muted-foreground">0.78% increase per message</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={messageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="messages" 
                    label={{ value: 'Message Count', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'Fee (BNB)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(4) + ' BNB', 'Message Fee']} 
                    labelFormatter={(label) => `Message #${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="messageFee" 
                    name="Message Fee" 
                    stroke="#3498db" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <Info className="w-3 h-3 inline mr-1" />
              Starting at 0.033 BNB (~$10), each message fee increases by 0.78%
            </div>
          </div>
        </div>
        
        <div>
          <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold">Cumulative Distribution</h4>
              <div className="text-sm text-muted-foreground">60/20/20 split</div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={messageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="messages" 
                    label={{ value: 'Message Count', position: 'insideBottom', offset: -5 }} 
                  />
                  <YAxis 
                    label={{ value: 'Cumulative BNB', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(4) + ' BNB', '']} 
                    labelFormatter={(label) => `After ${label} Messages`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="prizePool" 
                    name="Prize Pool (60%)" 
                    stackId="1" 
                    stroke="#3498db" 
                    fill="#3498db" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="nextIterationPool" 
                    name="Next Iteration (20%)" 
                    stackId="1" 
                    stroke="#9b59b6" 
                    fill="#9b59b6" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="teamPool" 
                    name="Team Pool (20%)" 
                    stackId="1" 
                    stroke="#2ecc71" 
                    fill="#2ecc71" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <Info className="w-3 h-3 inline mr-1" />
              Distribution after 1000 messages with 0.78% growth rate
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="p-6 rounded-xl bg-muted/50">
          <h4 className="text-lg font-semibold mb-4">Key Metrics After 1000 Messages</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-primary/10">
              <div className="text-sm text-muted-foreground mb-1">Final Message Fee</div>
              <div className="text-2xl font-bold">{messageData[messageData.length - 1].messageFee.toFixed(4)} BNB</div>
              <div className="text-xs text-muted-foreground">~${(messageData[messageData.length - 1].messageFee * 300).toFixed(2)}</div>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10">
              <div className="text-sm text-muted-foreground mb-1">Prize Pool (60%)</div>
              <div className="text-2xl font-bold">{messageData[messageData.length - 1].prizePool.toFixed(4)} BNB</div>
              <div className="text-xs text-muted-foreground">~${(messageData[messageData.length - 1].prizePool * 300).toFixed(2)}</div>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10">
              <div className="text-sm text-muted-foreground mb-1">Next Iteration (20%)</div>
              <div className="text-2xl font-bold">{messageData[messageData.length - 1].nextIterationPool.toFixed(4)} BNB</div>
              <div className="text-xs text-muted-foreground">~${(messageData[messageData.length - 1].nextIterationPool * 300).toFixed(2)}</div>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10">
              <div className="text-sm text-muted-foreground mb-1">Team Pool (20%)</div>
              <div className="text-2xl font-bold">{messageData[messageData.length - 1].teamPool.toFixed(4)} BNB</div>
              <div className="text-xs text-muted-foreground">~${(messageData[messageData.length - 1].teamPool * 300).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
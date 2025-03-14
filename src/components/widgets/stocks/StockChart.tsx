
import React from 'react';
import { HistoricalData } from '@/utils/stockApi';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from 'recharts';
import { 
  ChartContainer
} from '@/components/ui/chart';

interface StockChartProps {
  data: HistoricalData[];
  lineColor: string;
}

export const StockChart: React.FC<StockChartProps> = ({ data, lineColor }) => {
  return (
    <ChartContainer 
      config={{
        price: {
          label: 'Price',
          theme: {
            light: lineColor,
            dark: lineColor,
          },
        }
      }}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 10 }}
          tickMargin={5}
        />
        <YAxis 
          width={50}
          domain={['auto', 'auto']}
          tickFormatter={(value) => `$${value.toFixed(0)}`}
          tick={{ fontSize: 10 }}
        />
        <Tooltip 
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const value = payload[0].value;
              return (
                <div className="bg-background p-2 border border-border rounded-md shadow-md">
                  <p className="text-xs">{`${payload[0].payload.date}`}</p>
                  <p className="text-xs font-medium">
                    {`Price: $${typeof value === 'number' ? value.toFixed(2) : value}`}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke={lineColor} 
          dot={false}
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
};

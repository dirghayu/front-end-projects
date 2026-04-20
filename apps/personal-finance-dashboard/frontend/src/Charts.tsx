import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie } from 'recharts';
import { Transaction } from './types';

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

function Charts({ transactions }: ChartsProps) {
  const barData = useMemo(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    return [
      { name: 'Income', amount: income },
      { name: 'Expenses', amount: expenses },
    ];
  }, [transactions]);

  const pieData = useMemo(() => {
    const byCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(byCategory).map(([name, value], index) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length],
    }));
  }, [transactions]);

  return (
    <div className="charts">
      <h2>Charts</h2>
      <div className="chart-container">
        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </div>
      <div className="chart-container">
        <PieChart width={400} height={300}>
          <Pie
            data={pieData}
            cx={200}
            cy={150}
            labelLine={false}
            label={({ name, percent }: { name?: string; percent?: number }) =>
              `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            outerRadius={80}
            dataKey="value"
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default Charts;

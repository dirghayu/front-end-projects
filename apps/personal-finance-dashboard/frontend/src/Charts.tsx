import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Transaction } from './types';

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'];

function Charts({ transactions }: ChartsProps) {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  const barData = [
    { name: 'Income', amount: income },
    { name: 'Expenses', amount: expenses },
  ];

  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce<Record<string, number>>((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.entries(expenseCategories).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

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
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default Charts;

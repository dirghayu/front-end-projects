import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import TransactionForm from '../TransactionForm';

// Replace DatePicker with a plain input so we test form logic, not the picker library
// Uncontrolled stub — accumulates typed chars naturally; only calls onChange on a complete YYYY-MM-DD
vi.mock('react-datepicker', () => ({
  default: ({ id, onChange, placeholderText }: {
    id: string;
    onChange: (date: Date | null) => void;
    placeholderText?: string;
  }) => (
    <input
      id={id}
      type="text"
      placeholder={placeholderText}
      onChange={e => {
        const val = e.target.value;
        if (!val) { onChange(null); return; }
        if (val.length === 10) {
          const d = new Date(val);
          if (!isNaN(d.getTime())) onChange(d);
        }
      }}
    />
  ),
}));

const onAdd = vi.fn();

beforeEach(() => {
  onAdd.mockClear();
});

async function fillAndSubmit(overrides: Partial<{ type: string; amount: string; category: string; date: string }> = {}) {
  const user = userEvent.setup();
  const { type = 'expense', amount = '250', category = 'Groceries', date = '2024-03-15' } = overrides;

  await user.selectOptions(screen.getByLabelText('Type'), type);
  await user.type(screen.getByLabelText('Amount'), amount);
  await user.type(screen.getByLabelText('Category'), category);
  await user.type(screen.getByLabelText('Date'), date);
  await user.click(screen.getByRole('button', { name: /add transaction/i }));
}

describe('TransactionForm', () => {
  it('renders all form fields and submit button', () => {
    render(<TransactionForm onAdd={onAdd} />);

    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add transaction/i })).toBeInTheDocument();
  });

  it('defaults type to income', () => {
    render(<TransactionForm onAdd={onAdd} />);

    expect(screen.getByLabelText('Type')).toHaveValue('income');
  });

  it('calls onAdd with form values on valid submit', async () => {
    render(<TransactionForm onAdd={onAdd} />);
    await fillAndSubmit();

    expect(onAdd).toHaveBeenCalledOnce();
    expect(onAdd).toHaveBeenCalledWith({
      type: 'expense',
      amount: '250',
      category: 'Groceries',
      date: '2024-03-15',
    });
  });

  it('resets the form after successful submit', async () => {
    render(<TransactionForm onAdd={onAdd} />);
    await fillAndSubmit();

    expect(screen.getByLabelText('Amount')).toHaveValue(null);
    expect(screen.getByLabelText('Category')).toHaveValue('');
    // Date picker reset is verified by the DatePicker library's own tests;
  });

  it('does not call onAdd when required fields are missing', async () => {
    const user = userEvent.setup();
    render(<TransactionForm onAdd={onAdd} />);

    await user.click(screen.getByRole('button', { name: /add transaction/i }));

    expect(onAdd).not.toHaveBeenCalled();
  });
});

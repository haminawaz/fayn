export function calculateInstallmentAmount(
  price: number,
  downPaymentPercentage: number,
  durationYears: number,
  frequency: string
): number {
  const downPayment = (price * downPaymentPercentage) / 100;
  const remainingAmount = price - downPayment;
  
  const frequencyMultiplier = getFrequencyMultiplier(frequency);
  const totalInstallments = durationYears * frequencyMultiplier;
  
  const installmentAmount = remainingAmount / totalInstallments;
  
  // Round to nearest 10 to end with 0
  return Math.round(installmentAmount / 10) * 10;
}

export function getFrequencyMultiplier(frequency: string): number {
  switch (frequency.toLowerCase()) {
    case 'monthly':
      return 12;
    case 'bi-monthly':
      return 6;
    case 'quarterly':
      return 4;
    case 'semi-annually':
      return 2;
    case 'annually':
      return 1;
    default:
      return 12;
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateInstallments(
  price: number,
  downPaymentPercentage: number,
  durationYears: number,
  frequency: string,
  startDate: Date = new Date()
): any[] {
  const installmentAmount = calculateInstallmentAmount(price, downPaymentPercentage, durationYears, frequency);
  const frequencyMultiplier = getFrequencyMultiplier(frequency);
  const totalInstallments = durationYears * frequencyMultiplier;
  
  const installments = [];
  const currentDate = new Date(startDate);
  
  for (let i = 0; i < totalInstallments; i++) {
    const dueDate = new Date(currentDate);
    
    switch (frequency.toLowerCase()) {
      case 'monthly':
        dueDate.setMonth(dueDate.getMonth() + i);
        break;
      case 'bi-monthly':
        dueDate.setMonth(dueDate.getMonth() + (i * 2));
        break;
      case 'quarterly':
        dueDate.setMonth(dueDate.getMonth() + (i * 3));
        break;
      case 'semi-annually':
        dueDate.setMonth(dueDate.getMonth() + (i * 6));
        break;
      case 'annually':
        dueDate.setFullYear(dueDate.getFullYear() + i);
        break;
    }
    
    installments.push({
      id: `inst-${i + 1}`,
      number: i + 1,
      amount: installmentAmount,
      dueDate: dueDate.toISOString().split('T')[0],
      status: 'pending' as const
    });
  }
  
  return installments;
}
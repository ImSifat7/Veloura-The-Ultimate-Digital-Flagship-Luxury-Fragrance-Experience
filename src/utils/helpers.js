/**
 * Currency Formatter
 */
export const formatCurrency = (amount, symbol = '$') => {
  return `${symbol}${Number(amount).toFixed(2)}`;
};

/**
 * Date Formatter
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Generate a simple unique order ID
 */
export const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VLR-${timestamp}-${random}`;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (str, maxLength = 80) => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

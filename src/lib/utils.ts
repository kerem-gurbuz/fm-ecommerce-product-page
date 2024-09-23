import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates the current price of a product based on its original price and discount percentage.
 *
 * @param {number} originalPrice - The original price of the product.
 * @param {number | undefined} discountPercentage - The discount percentage (0-100). If undefined, no discount is applied.
 * @returns {number} The calculated current price after applying the discount.
 * @throws {RangeError} If the discount percentage is less than 0 or greater than 100.
 *
 * @example
 * calculateCurrentPrice(100, 10); // Returns 90
 * @example
 * calculateCurrentPrice(100); // Returns 100 (no discount)
 * @example
 * calculateCurrentPrice(100, 101); // Throws RangeError
 */
export const calculateCurrentPrice = (
  originalPrice: number,
  discountPercentage?: number,
): number => {
  if (discountPercentage === undefined) {
    return originalPrice;
  }
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new RangeError(
      `Discount percentage must be between 0 and 100, not ${discountPercentage}`,
    );
  }
  return originalPrice * (1 - discountPercentage / 100);
};

const CACHE_DURATION = 3600000; // 1 hour cache

let ratesCache = null;
let lastFetchTime = 0;

export async function getExchangeRates() {
  // Return cached rates if still valid
  if (ratesCache && Date.now() - lastFetchTime < CACHE_DURATION) {
    return ratesCache;
  }

  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    if (!response.ok) throw new Error('Failed to fetch rates');
    
    const data = await response.json();
    ratesCache = data.rates;
    lastFetchTime = Date.now();
    return ratesCache;
  } catch (error) {
    console.error('Currency API error:', error);
    // Fallback rates if API fails
    return {
      USD: 1.07,
      PLN: 4.35,
      EUR: 1
    };
  }
}

export function convertAmount(amountInEUR, toCurrency, rates) {
  if (toCurrency === "EUR") return amountInEUR;
  if (!rates[toCurrency]) return amountInEUR; 

  const value= amountInEUR * rates[toCurrency];
  return Number(value.toFixed(2));
}
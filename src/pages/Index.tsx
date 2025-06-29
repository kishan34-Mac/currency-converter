
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, TrendingUp, Globe, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Popular currencies with their symbols
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' }
  ];

  // Mock exchange rates for demo (in a real app, you'd use an API like exchangerate-api.com)
  const mockExchangeRates = {
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-JPY': 110.0,
    'USD-CAD': 1.25,
    'USD-AUD': 1.35,
    'USD-CHF': 0.92,
    'USD-CNY': 6.45,
    'USD-INR': 74.5,
    'USD-BRL': 5.2,
    'EUR-USD': 1.18,
    'GBP-USD': 1.37,
    'JPY-USD': 0.0091,
    'CAD-USD': 0.80,
    'AUD-USD': 0.74,
    'CHF-USD': 1.09,
    'CNY-USD': 0.155,
    'INR-USD': 0.0134,
    'BRL-USD': 0.192
  };

  const convertCurrency = async () => {
    if (!amount || !fromCurrency || !toCurrency) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const key = `${fromCurrency}-${toCurrency}`;
      const reverseKey = `${toCurrency}-${fromCurrency}`;
      
      let rate = mockExchangeRates[key];
      if (!rate && mockExchangeRates[reverseKey]) {
        rate = 1 / mockExchangeRates[reverseKey];
      }
      if (!rate) {
        // Default conversion through USD
        const toUSD = mockExchangeRates[`${fromCurrency}-USD`] || 1;
        const fromUSD = mockExchangeRates[`USD-${toCurrency}`] || 1;
        rate = toUSD * fromUSD;
      }
      
      const convertedAmount = (parseFloat(amount) * rate).toFixed(2);
      setResult(convertedAmount);
      setExchangeRate(rate);
      setLoading(false);
      
      toast({
        title: "Conversion Complete!",
        description: `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`,
      });
    }, 1000);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result) {
      setAmount(result);
      setResult(amount);
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white opacity-10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            Currency Converter
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Convert currencies in real-time with live exchange rates
          </p>
        </div>

        {/* Converter Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Live Exchange Rate
              </CardTitle>
              <CardDescription className="text-white/70">
                Get instant currency conversions with competitive rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-white font-medium">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 text-lg h-12"
                />
              </div>

              {/* Currency Selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-white font-medium">From</label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code} className="text-white hover:bg-gray-800">
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={swapCurrencies}
                    variant="outline"
                    size="icon"
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 h-12 w-12"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-white font-medium">To</label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code} className="text-white hover:bg-gray-800">
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Result */}
              {result && (
                <div className="bg-white/20 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {result} {toCurrency}
                  </div>
                  <div className="text-white/70">
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </div>
                </div>
              )}

              {/* Convert Button */}
              <Button 
                onClick={convertCurrency}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium h-12 text-lg"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Converting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Convert Currency
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Rates</h3>
              <p className="text-white/70 text-sm">
                Get the most accurate exchange rates updated in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Global Coverage</h3>
              <p className="text-white/70 text-sm">
                Support for major currencies from around the world
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-pink-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-white/70 text-sm">
                Instant conversions with a beautiful, responsive interface
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;

import { LucideIcon, Calculator, Calendar, Dices, Percent, TrendingUp, Sigma, Ruler, Tag, Banknote, Receipt, Activity, Scale, Clock, Wallet, Search } from 'lucide-react';
import { ComponentType } from 'react';
import { BlackjackCalculator } from '../components/calculators/BlackjackCalculator';
import { CompoundInterestCalculator } from '../components/calculators/CompoundInterestCalculator';
import { AverageCalculator } from '../components/calculators/AverageCalculator';
import { LengthConverter } from '../components/calculators/LengthConverter';
import { DiscountCalculator } from '../components/calculators/DiscountCalculator';
import { TipCalculator } from '../components/calculators/TipCalculator';
import { RatioCalculator } from '../components/calculators/RatioCalculator';
import { RecipeVolumeConverter } from '../components/calculators/RecipeVolumeConverter';
import { SalesTaxCalculator } from '../components/calculators/SalesTaxCalculator';
import { VatCalculator } from '../components/calculators/VatCalculator';
import { BmiCalculator } from '../components/calculators/BmiCalculator';
import { MarkupCalculator } from '../components/calculators/MarkupCalculator';
import { PercentageCalculator } from '../components/calculators/PercentageCalculator';
import { PercentageChangeCalculator } from '../components/calculators/PercentageChangeCalculator';
import { ProfitMarginCalculator } from '../components/calculators/ProfitMarginCalculator';
import { WeightConverter } from '../components/calculators/WeightConverter';
import { TemperatureConverter } from '../components/calculators/TemperatureConverter';
import { CommissionCalculator } from '../components/calculators/CommissionCalculator';
import { RandomNumberGenerator } from '../components/calculators/RandomNumberGenerator';
import { HoursWorkedCalculator } from '../components/calculators/HoursWorkedCalculator';
import { DateTimeDifferenceCalculator } from '../components/calculators/DateTimeDifferenceCalculator';
import { AgeCalculator } from '../components/calculators/AgeCalculator';
import { UnitPriceCalculator } from '../components/calculators/UnitPriceCalculator';
import { SquareFootageCalculator } from '../components/calculators/SquareFootageCalculator';
import { DaysUntilDateCalculator } from '../components/calculators/DaysUntilDateCalculator';
import { SimpleInterestCalculator } from '../components/calculators/SimpleInterestCalculator';
import { ClickCounter } from '../components/calculators/ClickCounter';
import { LoanPaymentCalculator } from '../components/calculators/LoanPaymentCalculator';
import { SavingsGoalCalculator } from '../components/calculators/SavingsGoalCalculator';
import { SalaryAfterTaxCalculator } from '../components/calculators/SalaryAfterTaxCalculator';
import { InflationCalculator } from '../components/calculators/InflationCalculator';
import { TexasHoldemOddsCalculator } from '../components/calculators/TexasHoldemOddsCalculator';
import { RetirementCalculator } from '../components/calculators/RetirementCalculator';
import { APRCalculator } from '../components/calculators/APRCalculator';
import { MortgageCalculator } from '../components/calculators/MortgageCalculator';
import { PaybackPeriodCalculator } from '../components/calculators/PaybackPeriodCalculator';
import { LoanToValueCalculator } from '../components/calculators/LoanToValueCalculator';
import { DebtToIncomeCalculator } from '../components/calculators/DebtToIncomeCalculator';
import { RuleOf72Calculator } from '../components/calculators/RuleOf72Calculator';
import { ROICalculator } from '../components/calculators/ROICalculator';
import { BreakEvenCalculator } from '../components/calculators/BreakEvenCalculator';
import { GrossProfitCalculator } from '../components/calculators/GrossProfitCalculator';
import { NetProfitCalculator } from '../components/calculators/NetProfitCalculator';
import { FractionCalculator } from '../components/calculators/FractionCalculator';
import { ProportionCalculator } from '../components/calculators/ProportionCalculator';
import { ScientificNotationCalculator } from '../components/calculators/ScientificNotationCalculator';
import { ExponentCalculator } from '../components/calculators/ExponentCalculator';
import { AbsoluteValueCalculator } from '../components/calculators/AbsoluteValueCalculator';
import { ReciprocalCalculator } from '../components/calculators/ReciprocalCalculator';
import { SquareRootCalculator } from '../components/calculators/SquareRootCalculator';
import { NthRootCalculator } from '../components/calculators/NthRootCalculator';
import { CubeRootCalculator } from '../components/calculators/CubeRootCalculator';
import { GcfCalculator } from '../components/calculators/GcfCalculator';
import { LcmCalculator } from '../components/calculators/LcmCalculator';
import { DecimalToFractionCalculator } from '../components/calculators/DecimalToFractionCalculator';
import { FractionToDecimalCalculator } from '../components/calculators/FractionToDecimalCalculator';
import { ImproperFractionToMixedNumberCalculator } from '../components/calculators/ImproperFractionToMixedNumberCalculator';
import { SimplifyFractionsCalculator } from '../components/calculators/SimplifyFractionsCalculator';
import { MixedNumberToImproperFractionCalculator } from '../components/calculators/MixedNumberToImproperFractionCalculator';
import { RoundingCalculator } from '../components/calculators/RoundingCalculator';
import { SigFigCalculator } from '../components/calculators/SigFigCalculator';
import { PrimeNumberCalculator } from '../components/calculators/PrimeNumberCalculator';
import { FactorsCalculator } from '../components/calculators/FactorsCalculator';
import { DivisibilityCalculator } from '../components/calculators/DivisibilityCalculator';
import { CommonFactorsCalculator } from '../components/calculators/CommonFactorsCalculator';
import { PrimeFactorizationCalculator } from '../components/calculators/PrimeFactorizationCalculator';
import { EvenOrOddCalculator } from '../components/calculators/EvenOrOddCalculator';
import { DecimalToPercentCalculator } from '../components/calculators/DecimalToPercentCalculator';
import { VatReverseCalculator } from '../components/calculators/VatReverseCalculator';
import { SalesTaxReverseCalculator } from '../components/calculators/SalesTaxReverseCalculator';
import { SalesTaxRateCalculator } from '../components/calculators/SalesTaxRateCalculator';
import { CreditCardPayoffCalculator } from '../components/calculators/CreditCardPayoffCalculator';
import { InvestmentCalculator } from '../components/calculators/InvestmentCalculator'; 
import { DebtPayoffCalculator } from '../components/calculators/DebtPayoffCalculator';
import { InterestRateCalculator } from '../components/calculators/InterestRateCalculator';
import { SalaryHourlyCalculator } from '../components/calculators/SalaryHourlyCalculator';
import { CalorieCalculator } from '../components/calculators/CalorieCalculator';
import { TimeZoneConverter } from '../components/calculators/TimeZoneConverter';
import { LoanAffordabilityCalculator } from '../components/calculators/LoanAffordabilityCalculator';



export interface ToolConfig {
  /** Unique slug — matches the route path segment */
  id: string;
  /** Display name */
  name: string;
  /** One-line description shown on the homepage card */
  description: string;
  /** Full URL path */
  href: string;
  /** Lucide icon component */
  icon: LucideIcon;
  /** Whether the tool is live. false = "Coming Soon" card on homepage */
  available: boolean;
  /** The category this tool belongs to */
  category: 'Finance' | 'Math' | 'Probability' | 'Conversions' | 'Random Generators' | 'Game Calculators' | 'Health' | 'Date & Time';
  /** Short paragraph shown in the "How it works" section */
  howItWorks: string;
  /** Array of example usage bullet points */
  exampleUsage: string[];
  /** IDs of related tools (from this same list) */
  relatedTools: string[];
  /** The actual calculator component UI */
  component?: ComponentType;
  /** Optional custom SEO title */
  seoTitle?: string;
  /** Optional custom SEO meta description */
  seoDescription?: string;
  /** Optional long-form paragraph shown in the "About this calculator" section below the calculator UI */
  aboutText?: string;
  /** Optional step-by-step list shown in the "How to use" section below the calculator UI */
  howToUse?: string[];
    /** Optional FAQ section shown below Example Usage */
  faq?: {
    question: string;
    answer: string;
  }[];
  /** Optional title for the Formula section (defaults to "Formula") */
  formulaTitle?: string;
  /** The formula expression displayed in a monospace block */
  formulaExpression?: string;
  /** Optional plain-English explanation shown below the formula expression */
  formulaExplanation?: string;
}

export const CATEGORY_META: Record<ToolConfig['category'], { slug: string; title: string; description: string }> = {
  'Finance': {
    slug: 'finance-calculators',
    title: 'Online Finance Calculators',
    description: 'A collection of easy-to-use finance calculators for business, loans, taxes, and interest. SoftwareCalc helps you calculate sales tax, VAT, profit margins, markups, and commission instantly online.'
  },
  'Math': {
    slug: 'math-calculators',
    title: 'Online Math Calculators',
    description: 'Solve common math problems with our online calculators. From simplifying ratios and calculating averages to finding percentages and discounts, SoftwareCalc makes math simple and fast.'
  },
  'Probability': {
    slug: 'probability-calculators',
    title: 'Online Probability Calculators',
    description: 'Calculate odds and probabilities for games and statistics. Our probability tools help you understand the likelihood of different outcomes with precise, easy-to-use calculators.'
  },
  'Conversions': {
    slug: 'conversion-calculators',
    title: 'Online Conversion Calculators',
    description: 'Convert between different units of measurement effortlessly. Whether you are converting weight, length, temperature, or recipe volumes, SoftwareCalc provides accurate conversions for common units.'
  },
  'Random Generators': {
    slug: 'random-generators',
    title: 'Online Random Generators',
    description: 'Generate random numbers and outcomes with our online randomizer tools. Perfect for games, decision making, or any situation where you need a neutral, random result.'
  },
  'Game Calculators': {
    slug: 'game-calculators',
    title: 'Online Game Calculators',
    description: 'Optimize your gameplay with our specialized game calculators. SoftwareCalc provides tools like the Blackjack Stat Helper to help you make smarter decisions based on real odds and strategies.'
  },
  'Health': {
    slug: 'health-calculators',
    title: 'Online Health Calculators',
    description: 'Monitor your fitness and health metrics with our simple health calculators. Use our BMI calculator to track your body mass index and stay informed about your physical well-being.'
  },
  'Date & Time': {
    slug: 'date-time-calculators',
    title: 'Online Date & Time Calculators',
    description: 'Calculate time differences, work hours, and earnings with ease. SoftwareCalc helps you track shifts and calculate total pay based on hours worked and hourly rates.'
  }
};

/**
 * TOOLS REGISTRY
 * ──────────────
 * To add a new tool:
 *  1. Create the calculator component in src/components/calculators/
 *  2. Add a registry entry here in src/lib/tools.ts
 *  3. Set the component field to the imported calculator component
 *
 * Routes, tool pages, breadcrumbs, structured data, and category pages
 * are generated automatically from this registry.
 *
 * Every new tool should include:
 * - aboutText
 * - howToUse
 * - seoTitle
 * - seoDescription
 */
export const TOOLS: ToolConfig[] = [
{
  id: 'recipe-volume-converter',
  name: 'Recipe Volume Converter',
  description: 'Convert common cooking measurements such as cups, tablespoons, teaspoons, milliliters, deciliters, and liters.',
    aboutText: 'The Recipe Volume Converter helps you convert common cooking and baking measurements quickly and accurately. It is useful when following recipes from different countries, adjusting serving sizes, or converting between metric and kitchen volume units. Many recipes use different measurement systems, so this tool makes it easy to convert cups, tablespoons, teaspoons, milliliters, deciliters, and liters in seconds. For other kitchen conversions, you may also find the [Weight Converter](/weight-converter) or [Temperature Converter](/temperature-converter) helpful.',
  howToUse: [
    'Enter the amount you want to convert.',
    'Choose the unit to convert from.',
    'Choose the unit to convert to.',
    'View the converted measurement instantly.'
  ],
  href: '/recipe-volume-converter',
  icon: Ruler,
  available: true,
  category: 'Conversions',
  howItWorks:
    'Enter the amount and select the units you want to convert from and to. The tool uses milliliters as a base unit to provide accurate volume conversions for common cooking measurements.',
  exampleUsage: [
    '1 US Cup to Milliliters → 236.59 ml',
    '3 Tablespoons to Teaspoons → 9.00 tsp',
    '500 Milliliters to Liters → 0.50 L',
  ],
  relatedTools: ['temperature-converter', 'weight-converter', 'length-converter'],
  component: RecipeVolumeConverter,
  seoTitle: 'Recipe Volume Converter – Cooking Measurement Converter | SoftwareCalc',
  seoDescription:
    'Easily convert between cups, tablespoons, teaspoons, milliliters, deciliters, and liters. Perfect for resizing recipes and standardizing measurements.',
},
  {
    id: 'temperature-converter',
    name: 'Temperature Converter',
    description: 'Convert temperatures between Celsius, Fahrenheit, and Kelvin.',
    aboutText: 'The Temperature Converter lets you quickly convert temperatures between Celsius, Fahrenheit, and Kelvin. These units are commonly used in weather reports, science, and engineering across different countries. Instead of remembering conversion formulas, this tool calculates the correct temperature instantly. It is useful for students, travelers, and anyone working with temperature measurements. If you also need to convert other types of measurements, you may find the [Weight Converter](/weight-converter) or [Length Converter](/length-converter) helpful.',
    howToUse: [
    'Enter the temperature value you want to convert.',
    'Choose the unit you are converting from.',
    'Select the unit you want to convert to.',
    'View the converted temperature instantly.'
  ],
    href: '/temperature-converter',
    icon: Ruler,
    available: true,
    category: 'Conversions',
    howItWorks:
      'Enter a temperature value and select the units you want to convert from and to. The tool uses standard scientific conversion formulas to calculate the equivalent temperature in the target unit.',
    exampleUsage: [
      '25°C to Fahrenheit → 77.00°F',
      '100°F to Celsius → 37.78°C',
      '0°C to Kelvin → 273.15K',
    ],
    relatedTools: ['weight-converter', 'length-converter'],
    component: TemperatureConverter,
    seoTitle: 'Online Temperature Converter | Celsius, Fahrenheit, Kelvin | SoftwareCalc',
    seoDescription:
      'Free online temperature converter. Convert between Celsius, Fahrenheit, and Kelvin instantly with precise formulas.',
  },
  {
    id: 'weight-converter',
    name: 'Weight Converter',
    description: 'Convert between kilograms, grams, pounds, and ounces.',
    aboutText: 'The Weight Converter helps you quickly convert between common weight and mass units such as kilograms, grams, pounds, and ounces. It is useful for cooking, fitness, shipping, travel, and everyday measurements. Instead of converting units manually, this tool instantly gives you the correct result across both metric and imperial systems. If you also need to convert cooking measurements or other units, you may find the [Recipe Volume Converter](/recipe-volume-converter) or [Length Converter](/length-converter) helpful.',
howToUse: [
  'Enter the weight value you want to convert.',
  'Choose the unit you are converting from.',
  'Select the unit you want to convert to.',
  'View the converted weight instantly.'
],
    href: '/weight-converter',
    icon: Scale,
    available: true,
    category: 'Conversions',
    howItWorks:
      'Enter a weight value and select the units you want to convert from and to. The tool uses standard conversion factors to calculate the equivalent weight in the target unit.',
    exampleUsage: [
      '1 kg to lb → 2.2046 lb',
      '5 lb to g → 2267.9619 g',
      '100 oz to kg → 2.8350 kg',
    ],
    relatedTools: ['length-converter', 'temperature-converter', 'recipe-volume-converter'],
    component: WeightConverter,
    seoTitle: 'Weight Converter – Convert KG, LB, G, OZ | SoftwareCalc',
    seoDescription:
      'Free online weight converter. Convert between kilograms, grams, pounds, and ounces instantly with precision.',
  },
  {
    id: 'sales-tax-calculator',
    name: 'Sales Tax Calculator',
    description: 'Calculate the tax amount and final price based on a sales tax percentage.',
    aboutText: 'The Sales Tax Calculator helps you quickly determine the tax amount and final price of a purchase based on a sales tax percentage. It is useful for shopping, budgeting, invoicing, and estimating the total cost of goods before checkout. Instead of calculating taxes manually, the tool instantly adds the correct tax amount to the original price. This makes it helpful for consumers, small businesses, and anyone working with tax-inclusive pricing. If you need to calculate value-added tax in other regions, you may also find the [VAT Calculator](/vat-calculator) helpful. For pricing adjustments such as discounts, the [Discount Calculator](/discount-calculator) can also be useful.',
howToUse: [
  'Enter the original price of the item or service.',
  'Input the sales tax percentage.',
  'Click calculate or view the result instantly.',
  'See the tax amount and the final total price including tax.'
],
    href: '/sales-tax-calculator',
    icon: Receipt,
    available: true,
    category: 'Finance',
    howItWorks:
      'Enter the price before tax and the sales tax rate. The calculator multiplies the price by the tax rate to find the tax amount, then adds it to the original price for the total cost.',
    exampleUsage: [
      '$100 at 8.25% tax → Tax $8.25, Total $108.25',
      '$50 at 10% tax → Tax $5.00, Total $55.00',
    ],
    relatedTools: ['vat-calculator', 'markup-calculator', 'discount-calculator'],
    component: SalesTaxCalculator,
    seoTitle: 'Sales Tax Calculator Online | Calculate Tax & Total Price | SoftwareCalc',
    seoDescription:
      'Free online sales tax calculator. Enter a price and tax rate to instantly calculate the sales tax amount and total price including tax.',
  },
  {
    id: 'percentage-change-calculator',
    name: 'Percentage Change Calculator',
    description: 'Calculate percentage increase or decrease between two values.',
    aboutText: 'The Percentage Change Calculator helps you measure how much a value has increased or decreased compared to its original amount. It calculates the percentage difference between two numbers, making it useful for analyzing price changes, financial growth, statistics, and data trends. Instead of manually applying formulas, this tool instantly determines whether the result is an increase or decrease. It is commonly used in finance, business analysis, education, and everyday calculations. If you need to perform other percentage operations, you may also find the [Percentage Calculator](/percentage-calculator) useful. For comparing proportions between numbers, the [Ratio Calculator](/ratio-calculator) can also help.',
    howToUse: [
      'Enter the original starting value.',
      'Enter the new value you want to compare.',
      'View the calculated percentage increase or decrease instantly.',
      'Use the result to understand the relative change between the two numbers.'
    ],
    href: '/percentage-change-calculator',
    icon: TrendingUp,
    available: true,
    category: 'Math',
    howItWorks:
      'Percentage change measures the relative difference between an original value and a new value. It is calculated by taking the difference between the two values, dividing by the absolute original value, and multiplying by 100.',
    exampleUsage: [
      'Original 50, New 75 → 50% increase',
      'Original 100, New 80 → 20% decrease',
      'Original 200, New 200 → 0% change',
    ],
    relatedTools: ['percentage-calculator', 'discount-calculator', 'ratio-calculator'],
    component: PercentageChangeCalculator,
    seoTitle: 'Percentage Change Calculator | Percentage Increase & Decrease | SoftwareCalc',
    seoDescription:
      'Free online percentage change calculator. Quickly calculate percentage increase or decrease between two numbers and understand the relative difference instantly.',
  },
  {
    id: 'profit-margin-calculator',
    name: 'Profit Margin Calculator',
    description: 'Calculate profit and profit margin percentage based on revenue and cost.',
    aboutText: 'The Profit Margin Calculator helps you determine how much profit you make from a sale and what percentage of revenue that profit represents. It compares revenue and cost to calculate both the absolute profit and the profit margin percentage. This tool is useful for business owners, freelancers, and anyone analyzing product pricing or profitability. It also works well alongside the [Markup Calculator](/markup-calculator) when setting prices and the [Commission Calculator](/commission-calculator) when evaluating sales earnings.',
    howToUse: [
      'Enter the total revenue or selling price.',
      'Enter the cost associated with producing or purchasing the item.',
      'View the calculated profit amount instantly.',
      'See the profit margin percentage to understand your profitability.'
    ],
    href: '/profit-margin-calculator',
    icon: TrendingUp,
    available: true,
    category: 'Finance',
    howItWorks:
      'Profit Margin is a measure of profitability. It is calculated by subtracting cost from revenue to find the profit, and then dividing that profit by the revenue to find the margin percentage.',
    exampleUsage: [
      'Revenue $100, Cost $75 → Profit $25, Margin 25%',
      'Revenue $200, Cost $150 → Profit $50, Margin 25%',
    ],
    relatedTools: ['markup-calculator', 'commission-calculator', 'vat-calculator'],
    component: ProfitMarginCalculator,
    seoTitle: 'Profit Margin Calculator Online | Calculate Profit & Margin % | SoftwareCalc',
    seoDescription:
      'Free online profit margin calculator. Enter revenue and cost to instantly calculate profit and profit margin percentage for your business.',
  },
  {
    id: 'markup-calculator',
    name: 'Markup Calculator',
    description: 'Calculate selling price, markup percentage, and profit based on product cost.',
    aboutText: 'The Markup Calculator helps you determine the selling price of a product based on its cost and a markup percentage. It shows how much profit you will earn and what the final selling price should be. This tool is commonly used in retail, e-commerce, and product pricing to ensure items are sold at a profitable margin. It also works well with the [Profit Margin Calculator](/profit-margin-calculator) when analyzing profitability and the [Discount Calculator](/discount-calculator) when planning promotional pricing.',
    howToUse: [
      'Enter the cost of the item or product.',
      'Input the markup percentage you want to apply.',
      'View the calculated selling price instantly.',
      'See the resulting profit based on the markup applied.'
    ],
    href: '/markup-calculator',
    icon: Calculator,
    available: true,
    category: 'Finance',
    howItWorks:
      'Enter the cost of the item and the markup percentage you want to apply. The calculator determines the selling price by adding the markup amount to the cost, and also shows the total profit.',
    exampleUsage: [
      'Cost $100 with 25% markup → Selling Price $125, Profit $25',
      'Cost $50 with 100% markup → Selling Price $100, Profit $50',
    ],
    faq: [
  {
    question: 'What is the difference between markup and profit margin?',
    answer: 'Markup is based on cost, while profit margin is based on selling price. Markup determines how much you add to your cost price, while profit margin shows how much of the final selling price is actual profit.'
  },
  {
    question: 'How do I calculate selling price using markup?',
    answer: 'To calculate selling price, add the markup percentage to the original cost. For example, if an item costs $100 and you apply a 25% markup, the selling price becomes $125.'
  },
  {
    question: 'Is 100% markup the same as doubling the price?',
    answer: 'Yes. A 100% markup means you add the full cost amount again, so a product that costs $50 would be sold for $100.'
  },
  {
    question: 'Should I use markup or profit margin for pricing?',
    answer: 'Businesses often use markup when setting prices because it is based on cost. Profit margin is more useful for analyzing profitability after the selling price has been set. Many businesses use both together for better pricing decisions.'
  }
],
    relatedTools: ['profit-margin-calculator', 'vat-calculator', 'discount-calculator'],
    component: MarkupCalculator,
    seoTitle: 'Markup Calculator Online | Calculate Selling Price & Profit | SoftwareCalc',
    seoDescription: 'Free online markup calculator. Enter cost and markup percentage to instantly calculate selling price, profit, and product pricing.',
  },
  {
    id: 'commission-calculator',
    name: 'Commission Calculator',
    description: 'Calculate commission amount and remaining amount based on a sale value and commission percentage.',
    aboutText: 'The Commission Calculator helps you quickly determine how much commission is earned from a sale and how much remains after the commission is deducted. It calculates the commission amount based on a percentage of the total sale value. This tool is commonly used in sales, real estate, affiliate marketing, and brokerage industries where earnings depend on commission rates. It also pairs well with the [Percentage Calculator](/percentage-calculator) when working with percentage-based earnings and the [Profit Margin Calculator](/profit-margin-calculator) when analyzing profitability from sales.',
    howToUse: [
      'Enter the total sale amount.',
      'Input the commission percentage.',
      'View the calculated commission amount instantly.',
      'See the remaining amount after the commission is deducted.'
    ],
    href: '/commission-calculator',
    icon: Banknote,
    available: true,
    category: 'Finance',
    howItWorks:
      'Enter the total sale amount and the commission percentage. The calculator determines the commission amount by multiplying the sale amount by the commission rate, and also shows the remaining balance after the commission is deducted.',
    exampleUsage: [
      '$1,000 sale with 5% commission → Commission $50, Remaining $950',
      '$5,000 sale with 10% commission → Commission $500, Remaining $4,500',
    ],
    relatedTools: ['profit-margin-calculator', 'markup-calculator', 'sales-tax-calculator'],
    component: CommissionCalculator,
    seoTitle: 'Commission Calculator Online | Calculate Sales Commission | SoftwareCalc',
    seoDescription: 'Free online commission calculator. Enter a sale amount and commission percentage to instantly calculate commission earnings and the remaining balance.',
  },
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) using your height and weight.',
    aboutText: 'The BMI Calculator helps you estimate your Body Mass Index using your height and weight. BMI is a widely used measurement that helps indicate whether a person has a healthy body weight for their height. This tool calculates your BMI instantly and shows the category your result falls into, such as underweight, normal weight, overweight, or obese. It is commonly used for general health assessments and fitness tracking. If you need to convert body weight units before calculating, you can use the [Weight Converter](/weight-converter).',
    howToUse: [
      'Enter your weight in kilograms.',
      'Enter your height in centimeters or meters.',
      'View your calculated BMI instantly.',
      'See the health category associated with your BMI result.'
    ],
    href: '/bmi-calculator',
    icon: Activity,
    available: true,
    category: 'Health',
    howItWorks:
      'Body Mass Index (BMI) is a measurement of a person\'s leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. The calculator uses the formula BMI = weight(kg) / height(m)² and categorizes the result based on standard WHO guidelines.',
    exampleUsage: [
      'Weight 70kg, Height 175cm → BMI 22.9 (Normal)',
      'Weight 90kg, Height 180cm → BMI 27.8 (Overweight)',
      'Weight 50kg, Height 165cm → BMI 18.4 (Underweight)',
    ],
    relatedTools: ['weight-converter', 'length-converter'],
    component: BmiCalculator,
    seoTitle: 'BMI Calculator Online | Body Mass Index & Health Category | SoftwareCalc',
    seoDescription:
      'Free online BMI calculator. Enter your height and weight to instantly calculate your Body Mass Index and see your BMI health category.',
  },
  {
    id: 'vat-calculator',
    name: 'VAT Calculator',
    description: 'Calculate VAT amount and total price including tax.',
    aboutText: 'The VAT Calculator helps you quickly determine the value-added tax (VAT) amount and the final price including tax. It calculates how much tax is added to a product or service based on a given VAT percentage. This tool is useful for businesses, freelancers, and consumers who need to understand pricing with tax applied. It simplifies VAT calculations and helps ensure accurate totals when invoicing or budgeting. If you are calculating tax on retail purchases, you may also find the [Sales Tax Calculator](/sales-tax-calculator) helpful.',
    howToUse: [
      'Enter the original price before VAT.',
      'Input the VAT percentage rate.',
      'View the calculated VAT amount instantly.',
      'See the total price including VAT.'
    ],
    href: '/vat-calculator',
    icon: Receipt,
    available: true,
    category: 'Finance',
    howItWorks:
      'Enter the price before VAT and the VAT rate percentage. The calculator applies the formula VAT Amount = Price × (Rate / 100) and adds it to the original price to give you the total including tax.',
    exampleUsage: [
      '$100 at 20% VAT → VAT $20, Total $120',
      '$250 at 5% VAT → VAT $12.50, Total $262.50',
    ],
    relatedTools: ['sales-tax-calculator', 'markup-calculator', 'profit-margin-calculator'],
    component: VatCalculator,
    seoTitle: 'VAT Calculator Online | Calculate VAT Amount & Total Price | SoftwareCalc',
    seoDescription: 'Free online VAT calculator. Enter a price and VAT rate to instantly calculate VAT amount and the total price including tax.',
  },
  {
    id: 'ratio-calculator',
    name: 'Ratio Calculator',
    description: 'Simplify ratios and display them in their lowest form.',
    aboutText: 'The Ratio Calculator helps you simplify ratios and express them in their lowest terms. It compares two numbers and reduces them to their simplest proportional relationship. This tool is useful in mathematics, education, cooking ratios, scaling recipes, and solving proportion problems. It quickly shows the simplified ratio so you can understand the relationship between two values. If you are scaling ingredient quantities, you may also find the [Recipe Volume Converter](/recipe-volume-converter) helpful.',
    howToUse: [
      'Enter the first number in the ratio.',
      'Enter the second number in the ratio.',
      'View the simplified ratio instantly.',
      'Use the result to understand the proportional relationship between the two values.'
    ],
    href: '/ratio-calculator',
    icon: Calculator,
    available: true,
    category: 'Math',
    howItWorks: 'Enter two numbers and the calculator reduces the ratio to its simplest form.',
    exampleUsage: ['20 : 30 → 2 : 3', '50 : 100 → 1 : 2'],
    relatedTools: ['percentage-calculator', 'average-calculator', 'discount-calculator'],
    component: RatioCalculator,
    seoTitle: 'Ratio Calculator Online | Simplify Ratios Instantly | SoftwareCalc',
    seoDescription:
      'Free online ratio calculator. Enter two numbers to simplify ratios and express them in their lowest terms instantly.',
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate restaurant tips and split the bill easily.',
    aboutText: 'The Tip Calculator helps you quickly determine how much tip to leave at a restaurant and the final total of your bill. It calculates the tip amount based on a percentage of the bill and can also split the total between multiple people. This tool is useful for dining out, group meals, and budgeting shared expenses. It instantly shows the tip, total bill, and how much each person should pay. If you want to calculate savings when dining deals are applied, you may also find the [Discount Calculator](/discount-calculator) helpful.',

    howToUse: [
      'Enter the total bill amount.',
      'Input the tip percentage you want to leave.',
      'Optionally enter the number of people to split the bill.',
      'View the calculated tip amount, total bill, and cost per person.'
    ],
    href: '/tip-calculator',
    icon: Banknote,
    available: true,
    category: 'Math',
    howItWorks:
      'Enter the bill amount and tip percentage to calculate the tip and total bill. Optionally divide the bill among multiple people.',
    exampleUsage: [
      'Bill $50 with 15% tip → Tip $7.50, Total $57.50',
      'Bill $100 with 20% tip split between 4 people → $30 per person',
    ],
    relatedTools: ['percentage-calculator', 'sales-tax-calculator', 'discount-calculator'],
    component: TipCalculator,
    seoTitle: 'Tip Calculator Online | Calculate Restaurant Tips & Split Bill | SoftwareCalc',
    seoDescription: 'Free online tip calculator. Enter your bill amount and tip percentage to instantly calculate the tip, total bill, and split the cost between people.',
  },
  {
    id: 'discount-calculator',
    name: 'Discount Calculator',
    description: 'Calculate discount amount and final price after a percentage discount.',
    aboutText: `The Discount Calculator helps you quickly work out how much you save during a sale and what the final price will be after a discount is applied. Instead of calculating percentages manually, you can enter the original price and discount rate to instantly see both the discount amount and the new sale price. This is useful for everyday shopping, comparing deals, budgeting purchases, and checking whether a promotion is actually worth it. Many discounts can look attractive at first glance, but the real value is easier to understand when you can clearly see the amount saved and the final cost. This makes the tool practical for online shopping, in-store purchases, and price comparisons between different offers. For example, you can use this calculator to check how much you save on a 25% sale, compare two different discount rates, or quickly verify whether a discounted product fits your budget. It is designed to give fast and clear results without unnecessary steps. If you want to calculate more general percentage values, try the [Percentage Calculator](/percentage-calculator). To compare how much a value has increased or decreased over time, the [Percentage Change Calculator](/percentage-change-calculator) can also be useful.`,
    howToUse: [
      'Enter the original price of the item.',
      'Enter the discount percentage.',
      'View the discount amount and final price instantly.',
      'Adjust the values to compare different sale prices or savings amounts.'
    ],
    href: '/discount-calculator',
    icon: Tag,
    available: true,
    category: 'Math',
    howItWorks:
      'Enter the original price and the discount percentage. The calculator shows how much is deducted and the final price after the discount.',
    exampleUsage: [
      '$100 with 20% discount → Discount = $20, Final Price = $80',
      '$59.99 with 15% discount → Discount = $9, Final Price = $50.99',
    ],
    relatedTools: ['percentage-calculator', 'sales-tax-calculator', 'markup-calculator'],
    component: DiscountCalculator,
    seoTitle: 'Discount Calculator Online | Calculate Sale Price & Savings | SoftwareCalc',
    seoDescription:
      'Free online discount calculator. Enter the original price and discount percentage to instantly calculate savings and the final sale price.',
  },
  {
    id: 'length-converter',
    name: 'Length Converter',
    description: 'Convert between common length units including meters, kilometers, miles, feet, and inches.',
    aboutText: 'The Length Converter helps you quickly convert measurements between common units such as meters, kilometers, miles, feet, inches, and centimeters. It is useful for everyday measurements, construction, travel distances, education, and scientific calculations. Instead of manually converting between metric and imperial units, the tool instantly calculates the correct value. This makes it easy to compare and convert length measurements across different systems. You may also find the [Weight Converter](/weight-converter) and [Temperature Converter](/temperature-converter) useful when working with other unit conversions.',

    howToUse: [
      'Enter the length value you want to convert.',
      'Select the unit you are converting from.',
      'Choose the unit you want to convert to.',
      'View the converted measurement instantly.'
    ],
    href: '/length-converter',
    icon: Ruler,
    available: true,
    category: 'Conversions',
    howItWorks:
      'Enter a number, choose the unit you want to convert from and the unit you want to convert to. The converter instantly calculates the equivalent value.',
    exampleUsage: [
      '10 meters → 32.808 feet',
      '5 miles → 8.047 kilometers',
      '100 centimeters → 1 meter',
    ],
    relatedTools: ['weight-converter', 'temperature-converter', 'recipe-volume-converter'],
    component: LengthConverter,
    seoTitle: 'Length Converter Online | Convert Meters, Miles, Feet & More | SoftwareCalc',
    seoDescription:
      'Free online length converter. Convert between meters, kilometers, miles, feet, inches, centimeters and more instantly.',
  },
  {
    id: 'average-calculator',
    name: 'Average Calculator',
    description: 'Calculate the average (mean) of any list of numbers instantly.',
    aboutText: 'The Average Calculator helps you quickly find the mean of a list of numbers. It adds all the values together and divides the total by the number of entries to calculate the average. This tool is useful for school work, statistics, finance calculations, and analyzing data sets. It supports numbers separated by commas, spaces, or line breaks for quick and flexible input. If you want to analyze percentage differences in your data, you may also find the [Percentage Change Calculator](/percentage-change-calculator) helpful.',

    howToUse: [
      'Enter the numbers you want to average.',
      'Separate the numbers using commas, spaces, or new lines.',
      'View the calculated average instantly.',
      'Use the result to understand the central value of your data set.'
    ],
    href: '/average-calculator',
    icon: Sigma,
    available: true,
    category: 'Math',
    howItWorks:
      'Enter numbers separated by commas, spaces, or new lines. The calculator sums the numbers and divides by the total count to compute the average.',
    exampleUsage: [
      '10, 20, 30, 40 → Average = 25',
      '5, 10, 15 → Average = 10',
      '1.5, 2.5, 3.5 → Average = 2.5',
    ],
    relatedTools: ['percentage-calculator', 'ratio-calculator', 'percentage-change-calculator'],
    component: AverageCalculator,
    seoTitle: 'Average Calculator Online | Mean of Numbers | SoftwareCalc',
    seoDescription:
      'Free online average calculator. Enter a list of numbers to instantly calculate the mean and understand the central value of your data set.',
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    description:
      'Calculate compound interest and visualize investment growth over time with a chart.',
    aboutText: 'The Compound Interest Calculator helps you estimate how an investment grows over time when interest is continuously reinvested. This is especially useful for understanding passive growth, where you invest a lump sum and let it compound without needing frequent contributions. For example, investing $10,000 at a fixed annual return can grow significantly over time due to interest being earned on both the initial amount and previously generated returns. This makes it ideal for long-term scenarios such as retirement savings or holding investments without active management. If you want to model regular monthly investing instead, you can use the [Investment Calculator](/investment-calculator).',
    
    howToUse: [
      'Enter your initial investment amount.',
      'Input the interest rate and compounding frequency.',
      'Optionally add regular contributions and the investment duration.',
      'View the final balance and investment growth chart instantly.'
    ],
    href: '/compound-interest-calculator',
    icon: TrendingUp,
    available: true,
    category: 'Finance',
    howItWorks:
  'Compound interest works by continuously reinvesting earned interest back into the investment. This means each calculation period generates returns not only on the original principal, but also on all previously earned interest. Over time, this creates exponential growth rather than linear growth. The calculator simulates this process step-by-step, applying your chosen interest rate, compounding frequency, and optional contributions to show how your investment evolves over time. It also separates total contributions from total interest earned so you can clearly see what portion of your growth comes from investing versus compounding.',
    exampleUsage: [
  '$10,000 invested at 5% annually for 20 years → $26,533 total value (more than double from interest alone)',
  '$500 monthly contributions at 7% return over 30 years → $566,765 total value (majority from compound growth)',
  'Long-term investing scenario showing how consistent contributions can outperform one-time investments'
],
    relatedTools: ['investment-calculator', 'roi-calculator', 'percentage-calculator'],
    component: CompoundInterestCalculator,
    seoTitle: 'Compound Interest Calculator Online | Lump Sum Investment Growth',
    seoDescription: 'Free online compound interest calculator. Estimate investment growth, interest earnings, and future value with optional regular contributions and compounding.',
  },
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    description:
      'Calculate percentages, percentage increases, decreases, and percentage change instantly.',
    aboutText: `The Percentage Calculator helps you quickly solve common percentage problems without needing to remember formulas or do manual calculations. Whether you want to find a percentage of a number, calculate percentage increase or decrease, or determine what percentage one value is of another, this tool gives you accurate results instantly. Percentages are used in everyday life more often than you might think. They are essential for calculating discounts while shopping, understanding interest rates in finance, tracking performance changes, and comparing values. Instead of doing these calculations manually, this online percentage calculator simplifies the process and reduces the risk of errors. For example, you can use this tool to calculate a 20% discount on a product, determine how much your salary increased over time, or find what percentage a test score represents. The calculator handles all these scenarios in a simple and user-friendly way. If you also need to calculate changes over time, try the [Percentage Change Calculator](/percentage-change-calculator). For price-based calculations, the [Discount Calculator](/discount-calculator) can also be useful.`,
    howToUse: [
      'Enter the values based on what you want to calculate.',
      'Choose whether you want to find a percentage, percentage change, or percentage of a number.',
      'View the result instantly along with the calculated value.',
      'Adjust the inputs to explore different scenarios or compare results.'
    ],
    href: '/percentage-calculator',
    icon: Percent,
    available: true,
    category: 'Math',
    howItWorks:
      'This tool helps solve the most common percentage calculations, including finding a percent of a number, finding what percent one number is of another, increasing or decreasing values by a percentage, and calculating percentage change.',
    exampleUsage: [
      'What is 15% of 200? → 30',
      '30 is what percent of 80? → 37.5%',
      'Increase 200 by 15% → 230',
      'Decrease 200 by 15% → 170',
      'Change from 50 to 70 → 40%',
    ],
    relatedTools: ['percentage-change-calculator', 'discount-calculator', 'ratio-calculator'],
    component: PercentageCalculator,
    seoTitle: 'Percentage Calculator Online | Increase, Decrease & Percent Change | SoftwareCalc',
    seoDescription:
      'Free online percentage calculator. Find percentages, calculate percentage increase or decrease, and determine percent change between numbers instantly.',
  },
  {
    id: 'blackjack-helper',
    name: 'Blackjack Helper',
    description:
      'Get optimal play recommendations for every blackjack hand — hit, stand, double, split, or surrender — based on real basic strategy odds.',
    aboutText: 'The Blackjack Helper shows the statistically best move for any blackjack hand using basic strategy probabilities. By entering your cards and the dealer’s upcard, the tool determines whether you should hit, stand, double, split, or surrender. It uses standard blackjack basic strategy tables to evaluate the optimal decision for each situation. This makes it useful for learning blackjack strategy, improving gameplay decisions, and understanding the probability behind each move. If you want to simulate outcomes or generate random values for games and testing, you may also find the [Random Number Generator](/random-number-generator) useful.',

    howToUse: [
      'Enter your two starting cards.',
      'Enter the dealer’s upcard.',
      'View the recommended action such as hit, stand, double, split, or surrender.',
      'Review the probability information to understand why the move is optimal.'
    ],
    href: '/blackjack-helper',
    icon: Calculator,
    available: true,
    category: 'Game Calculators',
    howItWorks:
      'Enter your two cards and the dealer\'s upcard. The tool looks up the statistically best action using standard blackjack basic strategy tables, then shows win, lose, and push probabilities for that hand combination across a full 6-deck shoe.',
    exampleUsage: [
      'Player holds 9–7 (hard 16) vs dealer showing 10 → Surrender if allowed, otherwise Hit.',
      'Player holds A–6 (soft 17) vs dealer showing 3 → Double Down.',
      'Player holds 8–8 (pair) vs dealer showing 7 → Split.',
      'Player holds 10–6 vs dealer showing 6 → Stand.',
    ],
    relatedTools: ['random-number-generator'],
    component: BlackjackCalculator,
    seoTitle: 'Blackjack Strategy Calculator Online | Best Move & Odds | SoftwareCalc',
    seoDescription: 'Free online blackjack strategy calculator. Enter your cards and the dealer upcard to see the best move based on basic strategy and probability.',
  },
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    description: 'Generate a random number between a minimum and maximum value.',
    aboutText: 'The Random Number Generator allows you to instantly generate a random number within any range you choose. By entering a minimum and maximum value, the tool produces a random integer between those two numbers. It can be used for games, giveaways, classroom activities, or making random decisions. The generator uses a secure randomization method to ensure fair and unpredictable results. If you are playing blackjack and want strategy guidance for specific hands, you may also find the [Blackjack Helper](/blackjack-helper) useful.',

    howToUse: [
      'Enter the minimum number for the range.',
      'Enter the maximum number for the range.',
      'Click generate to produce a random number.',
      'Use the result for games, draws, or random selection.'
    ],
    href: '/random-number-generator',
    icon: Dices,
    available: true,
    category: 'Random Generators',
    howItWorks:
      'Enter your desired range by specifying a minimum and maximum value. The generator uses a cryptographically secure random number generation method to pick an integer within that range, inclusive of both bounds.',
    exampleUsage: [
      'Generate a number between 1 and 100 for a giveaway.',
      'Pick a random page number between 1 and 500.',
      'Decide between two options by picking 1 or 2.',
    ],
    relatedTools: ['blackjack-helper'],
    component: RandomNumberGenerator,
    seoTitle: 'Random Number Generator Online | Free Randomizer Tool | SoftwareCalc',
    seoDescription: 'Free online random number generator. Generate random numbers between any minimum and maximum values instantly for games, draws, and decision making.',
  },
  {
    id: 'hours-worked-calculator',
    name: 'Hours Worked Calculator',
    description: 'Calculate hours worked between two times or total earnings based on hours worked and hourly pay.',
    aboutText: 'The Hours Worked Calculator helps you determine how many hours you worked between two times and estimate your earnings based on an hourly rate. It can calculate shift durations, including overnight shifts that pass midnight. This tool is useful for employees, freelancers, and managers who need to track working hours and estimate pay. It quickly shows total hours worked and optional earnings based on your hourly wage. If you want to calculate earnings from percentage-based pay structures, you may also find the [Commission Calculator](/commission-calculator) useful.',

    howToUse: [
      'Enter the start time of your shift.',
      'Enter the end time of your shift.',
      'Optionally enter your hourly pay rate.',
      'View the total hours worked and estimated earnings instantly.'
    ],
    href: '/hours-worked-calculator',
    icon: Clock,
    available: true,
    category: 'Date & Time',
    howItWorks:
      'Use the Work Shift Calculator to enter your start and end times along with an hourly rate to see your duration and earnings. Alternatively, use the Total Hours Calculator to multiply total hours by your rate for quick earnings calculation.',
    exampleUsage: [
      'Shift from 09:00 to 17:00 at $25/hr → 8 hours, $200.00',
      'Overnight shift from 22:00 to 06:00 → 8 hours',
      'Quickly calculate earnings for 37.5 hours at $30/hr',
    ],
    relatedTools: ['date-time-difference-calculator', 'age-calculator'],
    component: HoursWorkedCalculator,
    seoTitle: 'Hours Worked Calculator Online | Work Time & Earnings | SoftwareCalc',
    seoDescription: 'Free online hours worked calculator. Calculate work hours between two times and estimate earnings based on your hourly pay.',
  },
  {
    id: 'date-time-difference-calculator',
    name: 'Date & Time Difference Calculator',
    description: 'Calculate the exact time difference between two dates and times in days, hours, and minutes.',
    aboutText: "The Date & Time Difference Calculator helps you calculate the exact time between two dates and times. It shows the difference in total days, hours, and minutes, as well as a detailed breakdown. This tool is useful for planning events, tracking project durations, or calculating time spans between two moments. If you want to calculate the exact age of a person based on their birth date, you may also find the [Age Calculator](/age-calculator) helpful.",

    howToUse: [
      'Enter the start date and time',
      'Enter the end date and time',
      'View the total time difference instantly',
      'See the result in days, hours, and minutes'
    ],
    href: '/date-time-difference-calculator',
    icon: Clock,
    available: true,
    category: 'Date & Time',
    howItWorks: "The calculator converts both date-time values into timestamps and subtracts them to determine the time difference. The result is then converted into days, hours, and minutes for easy understanding.",
    exampleUsage: [
      'Start: March 1 08:00 → End: March 3 10:30 → 2 days 2 hours 30 minutes',
      'Start: Jan 1 00:00 → End: Jan 2 12:00 → 1 day 12 hours'
    ],
    relatedTools: ['hours-worked-calculator', 'age-calculator'],
    component: DateTimeDifferenceCalculator,
    seoTitle: 'Date & Time Difference Calculator Online | Days & Hours Between Dates',
    seoDescription: 'Free online date and time difference calculator. Find the exact difference between two dates and times in days, hours, and minutes.'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, and days from your date of birth.',
    aboutText: 'The Age Calculator helps you quickly determine your exact age based on your birth date. It calculates your age in years, months, and days using precise calendar differences. This tool is commonly used for personal records, forms, and curiosity about how long someone has lived. It can also show the total number of months and days since birth. If you want to measure the time between any two specific dates, you may also find the [Date & Time Difference Calculator](/date-time-difference-calculator) useful.',

    howToUse: [
      'Enter your date of birth.',
      'Optionally choose the date you want to calculate the age for (defaults to today).',
      'Click the calculate button.',
      'View your exact age in years, months, and days along with total time lived.'
    ],
    href: '/age-calculator',
    icon: Calendar,
    available: true,
    category: 'Date & Time',
    howItWorks: 'Enter your date of birth and an optional reference date. The calculator computes the calendar difference between the two dates to determine your exact age in years, months, and days, and also shows the total months and days lived.',
    exampleUsage: [
      'Born Jan 1, 2000 → Age 26 years, 2 months, 12 days',
      'Born June 15, 1995 → Age 30 years, 8 months, 27 days'
    ],
    relatedTools: ['date-time-difference-calculator', 'hours-worked-calculator'],
    component: AgeCalculator,
    seoTitle: 'Age Calculator Online | Calculate Exact Age in Years, Months & Days | SoftwareCalc',
    seoDescription: 'Free online age calculator. Enter your birth date to instantly calculate your exact age in years, months, and days.'
  },
  {
    id: 'unit-price-calculator',
    name: 'Unit Price Calculator',
    description: 'Calculate the price per unit based on total price and quantity.',
    aboutText: 'The Unit Price Calculator helps you determine the cost per unit of a product. By entering the total price and quantity, the calculator shows how much each unit costs. This is useful for comparing product prices in supermarkets, evaluating bulk deals, or understanding the true cost of items. If you are analyzing savings during sales, you may also find the [Discount Calculator](/discount-calculator) helpful, or calculate price differences using the [Percentage Calculator](/percentage-calculator).',

    howToUse: [
      'Enter the total price of the product.',
      'Enter the quantity or number of units.',
      'Click calculate.',
      'The calculator will display the price per unit.'
    ],
    href: '/unit-price-calculator',
    icon: Calculator,
    available: true,
    category: 'Math',
    howItWorks: 'Divide the total price by the quantity to get the price per unit. This allows you to compare the value of products with different sizes or quantities on a like-for-like basis.',
    exampleUsage: [
      'Price $5, Quantity 200 → $0.025 per unit',
      'Price $12.99, Quantity 6 → $2.165 per unit'
    ],
    relatedTools: ['discount-calculator', 'percentage-calculator', 'ratio-calculator'],
    component: UnitPriceCalculator,
    seoTitle: 'Unit Price Calculator Online | Price Per Unit Tool | SoftwareCalc',
    seoDescription: 'Free online unit price calculator. Enter total price and quantity to instantly calculate price per unit for better price comparisons.'
  },
  {
    id: 'square-footage-calculator',
    name: 'Square Footage Calculator',
    description: 'Calculate area based on length and width.',
    aboutText: ` The Square Footage Calculator helps you quickly calculate the area of a space using length and width. This is useful for measuring rooms, flooring, walls, land, and other surfaces where accurate area calculations are important. It is commonly used for home improvement projects, estimating material needs, and planning layouts. By knowing the total area, you can better calculate costs for flooring, paint, or construction work. If you want to calculate cost based on area, you can use the [Unit Price Calculator](/unit-price-calculator). For converting measurements before calculating area, the [Length Converter](/length-converter) can also be helpful. `,
    howToUse: [
      'Enter the length.',
      'Enter the width.',
      'Click calculate.',
      'View the total area.'
    ],
    href: '/square-footage-calculator',
    icon: Ruler,
    available: true,
    category: 'Math',
    howItWorks: 'To find the square footage (area), multiply the length by the width. The formula is: Length × Width = Area.',
    exampleUsage: [
      'Length 10 ft, Width 10 ft → 100 sq ft',
      'Length 12 ft, Width 15 ft → 180 sq ft'
    ],
    relatedTools: ['unit-price-calculator', 'length-converter'],
    component: SquareFootageCalculator,
    seoTitle: 'Square Footage Calculator Online | Area Calculator | SoftwareCalc',
    seoDescription: 'Free online square footage calculator. Enter length and width to quickly calculate area for rooms, spaces, and surfaces.'
  },
  {
    id: 'days-until-date-calculator',
    name: 'Days Until Date Calculator',
    description: 'Calculate how many days remain until a specific date.',
    aboutText: ` The Days Until Date Calculator helps you quickly find how many days remain until a specific future date. It is useful for counting down to events, deadlines, holidays, or important milestones. This tool calculates the exact number of days between today and your selected date, making it easy to plan ahead and stay organized. It is commonly used for project timelines, travel planning, and personal goals. If you need a more detailed breakdown including hours and minutes, you can use the [Date & Time Difference Calculator](/date-time-difference-calculator). To calculate age or time since a past date, the [Age Calculator](/age-calculator) is also useful. `,
    howToUse: [
      'Enter the target date.',
      'Click calculate.',
      'View the number of days remaining.'
    ],
    href: '/days-until-date-calculator',
    icon: Calendar,
    available: true,
    category: 'Date & Time',
    howItWorks: 'The calculator takes today\'s date and subtracts it from your target date. The result is the number of whole days remaining until that date.',
    exampleUsage: [
      'Target date 30 days away → 30 days remaining',
      'Target date is today → Today!'
    ],
    relatedTools: ['date-time-difference-calculator', 'age-calculator', 'hours-worked-calculator'],
    component: DaysUntilDateCalculator,
    seoTitle: 'Days Until Date Calculator Online | Countdown Tool | SoftwareCalc',
    seoDescription: 'Free online days until calculator. Enter a future date to quickly see how many days remain.'
  },
  {
    id: 'simple-interest-calculator',
    name: 'Simple Interest Calculator',
    description: 'Calculate simple interest based on principal, rate, and time in years.',
    aboutText: "The Simple Interest Calculator helps you calculate the interest earned or paid on a principal amount over a fixed period of time. It uses a simple formula based on principal, annual interest rate, and time in years, making it useful for loans, savings, and basic financial calculations. If you need to calculate long-term growth, you may also find the [Compound Interest Calculator](/compound-interest-calculator) helpful. For percentage-based calculations, the [Percentage Calculator](/percentage-calculator) can also be useful.",
    howToUse: [
      'Enter the principal amount.',
      'Enter the interest rate percentage.',
      'Enter the time in years.',
      'View the calculated interest.'
    ],
    href: '/simple-interest-calculator',
    icon: Banknote,
    available: true,
    category: 'Finance',
    howItWorks: 'Simple interest is calculated using the formula: Interest = Principal × Rate × Time. The rate is divided by 100 to convert from percentage.',
    exampleUsage: [
      'Principal $1000, Rate 5%, Time 2 years → Interest $100',
      'Principal $500, Rate 10%, Time 3 years → Interest $150'
    ],
    relatedTools: ['compound-interest-calculator', 'percentage-calculator', 'profit-margin-calculator'],
    component: SimpleInterestCalculator,
    seoTitle: 'Simple Interest Calculator Online | Calculate Interest Easily | SoftwareCalc',
    seoDescription: 'Free online simple interest calculator. Enter principal, interest rate, and time in years to calculate interest instantly.'
  },
  {
    id: 'click-counter',
    name: 'Click Counter',
    description: 'Count clicks and track clicks per second and minute.',
    aboutText: "The Click Counter helps you count clicks quickly while also tracking your click speed. It shows your total clicks, APS (clicks in the last second), and APM (clicks in the last minute). This makes it useful for click speed practice, tapping tests, games, and simple counting tasks. If you want another simple interactive tool, you may also find the [Random Number Generator](/random-number-generator) useful.",
    howToUse: [
      'Click or tap the large button to start counting.',
      'Watch your total clicks increase instantly.',
      'View APS for the last 1 second and APM for the last 60 seconds.',
      'Use the reset button to clear all values and start over.'
    ],
    href: '/click-counter',
    icon: Calculator,
    available: true,
    category: 'Random Generators',
    howItWorks: 'The tool stores click timestamps and uses them to count how many clicks happened in the last 1 second and last 60 seconds. Total clicks update on every click, and APS/APM are recalculated immediately and once more shortly after clicking stops.',
    exampleUsage: [
      'Tap repeatedly to track your click speed in real time.',
      'Use the reset button to start a new test.',
      'See APS for short bursts and APM for longer clicking sessions.'
    ],
    relatedTools: ['random-number-generator'],
    component: ClickCounter,
    seoTitle: 'Click Counter Online | Track Clicks, APS & APM | SoftwareCalc',
    seoDescription: 'Free online click counter. Count clicks and track APS and APM with a large click button and reset option.'
  },
  {
    id: 'loan-payment-calculator',
    name: 'Loan Payment Calculator',
    description: 'Calculate monthly loan payments, total interest, payoff date, and savings from extra payments.',
    aboutText: "The Loan Payment Calculator helps you understand the true cost of borrowing by showing how a loan is repaid over time through fixed monthly payments. Each payment is split between interest and principal, and this balance changes over the life of the loan. In the early years, most of your payment goes toward interest, while later payments reduce the loan balance faster. This calculator is useful when comparing different loan options such as personal loans, car loans, or other installment loans. It also helps you see how changes in interest rate, loan term, or extra monthly payments can significantly affect the total cost and payoff time. Understanding these factors can help you make better borrowing decisions and potentially save a large amount in interest over time. For investment growth scenarios, you can use the [Compound Interest Calculator](/compound-interest-calculator) instead.",
    howToUse: [
      'Enter the total loan amount.',
      'Add the annual interest rate for the loan.',
      'Enter the loan term in years.',
      'Optionally enter a down payment to reduce the financed amount.',
      'Optionally add an extra monthly payment to see how faster repayment affects interest savings.',
      'Review the monthly payment, total repayment, total interest, payoff date, amortization schedule, and yearly summary.'
    ],
    href: '/loan-payment-calculator',
    icon: Banknote,
    available: true,
    category: 'Finance',
    howItWorks: "A loan is repaid through fixed monthly payments calculated using a standard amortisation formula. Each payment includes both interest (the cost of borrowing) and principal (the amount you actually repay). At the beginning of the loan, interest makes up a larger portion of each payment, while over time more of your payment goes toward reducing the loan balance. This calculator simulates that repayment process month by month, updating the remaining balance and showing how long it takes to fully repay the loan. If you add extra monthly payments, the calculator recalculates the schedule and shows how much faster you can pay off the loan and how much interest you can save overall.",
    exampleUsage: [
    'Compare a $25,000 car loan at 6% over 5 years to see total interest paid over time',
    'Add an extra $200 monthly payment to see how many years of repayment you can eliminate',
    'Adjust interest rate from 5% to 8% to understand how borrowing cost changes significantly between lenders'
  ],
    relatedTools: ['compound-interest-calculator', 'percentage-calculator', 'simple-interest-calculator'],
    component: LoanPaymentCalculator,
    seoTitle: 'Loan Payment Calculator Online | Monthly Payments, Interest & Payoff Schedule',
    seoDescription: 'Free online loan payment calculator to estimate monthly payments, total interest, total repayment, payoff date, and amortization schedule for fixed-rate loans.'
  },
{
    id: 'savings-goal-calculator',
    name: 'Savings Goal Calculator',
    description: 'Calculate how long it will take to reach your savings goal with monthly contributions and interest.',
    aboutText: `Use this Savings Goal Calculator to estimate how long it will take to reach a specific financial target. Enter your goal amount, current savings, monthly contributions, and optional interest rate to calculate the time required to reach your goal. This tool is designed for planning specific targets such as emergency funds, down payments, travel budgets, or large purchases. It focuses on time-to-goal planning rather than long-term wealth projection. If you want to simulate long-term investment growth instead, use the [Investment Calculator](/investment-calculator). If you want to model one-time investment growth, use the [Compound Interest Calculator](/compound-interest-calculator).`,
    howToUse: [
      'Enter your savings goal amount.',
      'Add your current savings balance.',
      'Enter monthly contribution amount.',
      'Optionally include interest rate.',
      'View estimated time to reach your goal.',
      'Review monthly progress breakdown.'
    ],
    href: '/savings-goal-calculator',
    icon: Banknote,
    available: true,
    category: 'Finance',
    howItWorks: 'The calculator simulates monthly savings growth until the target amount is reached, including contributions and optional interest.',
    exampleUsage: [
      'How long to save $10,000 with $200/month contributions',
      'Time needed to reach a $20,000 emergency fund',
      'Impact of increasing monthly savings on goal timeline'
    ],
    relatedTools: ['investment-calculator', 'compound-interest-calculator', 'loan-payment-calculator'],
    component: SavingsGoalCalculator,
    formulaTitle: 'Goal Timeline Formula',
    formulaExpression: 'Balanceₙ = Balanceₙ₋₁ × (1 + r) + Monthly Contribution',
    formulaExplanation: 'Savings grow monthly until the target goal amount is reached.',
    seoTitle: 'Savings Goal Calculator Online | How Long to Reach Your Goal',
    seoDescription: 'Calculate how long it takes to reach your savings goal with monthly contributions. Free online savings goal planner.'
  },  
  {
    id: 'salary-after-tax-calculator',
    name: 'Salary After Tax Calculator',
    description: 'Calculate your take-home salary after tax based on gross income and tax rate.',
    aboutText: `The Salary After Tax Calculator helps you understand how much of your income you actually keep after taxes are deducted. Your gross salary can often look much higher than your real take-home pay, especially in countries with higher tax rates or additional deductions. This calculator helps you quickly compare gross and net income so you can make better decisions when evaluating job offers, planning a budget, or negotiating salary. It is especially useful when comparing different income levels or understanding how tax rates impact your monthly lifestyle. You can also use the [Savings Goal Calculator](/savings-goal-calculator) to plan how much you can save from your net income, or the [Compound Interest Calculator](/compound-interest-calculator) for long-term growth planning.`,
    howToUse: [
      'Enter your gross salary amount.',
      'Enter the tax rate as a percentage.',
      'Choose whether the salary is yearly or monthly.',
      'View your net salary, tax amount, and a full period breakdown.'
    ],
    href: '/salary-after-tax-calculator',
    icon: Banknote,
    available: true,
    category: 'Finance',
    howItWorks: 'Income tax reduces your gross salary before you receive it as take-home pay. This calculator applies the tax rate to your gross income and subtracts it to determine your net salary. It also converts between monthly and yearly values depending on your input, helping you understand how your income changes across different time periods. The result shows both total tax paid and final take-home income so you can clearly see the impact of taxation on your earnings.',
    exampleUsage: [
    'Gross salary of 60,000 with 30% tax → see real take-home income after deductions',
    'Compare two job offers with different salaries and tax rates to understand actual earnings',
    'Convert monthly salary into yearly net income to better plan long-term budgeting'
  ],
    relatedTools: ['simple-interest-calculator', 'commission-calculator', 'profit-margin-calculator'],
    component: SalaryAfterTaxCalculator,
    formulaTitle: 'Net Salary Formula',
    formulaExpression: 'Net Salary = Gross Salary × (1 − Tax Rate)',
    formulaExplanation: 'The calculator subtracts tax from your gross salary using the provided tax rate. The result is your take-home (net) income.',
    seoTitle: 'Salary After Tax Calculator Online | Net Income & Take-Home Pay',
    seoDescription: 'Calculate your take-home salary after tax. Enter your gross income and tax rate to estimate net pay instantly.'
  },
  {
    id: 'inflation-calculator',
    name: 'Inflation Calculator',
    description: 'Calculate how inflation reduces the value of money over time.',
    aboutText: ` The Inflation Calculator helps you understand how inflation reduces the purchasing power of money over time. By entering an initial amount, inflation rate, and time period, you can see what your money will be worth in the future. This tool is useful for long-term financial planning, helping you estimate how rising prices impact savings, salaries, and investments. It shows both the adjusted future value and the total value lost due to inflation. If you are planning savings growth, you may also find the [Compound Interest Calculator](/compound-interest-calculator) useful. To estimate how long it takes to reach a financial goal, the [Savings Goal Calculator](/savings-goal-calculator) can also help. `,
    howToUse: [
      'Enter the initial amount of money.',
      'Enter the annual inflation rate.',
      'Enter the number of years.',
      'View the adjusted value and yearly breakdown.'
    ],
    href: '/inflation-calculator',
    icon: TrendingUp,
    available: true,
    category: 'Finance',
    howItWorks: 'This calculator shows how inflation reduces the purchasing power of money over time. Each year, the value is adjusted based on the inflation rate using the formula: Adjusted Value = Present Value ÷ (1 + r)^t.',
    exampleUsage: [
      '10,000 at 3% inflation for 10 years → purchasing power reduced to ~7,441',
      'See year-by-year erosion of value',
      'Compare impact of high vs low inflation rates'
    ],
    relatedTools: ['compound-interest-calculator', 'savings-goal-calculator', 'salary-after-tax-calculator'],
    component: InflationCalculator,
    formulaTitle: 'Inflation Adjustment Formula',
    formulaExpression: 'Adjusted Value = Present Value ÷ (1 + r)^t',
    formulaExplanation: 'r is the annual inflation rate (decimal), and t is the number of years. Inflation reduces purchasing power over time, so future value is lower.',
    seoTitle: 'Inflation Calculator Online (Future Value & Purchasing Power)',
    seoDescription: 'Calculate how inflation affects the value of money over time. See future purchasing power and value lost due to inflation.'
  },
  {
    id: 'texas-holdem-odds-calculator',
    name: "Texas Hold'em Odds Calculator",
    description: 'Free online poker odds calculator for Texas Hold’em. Calculate win, tie, and loss probabilities from preflop to river with simplified action guidance.',
    aboutText: ` Use this Texas Hold’em poker odds calculator to estimate your win, tie, and loss probabilities from preflop to river. By selecting your cards and known community cards, you can quickly evaluate your chances in a real poker hand. This tool is designed for Texas Hold’em, the most popular form of poker, and helps you understand hand strength, equity, and probability in different situations. If you are looking for blackjack strategy instead, try the [Blackjack Helper](/blackjack-helper). For simple probability tools, you can also use the [Random Number Generator](/random-number-generator). `,
    howToUse: [
      'Select your two hole cards.',
      'Optionally add the community cards for flop, turn, or river.',
      'Choose the number of opponents.',
      'Optionally enter the pot size and amount to call.',
      'Calculate your estimated win, tie, and loss probabilities and review the simplified recommendation.'
    ],
    href: '/texas-holdem-odds-calculator',
    icon: Dices,
    available: true,
    category: 'Game Calculators',
    howItWorks: "This calculator estimates your Texas Hold'em hand equity by simulating unknown opponent cards and remaining board cards. It supports preflop, flop, turn, and river situations and provides a simplified action hint based on estimated equity and pot odds.",
    exampleUsage: [
      "Preflop pocket Aces versus 2 opponents → estimate win percentage before the flop.",
      'Flop with a flush draw → estimate equity with two cards to come.',
      'Turn decision facing a bet → compare estimated equity to pot odds for a simplified action hint.'
    ],
    relatedTools: ['blackjack-helper', 'random-number-generator'],
    component: TexasHoldemOddsCalculator,
    formulaTitle: 'Required Equity Formula',
    formulaExpression: 'Required Equity = Amount to Call ÷ (Pot Size + Amount to Call)',
    formulaExplanation: 'This simplified recommendation compares your estimated win probability to the equity required by the pot odds. It is a basic action hint, not a full poker strategy solver.',
    seoTitle: 'Poker Odds Calculator (Texas Hold\u2019em) | Win %, Equity & Probabilities',
    seoDescription: 'Free online poker odds calculator for Texas Hold\u2019em. Calculate win, tie, and loss probabilities from preflop to river.',
  },
{
    id: 'retirement-calculator',
    name: 'Retirement Calculator',
    description: 'Estimate how much your retirement savings could grow by your target retirement age.',
    aboutText: `Use this Retirement Calculator to estimate whether your current savings and contributions are likely to support your retirement goals. Enter your current age, retirement age, savings, monthly contributions, and expected return to project your future retirement balance. This tool is focused on long-term retirement planning and helps you understand if your savings trajectory is sufficient to reach financial independence by a specific age. It is designed for goal-based planning rather than general investment growth. If you want to model one-time investment growth, use the [Compound Interest Calculator](/compound-interest-calculator). If you want to track progress toward a specific savings target, use the [Savings Goal Calculator](/savings-goal-calculator).`,
    howToUse: [
      'Enter your current age and retirement age.',
      'Add your current savings balance.',
      'Enter your monthly contribution amount.',
      'Enter expected annual return.',
      'Optionally include inflation for real-value estimates.',
      'Review projected retirement balance and progress over time.'
    ],
    href: '/retirement-calculator',
    icon: TrendingUp,
    available: true,
    category: 'Finance',
    howItWorks: 'The calculator simulates savings growth from current age to retirement by applying monthly contributions and compound growth. It focuses on whether your savings trajectory is sufficient to reach retirement goals.',
    exampleUsage: [
    'Check if $500/month savings is enough to retire at 65',
    'Compare retirement outcomes at different contribution levels',
    'See how changing retirement age impacts required savings'
    ],
    relatedTools: ['investment-calculator', 'savings-goal-calculator', 'compound-interest-calculator', 'inflation-calculator'],
    component: RetirementCalculator,
    formulaTitle: 'Retirement Projection Formula',
    formulaExpression: 'Balanceₙ = Balanceₙ₋₁ × (1 + r) + Monthly Contribution',
    formulaExplanation: 'Each month, savings grow with returns and contributions until retirement age is reached.',
    seoTitle: 'Retirement Calculator Online | Will You Have Enough to Retire?',
    seoDescription: 'Estimate if your savings and contributions are enough for retirement. Free retirement planning calculator with growth projections.'
  },
  {
    id: 'apr-calculator',
    name: 'APR Calculator',
    description: 'Calculate the true annual percentage rate (APR) of a loan including upfront fees.',
    aboutText: ` Use this APR Calculator to understand the true cost of a loan, including both interest and any upfront fees. While the interest rate shows the base cost of borrowing, APR gives a more complete picture by factoring in additional costs. This is especially useful when comparing loan offers, as two loans with the same interest rate can have very different APRs depending on fees. To estimate monthly payments and total cost without fees, use the [Loan Payment Calculator](/loan-payment-calculator). You can also explore long-term growth with the [Compound Interest Calculator](/compound-interest-calculator). `,
    howToUse: [
      'Enter the loan amount, interest rate, and loan term.',
      'Add any upfront fees associated with the loan.',
      'Click calculate to see the APR and total cost.',
      'Compare APR to the interest rate to understand the real cost.'
    ],
    href: '/apr-calculator',
    icon: Percent,
    available: true,
    category: 'Finance',
    howItWorks: 'The calculator first computes the standard monthly payment using the nominal interest rate. It then finds the rate at which a loan equal to (Loan Amount minus Fees) produces the same payment. This effective rate, annualised, is the APR.',
    exampleUsage: [
      'Loan 20,000 at 6% for 5 years with 500 in fees → true APR is higher than 6%',
      'Zero fees → APR equals the stated interest rate',
      'Compare two loans with different fee structures side by side'
    ],
    relatedTools: ['loan-payment-calculator', 'simple-interest-calculator', 'compound-interest-calculator'],
    component: APRCalculator,
    formulaTitle: 'APR Calculation Concept',
    formulaExpression: 'APR ≈ rate where Payment(Loan − Fees) = Original Payment',
    formulaExplanation: 'APR is the effective interest rate that accounts for fees. It is calculated by finding the rate at which the loan payment matches the original payment when fees are deducted from the loan amount.',
    seoTitle: 'APR Calculator Online | True Loan Cost with Fees',
    seoDescription: 'Calculate the true annual percentage rate (APR) of a loan including fees. Understand the real cost of borrowing with this free online APR calculator.'
  },
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    description: 'Estimate monthly mortgage payments and total cost of a home loan.',
    aboutText: 'The Mortgage Calculator helps you understand the real long-term cost of buying a home by showing how your monthly payment is built from loan amount, interest rate, and repayment time. A mortgage is usually the largest financial commitment most people make, and even small changes in interest rate or loan term can significantly affect total repayment. This calculator helps you compare different scenarios such as shorter vs longer loan terms, or how increasing your down payment reduces both monthly cost and total interest paid over time. It is especially useful when planning a home purchase, comparing mortgage offers, or testing how much house you can realistically afford. For more detailed borrowing cost analysis including fees, you can also use the [APR Calculator](/apr-calculator).',
    howToUse: [
      'Enter the home price.',
      'Enter your down payment amount.',
      'Input the interest rate and loan term.',
      'View your monthly mortgage payment and total cost.'
    ],
    href: '/mortgage-calculator',
    icon: TrendingUp,
    available: true,
    category: 'Finance',
    howItWorks: 'A mortgage is repaid through fixed monthly payments that include both interest and principal. In the early years, a larger portion of each payment goes toward interest, while later payments contribute more toward reducing the loan balance. This calculator uses the standard amortisation formula to simulate this repayment structure over time. It calculates your monthly payment based on the loan amount after down payment, applies the interest rate on a monthly basis, and spreads the repayment across the selected loan term. It also shows total repayment and total interest so you can clearly see the long-term cost difference between loan options.',
    exampleUsage: [
    'Compare a $300,000 home with 10% vs 20% down payment to see how monthly payments change significantly',
    'Test a 15-year mortgage vs 30-year mortgage to understand how shorter terms reduce total interest but increase monthly cost',
    'Adjust interest rate from 5% to 7% to see how even small rate changes impact long-term affordability'
],
    relatedTools: ['loan-payment-calculator', 'apr-calculator', 'savings-goal-calculator'],
    component: MortgageCalculator,
    formulaTitle: 'Mortgage Payment Formula',
    formulaExpression: 'M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]',
    formulaExplanation: 'P is the loan amount (home price minus down payment), r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments (years × 12).',
    seoTitle: 'Mortgage Calculator Online | Monthly Payment, Interest & Home Loan Cost',
    seoDescription: 'Free mortgage calculator. Estimate monthly payments, loan amount, total interest, and total cost based on home price and down payment.'
  },
  {
    id: 'payback-period-calculator',
    name: 'Payback Period Calculator',
    description: 'Calculate how long it takes to recover an investment based on annual returns.',
    aboutText: 'The Payback Period Calculator helps you determine how long it takes to recover the cost of an investment based on its annual returns. It calculates the number of years required for total cash flow to equal the initial investment. This tool is useful for comparing investment opportunities, evaluating business decisions, and understanding how quickly you can break even. For long-term growth projections, the [Compound Interest Calculator](/compound-interest-calculator) can also help.',
    howToUse: [
      'Enter the initial investment amount.',
      'Enter the expected annual cash flow.',
      'View the payback period in years and months.'
    ],
    href: '/payback-period-calculator',
    icon: TrendingUp,
    available: true,
    category: 'Finance',
    howItWorks: 'Divide the initial investment by the annual cash flow to find the number of years needed to recover the investment. The monthly equivalent multiplies this by 12.',
    exampleUsage: [
      'Investment 50,000 with 10,000 annual cash flow → 5 year payback period',
      'Investment 100,000 with 25,000 annual cash flow → 4 years',
      'Compare two investments to see which recoups costs faster'
    ],
    relatedTools: ['compound-interest-calculator', 'savings-goal-calculator', 'loan-payment-calculator'],
    component: PaybackPeriodCalculator,
    formulaTitle: 'Payback Period Formula',
    formulaExpression: 'Payback Period = Initial Investment ÷ Annual Cash Flow',
    formulaExplanation: 'The payback period is the time required for cumulative cash flows to equal the initial investment. A shorter payback period generally indicates a less risky investment.',
    seoTitle: 'Payback Period Calculator Online | Investment Recovery Time',
    seoDescription: 'Free payback period calculator. Enter investment and annual return to calculate how long it takes to recover your money.'
  },
  {
    id: 'loan-to-value-calculator',
    name: 'Loan-to-Value Calculator',
    description: 'Calculate the loan-to-value ratio and home equity based on property value and loan amount.',
    aboutText: 'The Loan-to-Value Calculator helps you determine the LTV ratio of a property loan and your estimated equity. LTV is calculated by dividing the loan amount by the property value and expressing the result as a percentage. Lenders use LTV to assess lending risk. A lower LTV generally means better loan terms. If you are planning a mortgage, you may also find the [Mortgage Calculator](/mortgage-calculator) useful.',
    howToUse: [
      'Enter the property value.',
      'Enter the loan amount.',
      'View the loan-to-value ratio and estimated equity instantly.'
    ],
    href: '/loan-to-value-calculator',
    icon: Banknote,
    available: true,
    category: 'Finance',
    howItWorks: 'Divide the loan amount by the property value and multiply by 100 to get the LTV percentage. Equity is the property value minus the loan amount.',
    exampleUsage: [
      'Property 300,000 with loan 240,000 → LTV 80%, equity 60,000',
      'Property 500,000 with loan 100,000 → LTV 20%, equity 400,000'
    ],
    relatedTools: ['mortgage-calculator', 'loan-payment-calculator', 'apr-calculator'],
    component: LoanToValueCalculator,
    formulaTitle: 'Loan-to-Value Formula',
    formulaExpression: 'LTV (%) = (Loan Amount ÷ Property Value) × 100',
    formulaExplanation: 'LTV expresses the loan as a percentage of the property value. Equity is the remaining value after subtracting the loan amount from the property value.',
    seoTitle: 'Loan-to-Value Calculator Online | LTV Ratio Calculator | SoftwareCalc',
    seoDescription: 'Free online loan-to-value calculator. Enter property value and loan amount to calculate LTV ratio and estimated home equity instantly.'
  },
  {
    id: 'debt-to-income-calculator',
    name: 'Debt-to-Income Calculator',
    description: 'Calculate your debt-to-income ratio based on monthly debt payments and gross monthly income.',
    aboutText: 'The Debt-to-Income Calculator helps you calculate your DTI ratio by comparing your monthly debt payments to your gross monthly income. This ratio is commonly used by lenders to evaluate affordability and borrowing risk. A lower debt-to-income ratio generally indicates more available income and may improve approval chances, while a higher ratio can make borrowing more difficult. If you want to estimate monthly home loan costs, you may also find the [Mortgage Calculator](/mortgage-calculator) useful. To measure property loan risk, the [Loan-to-Value Calculator](/loan-to-value-calculator) can also help.',
    howToUse: [
      'Enter your total monthly debt payments.',
      'Enter your gross monthly income.',
      'View your debt-to-income ratio and remaining income instantly.'
    ],
    href: '/debt-to-income-calculator',
    icon: Banknote,
    available: true,
    category: 'Finance',
    howItWorks: 'The calculator divides your total monthly debt payments by your gross monthly income, then multiplies by 100 to show your debt-to-income ratio as a percentage. It also shows how much income remains after debt payments.',
    exampleUsage: [
      'Monthly debt 1,500 and gross monthly income 5,000 → DTI 30%',
      'Monthly debt 2,000 and gross monthly income 8,000 → DTI 25%'
    ],
    relatedTools: ['mortgage-calculator', 'loan-to-value-calculator', 'apr-calculator'],
    component: DebtToIncomeCalculator,
    seoTitle: 'Debt-to-Income Calculator Online | DTI Ratio Calculator | SoftwareCalc',
    seoDescription: 'Free online debt-to-income calculator. Enter monthly debt payments and gross monthly income to calculate your DTI ratio instantly.',
    formulaTitle: 'Debt-to-Income Formula',
    formulaExpression: 'DTI (%) = (Monthly Debt Payments ÷ Gross Monthly Income) × 100',
    formulaExplanation: 'Debt-to-income ratio shows how much of your gross monthly income goes toward debt payments. Lower ratios generally indicate better affordability.'
  },
  {
  id: 'rule-of-72-calculator',
  name: 'Rule of 72 Calculator',
  description: 'Estimate how many years it takes for an investment to double based on annual return rate.',
  href: '/rule-of-72-calculator',
  icon: TrendingUp,
  available: true,
  category: 'Finance',
  howItWorks: 'The Rule of 72 estimates how long it takes for an investment to double by dividing 72 by the annual return rate. It is a quick mental shortcut often used in investing and personal finance.',
  exampleUsage: [
    'Annual return 6% → about 12 years to double',
    'Annual return 8% → about 9 years to double'
  ],
  relatedTools: ['compound-interest-calculator', 'retirement-calculator', 'inflation-calculator'],
  component: RuleOf72Calculator,
  seoTitle: 'Rule of 72 Calculator Online | Years to Double Investment | SoftwareCalc',
  seoDescription: 'Free online Rule of 72 calculator. Enter an annual return rate to estimate how many years it may take for an investment to double.',
    aboutText: 'The Rule of 72 Calculator helps you estimate how long it may take for an investment to double based on its annual return rate. It uses the simple Rule of 72 formula, which divides 72 by the expected yearly return percentage. This makes it a quick and useful shortcut for investors, savers, and anyone comparing long-term growth rates. If you want a more detailed growth estimate, you may also find the [Compound Interest Calculator](/compound-interest-calculator) useful. For long-term retirement projections, the [Retirement Calculator](/retirement-calculator) can also help.',
    howToUse: [
    'Enter the expected annual return rate as a percentage.',
    'View the estimated number of years it may take for your investment to double.'
  ]
  },
{
  id: 'roi-calculator',
  name: 'ROI Calculator',
  description: 'Calculate return on investment (ROI) and profit based on investment and return amount.',
  aboutText: 'The ROI Calculator helps you evaluate how profitable an investment or business decision is by calculating the return on investment as a percentage. Unlike long-term growth calculators, this tool is designed for analyzing completed or short-term investments, allowing you to quickly determine whether a project or purchase was worth the cost. For example, if you invest $1,000 and receive $1,300 in return, the calculator shows both your profit and ROI percentage. This makes it useful for comparing different opportunities and making data-driven financial decisions. For long-term growth projections, you can use the [Investment Calculator](/investment-calculator) or [Compound Interest Calculator](/compound-interest-calculator).',
  howToUse: [
    'Enter the initial investment amount.',
    'Enter the total return amount.',
    'View the calculated ROI percentage and profit instantly.'
  ],
  href: '/roi-calculator',
  icon: TrendingUp,
  available: true,
  category: 'Finance',
  howItWorks: 'ROI is calculated by subtracting the investment from the return, dividing by the investment, and multiplying by 100 to get a percentage. Profit is simply the return minus the investment.',
  exampleUsage: [
    'Invest 1,000 and return 1,200 → ROI 20%, profit 200',
    'Invest 5,000 and return 6,500 → ROI 30%, profit 1,500'
  ],
  relatedTools: ['payback-period-calculator', 'compound-interest-calculator', 'rule-of-72-calculator'],
  component: ROICalculator,
  seoTitle: 'ROI Calculator Online | Return on Investment Calculator | SoftwareCalc',
  seoDescription: 'Free online ROI calculator. Enter investment and return amount to calculate return on investment and profit instantly.',
  formulaTitle: 'ROI Formula',
  formulaExpression: 'ROI (%) = ((Return − Investment) ÷ Investment) × 100',
  formulaExplanation: 'ROI measures how profitable an investment is relative to its cost. A higher percentage means a more profitable investment.'
  },
{
  id: 'break-even-calculator',
  name: 'Break-Even Calculator',
  description: 'Calculate break-even point in units based on fixed costs, selling price, and variable cost per unit.',
  aboutText: 'The Break-Even Calculator helps you determine how many units you need to sell to cover your fixed costs. It compares your selling price per unit and variable cost per unit to calculate the contribution margin, then shows the break-even point in units. This tool is useful for pricing decisions, product planning, and business forecasting. If you want to measure profitability after costs, you may also find the [Profit Margin Calculator](/profit-margin-calculator) useful. For pricing strategy, the [Markup Calculator](/markup-calculator) can also help.',
  howToUse: [
    'Enter your fixed costs.',
    'Enter the selling price per unit.',
    'Enter the variable cost per unit.',
    'View the break-even units and contribution margin instantly.'
  ],
  href: '/break-even-calculator',
  icon: TrendingUp,
  available: true,
  category: 'Finance',
  howItWorks: 'The calculator subtracts variable cost per unit from selling price per unit to find contribution margin. It then divides fixed costs by contribution margin to calculate the number of units needed to break even.',
  exampleUsage: [
    'Fixed costs 10,000, selling price 50, variable cost 30 → break-even at 500 units',
    'Fixed costs 5,000, selling price 25, variable cost 10 → break-even at 333.33 units'
  ],
  relatedTools: ['profit-margin-calculator', 'markup-calculator', 'roi-calculator'],
  component: BreakEvenCalculator,
  seoTitle: 'Break-Even Calculator Online | Break-Even Point Calculator | SoftwareCalc',
  seoDescription: 'Free online break-even calculator. Enter fixed costs, selling price, and variable cost per unit to calculate your break-even point instantly.',
  formulaTitle: 'Break-Even Formula',
  formulaExpression: 'Break-Even Units = Fixed Costs ÷ (Selling Price Per Unit − Variable Cost Per Unit)',
  formulaExplanation: 'Break-even point is the number of units you need to sell before total revenue equals total costs. Contribution margin per unit is the amount left after variable costs to cover fixed costs.'
  },
{
  id: 'gross-profit-calculator',
  name: 'Gross Profit Calculator',
  description: 'Calculate gross profit and gross profit margin based on revenue and cost of goods sold.',
  aboutText: 'The Gross Profit Calculator helps you determine how much profit you make after subtracting the cost of goods sold (COGS) from your revenue. It also calculates the gross profit margin as a percentage, which shows how efficiently your business produces and sells goods. This tool is useful for business owners, e-commerce sellers, and anyone analyzing product profitability. If you want to evaluate overall profitability, you may also find the [Profit Margin Calculator](/profit-margin-calculator) useful. For pricing decisions, the [Markup Calculator](/markup-calculator) can also help.',
  howToUse: [
    'Enter your total revenue.',
    'Enter your cost of goods sold (COGS).',
    'View the gross profit and gross profit margin instantly.'
  ],
  href: '/gross-profit-calculator',
  icon: TrendingUp,
  available: true,
  category: 'Finance',
  howItWorks: 'Gross profit is calculated by subtracting cost of goods sold from revenue. Gross profit margin is then calculated by dividing gross profit by revenue and multiplying by 100.',
  exampleUsage: [
    'Revenue 10,000 and COGS 6,000 → gross profit 4,000, margin 40%',
    'Revenue 5,000 and COGS 3,500 → gross profit 1,500, margin 30%'
  ],
  relatedTools: ['profit-margin-calculator', 'markup-calculator', 'break-even-calculator'],
  component: GrossProfitCalculator,
  seoTitle: 'Gross Profit Calculator Online | Profit & Margin Calculator | SoftwareCalc',
  seoDescription: 'Free online gross profit calculator. Enter revenue and cost of goods sold to calculate gross profit and gross profit margin instantly.',
  formulaTitle: 'Gross Profit Formula',
  formulaExpression: 'Gross Profit = Revenue − COGS',
  formulaExplanation: 'Gross profit shows how much money remains after subtracting the direct costs of producing goods. Gross profit margin expresses this as a percentage of revenue.'
  },
{
  id: 'net-profit-calculator',
  name: 'Net Profit Calculator',
  description: 'Calculate net profit and net profit margin based on revenue and total expenses.',
  aboutText: 'The Net Profit Calculator helps you determine how much profit remains after all expenses are deducted from your revenue. It also calculates the net profit margin as a percentage, which shows the overall profitability of a business. This tool is useful for business owners, freelancers, and anyone analyzing financial performance. If you want to analyze profit before expenses, you may also find the [Gross Profit Calculator](/gross-profit-calculator) useful. For pricing strategies, the [Markup Calculator](/markup-calculator) can also help.',
  howToUse: [
    'Enter your total revenue.',
    'Enter your total expenses.',
    'View the net profit and net profit margin instantly.'
  ],
  href: '/net-profit-calculator',
  icon: TrendingUp,
  available: true,
  category: 'Finance',
  howItWorks: 'Net profit is calculated by subtracting total expenses from revenue. Net profit margin is then calculated by dividing net profit by revenue and multiplying by 100.',
  exampleUsage: [
    'Revenue 10,000 and expenses 8,000 → net profit 2,000, margin 20%',
    'Revenue 5,000 and expenses 4,500 → net profit 500, margin 10%'
  ],
  relatedTools: ['gross-profit-calculator', 'profit-margin-calculator', 'roi-calculator'],
  component: NetProfitCalculator,
  seoTitle: 'Net Profit Calculator Online | Profit & Margin Calculator | SoftwareCalc',
  seoDescription: 'Free online net profit calculator. Enter revenue and total expenses to calculate net profit and net profit margin instantly.',
  formulaTitle: 'Net Profit Formula',
  formulaExpression: 'Net Profit = Revenue − Total Expenses',
  formulaExplanation: 'Net profit shows how much money remains after all business expenses are deducted. Net profit margin expresses this as a percentage of revenue.'
  },
{
  id: 'fraction-calculator',
  name: 'Fraction Calculator',
  description: 'Add two fractions and display the simplified result and decimal value.',
  aboutText: 'The Fraction Calculator helps you add two fractions and view the result in both simplified fraction form and decimal form. This is useful for school math, measurements, recipes, and any situation where fractions need to be combined accurately. It reduces the result to lowest terms so the answer is easier to read and use. If you need to compare proportions, you may also find the [Ratio Calculator](/ratio-calculator) useful. For decimal-based number summaries, the [Average Calculator](/average-calculator) can also help.',
  howToUse: [
    'Enter the numerator and denominator for the first fraction.',
    'Enter the numerator and denominator for the second fraction.',
    'View the simplified fraction result and decimal value instantly.'
  ],
  href: '/fraction-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator converts both fractions to a common denominator, adds them together, and simplifies the result by dividing the numerator and denominator by their greatest common divisor. It also shows the decimal equivalent.',
  exampleUsage: [
    '1/2 + 1/4 → 3/4, decimal 0.75',
    '2/3 + 1/6 → 5/6, decimal 0.8333'
  ],
  relatedTools: ['ratio-calculator', 'average-calculator', 'percentage-calculator'],
  component: FractionCalculator,
  seoTitle: 'Fraction Calculator Online | Add Fractions & Simplify | SoftwareCalc',
  seoDescription: 'Free online fraction calculator. Add two fractions, simplify the result, and view the decimal value instantly.',
  formulaTitle: 'Fraction Addition Formula',
  formulaExpression: 'a/b + c/d = (ad + bc) / bd',
  formulaExplanation: 'To add two fractions, multiply crosswise to create a common denominator, then simplify the result to lowest terms.'
  },
{
  id: 'proportion-calculator',
  name: 'Proportion Calculator',
  description: 'Solve proportions and find the missing value in an equation like A / B = C / X.',
  aboutText: 'The Proportion Calculator helps you solve equations where two ratios are equal, such as A divided by B equals C divided by X. It is useful for school math, scaling, recipes, maps, and any situation where you need to find a missing value in a proportional relationship. This tool gives the result instantly and helps reduce manual calculation mistakes. If you want to simplify ratios directly, you may also find the [Ratio Calculator](/ratio-calculator) useful. For percentage-based relationships, the [Percentage Calculator](/percentage-calculator) can also help.',
  howToUse: [
    'Enter the first three values in the proportion.',
    'Leave the calculator to solve for the missing fourth value.',
    'View the result instantly.'
  ],
  href: '/proportion-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator solves the proportion A / B = C / X by cross-multiplying and isolating the missing value. The formula used is X = (B × C) ÷ A.',
  exampleUsage: [
    '2 / 5 = 4 / X → X = 10',
    '3 / 8 = 6 / X → X = 16'
  ],
  relatedTools: ['ratio-calculator', 'percentage-calculator', 'average-calculator'],
  component: ProportionCalculator,
  seoTitle: 'Proportion Calculator Online | Solve Ratios & Missing Values | SoftwareCalc',
  seoDescription: 'Free online proportion calculator. Solve A/B = C/X and find the missing value instantly.',
  formulaTitle: 'Proportion Formula',
  formulaExpression: 'X = (B × C) ÷ A',
  formulaExplanation: 'A proportion states that two ratios are equal. Cross-multiplying lets you solve for the missing value.'
  },
{
  id: 'scientific-notation-calculator',
  name: 'Scientific Notation Calculator',
  description: 'Convert numbers into scientific notation and standard decimal form.',
  aboutText: `The Scientific Notation Calculator helps you convert numbers into scientific notation and back into standard form quickly and accurately. Scientific notation is a way of writing very large or very small numbers using powers of 10, making them easier to read, compare, and work with. This format is widely used in science, engineering, and mathematics. For example, instead of writing 1000000, you can write it as 1 × 10^6. Similarly, very small numbers like 0.000001 can be written as 1 × 10^-6. This makes calculations more manageable and reduces the chance of errors when dealing with long strings of zeros. You can use this calculator to convert numbers into scientific notation, understand how powers of 10 work, or verify results in equations and formulas. It is especially useful for students learning math concepts, as well as professionals working with precise measurements or large data values. For working directly with powers, you can also use the [Exponent Calculator](/exponent-calculator). If you need to calculate roots, the [Square Root Calculator](/square-root-calculator) can help with reverse operations.`,
  howToUse: [
    'Enter the number you want to convert.',
    'Choose whether to convert to or from scientific notation (if applicable).',
    'View the result instantly in the desired format.',
    'Adjust the value to explore different powers of 10 and representations.'
  ],
  href: '/scientific-notation-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator rewrites the number as a coefficient between 1 and 10 multiplied by a power of ten. It also displays the original number in standard form for comparison.',
  exampleUsage: [
    '1230000 → 1.23 × 10^6',
    '0.00045 → 4.5 × 10^-4'
  ],
  relatedTools: ['average-calculator', 'percentage-calculator', 'ratio-calculator'],
  component: ScientificNotationCalculator,
  seoTitle: 'Scientific Notation Calculator Online | Convert Standard Form | SoftwareCalc',
  seoDescription: 'Free online scientific notation calculator. Convert numbers to scientific notation and standard decimal form instantly.',
  formulaTitle: 'Scientific Notation Form',
  formulaExpression: 'a × 10^n',
  formulaExplanation: 'In scientific notation, a is a number between 1 and 10, and n is an integer showing how many places the decimal moves.'
  },
{
  id: 'exponent-calculator',
  name: 'Exponent Calculator',
  description: 'Calculate powers by raising a base number to an exponent.',
  aboutText: `The Exponent Calculator helps you quickly raise a number to a power without doing repeated multiplication manually. By entering a base number and an exponent, you can instantly calculate expressions like 2^5, 10^3, or 4^2. Exponents are used in many areas of math, science, and finance. They represent repeated multiplication, making them useful for calculations involving growth, scaling, and large numbers. For example, exponents are used in compound interest formulas, scientific notation, and exponential growth models. This tool is especially helpful when working with larger numbers or higher powers, where manual calculations can become time-consuming and prone to mistakes. Instead of multiplying a number by itself multiple times, you can simply enter your values and get an accurate result instantly. For example, you can use this calculator to compute powers like 3^4 (which equals 81), calculate values used in formulas, or better understand how exponential growth works. It is designed to be simple, fast, and reliable for both learning and practical use. If you need to reverse an exponent, you can use the [Square Root Calculator](/square-root-calculator) to find roots. For working with very large or very small numbers, the [Scientific Notation Calculator](/scientific-notation-calculator) is also useful.`,
  howToUse: [
    'Enter the base number.',
    'Enter the exponent (power).',
    'View the calculated result instantly.',
    'Adjust the inputs to explore different exponent values and results.'
  ],
  href: '/exponent-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator raises the base number to the exponent using exponentiation. For example, 2^3 means 2 × 2 × 2, which equals 8.',
  exampleUsage: [
    '2^3 → 8',
    '5^2 → 25',
    '10^4 → 10000'
  ],
  relatedTools: ['scientific-notation-calculator', 'ratio-calculator', 'percentage-calculator'],
  component: ExponentCalculator,
  seoTitle: 'Exponent Calculator Online | Power Calculator | SoftwareCalc',
  seoDescription: 'Free online exponent calculator. Enter a base number and exponent to calculate powers instantly with this simple power calculator.',
  formulaTitle: 'Exponent Formula',
  formulaExpression: 'Result = base^exponent',
  formulaExplanation: 'The exponent tells you how many times the base number is multiplied by itself.'
},
{
  id: 'absolute-value-calculator',
  name: 'Absolute Value Calculator',
  description: 'Calculate the absolute value of any number instantly.',
  aboutText: 'The Absolute Value Calculator helps you find the distance of a number from zero on the number line. Absolute value always returns a non-negative result, regardless of whether the input is positive or negative. This tool is useful in algebra, equations, statistics, and everyday math problems. Instead of manually converting negative numbers, you can instantly calculate the absolute value. If you are working with powers and roots, you may also find the [Exponent Calculator](/exponent-calculator) or [Square Root Calculator](/square-root-calculator) useful.',
  howToUse: [
    'Enter the number you want to evaluate.',
    'View the absolute value instantly.'
  ],
  href: '/absolute-value-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator removes the sign of the number. Positive numbers stay the same, and negative numbers become positive.',
  exampleUsage: [
    '|-5| → 5',
    '|10| → 10',
    '|-3.7| → 3.7'
  ],
  relatedTools: ['exponent-calculator', 'square-root-calculator', 'percentage-calculator'],
  component: AbsoluteValueCalculator,
  seoTitle: 'Absolute Value Calculator Online | |x| Calculator | SoftwareCalc',
  seoDescription: 'Free online absolute value calculator. Enter any number to instantly calculate its absolute value with this simple math tool.',
  formulaTitle: 'Absolute Value Formula',
  formulaExpression: '|x| = x (if x ≥ 0), −x (if x < 0)',
  formulaExplanation: 'Absolute value represents the distance from zero, so the result is always non-negative.' 
},
{
  id: 'reciprocal-calculator',
  name: 'Reciprocal Calculator',
  description: 'Calculate the reciprocal (1/x) of any number instantly.',
  aboutText: 'The Reciprocal Calculator helps you find the multiplicative inverse of a number. The reciprocal of a number is 1 divided by that number, often written as 1/x. This is useful in algebra, fractions, equations, and many areas of mathematics. Instead of manually dividing, you can enter a number and instantly get its reciprocal. If you are working with fractions, you may also find the [Fraction Calculator](/fraction-calculator) useful. For other number transformations, the [Absolute Value Calculator](/absolute-value-calculator) can also help.',
  howToUse: [
    'Enter the number you want to find the reciprocal of.',
    'View the reciprocal result instantly.'
  ],
  href: '/reciprocal-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The reciprocal of a number is calculated by dividing 1 by that number. For example, the reciprocal of 2 is 1 ÷ 2 = 0.5.',
  exampleUsage: [
    '1 / 2 → 0.5',
    '1 / 4 → 0.25',
    '1 / 0.5 → 2'
  ],
  relatedTools: ['fraction-calculator', 'absolute-value-calculator', 'exponent-calculator'],
  component: ReciprocalCalculator,
  seoTitle: 'Reciprocal Calculator Online | 1/x Calculator | SoftwareCalc',
  seoDescription: 'Free online reciprocal calculator. Enter any number to instantly calculate its reciprocal (1/x) with this simple math tool.',
  formulaTitle: 'Reciprocal Formula',
  formulaExpression: 'Reciprocal = 1 / x',
  formulaExplanation: 'The reciprocal of a number is its multiplicative inverse, meaning when multiplied together they equal 1.'
},
{
  id: 'square-root-calculator',
  name: 'Square Root Calculator',
  description: 'Calculate the square root of any non-negative number instantly.',
  aboutText: 'The Square Root Calculator helps you quickly find the value that, when multiplied by itself, equals the original number. Square roots are commonly used in algebra, geometry, formulas, and everyday measurement problems. This tool is useful when working with areas, distances, and estimation. Instead of calculating manually, you can enter a number and instantly get its square root. If you are also working with powers or large numbers, you may find the [Exponent Calculator](/exponent-calculator) or [Scientific Notation Calculator](/scientific-notation-calculator) useful.',
  howToUse: [
    'Enter any non-negative number.',
    'View the square root result instantly.',
    'If you enter a negative number, the calculator will show a validation message.'
  ],
  href: '/square-root-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator uses the square root of the entered number. A square root is a value that, when multiplied by itself, equals the original number.',
  exampleUsage: [
    '√9 → 3',
    '√16 → 4',
    '√2.25 → 1.5'
  ],
  relatedTools: ['exponent-calculator', 'scientific-notation-calculator', 'absolute-value-calculator'],
  component: SquareRootCalculator,
  seoTitle: 'Square Root Calculator Online | √x Calculator | SoftwareCalc',
  seoDescription: 'Free online square root calculator. Enter any non-negative number to instantly calculate its square root with this simple math tool.',
  formulaTitle: 'Square Root Formula',
  formulaExpression: 'x = √n',
  formulaExplanation: 'The square root of a number is the value that, when multiplied by itself, gives the original number.'
  },
{
  id: 'nth-root-calculator',
  name: 'Nth Root Calculator',
  description: 'Calculate the nth root of any number instantly.',
  aboutText: 'The Nth Root Calculator helps you find the value that, when multiplied by itself n times, equals the original number. It is a generalization of square roots and cube roots, making it useful in algebra, engineering, and scientific calculations. This tool allows you to calculate roots of any degree quickly and accurately. For simpler cases, you can also use the [Square Root Calculator](/square-root-calculator) or the [Cube Root Calculator](/cube-root-calculator).',
  howToUse: [
    'Enter the number you want to calculate the root of.',
    'Enter the root value (n).',
    'View the result instantly.',
    'If the number is negative and the root is even, the calculator will show a validation message.'
  ],
  href: '/nth-root-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator uses the formula x = n^(1/r), where n is the number and r is the root. This means raising the number to the power of 1 divided by the root.',
  exampleUsage: [
    '√9 (n=2) → 3',
    '³√27 (n=3) → 3',
    '⁴√16 (n=4) → 2'
  ],
  relatedTools: ['square-root-calculator', 'cube-root-calculator', 'exponent-calculator'],
  component: NthRootCalculator,
  seoTitle: 'Nth Root Calculator Online | Root Calculator | SoftwareCalc',
  seoDescription: 'Free online nth root calculator. Calculate square roots, cube roots, and any root of a number instantly with this simple math tool.',
  formulaTitle: 'Nth Root Formula',
  formulaExpression: 'x = n^(1/r)',
  formulaExplanation: 'The nth root of a number is calculated by raising the number to the power of 1 divided by the root.'
},
{
  id: 'cube-root-calculator',
  name: 'Cube Root Calculator',
  description: 'Calculate the cube root of any number instantly.',
  aboutText: 'The Cube Root Calculator helps you find the value that, when multiplied by itself three times, equals the original number. Cube roots are useful in algebra, geometry, volume calculations, and many scientific formulas. This tool makes it easy to calculate cube roots instantly, including for negative numbers. If you need more general root calculations, you may also find the [Nth Root Calculator](/nth-root-calculator) or [Square Root Calculator](/square-root-calculator) useful.',
  howToUse: [
    'Enter the number you want to evaluate.',
    'View the cube root result instantly.',
    'Negative numbers are supported because cube roots can also be negative.'
  ],
  href: '/cube-root-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator uses the cube root of the entered number. A cube root is a value that, when multiplied by itself three times, equals the original number.',
  exampleUsage: [
    '∛27 → 3',
    '∛64 → 4',
    '∛-8 → -2'
  ],
  relatedTools: ['square-root-calculator', 'nth-root-calculator', 'exponent-calculator'],
  component: CubeRootCalculator,
  seoTitle: 'Cube Root Calculator Online | ∛x Calculator | SoftwareCalc',
  seoDescription: 'Free online cube root calculator. Enter any number to instantly calculate its cube root, including negative values, with this simple math tool.',
  formulaTitle: 'Cube Root Formula',
  formulaExpression: 'x = ∛n',
  formulaExplanation: 'The cube root of a number is the value that, when multiplied by itself three times, gives the original number.'
  },
{
  id: 'gcf-calculator',
  name: 'GCF Calculator',
  description: 'Calculate the greatest common factor of two numbers instantly.',
  aboutText: 'The GCF Calculator helps you find the greatest common factor of two numbers quickly and accurately. The greatest common factor, also called the greatest common divisor, is the largest whole number that divides both numbers evenly. This tool is useful for simplifying fractions, solving math problems, and working with number relationships. If you are also working with ratios or fractions, you may find the [Fraction Calculator](/fraction-calculator) or [Ratio Calculator](/ratio-calculator) useful.',
  howToUse: [
    'Enter the first number.',
    'Enter the second number.',
    'View the greatest common factor instantly.',
    'Use whole numbers for best results.'
  ],
  href: '/gcf-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator finds the largest whole number that divides both entered numbers without leaving a remainder. This is often done using the Euclidean algorithm.',
  exampleUsage: [
    'GCF of 12 and 18 → 6',
    'GCF of 24 and 36 → 12',
    'GCF of 8 and 20 → 4'
  ],
  relatedTools: ['fraction-calculator', 'ratio-calculator', 'proportion-calculator'],
  component: GcfCalculator,
  seoTitle: 'GCF Calculator Online | Greatest Common Factor Calculator | SoftwareCalc',
  seoDescription: 'Free online GCF calculator. Enter two numbers to instantly calculate their greatest common factor with this simple math tool.',
  formulaTitle: 'GCF Method',
  formulaExpression: 'GCF(a, b) = largest number that divides both a and b',
  formulaExplanation: 'The greatest common factor is the largest whole number that can divide both input numbers evenly with no remainder.'
  },
{
  id: 'lcm-calculator',
  name: 'LCM Calculator',
  description: 'Calculate the least common multiple of two numbers instantly.',
  aboutText: 'The LCM Calculator helps you find the least common multiple of two numbers quickly and accurately. The least common multiple is the smallest whole number that both numbers divide into evenly. This tool is useful for fractions, denominators, arithmetic, and many classroom math problems. If you are also working with factors or simplifying numbers, you may find the [GCF Calculator](/gcf-calculator) or [Fraction Calculator](/fraction-calculator) useful.',
  howToUse: [
    'Enter the first number.',
    'Enter the second number.',
    'View the least common multiple instantly.',
    'Use whole numbers for best results.'
  ],
  href: '/lcm-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator finds the smallest whole number that both entered numbers divide into evenly. A common method is to first calculate the greatest common factor and then use it to get the least common multiple.',
  exampleUsage: [
    'LCM of 4 and 6 → 12',
    'LCM of 8 and 12 → 24',
    'LCM of 5 and 10 → 10'
  ],
  relatedTools: ['gcf-calculator', 'fraction-calculator', 'ratio-calculator'],
  component: LcmCalculator,
  seoTitle: 'LCM Calculator Online | Least Common Multiple Calculator | SoftwareCalc',
  seoDescription: 'Free online LCM calculator. Enter two numbers to instantly calculate their least common multiple with this simple math tool.',
  formulaTitle: 'LCM Formula',
  formulaExpression: 'LCM(a, b) = |a × b| / GCF(a, b)',
  formulaExplanation: 'The least common multiple can be found by dividing the absolute product of the two numbers by their greatest common factor.'
  },
{
  id: 'decimal-to-fraction-calculator',
  name: 'Decimal to Fraction Calculator',
  description: 'Convert any decimal number to a simplified fraction instantly.',
  aboutText: 'The Decimal to Fraction Calculator helps you convert decimal numbers into simplified fractions quickly and accurately. This is useful in school math, measurement conversions, recipes, and many everyday calculations where fractions are easier to understand than decimals. Instead of converting manually, you can enter a decimal and instantly see its fraction form. If you are also simplifying fractions or working with factors, you may find the [Fraction Calculator](/fraction-calculator) or [GCF Calculator](/gcf-calculator) useful.',
  howToUse: [
    'Enter the decimal number you want to convert.',
    'View the fraction result instantly.',
    'The calculator automatically simplifies the fraction when possible.'
  ],
  href: '/decimal-to-fraction-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator converts the decimal into a fraction by placing the digits over a power of 10, then simplifies the result by dividing the numerator and denominator by their greatest common factor.',
  exampleUsage: [
    '0.5 → 1/2',
    '0.75 → 3/4',
    '1.25 → 5/4'
  ],
  relatedTools: ['fraction-calculator', 'gcf-calculator', 'lcm-calculator'],
  component: DecimalToFractionCalculator,
  seoTitle: 'Decimal to Fraction Calculator Online | SoftwareCalc',
  seoDescription: 'Free online decimal to fraction calculator. Convert any decimal number into a simplified fraction instantly with this simple math tool.',
  formulaTitle: 'Decimal to Fraction Method',
  formulaExpression: 'Fraction = decimal × 10^n / 10^n',
  formulaExplanation: 'A decimal is converted to a fraction by removing the decimal point, placing the number over a power of 10, and then simplifying the fraction.'
  },
{
  id: 'fraction-to-decimal-calculator',
  name: 'Fraction to Decimal Calculator',
  description: 'Convert any fraction to a decimal instantly.',
  aboutText: 'The Fraction to Decimal Calculator helps you convert fractions into decimal values quickly and accurately. This is useful in school math, measurement conversions, finance, and everyday calculations where decimal format is easier to read or compare. Instead of dividing manually, you can enter a numerator and denominator to instantly see the decimal result. If you are also converting in the opposite direction, you may find the [Decimal to Fraction Calculator](/decimal-to-fraction-calculator) or [Fraction Calculator](/fraction-calculator) useful.',
  howToUse: [
    'Enter the numerator.',
    'Enter the denominator.',
    'View the decimal result instantly.',
    'Make sure the denominator is not 0.'
  ],
  href: '/fraction-to-decimal-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator converts a fraction into a decimal by dividing the numerator by the denominator.',
  exampleUsage: [
    '1/2 → 0.5',
    '3/4 → 0.75',
    '5/8 → 0.625'
  ],
  relatedTools: ['decimal-to-fraction-calculator', 'fraction-calculator', 'gcf-calculator'],
  component: FractionToDecimalCalculator,
  seoTitle: 'Fraction to Decimal Calculator Online | SoftwareCalc',
  seoDescription: 'Free online fraction to decimal calculator. Enter a numerator and denominator to instantly convert any fraction into a decimal.',
  formulaTitle: 'Fraction to Decimal Formula',
  formulaExpression: 'Decimal = Numerator / Denominator',
  formulaExplanation: 'A fraction is converted to a decimal by dividing the top number by the bottom number.'
  },
{
  id: 'improper-fraction-to-mixed-number-calculator',
  name: 'Improper Fraction to Mixed Number Calculator',
  description: 'Convert an improper fraction to a mixed number instantly.',
  aboutText: 'The Improper Fraction to Mixed Number Calculator helps you convert top-heavy fractions into mixed numbers quickly and accurately. This is useful in school math, worksheets, and everyday calculations where mixed numbers are easier to read than improper fractions. Instead of converting manually, you can enter the numerator and denominator and instantly see the whole number and remaining fraction. If you are also working with fraction conversions, you may find the [Fraction to Decimal Calculator](/fraction-to-decimal-calculator) or [Decimal to Fraction Calculator](/decimal-to-fraction-calculator) useful.',
  howToUse: [
    'Enter the numerator.',
    'Enter the denominator.',
    'View the mixed number result instantly.',
    'Make sure the denominator is not 0.'
  ],
  href: '/improper-fraction-to-mixed-number-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator divides the numerator by the denominator to get the whole number, then uses the remainder as the fractional part. The remaining fraction is simplified when possible.',
  exampleUsage: [
    '7/3 → 2 1/3',
    '11/4 → 2 3/4',
    '9/2 → 4 1/2'
  ],
  relatedTools: ['fraction-calculator', 'fraction-to-decimal-calculator', 'decimal-to-fraction-calculator'],
  component: ImproperFractionToMixedNumberCalculator,
  seoTitle: 'Improper Fraction to Mixed Number Calculator Online | SoftwareCalc',
  seoDescription: 'Free online improper fraction to mixed number calculator. Enter a numerator and denominator to instantly convert an improper fraction into a mixed number.',
  formulaTitle: 'Improper Fraction to Mixed Number Method',
  formulaExpression: 'Mixed Number = quotient and remainder/denominator',
  formulaExplanation: 'Divide the numerator by the denominator. The quotient becomes the whole number, and the remainder becomes the new numerator over the original denominator.'
  },
{
  id: 'simplify-fractions-calculator',
  name: 'Simplify Fractions Calculator',
  description: 'Simplify any fraction to its lowest terms instantly.',
  aboutText: 'The Simplify Fractions Calculator helps you reduce fractions to their simplest form quickly and accurately. This is useful in school math, algebra, and everyday calculations where simplified fractions are easier to understand and compare. Instead of manually finding common factors, you can enter a fraction and instantly get the reduced result. If you are also working with fraction conversions, you may find the [Fraction Calculator](/fraction-calculator) or [GCF Calculator](/gcf-calculator) useful.',
  howToUse: [
    'Enter the numerator.',
    'Enter the denominator.',
    'View the simplified fraction instantly.',
    'Make sure the denominator is not 0.'
  ],
  href: '/simplify-fractions-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator finds the greatest common factor of the numerator and denominator, then divides both by that number to reduce the fraction to its simplest form.',
  exampleUsage: [
    '8/12 → 2/3',
    '10/20 → 1/2',
    '15/25 → 3/5'
  ],
  relatedTools: ['fraction-calculator', 'gcf-calculator', 'decimal-to-fraction-calculator'],
  component: SimplifyFractionsCalculator,
  seoTitle: 'Simplify Fractions Calculator Online | Reduce Fractions | SoftwareCalc',
  seoDescription: 'Free online simplify fractions calculator. Enter a numerator and denominator to instantly reduce any fraction to its simplest form.',
  formulaTitle: 'Fraction Simplification Method',
  formulaExpression: 'Simplified = (a ÷ GCF) / (b ÷ GCF)',
  formulaExplanation: 'A fraction is simplified by dividing both the numerator and denominator by their greatest common factor.'
  },
{
  id: 'mixed-number-to-improper-fraction-calculator',
  name: 'Mixed Number to Improper Fraction Calculator',
  description: 'Convert a mixed number to an improper fraction instantly.',
  aboutText: 'The Mixed Number to Improper Fraction Calculator helps you convert mixed numbers into improper fractions quickly and accurately. This is useful in algebra, fraction operations, and school math problems. Instead of converting manually, you can enter the whole number, numerator, and denominator to instantly get the improper fraction. If you are working in the opposite direction, you may find the [Improper Fraction to Mixed Number Calculator](/improper-fraction-to-mixed-number-calculator) or the [Fraction Calculator](/fraction-calculator) useful.',
  howToUse: [
    'Enter the whole number.',
    'Enter the numerator.',
    'Enter the denominator.',
    'View the improper fraction instantly.'
  ],
  href: '/mixed-number-to-improper-fraction-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator multiplies the whole number by the denominator, then adds the numerator to get the new numerator. The denominator remains the same.',
  exampleUsage: [
    '2 1/3 → 7/3',
    '3 2/5 → 17/5',
    '1 3/4 → 7/4'
  ],
  relatedTools: ['improper-fraction-to-mixed-number-calculator', 'fraction-calculator', 'decimal-to-fraction-calculator'],
  component: MixedNumberToImproperFractionCalculator,
  seoTitle: 'Mixed Number to Improper Fraction Calculator Online | SoftwareCalc',
  seoDescription: 'Free online mixed number to improper fraction calculator. Enter a whole number, numerator, and denominator to instantly convert to an improper fraction.',
  formulaTitle: 'Mixed Number to Improper Fraction Formula',
  formulaExpression: 'Improper Numerator = (Whole × Denominator) + Numerator',
  formulaExplanation: 'Multiply the whole number by the denominator, add the numerator, and keep the same denominator.'
  },
{
  id: 'rounding-calculator',
  name: 'Rounding Calculator',
  description: 'Round any number to a chosen number of decimal places instantly.',
  aboutText: 'The Rounding Calculator helps you round numbers quickly and accurately to a selected number of decimal places. This is useful in school math, finance, measurements, and everyday calculations where cleaner or shorter numbers are easier to read. Instead of rounding manually, you can enter a number and choose how many decimal places to keep. If you are also working with scientific values or powers, you may find the [Scientific Notation Calculator](/scientific-notation-calculator) or [Absolute Value Calculator](/absolute-value-calculator) useful.',
  howToUse: [
    'Enter the number you want to round.',
    'Enter how many decimal places to keep.',
    'View the rounded result instantly.',
    'Use a whole number for decimal places.'
  ],
  href: '/rounding-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator rounds the entered number to the specified number of decimal places using standard rounding rules. Digits of 5 or more round up, while digits below 5 round down.',
  exampleUsage: [
    '3.14159 to 2 decimal places → 3.14',
    '7.856 to 1 decimal place → 7.9',
    '12.499 to 0 decimal places → 12'
  ],
  relatedTools: ['scientific-notation-calculator', 'absolute-value-calculator', 'fraction-to-decimal-calculator'],
  component: RoundingCalculator,
  seoTitle: 'Rounding Calculator Online | Round to Decimal Places | SoftwareCalc',
  seoDescription: 'Free online rounding calculator. Enter a number and choose decimal places to round instantly with this simple math tool.',
  formulaTitle: 'Rounding Method',
  formulaExpression: 'Rounded Value = round(number × 10^n) / 10^n',
  formulaExplanation: 'A number is rounded by shifting the decimal, rounding to the nearest whole number, and shifting it back.'
  },
{
  id: 'sig-fig-calculator',
  name: 'Sig Fig Calculator',
  description: 'Round any number to a chosen number of significant figures instantly.',
  aboutText: 'The Sig Fig Calculator helps you round numbers to a chosen number of significant figures quickly and accurately. This is useful in science, engineering, lab work, and school math where precision matters more than simple decimal-place rounding. Instead of counting significant digits manually, you can enter a number and instantly get the correctly rounded result. If you also need standard decimal rounding, try the [Rounding Calculator](/rounding-calculator) or the [Scientific Notation Calculator](/scientific-notation-calculator).',
  howToUse: [
    'Enter the number you want to round.',
    'Enter the number of significant figures to keep.',
    'View the rounded result instantly.',
    'Use a whole number greater than 0 for significant figures.'
  ],
  href: '/sig-fig-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator keeps the specified number of meaningful digits in the number and rounds the remaining digits using standard rounding rules.',
  exampleUsage: [
    '1234.56 to 3 sig figs → 1230',
    '0.004567 to 2 sig figs → 0.0046',
    '-98.765 to 4 sig figs → -98.77'
  ],
  relatedTools: ['rounding-calculator', 'scientific-notation-calculator', 'absolute-value-calculator'],
  component: SigFigCalculator,
  seoTitle: 'Sig Fig Calculator Online | Significant Figures Calculator | SoftwareCalc',
  seoDescription: 'Free online sig fig calculator. Enter any number and round it to the required number of significant figures instantly.',
  formulaTitle: 'Significant Figures Method',
  formulaExpression: 'Round to n meaningful digits',
  formulaExplanation: 'Significant figures keep the first meaningful digits of a number and round the rest based on standard rounding rules.'
  },
{
  id: 'prime-number-calculator',
  name: 'Prime Number Calculator',
  description: 'Check if a number is prime instantly.',
  aboutText: 'The Prime Number Calculator helps you quickly check whether a number is prime or not. A prime number is a whole number greater than 1 that has only two factors: 1 and itself. This tool is useful in school math, number theory, and problem solving. Instead of testing divisibility manually, you can enter a number and instantly see whether it is prime. If you are also working with factors and multiples, you may find the [GCF Calculator](/gcf-calculator) or [LCM Calculator](/lcm-calculator) useful.',
  howToUse: [
    'Enter a whole number greater than 1.',
    'View the result instantly.',
    'The calculator will show whether the number is prime or not prime.'
  ],
  href: '/prime-number-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator checks whether the number can be divided evenly by any whole number other than 1 and itself. If it cannot, the number is prime.',
  exampleUsage: [
    '2 → Prime',
    '7 → Prime',
    '12 → Not Prime'
  ],
  relatedTools: ['gcf-calculator', 'lcm-calculator', 'absolute-value-calculator'],
  component: PrimeNumberCalculator,
  seoTitle: 'Prime Number Calculator Online | SoftwareCalc',
  seoDescription: 'Free online prime number calculator. Enter a whole number to instantly check whether it is prime or not.',
  formulaTitle: 'Prime Number Rule',
  formulaExpression: 'A prime number has exactly two positive factors: 1 and itself',
  formulaExplanation: 'If a whole number greater than 1 cannot be divided evenly by any other whole number except 1 and itself, it is prime.'
  },
{
  id: 'factors-calculator',
  name: 'Factors Calculator',
  description: 'Find all factors of a number instantly.',
  aboutText: 'The Factors Calculator helps you find all the factors of a number quickly and accurately. A factor is a whole number that divides another number evenly without leaving a remainder. This tool is useful in school math, number theory, and simplifying calculations. Instead of checking each number manually, you can enter a number and instantly see all of its factors. If you are also working with common factors or multiples, you may find the [GCF Calculator](/gcf-calculator) or [LCM Calculator](/lcm-calculator) useful.',
  howToUse: [
    'Enter a positive integer.',
    'View all factors instantly.',
    'Use whole numbers greater than 0.'
  ],
  href: '/factors-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator checks every number from 1 up to the entered value and finds which ones divide the number evenly without a remainder.',
  exampleUsage: [
    'Factors of 12 → 1, 2, 3, 4, 6, 12',
    'Factors of 15 → 1, 3, 5, 15',
    'Factors of 7 → 1, 7'
  ],
  relatedTools: ['gcf-calculator', 'lcm-calculator', 'prime-number-calculator'],
  component: FactorsCalculator,
  seoTitle: 'Factors Calculator Online | Find All Factors | SoftwareCalc',
  seoDescription: 'Free online factors calculator. Enter a number to instantly find all of its factors with this simple math tool.',
  formulaTitle: 'Factor Definition',
  formulaExpression: 'a is a factor of b if b ÷ a is a whole number',
  formulaExplanation: 'A factor is any whole number that divides another number evenly with no remainder.'
  },
{
  id: 'divisibility-calculator',
  name: 'Divisibility Calculator',
  description: 'Check if one number is divisible by another instantly.',
  aboutText: 'The Divisibility Calculator helps you quickly check whether one number can be divided evenly by another. This is useful in school math, number theory, and problem solving where you need to test factors, multiples, or divisibility rules. Instead of dividing manually, you can enter a number and a divisor to instantly see whether the division leaves a remainder. If you are also working with factors or common divisors, you may find the [Factors Calculator](/factors-calculator) or [GCF Calculator](/gcf-calculator) useful.',
  howToUse: [
    'Enter the number you want to test.',
    'Enter the divisor.',
    'View the result instantly.',
    'Make sure the divisor is not 0.'
  ],
  href: '/divisibility-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator checks whether the first number can be divided by the second number without leaving a remainder. If the remainder is 0, the number is divisible.',
  exampleUsage: [
    '12 ÷ 3 → Divisible',
    '15 ÷ 4 → Not Divisible',
    '20 ÷ 5 → Divisible'
  ],
  relatedTools: ['factors-calculator', 'gcf-calculator', 'prime-number-calculator'],
  component: DivisibilityCalculator,
  seoTitle: 'Divisibility Calculator Online | SoftwareCalc',
  seoDescription: 'Free online divisibility calculator. Enter a number and a divisor to instantly check whether the number is divisible.',
  formulaTitle: 'Divisibility Rule',
  formulaExpression: 'a is divisible by b if a mod b = 0',
  formulaExplanation: 'A number is divisible by another when the division leaves no remainder.'
  },
{
  id: 'common-factors-calculator',
  name: 'Common Factors Calculator',
  description: 'Find all common factors of two numbers instantly.',
  aboutText: 'The Common Factors Calculator helps you find all the shared factors between two numbers quickly and accurately. A common factor is a number that divides both values evenly without leaving a remainder. This tool is useful in school math, simplifying fractions, and understanding number relationships. Instead of checking manually, you can enter two numbers and instantly see their common factors. If you are also looking for the largest one, you may find the [GCF Calculator](/gcf-calculator) or the [Factors Calculator](/factors-calculator) useful.',
  howToUse: [
    'Enter the first number.',
    'Enter the second number.',
    'View all common factors instantly.',
    'Use whole numbers greater than 0.'
  ],
  href: '/common-factors-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator finds all factors of both numbers and then returns the values that appear in both lists.',
  exampleUsage: [
    'Common factors of 12 and 18 → 1, 2, 3, 6',
    'Common factors of 8 and 20 → 1, 2, 4',
    'Common factors of 7 and 9 → 1'
  ],
  relatedTools: ['gcf-calculator', 'factors-calculator', 'lcm-calculator'],
  component: CommonFactorsCalculator,
  seoTitle: 'Common Factors Calculator Online | SoftwareCalc',
  seoDescription: 'Free online common factors calculator. Enter two numbers to instantly find all common factors.',
  formulaTitle: 'Common Factors Definition',
  formulaExpression: 'Common factors = intersection of factors(a) and factors(b)',
  formulaExplanation: 'Common factors are numbers that divide both input values evenly without leaving a remainder.'
  },
{
  id: 'prime-factorization-calculator',
  name: 'Prime Factorization Calculator',
  description: 'Find the prime factorization of a number instantly.',
  aboutText: 'The Prime Factorization Calculator helps you break a number down into its prime factors quickly and accurately. Prime factorization expresses a number as a product of prime numbers, which is useful in algebra, simplifying fractions, and number theory. Instead of dividing step by step, you can enter a number and instantly see its prime factorization. If you are also checking prime numbers or working with factors, you may find the [Prime Number Calculator](/prime-number-calculator) or [Factors Calculator](/factors-calculator) useful.',
  howToUse: [
    'Enter a number greater than 1.',
    'View the prime factorization instantly.',
    'Use whole numbers for best results.'
  ],
  href: '/prime-factorization-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator repeatedly divides the number by the smallest possible prime numbers until only prime factors remain.',
  exampleUsage: [
    '12 → 2 × 2 × 3',
    '18 → 2 × 3 × 3',
    '30 → 2 × 3 × 5'
  ],
  relatedTools: ['prime-number-calculator', 'factors-calculator', 'gcf-calculator'],
  component: PrimeFactorizationCalculator,
  seoTitle: 'Prime Factorization Calculator Online | SoftwareCalc',
  seoDescription: 'Free online prime factorization calculator. Enter a number to instantly break it into its prime factors.',
  formulaTitle: 'Prime Factorization Concept',
  formulaExpression: 'n = p₁ × p₂ × ... × pₙ (where p are prime numbers)',
  formulaExplanation: 'Prime factorization expresses a number as a product of only prime numbers.'
  },
{
  id: 'even-or-odd-calculator',
  name: 'Even or Odd Calculator',
  description: 'Check if a number is even or odd instantly.',
  aboutText: 'The Even or Odd Calculator helps you quickly determine whether a number is even or odd. An even number can be divided by 2 without a remainder, while an odd number leaves a remainder of 1. This tool is useful in school math, number patterns, and basic problem solving. Instead of checking manually, you can enter a number and instantly see whether it is even or odd. If you are also testing number properties, you may find the [Divisibility Calculator](/divisibility-calculator) or [Prime Number Calculator](/prime-number-calculator) useful.',
  howToUse: [
    'Enter a whole number.',
    'View the result instantly.',
    'The calculator will show whether the number is even or odd.'
  ],
  href: '/even-or-odd-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator checks the remainder when the number is divided by 2. If the remainder is 0, the number is even. If the remainder is 1, the number is odd.',
  exampleUsage: [
    '8 → Even',
    '13 → Odd',
    '24 → Even'
  ],
  relatedTools: ['divisibility-calculator', 'prime-number-calculator', 'factors-calculator'],
  component: EvenOrOddCalculator,
  seoTitle: 'Even or Odd Calculator Online | SoftwareCalc',
  seoDescription: 'Free online even or odd calculator. Enter a whole number to instantly check whether it is even or odd.',
  formulaTitle: 'Even or Odd Rule',
  formulaExpression: 'n mod 2 = 0 → even, n mod 2 = 1 → odd',
  formulaExplanation: 'A number is even if it divides by 2 with no remainder. Otherwise, it is odd.'
  },
{
  id: 'decimal-to-percent-calculator',
  name: 'Decimal to Percent Calculator',
  description: 'Convert any decimal to a percent instantly.',
  aboutText: 'The Decimal to Percent Calculator helps you quickly convert decimal numbers into percentages. This is useful in school math, finance, statistics, and everyday calculations where percentages are easier to read than decimals. Instead of multiplying manually, you can enter a decimal and instantly see the percent result. If you are also converting fractions or working with percentage calculations, you may find the [Fraction to Decimal Calculator](/fraction-to-decimal-calculator) or [Percentage Calculator](/percentage-calculator) useful.',
  howToUse: [
    'Enter the decimal number you want to convert.',
    'View the percent result instantly.',
    'The calculator multiplies the decimal by 100 automatically.'
  ],
  href: '/decimal-to-percent-calculator',
  icon: Sigma,
  available: true,
  category: 'Math',
  howItWorks: 'The calculator converts a decimal into a percentage by multiplying the number by 100.',
  exampleUsage: [
    '0.5 → 50%',
    '0.25 → 25%',
    '1.2 → 120%'
  ],
  relatedTools: ['percentage-calculator', 'fraction-to-decimal-calculator', 'decimal-to-fraction-calculator'],
  component: DecimalToPercentCalculator,
  seoTitle: 'Decimal to Percent Calculator Online | SoftwareCalc',
  seoDescription: 'Free online decimal to percent calculator. Enter any decimal number to instantly convert it into a percentage.',
  formulaTitle: 'Decimal to Percent Formula',
  formulaExpression: 'Percent = Decimal × 100',
  formulaExplanation: 'A decimal is converted to a percent by multiplying it by 100 and adding the percent sign.'
  },
{
  id: 'vat-reverse-calculator',
  name: 'VAT Reverse Calculator',
  description: 'Remove VAT from a price instantly and calculate the original price before VAT.',
  aboutText: 'The VAT Reverse Calculator helps you remove VAT from a total price and find the original amount before tax was added. This is useful for businesses, freelancers, invoices, bookkeeping, and comparing net versus gross prices. Instead of working it out manually, you can enter a VAT-inclusive total and the VAT rate to instantly see the pre-VAT price and VAT amount. If you also need to add VAT to a price, you may find the [VAT Calculator](/vat-calculator) or [Sales Tax Calculator](/sales-tax-calculator) useful.',
  howToUse: [
    'Enter the total price including VAT.',
    'Enter the VAT rate as a percentage.',
    'View the original price before VAT and the VAT amount instantly.'
  ],
  href: '/vat-reverse-calculator',
  icon: Receipt,
  available: true,
  category: 'Finance',
  howItWorks: 'The calculator divides the VAT-inclusive total by 1 plus the VAT rate as a decimal to find the original price before VAT. It then subtracts that amount from the total to find the VAT portion.',
  exampleUsage: [
    '€125 with 25% VAT → €100 before VAT, €25 VAT',
    '€120 with 20% VAT → €100 before VAT, €20 VAT',
    '€107 with 7% VAT → €100 before VAT, €7 VAT'
  ],
  relatedTools: ['vat-calculator', 'sales-tax-calculator', 'unit-price-calculator'],
  component: VatReverseCalculator,
  seoTitle: 'VAT Reverse Calculator Online | Remove VAT from Price | SoftwareCalc',
  seoDescription: 'Free online VAT reverse calculator. Enter a VAT-inclusive price and VAT rate to instantly calculate the original price before VAT and the VAT amount.',
  formulaTitle: 'VAT Reverse Formula',
  formulaExpression: 'Price Before VAT = Total Price / (1 + VAT Rate / 100)',
  formulaExplanation: 'To remove VAT from a total price, divide the VAT-inclusive amount by 1 plus the VAT rate as a decimal. The difference is the VAT amount.'
  },
{
  id: 'sales-tax-reverse-calculator',
  name: 'Sales Tax Reverse Calculator',
  description: 'Remove sales tax from a price instantly and calculate the original price before tax.',
  aboutText: 'The Sales Tax Reverse Calculator helps you remove sales tax from a total price and find the original amount before tax was added. This is useful for shopping, receipts, invoices, budgeting, and comparing pre-tax versus after-tax prices. Instead of working it out manually, you can enter a tax-inclusive total and the sales tax rate to instantly see the original price and the tax amount. If you also need to add tax to a price, you may find the [Sales Tax Calculator](/sales-tax-calculator) or [VAT Reverse Calculator](/vat-reverse-calculator) useful.',
  howToUse: [
    'Enter the total price including sales tax.',
    'Enter the sales tax rate as a percentage.',
    'View the original price before tax and the sales tax amount instantly.'
  ],
  href: '/sales-tax-reverse-calculator',
  icon: Receipt,
  available: true,
  category: 'Finance',
  howItWorks: 'The calculator divides the tax-inclusive total by 1 plus the sales tax rate as a decimal to find the original price before tax. It then subtracts that amount from the total to find the sales tax portion.',
  exampleUsage: [
    '$108 with 8% sales tax → $100 before tax, $8 tax',
    '$107.50 with 7.5% sales tax → $100 before tax, $7.50 tax',
    '$110 with 10% sales tax → $100 before tax, $10 tax'
  ],
  relatedTools: ['sales-tax-calculator', 'vat-reverse-calculator', 'vat-calculator'],
  component: SalesTaxReverseCalculator,
  seoTitle: 'Sales Tax Reverse Calculator Online | Remove Tax from Price | SoftwareCalc',
  seoDescription: 'Free online sales tax reverse calculator. Enter a tax-inclusive price and tax rate to instantly calculate the original price before tax and the sales tax amount.',
  formulaTitle: 'Sales Tax Reverse Formula',
  formulaExpression: 'Price Before Tax = Total Price / (1 + Tax Rate / 100)',
  formulaExplanation: 'To remove sales tax from a total price, divide the tax-inclusive amount by 1 plus the tax rate as a decimal. The difference is the tax amount.'
  },
{
  id: 'sales-tax-rate-calculator',
  name: 'Sales Tax Rate Calculator',
  description: 'Calculate the sales tax rate from a price and tax amount instantly.',
  aboutText: 'The Sales Tax Rate Calculator helps you find the tax rate when you already know the original price and the sales tax amount. This is useful for receipts, invoices, shopping, bookkeeping, and checking whether a charge matches the expected tax percentage. Instead of calculating manually, you can enter the pre-tax price and tax amount to instantly find the sales tax rate. If you also need to add or remove tax, you may find the [Sales Tax Calculator](/sales-tax-calculator) or [Sales Tax Reverse Calculator](/sales-tax-reverse-calculator) useful.',
  howToUse: [
    'Enter the original price before tax.',
    'Enter the sales tax amount.',
    'View the sales tax rate instantly.',
    'Make sure the original price is greater than 0.'
  ],
  href: '/sales-tax-rate-calculator',
  icon: Receipt,
  available: true,
  category: 'Finance',
  howItWorks: 'The calculator divides the sales tax amount by the original pre-tax price, then multiplies the result by 100 to convert it into a percentage.',
  exampleUsage: [
    '$100 price and $8 tax → 8%',
    '$200 price and $15 tax → 7.5%',
    '$50 price and $5 tax → 10%'
  ],
  relatedTools: ['sales-tax-calculator', 'sales-tax-reverse-calculator', 'vat-calculator'],
  component: SalesTaxRateCalculator,
  seoTitle: 'Sales Tax Rate Calculator Online | SoftwareCalc',
  seoDescription: 'Free online sales tax rate calculator. Enter the original price and tax amount to instantly calculate the sales tax rate percentage.',
  formulaTitle: 'Sales Tax Rate Formula',
  formulaExpression: 'Sales Tax Rate = (Tax Amount / Original Price) × 100',
  formulaExplanation: 'To find the sales tax rate, divide the tax amount by the original price before tax and multiply by 100.'
  },
{
  id: 'credit-card-payoff-calculator',
  name: 'Credit Card Payoff Calculator',
  description: 'Calculate how long it will take to pay off your credit card and how much interest you will pay.',
  aboutText: 'The Credit Card Payoff Calculator helps you understand how long it will take to completely pay off your credit card debt and how much interest you will end up paying. Credit cards often have high interest rates, which means that making only minimum payments can keep you in debt for many years. This calculator shows how your balance decreases over time based on your monthly payment, and how even small increases in payments can significantly reduce both payoff time and total interest. It is especially useful for planning debt repayment strategies and understanding the real cost of carrying a balance. If you are comparing different debt situations, you may also find the [Debt to Income Calculator](/debt-to-income-calculator) or [Loan Payment Calculator](/loan-payment-calculator) useful.',
  howToUse: [
    'Enter your credit card balance.',
    'Enter the annual interest rate.',
    'Enter your monthly payment.',
    'Optionally add extra monthly payment.',
    'View payoff time, total interest, and full repayment schedule.'
  ],
  href: '/credit-card-payoff-calculator',
  icon: Banknote,
  available: true,
  category: 'Finance',
  howItWorks: 'Credit card balances grow monthly because interest is applied to the remaining balance before your payment is subtracted. If your payment is too low, a large portion goes toward interest instead of reducing the principal. This calculator simulates that process month by month, showing how your balance decreases over time. It also calculates total interest paid and total repayment amount, and demonstrates how increasing your monthly payment or adding extra payments can significantly shorten your debt timeline.',
  exampleUsage: [
  'Balance $5,000 at 18% interest with $150 monthly payment → see payoff timeline and total interest cost',
  'Increase monthly payment by $50 to see how many months of debt you can eliminate',
  'Compare minimum payment vs fixed payment strategy to understand long-term interest impact'
],
  relatedTools: ['loan-payment-calculator', 'apr-calculator', 'debt-to-income-calculator'],
  component: CreditCardPayoffCalculator,
  seoTitle: 'Credit Card Payoff Calculator Online | Debt Payoff & Interest Savings Tool',
  seoDescription: 'Free online credit card payoff calculator. Enter your balance, interest rate, and payment to calculate payoff time and total interest.',
  formulaTitle: 'Credit Card Payoff Calculation',
  formulaExpression: 'Balance updated monthly using interest and payments',
  formulaExplanation: 'Each month, interest is added to the balance and your payment is applied. The process repeats until the balance is fully paid off.'
  },
{
  id: 'investment-calculator',
  name: 'Investment Calculator',
  description: 'Calculate investment growth with compound interest and monthly contributions.',
  aboutText: `The Investment Calculator helps you estimate how your savings grow when you invest regularly over time. Unlike simple compound interest scenarios, this tool focuses on active investing where you make consistent monthly contributions. This is especially useful for planning long-term goals like retirement or building wealth gradually. For example, investing $300 per month at a 7% annual return over 25 years can result in a significantly larger portfolio due to the combined effect of contributions and compounding. This calculator allows you to adjust contribution amounts and return rates to compare different investment strategies. If you want to calculate growth from a one-time investment only, you can use the [Compound Interest Calculator](/compound-interest-calculator).`,
  howToUse: [
    'Enter your initial investment.',
    'Enter your monthly contribution.',
    'Enter the expected annual return rate.',
    'Enter the investment period in years.',
    'View final balance, contributions, and interest earned.'
  ],
  href: '/investment-calculator',
  icon: TrendingUp,
  available: true,
  category: 'Finance',
  howItWorks: 'Investment growth happens through two combined effects: your regular contributions and compound interest. Each month, your contribution is added to the total balance, and interest is applied to the updated amount. Over time, this creates exponential growth where returns generate additional returns. This calculator simulates that process step-by-step to show how your investment evolves, how much you contribute yourself, and how much comes from growth over time.',
  exampleUsage: [
  'Invest $300 per month at 7% for 25 years → estimate long-term portfolio growth',
  'Increase monthly contributions from $200 to $400 → compare total outcome',
  'Compare 5% vs 8% returns → see how performance impacts final balance'
],
  relatedTools: ['compound-interest-calculator', 'retirement-calculator', 'savings-goal-calculator'],
  component: InvestmentCalculator,
  seoTitle: 'Investment Calculator Online | Monthly Contributions & Growth',
  seoDescription: 'Free online investment calculator. Estimate how your savings grow with compound interest and monthly contributions over time.',
  formulaTitle: 'Compound Growth with Contributions',
  formulaExpression: 'Balance grows monthly with contributions and interest',
  formulaExplanation: 'Each month, contributions are added and interest is applied to the total balance, allowing compounding growth over time.'
  },
  {
  id: 'debt-payoff-calculator',
  name: 'Debt Payoff Calculator',
  description: 'Calculate how long it takes to pay off debt and the total interest paid over time.',
  aboutText: 'The Debt Payoff Calculator helps you estimate how long it will take to eliminate your debt based on your balance, interest rate, and monthly payment. It also shows how much interest you will pay over time, giving you a clearer picture of the true cost of your debt. This tool is useful for planning repayment strategies and comparing different payment amounts. For more detailed scenarios, you may also find the [Credit Card Payoff Calculator](/credit-card-payoff-calculator) or [Loan Payment Calculator](/loan-payment-calculator) helpful.',
  howToUse: [
    'Enter your total debt balance.',
    'Enter the annual interest rate.',
    'Enter your monthly payment amount.',
    'View how many months it takes to pay off the debt.',
    'Review total interest and total amount paid.'
  ],
  href: '/debt-payoff-calculator',
  icon: Wallet,
  available: true,
  category: 'Finance',
  howItWorks: 'Each month, interest is applied to the remaining balance, and your payment reduces the principal. The calculator repeats this process until the debt is fully paid off.',
  exampleUsage: [
    'Increase monthly payment → reduce payoff time',
    'Compare different interest rates → see cost impact',
    'Test repayment strategies → optimize debt payoff'
  ],
  relatedTools: ['credit-card-payoff-calculator', 'loan-payment-calculator', 'apr-calculator'],
  component: DebtPayoffCalculator,
  seoTitle: 'Debt Payoff Calculator Online | Calculate Debt Repayment Time | SoftwareCalc',
  seoDescription: 'Free online debt payoff calculator. Estimate how long it takes to pay off debt and how much interest you will pay.',
  formulaTitle: 'Debt Payoff Calculation',
  formulaExpression: 'Each payment reduces balance after interest is applied monthly',
  formulaExplanation: 'Interest is added to the remaining balance each month, and your payment is applied first to interest and then to the principal until the debt is cleared.'
  },
{
  id: 'interest-rate-calculator',
  name: 'Interest Rate Calculator',
  description: 'Estimate the interest rate of a loan based on monthly payments and loan term.',
  aboutText: 'The Interest Rate Calculator helps you estimate the implied interest rate of a loan when you know the loan amount, monthly payment, and loan term. This is useful when evaluating loan offers or understanding the true cost of borrowing. It helps you compare different financing options and see whether a loan is expensive or affordable. For related calculations, you may also find the [Loan Payment Calculator](/loan-payment-calculator) or [APR Calculator](/apr-calculator) helpful.',
  howToUse: [
    'Enter the total loan amount.',
    'Enter your monthly payment.',
    'Enter the loan term in years.',
    'View the estimated interest rate and total cost.'
  ],
  href: '/interest-rate-calculator',
  icon: Search,
  available: true,
  category: 'Finance',
  howItWorks: 'The calculator simulates loan repayment and adjusts the interest rate until the remaining balance reaches zero within the loan term.',
  exampleUsage: [
    'Check if a loan offer has high interest',
    'Compare financing options',
    'Estimate hidden borrowing costs'
  ],
  relatedTools: ['loan-payment-calculator', 'apr-calculator', 'mortgage-calculator'],
  component: InterestRateCalculator,
  seoTitle: 'Interest Rate Calculator Online | Estimate Loan Interest Rate | SoftwareCalc',
  seoDescription: 'Free online interest rate calculator. Estimate the interest rate of a loan based on payments and loan term.',
  formulaTitle: 'Reverse Loan Interest Estimation',
  formulaExpression: 'Iterative simulation of loan balance over time',
  formulaExplanation: 'The calculator simulates loan repayment at different interest rates until the final balance reaches zero within the given term.'
},
  {
  id: 'salary-hourly-calculator',
  name: 'Salary to Hourly Calculator',
  description: 'Convert between yearly salary and hourly wage based on working hours.',
  aboutText: 'The Salary to Hourly Calculator helps you convert between annual salary and hourly wage based on your working hours per week and weeks per year. This is useful when comparing job offers, freelance rates, or understanding your effective hourly earnings. It gives you a clear way to compare different income structures. You may also find the [Income Tax Calculator](/salary-after-tax-calculator) helpful for net income estimates.',
  howToUse: [
    'Enter your salary or hourly wage.',
    'Select conversion mode.',
    'Enter hours per week.',
    'View the converted value instantly.'
  ],
  href: '/salary-hourly-calculator',
  icon: Calculator,
  available: true,
  category: 'Finance',
  howItWorks: 'The calculator converts income by multiplying or dividing based on standard working hours per year.',
  exampleUsage: [
    'Compare job offers',
    'Convert freelance rates',
    'Understand hourly value of salary'
  ],
  relatedTools: ['salary-after-tax-calculator', 'commission-calculator', 'hours-worked-calculator'],
  component: SalaryHourlyCalculator,
  seoTitle: 'Salary to Hourly Calculator Online | Convert Salary to Hourly Wage',
  seoDescription: 'Free online salary to hourly calculator. Convert annual salary to hourly wage or vice versa instantly.',
  formulaTitle: 'Income Conversion Formula',
  formulaExpression: 'Hourly = Salary / (Hours × Weeks)',
  formulaExplanation: 'Income is converted by dividing annual salary by total working hours per year.'
},
  {
  id: 'calorie-calculator',
  name: 'Calorie Calculator',
  description:
    'Calculate your daily calorie needs (TDEE) based on age, weight, height, and activity level.',
  aboutText:
    'The Calorie Calculator estimates how many calories your body needs per day to maintain, lose, or gain weight. It uses the Mifflin-St Jeor formula to calculate your Basal Metabolic Rate (BMR), then adjusts it based on activity level to estimate Total Daily Energy Expenditure (TDEE). This makes it useful for weight management, fitness planning, and nutrition tracking. You may also find the [BMI Calculator](/bmi-calculator) useful for understanding your weight category.',

  howToUse: [
    'Select your gender.',
    'Enter age, weight (kg), and height (cm).',
    'Choose your activity level.',
    'View your BMR and daily calorie needs.',
  ],

  href: '/calorie-calculator',
  icon: Calculator,
  available: true,
  category: 'Health',

  howItWorks:
    'Uses the Mifflin-St Jeor equation to calculate BMR, then multiplies it by an activity factor to estimate total daily energy expenditure (TDEE). It also calculates calorie ranges for weight loss and weight gain.',

  exampleUsage: [
    'Male, 80kg, 180cm, 30 years, moderate activity → ~2600 kcal maintenance',
    'Female, 65kg, 165cm, light activity → ~1900 kcal maintenance',
  ],

  relatedTools: ['bmi-calculator'],
  component: CalorieCalculator,

  seoTitle: 'Calorie Calculator Online | TDEE & Daily Calories | SoftwareCalc',
  seoDescription:
    'Free online calorie calculator to estimate your daily calorie needs (TDEE) based on age, weight, height, and activity level.',
},
  {
  id: 'time-zone-converter',
  name: 'Time Zone Converter',
  description:
    'Convert time between global time zones instantly and accurately.',

  aboutText:
    'The Time Zone Converter lets you convert a specific date and time between different global time zones. It is useful for remote work, international meetings, travel planning, and scheduling across regions. The tool uses built-in JavaScript date handling and timezone offsets to ensure accurate conversions. If you need to calculate time differences between two dates, you may also find the [Date Time Difference Calculator](/date-time-difference-calculator) useful.',

  howToUse: [
    'Select a date and time.',
    'Choose the source time zone.',
    'Choose the target time zone.',
    'View the converted time instantly.',
  ],

  href: '/time-zone-converter',
  icon: Calculator,
  available: true,
  category: 'Date & Time',

  howItWorks:
    'Converts input time to UTC internally, then applies the target timezone offset using JavaScript Intl API to display the correct local time.',

  exampleUsage: [
    '9:00 AM Stockholm → 3:00 AM New York',
    '6:00 PM London → 3:00 AM Tokyo (next day)',
  ],

  relatedTools: ['date-time-difference-calculator'],
  component: TimeZoneConverter,

  seoTitle: 'Time Zone Converter Online | Convert Time Between Countries',
  seoDescription:
    'Free online time zone converter. Convert time between global cities instantly and accurately for meetings, travel, and remote work.',
},
  {
  id: 'loan-affordability-calculator',
  name: 'Loan Affordability Calculator',
  description:
    'Estimate how much you can borrow based on income, expenses, interest rate, and loan term.',

  aboutText:
    'The Loan Affordability Calculator estimates how much money you can realistically borrow based on your income, monthly expenses, interest rate, and loan term. It calculates your disposable income and applies debt-to-income limits to determine a safe borrowing range. This is useful for mortgage planning, loan pre-approval preparation, and understanding financial limits before applying for credit. You may also find the [Mortgage Calculator](/mortgage-calculator) useful for estimating monthly repayments.',

  howToUse: [
    'Enter your monthly income.',
    'Enter your monthly expenses.',
    'Set interest rate and loan term.',
    'View maximum loan amount and payment capacity.',
  ],

  href: '/loan-affordability-calculator',
  icon: Calculator,
  available: true,
  category: 'Finance',

  howItWorks:
    'Calculates disposable income and applies a debt-to-income ratio limit, then uses loan amortization formulas to estimate the maximum loan amount you can afford.',

  exampleUsage: [
    'Income 4000€, expenses 1500€ → ~180k–220k loan capacity',
    'Higher interest rate reduces borrowing power significantly',
  ],

  relatedTools: ['mortgage-calculator', 'loan-payment-calculator'],
  component: LoanAffordabilityCalculator,

  seoTitle: 'Loan Affordability Calculator Online | How Much Can I Borrow?',
  seoDescription:
    'Free online loan affordability calculator. Find out how much you can borrow based on income, expenses, interest rate, and loan term.',
}
];

/** Look up a single tool by its id */
export function getToolById(id: string): ToolConfig | undefined {
  return TOOLS.find((t) => t.id === id);
}

// ─── Concept-cluster map ──────────────────────────────────────────────────────
// Each entry lists the strongest topical neighbours for that tool.
// Used as a fallback when a tool's explicit relatedTools list has fewer than 3
// entries. Ordered by relevance — earlier entries are preferred.
const CONCEPT_CLUSTERS: Record<string, string[]> = {
  // ── Finance: Loans & Debt ──
  'loan-payment-calculator':     ['mortgage-calculator', 'apr-calculator', 'loan-to-value-calculator', 'debt-to-income-calculator', 'simple-interest-calculator', 'credit-card-payoff-calculator'],
  'mortgage-calculator':         ['loan-payment-calculator', 'loan-to-value-calculator', 'debt-to-income-calculator', 'apr-calculator', 'savings-goal-calculator'],
  'apr-calculator':              ['loan-payment-calculator', 'mortgage-calculator', 'simple-interest-calculator', 'compound-interest-calculator', 'interest-rate-calculator'],
  'loan-to-value-calculator':    ['mortgage-calculator', 'loan-payment-calculator', 'debt-to-income-calculator', 'apr-calculator'],
  'debt-to-income-calculator':   ['loan-payment-calculator', 'mortgage-calculator', 'salary-after-tax-calculator', 'debt-payoff-calculator'],
  'credit-card-payoff-calculator':['debt-payoff-calculator', 'loan-payment-calculator', 'simple-interest-calculator', 'savings-goal-calculator'],
  'debt-payoff-calculator':      ['credit-card-payoff-calculator', 'loan-payment-calculator', 'savings-goal-calculator', 'debt-to-income-calculator'],
  'simple-interest-calculator':  ['compound-interest-calculator', 'loan-payment-calculator', 'apr-calculator', 'savings-goal-calculator'],
  'compound-interest-calculator':['simple-interest-calculator', 'savings-goal-calculator', 'retirement-calculator', 'inflation-calculator', 'rule-of-72-calculator'],
  'interest-rate-calculator':    ['loan-payment-calculator', 'apr-calculator', 'simple-interest-calculator', 'compound-interest-calculator', 'mortgage-calculator'],
  'payback-period-calculator':   ['roi-calculator', 'break-even-calculator', 'net-profit-calculator', 'investment-calculator'],

  // ── Finance: Investing & Growth ──
  'savings-goal-calculator':     ['compound-interest-calculator', 'retirement-calculator', 'inflation-calculator', 'investment-calculator', 'simple-interest-calculator'],
  'retirement-calculator':       ['compound-interest-calculator', 'savings-goal-calculator', 'inflation-calculator', 'investment-calculator', 'rule-of-72-calculator'],
  'investment-calculator':       ['compound-interest-calculator', 'roi-calculator', 'savings-goal-calculator', 'retirement-calculator', 'rule-of-72-calculator'],
  'inflation-calculator':        ['compound-interest-calculator', 'retirement-calculator', 'savings-goal-calculator', 'salary-after-tax-calculator'],
  'roi-calculator':              ['payback-period-calculator', 'break-even-calculator', 'net-profit-calculator', 'gross-profit-calculator', 'investment-calculator'],
  'rule-of-72-calculator':       ['compound-interest-calculator', 'savings-goal-calculator', 'investment-calculator', 'roi-calculator'],

  // ── Finance: Income & Tax ──
  'salary-after-tax-calculator': ['salary-hourly-calculator', 'commission-calculator', 'debt-to-income-calculator', 'inflation-calculator'],
  'salary-hourly-calculator':    ['salary-after-tax-calculator', 'commission-calculator', 'hours-worked-calculator', 'tip-calculator'],
  'commission-calculator':       ['salary-after-tax-calculator', 'profit-margin-calculator', 'markup-calculator', 'sales-tax-calculator'],

  // ── Finance: Pricing & Profit ──
  'profit-margin-calculator':    ['markup-calculator', 'gross-profit-calculator', 'net-profit-calculator', 'break-even-calculator', 'roi-calculator'],
  'markup-calculator':           ['profit-margin-calculator', 'gross-profit-calculator', 'discount-calculator', 'sales-tax-calculator'],
  'gross-profit-calculator':     ['net-profit-calculator', 'profit-margin-calculator', 'break-even-calculator', 'roi-calculator'],
  'net-profit-calculator':       ['gross-profit-calculator', 'profit-margin-calculator', 'break-even-calculator', 'roi-calculator'],
  'break-even-calculator':       ['profit-margin-calculator', 'gross-profit-calculator', 'net-profit-calculator', 'payback-period-calculator', 'roi-calculator'],

  // ── Finance: Tax ──
  'sales-tax-calculator':        ['vat-calculator', 'sales-tax-reverse-calculator', 'sales-tax-rate-calculator', 'discount-calculator', 'markup-calculator'],
  'vat-calculator':              ['vat-reverse-calculator', 'sales-tax-calculator', 'sales-tax-rate-calculator', 'markup-calculator'],
  'vat-reverse-calculator':      ['vat-calculator', 'sales-tax-reverse-calculator', 'sales-tax-rate-calculator', 'markup-calculator'],
  'sales-tax-reverse-calculator':['sales-tax-calculator', 'vat-reverse-calculator', 'sales-tax-rate-calculator', 'discount-calculator'],
  'sales-tax-rate-calculator':   ['sales-tax-calculator', 'sales-tax-reverse-calculator', 'vat-calculator', 'markup-calculator'],

  // ── Conversions ──
  'length-converter':            ['weight-converter', 'temperature-converter', 'recipe-volume-converter', 'square-footage-calculator'],
  'weight-converter':            ['length-converter', 'temperature-converter', 'recipe-volume-converter', 'bmi-calculator'],
  'temperature-converter':       ['length-converter', 'weight-converter', 'recipe-volume-converter'],
  'recipe-volume-converter':     ['weight-converter', 'length-converter', 'temperature-converter', 'unit-price-calculator'],

  // ── Math: Percentages ──
  'percentage-calculator':       ['percentage-change-calculator', 'discount-calculator', 'ratio-calculator', 'decimal-to-percent-calculator'],
  'percentage-change-calculator':['percentage-calculator', 'discount-calculator', 'ratio-calculator', 'profit-margin-calculator'],
  'decimal-to-percent-calculator':['percentage-calculator', 'percentage-change-calculator', 'decimal-to-fraction-calculator', 'rounding-calculator'],

  // ── Math: Fractions ──
  'fraction-calculator':         ['decimal-to-fraction-calculator', 'fraction-to-decimal-calculator', 'simplify-fractions-calculator', 'improper-fraction-to-mixed-number-calculator', 'mixed-number-to-improper-fraction-calculator'],
  'decimal-to-fraction-calculator':['fraction-to-decimal-calculator', 'simplify-fractions-calculator', 'fraction-calculator', 'decimal-to-percent-calculator'],
  'fraction-to-decimal-calculator':['decimal-to-fraction-calculator', 'simplify-fractions-calculator', 'fraction-calculator', 'decimal-to-percent-calculator'],
  'simplify-fractions-calculator':['fraction-calculator', 'decimal-to-fraction-calculator', 'gcf-calculator', 'proportion-calculator'],
  'improper-fraction-to-mixed-number-calculator':['mixed-number-to-improper-fraction-calculator', 'fraction-calculator', 'simplify-fractions-calculator'],
  'mixed-number-to-improper-fraction-calculator':['improper-fraction-to-mixed-number-calculator', 'fraction-calculator', 'simplify-fractions-calculator'],
  'proportion-calculator':       ['ratio-calculator', 'fraction-calculator', 'percentage-calculator', 'simplify-fractions-calculator'],

  // ── Math: Roots & Exponents ──
  'square-root-calculator':      ['cube-root-calculator', 'nth-root-calculator', 'exponent-calculator', 'scientific-notation-calculator'],
  'cube-root-calculator':        ['square-root-calculator', 'nth-root-calculator', 'exponent-calculator'],
  'nth-root-calculator':         ['square-root-calculator', 'cube-root-calculator', 'exponent-calculator'],
  'exponent-calculator':         ['square-root-calculator', 'scientific-notation-calculator', 'nth-root-calculator'],
  'scientific-notation-calculator':['exponent-calculator', 'sig-fig-calculator', 'rounding-calculator', 'absolute-value-calculator'],

  // ── Math: Factors & Primes ──
  'gcf-calculator':              ['lcm-calculator', 'factors-calculator', 'common-factors-calculator', 'prime-factorization-calculator'],
  'lcm-calculator':              ['gcf-calculator', 'factors-calculator', 'prime-factorization-calculator', 'common-factors-calculator'],
  'factors-calculator':          ['gcf-calculator', 'lcm-calculator', 'prime-factorization-calculator', 'common-factors-calculator', 'divisibility-calculator'],
  'common-factors-calculator':   ['gcf-calculator', 'factors-calculator', 'prime-factorization-calculator', 'divisibility-calculator'],
  'prime-factorization-calculator':['prime-number-calculator', 'gcf-calculator', 'factors-calculator', 'lcm-calculator'],
  'prime-number-calculator':     ['prime-factorization-calculator', 'factors-calculator', 'divisibility-calculator', 'even-or-odd-calculator'],
  'divisibility-calculator':     ['factors-calculator', 'prime-number-calculator', 'even-or-odd-calculator', 'gcf-calculator'],
  'even-or-odd-calculator':      ['divisibility-calculator', 'prime-number-calculator', 'factors-calculator'],

  // ── Math: Precision & Rounding ──
  'rounding-calculator':         ['sig-fig-calculator', 'scientific-notation-calculator', 'decimal-to-fraction-calculator'],
  'sig-fig-calculator':          ['rounding-calculator', 'scientific-notation-calculator', 'absolute-value-calculator'],
  'absolute-value-calculator':   ['sig-fig-calculator', 'rounding-calculator', 'reciprocal-calculator'],
  'reciprocal-calculator':       ['fraction-calculator', 'absolute-value-calculator', 'exponent-calculator'],

  // ── Math: General ──
  'average-calculator':          ['ratio-calculator', 'percentage-calculator', 'percentage-change-calculator'],
  'ratio-calculator':            ['proportion-calculator', 'percentage-calculator', 'average-calculator', 'fraction-calculator'],
  'discount-calculator':         ['percentage-calculator', 'sales-tax-calculator', 'markup-calculator', 'profit-margin-calculator'],
  'tip-calculator':              ['percentage-calculator', 'discount-calculator', 'sales-tax-calculator'],
  'unit-price-calculator':       ['discount-calculator', 'percentage-calculator', 'ratio-calculator', 'sales-tax-calculator'],
  'square-footage-calculator':   ['unit-price-calculator', 'length-converter', 'ratio-calculator'],

  // ── Date & Time ──
  'hours-worked-calculator':     ['date-time-difference-calculator', 'age-calculator', 'days-until-date-calculator', 'salary-hourly-calculator'],
  'date-time-difference-calculator':['age-calculator', 'hours-worked-calculator', 'days-until-date-calculator'],
  'age-calculator':              ['date-time-difference-calculator', 'days-until-date-calculator', 'hours-worked-calculator'],
  'days-until-date-calculator':  ['date-time-difference-calculator', 'age-calculator', 'hours-worked-calculator'],

  // ── Health ──
  'bmi-calculator':              ['weight-converter', 'length-converter'],

  // ── Game Calculators ──
  'blackjack-helper':            ['texas-holdem-odds-calculator', 'random-number-generator'],
  'texas-holdem-odds-calculator':['blackjack-helper', 'random-number-generator'],

  // ── Random / Utility ──
  'random-number-generator':     ['click-counter', 'blackjack-helper'],
  'click-counter':               ['random-number-generator'],
};

/**
 * Returns up to 4 related tools for a given tool, using a 3-tier strategy:
 *   1. Explicit relatedTools IDs (author-specified, highest trust)
 *   2. Concept-cluster neighbours (topically related, same cluster)
 *   3. Same-category fill (any available tool in the same category)
 *
 * The current tool is never included. Results are deduplicated.
 */
export function getRelatedTools(currentToolId: string, explicitIds: string[]): ToolConfig[];
/** @deprecated — use getRelatedTools(tool.id, tool.relatedTools) */
export function getRelatedTools(explicitIds: string[]): ToolConfig[];
export function getRelatedTools(
  firstArg: string | string[],
  secondArg?: string[],
): ToolConfig[] {
  const MAX = 4;

  // Handle both call signatures (new: id + ids, legacy: ids only)
  const currentToolId: string | null = typeof firstArg === 'string' ? firstArg : null;
  const explicitIds: string[] = typeof firstArg === 'string' ? (secondArg ?? []) : firstArg;

  const seen = new Set<string>();
  if (currentToolId) seen.add(currentToolId);

  const result: ToolConfig[] = [];

  function addTool(id: string): boolean {
    if (seen.has(id)) return false;
    const t = getToolById(id);
    if (!t || !t.available) return false;
    seen.add(id);
    result.push(t);
    return true;
  }

  // Tier 1 — explicit relatedTools
  for (const id of explicitIds) {
    if (result.length >= MAX) break;
    addTool(id);
  }

  // Tier 2 — concept-cluster neighbours
  if (result.length < MAX && currentToolId) {
    const clusterNeighbours = CONCEPT_CLUSTERS[currentToolId] ?? [];
    for (const id of clusterNeighbours) {
      if (result.length >= MAX) break;
      addTool(id);
    }
  }

  // Tier 3 — same-category fill
  if (result.length < MAX && currentToolId) {
    const currentTool = getToolById(currentToolId);
    if (currentTool) {
      const sameCat = TOOLS.filter(
        (t) => t.category === currentTool.category && t.available && !seen.has(t.id),
      );
      for (const t of sameCat) {
        if (result.length >= MAX) break;
        seen.add(t.id);
        result.push(t);
      }
    }
  }

  return result;
}

// ─── Fallback FAQ Generator ───────────────────────────────────────────────────

type FaqItem = { question: string; answer: string };

const CATEGORY_FALLBACK_FAQS: Record<ToolConfig['category'], FaqItem[]> = {
  'Finance': [
    {
      question: 'What financial formula does this calculator use?',
      answer: 'This calculator applies standard financial formulas used in banking, accounting, and personal finance. The underlying math follows widely accepted conventions so the results are comparable to those from financial institutions.',
    },
    {
      question: 'Can I use the result for real financial planning?',
      answer: 'Yes, the results are suitable for budgeting, loan comparison, and general planning. For large commitments such as mortgages or business loans, we recommend cross-checking with a qualified financial advisor who can account for your full financial picture.',
    },
    {
      question: 'Why might my bank quote a slightly different figure?',
      answer: 'Lenders and banks may apply additional fees, compound interest differently, or use slightly different rounding conventions. This calculator uses standard formulas and provides a reliable estimate, but always confirm final figures directly with your lender.',
    },
  ],
  'Math': [
    {
      question: 'How does this calculator handle rounding?',
      answer: 'Results are rounded to a practical number of decimal places using standard mathematical rounding rules. If you need a specific precision, use the displayed value before it is rounded, or apply your own rounding based on the context.',
    },
    {
      question: 'Can I use this for schoolwork or exams?',
      answer: 'Yes, this calculator follows standard mathematical rules taught in schools and universities. It is a useful tool for checking your working or understanding how a formula applies to a specific problem.',
    },
    {
      question: 'What should I do if my textbook gives a different answer?',
      answer: 'Small differences are usually caused by rounding at intermediate steps or different conventions for significant figures. Try entering your full-precision values and compare the unrounded result. If the difference is larger, double-check that the formula used matches the one in your textbook.',
    },
  ],
  'Conversions': [
    {
      question: 'Which unit system does this converter use as a base?',
      answer: 'The converter uses internationally recognised base units and standard conversion factors. Metric units follow SI definitions, and imperial conversions use the internationally agreed ratios (for example, 1 inch = 25.4 mm exactly).',
    },
    {
      question: 'Why would I need to convert between these units in real life?',
      answer: 'Unit conversions come up frequently in cooking, construction, travel, science, and engineering. Different countries and industries use different measurement systems, so being able to convert accurately saves time and prevents costly errors.',
    },
    {
      question: 'How many decimal places are shown in the result?',
      answer: 'Results are shown to several decimal places to preserve accuracy. For everyday use you can round the result to the precision you need. The full decimal value is there for situations where higher accuracy matters.',
    },
  ],
  'Health': [
    {
      question: 'What do the different result ranges mean?',
      answer: 'Health calculators display results alongside standard reference ranges so you can understand where your value sits. These ranges are based on widely used clinical guidelines. Your result is a useful indicator, but individual health is complex and results should be interpreted in context.',
    },
    {
      question: 'Is this a substitute for medical advice?',
      answer: 'No. This tool is for general informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. If you have concerns about your health, please consult a qualified healthcare provider.',
    },
    {
      question: 'How are the health values calculated?',
      answer: 'This calculator uses formulas and reference ranges published by recognised health organisations. The formulas are applied exactly as specified, so the results are consistent with what a healthcare professional would calculate using the same method.',
    },
  ],
  'Date & Time': [
    {
      question: 'How does this calculator handle months of different lengths?',
      answer: 'Date calculations account for the actual number of days in each month, including February in leap years. The result reflects the precise calendar difference between the two dates you enter.',
    },
    {
      question: 'Does the calculator adjust for time zones or daylight saving?',
      answer: 'The calculator works with the date and time values you enter directly. If your calculation spans a daylight saving transition or crosses time zones, enter the times already adjusted to the same time zone to get an accurate result.',
    },
    {
      question: 'What is the most common use for a date or time calculator?',
      answer: 'Common uses include calculating how many days remain until a deadline or event, finding the exact time difference between two shifts or appointments, determining someone\'s age from their birth date, and planning project timelines.',
    },
  ],
  'Probability': [
    {
      question: 'What does a probability result actually mean?',
      answer: 'A probability value between 0 and 1 (or 0% and 100%) represents the theoretical likelihood of an outcome occurring. A result of 0.25 means there is a 1 in 4 chance of that outcome under ideal, unbiased conditions.',
    },
    {
      question: 'Do real-world results always match the calculated probability?',
      answer: 'Not in every single instance. Probability describes long-run frequency — the more times you repeat an event, the closer actual results tend to come to the theoretical probability. In the short term, outcomes can vary widely.',
    },
    {
      question: 'What assumptions does this probability calculation make?',
      answer: 'The calculation assumes each outcome is independent and equally likely unless stated otherwise. Real-world factors such as bias, skill, or changing conditions can affect actual outcomes and are not included in the theoretical formula.',
    },
  ],
  'Random Generators': [
    {
      question: 'How is the random result generated?',
      answer: 'This generator uses your browser\'s built-in pseudo-random number function, which produces statistically unpredictable results suitable for games, raffles, classroom activities, and everyday decision-making.',
    },
    {
      question: 'Is every result equally likely?',
      answer: 'Yes, within the range you set, every possible value has an equal chance of being selected on each generation. The generator does not weight any outcome or remember previous results.',
    },
    {
      question: 'What are some common uses for a random generator?',
      answer: 'Random generators are used for prize draws and giveaways, picking a random team or player, generating test data, deciding between options when you are undecided, classroom activities, and tabletop games.',
    },
  ],
  'Game Calculators': [
    {
      question: 'Where do the strategy recommendations come from?',
      answer: 'Recommendations are derived from mathematically established basic strategy tables that have been calculated through probability analysis and computer simulation. They represent the statistically optimal decision for each hand or situation under standard game rules.',
    },
    {
      question: 'Does following the recommended strategy guarantee a win?',
      answer: 'No. Strategy recommendations reduce the house edge and maximise your expected return over many hands, but they cannot guarantee a win on any individual hand. Variance means short-term results will always differ from the long-run expectation.',
    },
    {
      question: 'Do rule variations affect the recommended strategy?',
      answer: 'Yes. Game rules such as the number of decks, whether the dealer stands or hits on soft 17, and available player options like surrender can all shift the optimal strategy slightly. This calculator uses the most common standard rules; check the specific rules of the game you are playing.',
    },
  ],
};

/**
 * Returns the tool's custom FAQ if it has one, otherwise returns 3 generic
 * fallback FAQs appropriate for the tool's category.
 */
export function getEffectiveFaqs(tool: ToolConfig): FaqItem[] {
  if (tool.faq && tool.faq.length > 0) return tool.faq;
  return CATEGORY_FALLBACK_FAQS[tool.category] ?? CATEGORY_FALLBACK_FAQS['Math'];
}

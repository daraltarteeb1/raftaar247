export type CountryCode = 'AE' | 'SA' | 'QA' | 'KW' | 'BH' | 'OM'

export interface Country {
  code: CountryCode
  flag: string
  currency: string
  /** multiplier from AED reference price */
  rate: number
  nameKey: 'uae' | 'ksa' | 'qa' | 'kw' | 'bh' | 'om'
}

export const countries: Country[] = [
  { code: 'AE', flag: '🇦🇪', currency: 'AED', rate: 1, nameKey: 'uae' },
  { code: 'SA', flag: '🇸🇦', currency: 'SAR', rate: 1.02, nameKey: 'ksa' },
  { code: 'QA', flag: '🇶🇦', currency: 'QAR', rate: 0.99, nameKey: 'qa' },
  { code: 'KW', flag: '🇰🇼', currency: 'KWD', rate: 0.084, nameKey: 'kw' },
  { code: 'BH', flag: '🇧🇭', currency: 'BHD', rate: 0.103, nameKey: 'bh' },
  { code: 'OM', flag: '🇴🇲', currency: 'OMR', rate: 0.105, nameKey: 'om' },
]

export function fmtPrice(aed: number, country: Country): string {
  const v = aed * country.rate
  // round nicely per currency magnitude
  const rounded =
    v >= 1000 ? Math.round(v / 50) * 50 : v >= 100 ? Math.round(v) : Math.round(v * 10) / 10
  return `${rounded.toLocaleString('en-US')} ${country.currency}`
}

export interface CarListing {
  id: string
  img: string
  title: string
  year: number
  km: number
  priceAed: number
  city: { en: string; ar: string }
  country: CountryCode
  seller: { en: string; ar: string }
  verified?: boolean
  sponsored?: boolean
  likes: number
}

export const cars: CarListing[] = [
  {
    id: 'RFT-2481',
    img: '/images/car-patrol.jpg',
    title: 'Nissan Patrol LE Platinum',
    year: 2023,
    km: 24500,
    priceAed: 239000,
    city: { en: 'Dubai', ar: 'دبي' },
    country: 'AE',
    seller: { en: 'Al Futtaim Auto', ar: 'الفطيم للسيارات' },
    verified: true,
    sponsored: true,
    likes: 412,
  },
  {
    id: 'RFT-2482',
    img: '/images/car-gclass.jpg',
    title: 'Mercedes-Benz G 63 AMG',
    year: 2022,
    km: 18900,
    priceAed: 685000,
    city: { en: 'Abu Dhabi', ar: 'أبوظبي' },
    country: 'AE',
    seller: { en: 'Emirates Motors', ar: 'الإمارات للسيارات' },
    verified: true,
    likes: 891,
  },
  {
    id: 'RFT-2483',
    img: '/images/car-landcruiser.jpg',
    title: 'Toyota Land Cruiser VXR',
    year: 2024,
    km: 8200,
    priceAed: 329000,
    city: { en: 'Riyadh', ar: 'الرياض' },
    country: 'SA',
    seller: { en: 'Riyadh Auto Gallery', ar: 'معرض الرياض للسيارات' },
    verified: true,
    likes: 356,
  },
  {
    id: 'RFT-2484',
    img: '/images/car-porsche.jpg',
    title: 'Porsche 911 Carrera S',
    year: 2021,
    km: 31000,
    priceAed: 489000,
    city: { en: 'Doha', ar: 'الدوحة' },
    country: 'QA',
    seller: { en: 'Private Seller', ar: 'بائع خاص' },
    likes: 627,
  },
  {
    id: 'RFT-2485',
    img: '/images/car-lexus.jpg',
    title: 'Lexus LX 600 F Sport',
    year: 2023,
    km: 15400,
    priceAed: 419000,
    city: { en: 'Kuwait City', ar: 'مدينة الكويت' },
    country: 'KW',
    seller: { en: 'Gulf Premium Cars', ar: 'الخليج للسيارات الفاخرة' },
    verified: true,
    likes: 289,
  },
  {
    id: 'RFT-2486',
    img: '/images/car-ferrari.jpg',
    title: 'Ferrari 488 GTB',
    year: 2019,
    km: 22100,
    priceAed: 799000,
    city: { en: 'Manama', ar: 'المنامة' },
    country: 'BH',
    seller: { en: 'Private Seller', ar: 'بائع خاص' },
    likes: 1043,
  },
]

export const brands = [
  'Toyota',
  'Nissan',
  'Lexus',
  'Mercedes-Benz',
  'BMW',
  'Porsche',
  'Land Rover',
  'Audi',
  'Ford',
  'Chevrolet',
  'Honda',
  'Hyundai',
  'Kia',
  'Bentley',
  'Rolls-Royce',
  'Ferrari',
  'Lamborghini',
  'McLaren',
  'Tesla',
  'BYD',
  'Geely',
  'MG',
  'Chery',
]

export interface GarageOffer {
  name: { en: string; ar: string }
  city: { en: string; ar: string }
  service: { en: string; ar: string }
  priceAed: number
  likes: number
}

export const garageOffers: GarageOffer[] = [
  {
    name: { en: 'SpeedFit Garage', ar: 'ورشة سبيد فيت' },
    city: { en: 'Dubai · Al Quoz', ar: 'دبي · القوز' },
    service: { en: 'Engine Oil Change', ar: 'تغيير زيت المحرك' },
    priceAed: 99,
    likes: 187,
  },
  {
    name: { en: 'Desert Auto Care', ar: 'ديزرت للعناية بالسيارات' },
    city: { en: 'Riyadh · Olaya', ar: 'الرياض · العليا' },
    service: { en: 'AC Service + Gas Refill', ar: 'صيانة مكيف + تعبئة غاز' },
    priceAed: 149,
    likes: 142,
  },
  {
    name: { en: 'Pearl Motors Service', ar: 'بيرل لخدمة السيارات' },
    city: { en: 'Doha · Industrial Area', ar: 'الدوحة · المنطقة الصناعية' },
    service: { en: 'Brake Pads Replacement', ar: 'استبدال فحمات الفرامل' },
    priceAed: 249,
    likes: 98,
  },
]

/** AED reference prices from the spec */
export const prices = {
  privateSell: 100,
  renew: 100,
  dealer: 500,
  showroomA: 1000,
  showroomB: 2000,
  garage: 200,
  gold: 50,
  minWithdrawal: 500,
}

import { Product, Category, BlogPost, Order, Inquiry } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Brushless Motors & ESCs',
    slug: 'motors-escs',
    description: 'High-KV competition brushless motors and waterproof electronic speed controllers.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    itemCount: 6,
  },
  {
    id: 'cat-2',
    name: 'LiPo Batteries & Chargers',
    slug: 'batteries-chargers',
    description: 'High-discharge 4S-6S Graphene LiPo power packs and dual-port balance smart chargers.',
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
  },
  {
    id: 'cat-3',
    name: 'Transmitters & Radio Systems',
    slug: 'radios-receivers',
    description: 'Multi-channel 2.4GHz FHSS digital transmitters with low-latency telemetry receivers.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    id: 'cat-4',
    name: 'Carbon Fiber Chassis & Suspension',
    slug: 'chassis-suspension',
    description: 'CNC 7075 aluminum shock kits, oil-filled differentials, and 3K carbon fiber frames.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    id: 'cat-5',
    name: 'Digital Servos & Titanium Gears',
    slug: 'servos-gears',
    description: 'High-torque coreless waterproof digital steering servos up to 45kg/cm response.',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
  },
  {
    id: 'cat-6',
    name: 'Racing Wheels & Propellers',
    slug: 'props-wheels',
    description: 'Dynamic balanced carbon fiber propellers and high-grip 1/10 beadlock competition wheels.',
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Vortex-X 3660 3800KV Sensorless Brushless Motor',
    category: 'Brushless Motors & ESCs',
    price: 68,
    originalPrice: 85,
    description: 'Engineered for 1/10 scale on-road and off-road RC speed builds. Built with 4-pole high-torque rotor design, CNC machined 6061 T6 billet aluminum heatsink can, and high-purity copper windings for maximum efficiency.',
    shortDescription: 'High-RPM 4-pole sensorless brushless motor with precision balanced rotor.',
    specs: {
      'KV (RPM/Volt)': '3800KV',
      'Max Voltage': '18V (2S-4S LiPo)',
      'Max Current': '80A',
      'Shaft Diameter': '5.0mm Steel Shaft',
      'Poles': '4-Pole Neodymium Magnet'
    },
    rating: 4.9,
    reviewCount: 48,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 1,
    stock: 24,
    inStock: true,
    tags: ['Best Seller', 'Brushless', 'High Speed'],
  },
  {
    id: 'prod-2',
    name: 'AeroPulse 120A Waterproof Brushless ESC (2S-6S)',
    category: 'Brushless Motors & ESCs',
    price: 92,
    originalPrice: 115,
    description: 'All-weather waterproof speed controller featuring ultra-smooth throttle linearity and built-in high-output BEC (6V/7.4V switchable, 6A). Includes electronic switch and advanced programming port.',
    shortDescription: '120A continuous ESC with heavy-duty cooling fan and gold-plated bullet connectors.',
    specs: {
      'Continuous / Peak Current': '120A / 830A',
      'Input Voltage': '2S - 6S LiPo',
      'BEC Output': '6V / 7.4V @ 6A Peak',
      'Waterproof Rating': 'IP67 Dust & Water Immersion',
      'Connectors': 'XT90 Battery & 4.0mm Bullet'
    },
    rating: 5.0,
    reviewCount: 36,
    images: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 2,
    stock: 18,
    inStock: true,
    tags: ['Featured', 'Waterproof', '6S Ready'],
  },
  {
    id: 'prod-3',
    name: 'GrapheneCore 6S 5200mAh 120C LiPo Battery Pack',
    category: 'LiPo Batteries & Chargers',
    price: 118,
    originalPrice: 140,
    description: 'High-discharge graphene matrix chemistry ensures minimal voltage sag under brutal full-throttle bursts. Pre-soldered with XT90 gold connectors and 10AWG silicone wiring for maximum thermal dissipation.',
    shortDescription: '22.2V 6S 120C continuous discharge battery with low internal resistance.',
    specs: {
      'Capacity': '5200mAh',
      'Configuration': '6S1P / 22.2V / 6 Cells',
      'Discharge Rate': '120C Continuous (240C Burst)',
      'Dimensions': '138mm x 45mm x 48mm',
      'Weight': '715g'
    },
    rating: 4.9,
    reviewCount: 72,
    images: [
      'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1609592807908-1e428c4bb1d1?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 3,
    stock: 30,
    inStock: true,
    tags: ['High Discharge', 'Graphene Cell'],
  },
  {
    id: 'prod-4',
    name: 'HyperCharge Duo 400W Balance Smart Fast Charger',
    category: 'LiPo Batteries & Chargers',
    price: 139,
    originalPrice: 165,
    description: 'Dual-channel independent AC/DC intelligent balance charger with crisp color IPS display, active cooling system, and internal resistance measurement. Supports LiPo, LiFe, LiHV, NiMH, and Pb batteries.',
    shortDescription: 'Dual-channel 200W x 2 microprocessor-controlled smart balance charger.',
    specs: {
      'Input Voltage': 'AC 100-240V / DC 10-30V',
      'Charge Power': '200W x 2 Channels (400W Total)',
      'Charge Current': '0.1A - 20.0A per Channel',
      'Supported Cells': 'LiPo / LiHV / LiFe (1S-6S)',
      'Display': '2.4" 320x240 Full-Color IPS'
    },
    rating: 4.8,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1609592807908-1e428c4bb1d1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 4,
    stock: 14,
    inStock: true,
    tags: ['Smart Tech', 'Dual Channel'],
  },
  {
    id: 'prod-5',
    name: 'ApexTX 8-Channel 2.4GHz FHSS Telemetry Radio System',
    category: 'Transmitters & Radio Systems',
    price: 185,
    originalPrice: 219,
    description: 'Ergonomic multi-model surface and aircraft radio transmitter featuring hall-sensor gimbals, color touch display, real-time voltage/speed telemetry, and ultra-fast 3ms response latency.',
    shortDescription: '8CH transmitter with dual ball-bearing gimbals and micro telemetry receiver.',
    specs: {
      'Frequency': '2.4GHz FHSS / AFHDS 3',
      'Channels': '8 Proportional Channels',
      'Telemetry': 'Real-Time RSSI, Voltage, Temperature',
      'Range': 'Up to 600m Ground / 1.5km Air',
      'Memory': '30 Model Memory Profiles'
    },
    rating: 5.0,
    reviewCount: 39,
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: true,
    sequenceOrder: 5,
    stock: 12,
    inStock: true,
    tags: ['Pro Grade', 'Hall Sensor'],
  },
  {
    id: 'prod-6',
    name: 'ProCarbon 3K Carbon Fiber 1/10 Scale Touring Chassis Kit',
    category: 'Carbon Fiber Chassis & Suspension',
    price: 225,
    originalPrice: 260,
    description: 'Precision CNC-milled 2.5mm quasi-isotropic 3K carbon fiber main deck with symmetrical flex design, 7075 aluminum bulkhead mounts, and titanium turnbuckle suspension links for razor-sharp handling.',
    shortDescription: 'Ultra-rigid 3K matte weave carbon fiber racing chassis and top plate kit.',
    specs: {
      'Material': 'Toray 3K Pure Carbon Fiber & 7075 T6 Aluminum',
      'Main Plate Thickness': '2.5mm High-Tensile CNC Plate',
      'Wheelbase': '257mm (Standard 1/10 Touring)',
      'Weight': '380g (Chassis Assembly)',
      'Compatibility': 'Universal 1/10 Belt & Shaft Platforms'
    },
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: false,
    sequenceOrder: 6,
    stock: 8,
    inStock: true,
    tags: ['CNC Machined', '3K Carbon'],
  },
  {
    id: 'prod-7',
    name: 'TitanTorque 45KG Waterproof High-Speed Steel-Gear Servo',
    category: 'Digital Servos & Titanium Gears',
    price: 59,
    originalPrice: 75,
    description: 'Coreless motor digital servo delivering 45kg-cm monster holding torque at 0.08s ultra-fast speed. Features hardened steel gears, CNC aluminum case for heat dissipation, and double ball bearings.',
    shortDescription: '45kg high-voltage (8.4V) waterproof digital metal gear steering servo.',
    specs: {
      'Operating Voltage': '6.0V - 8.4V High Voltage',
      'Stall Torque': '45 kg-cm @ 8.4V',
      'Speed': '0.08 sec/60° @ 8.4V',
      'Gear Type': 'Stainless Steel & Titanium Coated',
      'Case': 'Full CNC Aluminum Shell (IP67)'
    },
    rating: 4.8,
    reviewCount: 57,
    images: [
      'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: false,
    sequenceOrder: 7,
    stock: 22,
    inStock: true,
    tags: ['45KG Torque', 'Metal Gears'],
  },
  {
    id: 'prod-8',
    name: 'AeroSpin 5-Inch Tri-Blade Carbon Drone Propellers (4-Pack)',
    category: 'Racing Wheels & Propellers',
    price: 24,
    originalPrice: 32,
    description: 'Aerodynamically optimized airfoil design crafted from ultra-rigid polycarbonate-carbon blend. Dynamically factory balanced to eliminate high-RPM vibration and provide instant throttle response.',
    shortDescription: 'Set of 4 (2CW, 2CCW) 5.1x4.6x3 high-efficiency racing propellers.',
    specs: {
      'Diameter / Pitch': '5.1 inch / 4.6 inch (Tri-Blade)',
      'Material': 'Carbon-Reinforced Polycarbonate',
      'Hub Diameter / Thickness': '5mm / 7mm',
      'Weight': '4.1g per Propeller',
      'Included': '2x CW, 2x CCW'
    },
    rating: 4.7,
    reviewCount: 33,
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
    ],
    isFeatured: false,
    sequenceOrder: 8,
    stock: 50,
    inStock: true,
    tags: ['High RPM', 'Balanced'],
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mastering Brushless Motor KV Ratings and Pinion Gear Ratios for Max Speed',
    slug: 'mastering-brushless-motor-kv-gear-ratios',
    excerpt: 'A complete technical deep-dive into pairing brushless motor KV ratings with ESC timing, battery voltage, and spur/pinion gear ratios.',
    content: `
# Understanding Brushless KV and Thermal Efficiency in RC Builds

Selecting the optimal brushless power system is the single most critical factor determining acceleration, top speed, and motor longevity in competitive RC racing.

## 1. What Does KV Really Mean?
Motor KV represents RPM per volt applied under zero load. For example, a **3800KV motor** running on a 3S LiPo (11.1V nominal) spins at approximately 42,180 RPM unloaded:

$$\\text{RPM} = \\text{KV} \\times \\text{Voltage} = 3800 \\times 11.1 = 42,180 \\text{ RPM}$$

- **High KV (3800 - 5400KV)**: Suited for 2S-3S on-road touring cars and high-speed drag racing with shorter gearing.
- **Lower KV (1900 - 2400KV)**: Ideal for heavy 1/8 scale buggies and monster trucks running 4S-6S LiPo with high torque demands.

## 2. Calculating Your Final Drive Ratio (FDR)
To prevent ESC overheating and motor cogging, calculate your internal transmission ratio combined with spur and pinion gears:

$$\\text{FDR} = \\left(\\frac{\\text{Spur Gear Teeth}}{\\text{Pinion Gear Teeth}}\\right) \\times \\text{Internal Transmission Ratio}$$

Always monitor motor temperature with an infrared thermometer after 5-minute test runs. Temperatures should stay comfortably below **75°C (167°F)**.

## 3. Sensorless vs. Sensored ESC Systems
For bashing and straight-line top speed runs, robust sensorless motors deliver unmatched durability and water resistance. For tight track racing and crawler low-speed throttle modulation, sensored motors provide flawless zero-cogging precision.
    `,
    category: 'Motors & Tuning',
    readTime: '5 min read',
    date: 'August 10, 2026',
    author: 'Ryan Sterling, Lead Powertrain Engineer',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    recommendedProductIds: ['prod-1', 'prod-2', 'prod-3'],
    metaTitle: 'Mastering Brushless Motor KV & Gear Ratios | TechRcPro',
    metaDescription: 'Learn how to calculate gear ratios, optimize brushless motor KV, and choose ESC timing for high-speed RC racing.'
  },
  {
    id: 'blog-2',
    title: 'LiPo Battery Safety & Maintenance: Maximizing Cycle Life & Discharge C-Rates',
    slug: 'lipo-battery-safety-maintenance-guide',
    excerpt: 'Essential protocols for balance charging, storage voltage maintenance, internal resistance monitoring, and fire-safe LiPo storage.',
    content: `
# Safe Handling and Peak Performance Protocols for LiPo Packs

Lithium Polymer (LiPo) batteries offer unmatched power density, but require disciplined voltage management to maximize performance and lifespan.

## 1. Storage Voltage Rule (3.80V - 3.85V per Cell)
Never store fully charged (4.20V/cell) or depleted (below 3.50V/cell) LiPo packs for longer than 48 hours. Extended storage at full charge accelerates internal oxidation and causes pouch puffing. Always use a smart charger to bring cells to **3.82V per cell storage voltage**.

## 2. Understanding Discharge C-Ratings
The C-rate dictates the safe maximum continuous amperage your battery can deliver:

$$\\text{Continuous Amps} = \\text{Capacity (Ah)} \\times \\text{C-Rating}$$

For a **5200mAh (5.2Ah) 120C** pack:
$$\\text{Amps} = 5.2 \\times 120 = 624 \\text{ Amperes}$$

A higher C-rating translates to lower internal resistance, cooler operating temperatures, and punchier acceleration out of turns.

## 3. Fire-Safe Charging Practices
Always charge inside a certified fiberglass LiPo safe bag or heavy steel ammo container. Never leave charging batteries unattended, and balance-charge at **1C rate** for optimal chemical stabilization.
    `,
    category: 'Batteries & Electronics',
    readTime: '4 min read',
    date: 'August 5, 2026',
    author: 'Marcus Vance, Battery Tech Specialist',
    image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=1000&q=80',
    recommendedProductIds: ['prod-3', 'prod-4'],
    metaTitle: 'LiPo Battery Care & Safety Guide | TechRcPro',
    metaDescription: 'Expert maintenance guide for LiPo battery packs, balance smart chargers, C-ratings, and storage voltage preservation.'
  },
  {
    id: 'blog-3',
    title: 'Upgrading to 3K Carbon Fiber Chassis: Precision Weight Balance & Suspension Tuning',
    slug: 'carbon-fiber-chassis-tuning-guide',
    excerpt: 'How CNC carbon fiber decks, titanium shock towers, and anti-roll bars transform handling responsiveness on high-traction tracks.',
    content: `
# Chassis Flex Dynamics and Suspension Geometry

Transitioning from stock molded plastic to a full carbon fiber and CNC 7075 aluminum chassis delivers extreme structural rigidity and weight reduction.

## 1. Controlled Chassis Flex vs. Rigidity
High-traction carpet and asphalt circuits demand stiff chassis decks with minimal torsional twist to maximize grip. On low-grip outdoor dirt tracks, subtle symmetrical chassis flex allows the tires to conform to surface irregularities for superior traction.

## 2. Low Center of Gravity (LCG) Layout
Positioning the LiPo battery pack, brushless motor, and steering servo as low and centralized as possible drastically reduces body roll during aggressive cornering.

## 3. Shock Damping & Oil Weight Selection
Pair carbon fiber shock towers with CNC threaded aluminum dampers. Use 35wt to 50wt pure silicone shock oil and tune piston hole diameters to match ambient track temperatures and jump landings.
    `,
    category: 'Chassis & Engineering',
    readTime: '6 min read',
    date: 'July 25, 2026',
    author: 'David Chen, Track Suspension Engineer',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    recommendedProductIds: ['prod-6', 'prod-7', 'prod-5'],
    metaTitle: 'Carbon Fiber Chassis & Suspension Setup | TechRcPro',
    metaDescription: 'Explore chassis flex tuning, shock oil viscosity, titanium turnbuckles, and lightweight carbon fiber components for RC cars.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9481',
    customerName: 'Alex Mercer',
    phone: '(346) 475-6682',
    email: 'alex.m@example.com',
    shippingAddress: '742 Speed Circuit Parkway, Bay 4',
    city: 'Austin, TX',
    orderNotes: 'Urgent weekend race delivery. Please pack with extra cushioning.',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-1',
        productName: 'Vortex-X 3660 3800KV Sensorless Brushless Motor',
        price: 68,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
      },
      {
        productId: 'prod-3',
        productName: 'GrapheneCore 6S 5200mAh 120C LiPo Battery Pack',
        price: 118,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=400&q=80',
      }
    ],
    totalAmount: 304,
    orderDate: '2026-08-14 14:22',
    status: 'Processing',
  },
  {
    id: 'ORD-9482',
    customerName: 'Jason Vance',
    phone: '(346) 475-6682',
    email: 'j.vance@example.com',
    shippingAddress: '120 Aero Dynamics Way',
    city: 'San Diego, CA',
    orderNotes: 'Deliver to workshop front desk.',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-5',
        productName: 'ApexTX 8-Channel 2.4GHz FHSS Telemetry Radio System',
        price: 185,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80',
      }
    ],
    totalAmount: 185,
    orderDate: '2026-08-15 09:15',
    status: 'Pending',
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'INQ-101',
    name: 'Kevin Zhao',
    email: 'kzhao@fpvracing.com',
    phone: '(346) 475-6682',
    subject: 'Bulk Team Sponsorship & ESC Wholesale Order',
    message: 'Hello TechRcPro team! We are an official regional FPV drone racing team preparing for the 2026 championship. We need 20x AeroPulse 120A ESCs and 30x GrapheneCore 6S batteries. Do you offer racing club discounts?',
    date: '2026-08-15 11:30',
    status: 'Unread',
  },
  {
    id: 'INQ-102',
    name: 'Marcus Vance',
    email: 'mvance@rcworkshop.com',
    phone: '(346) 475-6682',
    subject: 'Compatibility of Vortex-X Motor with Traxxas Slash 4x4',
    message: 'Greetings! Will the Vortex-X 3660 motor fit directly onto a 1/10 Slash 4x4 with the stock 32P pinion gear and 5mm shaft adapter? Looking forward to your advice.',
    date: '2026-08-12 16:40',
    status: 'Read',
  }
];

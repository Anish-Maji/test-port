import swapMockupImg from '../assets/home/projects-ss.webp';
import referralthumb from '../assets/home/referral.webm';
import laundryVideo from '../assets/home/laundry-thumbnail.webm';
import arihant from '../assets/home/arihant-coming-soon.webm';

export const worksData = [
  {
    id: 'swap-station',
    title: "Baaz's battery swap station platform",
    shortTitle: "Designing Ineterctive Interface for Battery Swapping",
    categoryTag: "ev.cleantech",
    subtitle: "A rider-facing screen for battery swap stations, designed to make a 50 - second swap feel instant and foolproof.",
    tags: ["Baaz Bikes", "Case Study", "2024"],
    readTime: "3 mins read",
    bentoMeta: "BAAZ BIKES • CASE STUDY • 2024",
    meta: "BAAZ MOBILITY • EV & CLEAN TECH • 2025",
    image: swapMockupImg,
    bgColor: "linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)",
    isInteractive: true,
  },
  {
    id: 'referral-system',
    title: "Baaz's Driver Referral System",
    shortTitle: "Baaz Referral System",
    categoryTag: "growth.product",
    subtitle: "Gamified referral & payout tracking engine for EV fleet drivers",
    tags: ["Baaz Bikes", "Case Study", "2024"],
    readTime: "3 mins read",
    bentoMeta: "CASE STUDY • 2024",
    meta: "BAAZ MOBILITY • GROWTH & PRODUCT • 2025",
    video: referralthumb,
    bgColor: "#0d0d0d",
    isInteractive: true,
  },
  {
    id: 'hostel-laundry',
    title: "Revolutionizing Laundry in Hostels",
    shortTitle: "Revolutionizing Laundry in Hostels",
    categoryTag: "product.design",
    subtitle: "Hooked ideology based laundry service for college students",
    tags: ["Case Study", "2024"],
    readTime: "3 mins read",
    bentoMeta: "CASE STUDY • 2024",
    meta: "BEHANCE • PRODUCT DESIGN • 2024",
    video: laundryVideo,
    externalUrl: "https://www.behance.net/gallery/193222351/Revolutionizing-Laundry-in-Hostels",
    bgColor: "radial-gradient(139.8% 139.8% at 95.63% -0.02%, #4EDFFA 32.59%, #078AB7 100%)",
    isInteractive: true,
  },
  {
    id: 'arihant-rebranding',
    title: "Arihant Rebranding",
    shortTitle: "Arihant",
    categoryTag: "product.design",
    subtitle: "Brand identity & visual design for Arihant",
    tags: ["Brand Identity", "2025"],
    readTime: "3 mins read",
    bentoMeta: "BRAND IDENTITY • 2025",
    meta: "ARIHANT • PRODUCT DESIGN • 2025",
    video: arihant,
    bgColor: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
    isInteractive: false,
  },
];

export default worksData;

export const content = {
  tagline: 'Return to your nadi.', intro: 'A space to return to your rhythm.',
  story: 'NADI is a boutique yoga & wellness studio in Kediri, created for intentional movement, thoughtful practice, and meaningful connection.',
  opening: 'To be announced', address: 'Kediri, East Java · Full address to be announced', whatsapp: null,
  earlyLimit: 20, earlySeed: 17, cancelHours: 4,
};
// Set ISO timestamps with an explicit timezone once dates are confirmed.
// Null dates use an explicitly labelled preview mode; they are not live campaign dates.
export const campaigns = {
  early: { name: 'Early Member', startsAt: null, endsAt: null, previewMode: 'active' },
  soft: { name: 'Soft Opening', startsAt: null, endsAt: null, previewMode: 'upcoming' },
};
export const classes = [
  { id: 'foundation', name: 'Foundation', level: 'Beginner friendly', description: 'A slower-paced practice for beginners and anyone building strong foundations. Explore alignment, breath awareness, and essential postures in a supportive environment.', image: 'foundation' },
  { id: 'vinyasa', name: 'Vinyasa Flow', level: 'All levels · Modifications available', description: 'Breath-led movement that brings together mobility, strength, balance, and flow. A dynamic practice to energise your body and bring attention to the present.', image: 'flow' },
];
export const instructors = [
  { id: 'a', name: 'Teacher A · TBA', bio: 'Teacher introduction, qualifications, and portrait will be shared once our opening roster is confirmed.' },
  { id: 'b', name: 'Teacher B · TBA', bio: 'Meet the people behind your practice soon. This is a placeholder, not a published teacher profile.' },
];
// Seven price records; customers see three pass sizes with the eligible offer applied.
export const products = [
  { id: 'soft', name: 'Soft Opening', price: 75000, credits: 1, days: 1, validity: '1 class · selected session', eligibility: 'Available during the soft-opening offer.', promo: true, campaign: 'soft', base: 'drop' },
  { id: 'trial', name: 'First Trial', price: 85000, credits: 1, days: 1, validity: '1 class · selected session', eligibility: 'One first visit per new guest. Not available after a Soft Opening purchase.', promo: true, base: 'drop' },
  { id: 'drop', name: 'Single Class', price: 110000, credits: 1, days: 1, validity: '1 class · selected session', eligibility: 'A flexible drop-in for returning guests.' },
  { id: 'regular4', name: '4 Classes', price: 380000, credits: 4, days: 30, validity: '4 classes · valid for 30 days', eligibility: 'Your regular class pack. No subscription.' },
  { id: 'regular8', name: '8 Classes', price: 680000, credits: 8, days: 30, validity: '8 classes · valid for 30 days', eligibility: 'Your regular class pack. No subscription.' },
  { id: 'early4', name: '4 Classes · Early Member', price: 360000, credits: 4, days: 30, validity: '4 classes · 30 days*', eligibility: 'Your first class pack, within the shared first-20-member offer.', early: true, promo: true, campaign: 'early', base: 'regular4' },
  { id: 'early8', name: '8 Classes · Early Member', price: 640000, credits: 8, days: 30, validity: '8 classes · 30 days*', eligibility: 'Your first class pack, within the shared first-20-member offer.', early: true, promo: true, campaign: 'early', base: 'regular8' },
];
export const passSizes = [
  { id: 'single', name: 'Single Class', base: 'drop', description: 'A little space for yourself. Start here, or drop in when it suits you.' },
  { id: 'four', name: '4 Classes', base: 'regular4', description: 'Find a steady rhythm. A flexible way to build consistency.' },
  { id: 'eight', name: '8 Classes', base: 'regular8', description: 'Make room for a deeper, more regular practice.' },
];
export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const sessions = Array.from({ length: 12 }, (_, i) => ({ id: 's' + i, day: days[Math.floor(i / 2)], dayIndex: Math.floor(i / 2), time: i % 2 ? '18:30' : '07:00', classId: classes[(i + Math.floor(i / 2)) % classes.length].id, instructor: i % 2 ? 'b' : 'a', booked: [6, 8, 10, 4, 7, 3, 8, 6, 2, 9, 5, 4][i], capacity: 10, duration: 60 }));
export const paymentMethods = [
  { id: 'qris', name: 'QRIS', icon: '▦', description: 'Pay with a compatible banking or wallet app.' },
  { id: 'bank', name: 'Bank transfer', icon: '↗', description: 'A virtual account for your selected bank.', options: ['BCA', 'BNI', 'BRI', 'Mandiri'] },
  { id: 'wallet', name: 'E-wallet', icon: '◉', description: 'Continue with your preferred wallet.', options: ['GoPay', 'OVO', 'DANA'] },
  { id: 'card', name: 'Credit / debit card', icon: '▭', description: 'A secure hosted card checkout in the live version.' },
];
export const faqs = [
  ['Is NADI suitable for my first yoga class?', 'Yes. Foundation is our starting point for beginners. Choose your class, book online, and arrive 15–30 minutes early. Your teacher will guide you through the practice.'],
  ['Which classes can I book?', 'Our opening programme focuses on Foundation and Vinyasa Flow. More experiences may be introduced as our community grows.'],
  ['What should I bring?', 'Comfortable clothing and a water bottle. Our final studio facilities and equipment guide will be shared before opening.'],
  ['Is this a monthly membership?', 'Our 4- and 8-class packs are prepaid passes, valid for 30 days. There is no membership fee, subscription, contract, or automatic renewal.'],
  ['How does the Early Member offer work?', 'The first 20 eligible members share one allocation across 4- and 8-class packs. The special price applies to your first pack during the offer period. Renew at regular prices. Your Early Member status stays on your account, with a small-towel benefit while your pack is active.'],
  ['Can I book through WhatsApp?', 'WhatsApp is for questions. All bookings are recorded through the website. Our public number will be shared soon.'],
  ['Can I make a real payment here?', 'No. This private preview uses a fictional account and simulated payments. It does not collect payment details, contact information, or health information.'],
];

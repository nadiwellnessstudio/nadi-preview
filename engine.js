import { content, campaigns, products, sessions, paymentMethods } from './data.js';
export const fresh = () => ({ user: null, earlyCount: content.earlySeed, early: false, orders: [], bookings: [], packages: [], waitlist: [], campaignModes: {} });
export function campaignStatus(s, id, now = Date.now()) {
  const c = campaigns[id];
  if (s.campaignModes?.[id]) return s.campaignModes[id];
  if (c.startsAt && now < Date.parse(c.startsAt)) return 'upcoming';
  if (c.endsAt && now >= Date.parse(c.endsAt)) return 'ended';
  return c.startsAt || c.endsAt ? 'active' : c.previewMode;
}
export function offerEligibility(s, p, now = Date.now()) {
  if (!p) return 'Please choose a pass.';
  if (p.campaign && campaignStatus(s, p.campaign, now) !== 'active') return 'This offer is outside its active period.';
  if (p.early && (s.early || s.orders.some(o => products.find(x => x.id === o.product)?.credits > 1))) return 'The Early Member price applies to your first class pack only.';
  if (p.early && s.earlyCount >= content.earlyLimit) return 'All 20 Early Member places have been claimed.';
  if (p.id === 'trial' && s.orders.length) return 'First Trial is available once, for new guests only.';
  return null;
}
export function eligibility(s, p, now = Date.now()) { return !s.user ? 'Please continue with the demo account first.' : offerEligibility(s, p, now); }
export function resolvePass(s, baseId, now = Date.now()) {
  const candidates = baseId === 'drop' ? ['soft', 'trial', 'drop'] : [baseId === 'regular4' ? 'early4' : 'early8', baseId];
  return candidates.map(id => products.find(p => p.id === id)).find(p => !offerEligibility(s, p, now));
}
export function available(s, id) { const cl = sessions.find(x => x.id === id); return cl ? Math.max(0, cl.capacity - cl.booked - s.bookings.filter(b => b.session === id && b.status === 'confirmed').length) : 0; }
export function checkout(s, { session, product, extraPromo = false, key, method = 'qris', channel = '', paymentStatus = 'success' }, now = Date.now()) {
  if (!key) return { error: 'Please restart checkout.' };
  if (s.orders.some(o => o.key === key)) return { ok: true, duplicate: true, id: s.orders.find(o => o.key === key).id };
  if (paymentStatus !== 'success') return { error: 'Payment has not succeeded. Your booking and balance have not changed.' };
  const payment = paymentMethods.find(m => m.id === method);
  if (!payment || (payment.options && !payment.options.includes(channel))) return { error: 'Choose a valid payment method and provider.' };
  const cl = sessions.find(x => x.id === session), p = products.find(x => x.id === product);
  if (!cl || !p) return { error: 'Please choose a class and pass first.' };
  const e = eligibility(s, p, now); if (e) return { error: e };
  if (extraPromo) return { error: 'Offers cannot be combined. The best eligible price is already applied.' };
  if (available(s, session) <= 0) return { error: 'This class is full. Choose another class or join the waitlist.' };
  if (s.bookings.some(b => b.session === session && b.status === 'confirmed')) return { error: 'You already have a booking for this class.' };
  const id = 'DEMO-' + (s.orders.length + 1).toString().padStart(4, '0');
  s.orders.push({ id, key, product, total: p.price, date: now, method, channel });
  s.packages.push({ id, product, remaining: p.credits - 1, reserved: 1, expires: now + p.days * 86400000 });
  s.bookings.push({ id, session, status: 'confirmed', package: id });
  if (p.early) { s.early = true; s.earlyCount++; }
  return { ok: true, id };
}
export function cancel(s, id) { const b = s.bookings.find(x => x.id === id); if (!b || b.status !== 'confirmed') return false; b.status = 'cancelled'; const p = s.packages.find(x => x.id === b.package); p.remaining++; p.reserved--; return true; }

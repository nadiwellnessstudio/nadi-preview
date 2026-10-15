// Browser-only simulation. No authentication, signatures or shared server state.
export const config = { before: 30, after: 15, rotation: 30, capacity: 10 };
export function seed(now = Date.now()) { return { start: now + 10*60000, config: {...config}, attendance: [], audit: [], pending: [], bookings: Array.from({length:10},(_,i)=>({id:'MOCK-'+(i+1),user:'guest-'+(i+1),session:'s1',status:'confirmed'})) }; }
export function token(session, start, now=Date.now()) { return {session,start,issued:Math.floor(now/30000)*30000,expires:(Math.floor(now/30000)+1)*30000}; }
export function check(s,{user,session,qr,manual=false,staff=false,reason='',offline=false},now=Date.now()) {
 const fail=(code,message)=>({ok:false,code,message});
 if(!user) return fail('login','Choose a fictional account first.');
 if(manual && (!staff || !reason.trim())) return fail('staff','Staff mode and a reason are required.');
 const b=s.bookings.find(b=>b.user===user&&b.session===session&&b.status==='confirmed');
 if(!b) return fail('booking','No confirmed booking for this class. Ask our team for help.');
 if(!manual){
  if(!qr || qr.session!==session || qr.start!==s.start) return fail('class','This QR belongs to another class or demo session.');
  if(!Number.isFinite(qr.issued)||!Number.isFinite(qr.expires)||qr.expires-qr.issued!==30000||now<qr.issued||now>=qr.expires) return fail('expired','This QR has expired. Scan the current studio QR.');
  if(now<s.start-s.config.before*60000||now>s.start+s.config.after*60000) return fail('window','Check-in is outside the class arrival window. Please see our team.');
 }
 if(s.attendance.some(a=>a.booking===b.id)) return {ok:true,code:'duplicate',message:'You are already checked in. Your place is recorded once.'};
 if(offline){if(!s.pending.some(p=>p.user===user&&p.session===session))s.pending.push({user,session,reason,recordedAt:now});return {ok:true,code:'pending',message:'Saved as pending on this device. Staff must reconcile when online.'};}
 if(s.attendance.filter(a=>a.session===session).length>=10)return fail('capacity','Capacity of 10 reached. Please see our team.');
 s.attendance.push({booking:b.id,user,session,at:now,method:manual?'manual':'qr'});
 s.audit.push({at:now,actor:manual?'MOCK-STAFF':user,action:manual?'manual-check-in':'qr-check-in',booking:b.id,reason:manual?reason:'Valid demo QR'});
 return {ok:true,code:'success',message:'You’re checked in. Take a breath. Your mat is waiting.'};
}

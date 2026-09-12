export const ZONE='Europe/Moscow';
export function escapeHTML(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
export function resolvedEvents(day,rain=false){return day.events.map((e,i)=>({...e,...(rain?e.rain:{}),id:`${day.date}-${i}`,date:day.date}));}
export function bounds(e){const start=Date.parse(`${e.date}T${e.start}:00+03:00`);let end=Date.parse(`${e.date}T${e.end}:00+03:00`);if(end<=start)end+=86400000;return {start,end};}
export function findCurrent(events,now=Date.now()){return events.find(e=>bounds(e).start<=now&&now<bounds(e).end);}
export function findNext(events,now=Date.now()){return events.find(e=>bounds(e).start>now);}
export function countdown(ms){const m=Math.max(0,Math.ceil(ms/60000));return m>=1440?`${Math.floor(m/1440)} д ${Math.floor(m%1440/60)} ч`:m>=60?`${Math.floor(m/60)} ч ${m%60} мин`:`${m} мин`;}
export function routeURL(route,places){const rtext=route.stops.map(id=>places[id].coords.join(',')).join('~');return `https://yandex.ru/maps/?rtext=${encodeURIComponent(rtext)}&rtt=${route.mode}`;}
export function destinationURL(place){return `https://yandex.ru/maps/?rtext=${encodeURIComponent('~'+place.coords.join(','))}&rtt=pd`;}
export function safeTricount(value){try{const u=new URL(value);return u.protocol==='https:'&&(u.hostname==='tricount.com'||u.hostname==='www.tricount.com')?u.href:null;}catch{return null;}}

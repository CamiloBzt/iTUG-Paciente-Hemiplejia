import { TRIALS } from '../data/itug-trials';

export const mean = a => a.reduce((s,x)=>s+x,0)/a.length;
export const std  = a => { const m=mean(a); return Math.sqrt(mean(a.map(x=>(x-m)**2))); };
export const zScore = (v, ctrl) => { const s=std(ctrl); return s===0?0:(v-mean(ctrl))/s; };
export const asymPct = (L,R) => Math.abs(L-R)/((Math.abs(L)+Math.abs(R))/2)*100;
export const pctDiff = (value, baseline) => baseline===0 ? 0 : ((value-baseline)/baseline)*100;

export const HEALTHY = TRIALS.filter(t=>t.group==='healthy');
export const HEMIP   = TRIALS.filter(t=>t.group==='hemiplegia');

export function aggSubject(name) {
  const rows = TRIALS.filter(t=>t.subject===name);
  const keys = ['total','stand_dur','sit_dur','mid_dur','final_dur',
                'mid_max','final_max','mid_avg','final_avg',
                's_flex_peak','s_ext_peak','si_flex_peak','si_ext_peak',
                'stand_ap','sit_ap','stand_lat','sit_lat'];
  const out = { subject:name, group:rows[0].group };
  keys.forEach(k => out[k] = mean(rows.map(r=>r[k])));
  return out;
}

import { C } from '../../lib/colors';
import { HEALTHY, HEMIP, mean, pctDiff } from '../../lib/stats';
import { METRIC_DEFS } from '../../data/metric-defs';

export default function ZProfile() {
  const items = METRIC_DEFS.map(def=>{
    const controlMean = mean(HEALTHY.map(t=>t[def.key]));
    const sofiaValues = HEMIP.map(t=>t[def.key]);
    return {
      label: def.label,
      unit: def.unit,
      diff_der: pctDiff(HEMIP[0][def.key], controlMean),
      diff_izq: pctDiff(HEMIP[1][def.key], controlMean),
      diff_avg: pctDiff(mean(sofiaValues), controlMean),
    };
  }).sort((a,b)=>Math.abs(b.diff_avg)-Math.abs(a.diff_avg));

  return (
    <section style={{padding:'42px 56px 40px', borderBottom:`1px solid ${C.rule}`}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20}}>
        <div>
          <div className="label">02 · Perfil comparativo</div>
          <h2 className="serif" style={{fontSize:28, margin:'10px 0 4px', fontWeight:400, letterSpacing:'-0.01em'}}>
            Porcentaje de cambio frente al grupo de control
          </h2>
          <p className="small" style={{maxWidth:680, fontSize:12.5}}>
            Cada fila muestra cuánto se aleja Sofía del promedio del grupo de control.
            Los porcentajes positivos indican valores más altos; los negativos, valores más bajos.
          </p>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap:0, fontSize:11, color:C.muted, marginBottom:4}}>
        <div style={{gridColumn:'1 / 4'}}>Variable</div>
        <div style={{gridColumn:'4 / 11', display:'flex', justifyContent:'space-between', padding:'0 8px'}}>
          {[-100,-50,0,50,100].map(t=>(
            <span key={t} className="mono" style={{fontSize:9}}>{t>0?`+${t}`:t}%</span>
          ))}
        </div>
        <div style={{gridColumn:'11 / 13', textAlign:'right'}}>Sofía</div>
      </div>

      {items.map((it,i)=>{
        const minPct=-110, maxPct=110;
        const toPct = value => ((Math.max(minPct, Math.min(maxPct, value))-minPct)/(maxPct-minPct))*100;
        return (
          <div key={it.label} style={{display:'grid', gridTemplateColumns:'repeat(12, 1fr)', alignItems:'center', padding:'8px 0', borderBottom: i<items.length-1?`1px solid ${C.paperLine}`:`1px solid ${C.rule}`}}>
            <div style={{gridColumn:'1 / 4'}}>
              <div className="serif" style={{fontSize:14, color:C.ink}}>{it.label}</div>
              <div className="mono" style={{fontSize:9.5, color:C.muted}}>{it.unit}</div>
            </div>
            <div style={{gridColumn:'4 / 11', position:'relative', height:30}}>
              <div style={{position:'absolute', left:0, right:0, top:'50%', height:1, background:C.paperLine}}/>
              <div style={{
                position:'absolute', top:'50%', height:14, transform:'translateY(-50%)',
                left:`${toPct(-10)}%`, width:`${toPct(10)-toPct(-10)}%`,
                background:C.healthyBg, border:`1px dashed ${C.healthy}`,
              }}/>
              <div style={{position:'absolute', top:0, bottom:0, left:`${toPct(0)}%`, width:1, background:C.healthy}}/>
              <div title={`der: ${it.diff_der.toFixed(0)}%`} style={{
                position:'absolute', top:'50%', left:`${toPct(it.diff_der)}%`,
                transform:'translate(-50%,-50%)', width:8, height:8, borderRadius:'50%',
                background:C.hemip, opacity:0.55,
              }}/>
              <div title={`izq: ${it.diff_izq.toFixed(0)}%`} style={{
                position:'absolute', top:'50%', left:`${toPct(it.diff_izq)}%`,
                transform:'translate(-50%,-50%)', width:8, height:8, borderRadius:'50%',
                background:C.hemip, opacity:0.55,
              }}/>
              <div style={{
                position:'absolute', top:'50%', height:3, transform:'translateY(-50%)',
                left: it.diff_avg>=0 ? `${toPct(0)}%` : `${toPct(it.diff_avg)}%`,
                width: `${Math.abs(toPct(it.diff_avg)-toPct(0))}%`,
                background: C.hemip,
              }}/>
              <div title={`promedio: ${it.diff_avg.toFixed(0)}%`} style={{
                position:'absolute', top:'50%', left:`${toPct(it.diff_avg)}%`,
                transform:'translate(-50%,-50%)', width:11, height:11, borderRadius:'50%',
                background:C.hemip, border:`2px solid ${C.cream}`,
              }}/>
            </div>
            <div style={{gridColumn:'11 / 13', textAlign:'right'}}>
              <span className="mono" style={{fontSize:14, color:C.hemip, fontWeight:500}}>
                {it.diff_avg>=0?'+':''}{it.diff_avg.toFixed(0)}%
              </span>
            </div>
          </div>
        );
      })}
      <div style={{display:'flex', gap:24, marginTop:14, fontSize:11, color:C.muted}}>
        <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
          <span style={{width:14, height:2, background:C.healthy}}/> Promedio control
        </span>
        <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
          <span style={{width:14, height:8, background:C.healthyBg, border:`1px dashed ${C.healthy}`}}/> Similar al control
        </span>
        <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
          <span style={{width:8, height:8, background:C.hemip, opacity:0.55, borderRadius:'50%'}}/> Ensayo individual (derecha/izquierda)
        </span>
        <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
          <span style={{width:11, height:11, background:C.hemip, borderRadius:'50%', border:`2px solid ${C.cream}`}}/> Promedio Sofía
        </span>
      </div>
    </section>
  );
}

import {
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ScatterChart, Scatter,
  ReferenceLine, ReferenceArea, ReferenceDot
} from 'recharts';
import { C } from '../../lib/colors';
import { HEALTHY, HEMIP, mean } from '../../lib/stats';
export default function FeatureSpace() {
  const pts = ['der','izq'].flatMap(side => ([
    {
      x: mean(HEALTHY.filter(t=>t.side===side).map(t=>t.total)),
      y: mean(HEALTHY.filter(t=>t.side===side).map(t=>t.final_max)),
      label: `Control ${side === 'der' ? 'derecha' : 'izquierda'}`,
      group: 'healthy',
      full: 'Grupo de control',
      side,
    },
    {
      x: HEMIP.find(t=>t.side===side).total,
      y: HEMIP.find(t=>t.side===side).final_max,
      label: `Sofía ${side === 'der' ? 'derecha' : 'izquierda'}`,
      group: 'hemiplegia',
      full: 'Sofía Sandoval',
      side,
    },
  ]));

  const ch = { x: mean(HEALTHY.map(t=>t.total)), y: mean(HEALTHY.map(t=>t.final_max)) };
  const cp = { x: mean(HEMIP.map(t=>t.total)),   y: mean(HEMIP.map(t=>t.final_max)) };
  const mx = (ch.x+cp.x)/2, my = (ch.y+cp.y)/2;
  const dx = cp.x-ch.x, dy = cp.y-ch.y;
  const bx = [9, 22];
  const by = bx.map(x => my - (dx/dy)*(x - mx));

  return (
    <section style={{padding:'42px 56px 48px', borderBottom:`1px solid ${C.rule}`}}>
      <div style={{display:'grid', gridTemplateColumns:'360px minmax(0, 1fr)', gap:34, alignItems:'stretch'}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
          <div>
            <div className="label">04 · Relación entre tiempo y giro</div>
            <h2 className="serif" style={{fontSize:28, margin:'10px 0 4px', fontWeight:400, letterSpacing:'-0.01em'}}>
              Sofía tarda más y gira más lento
            </h2>
            <p className="small" style={{fontSize:12.5, marginBottom:12}}>
              El gráfico cruza la duración total de la prueba con la velocidad máxima del giro final.
              Para el grupo de control se muestran los promedios derecho e izquierdo. Sofía queda
              desplazada hacia mayor tiempo y menor velocidad de giro.
            </p>
          </div>

          <div style={{display:'grid', gap:10, marginTop:20}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', border:`1px solid ${C.paperLine}`}}>
              <span className="small" style={{fontSize:12, color:C.ink2}}>Grupo de control</span>
              <span className="mono" style={{fontSize:12, color:C.healthy}}>Menos tiempo · más velocidad</span>
            </div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', border:`1px solid ${C.paperLine}`, background:C.hemipBg}}>
              <span className="small" style={{fontSize:12, color:C.ink2}}>Sofía</span>
              <span className="mono" style={{fontSize:12, color:C.hemip}}>Más tiempo · menor velocidad</span>
            </div>
            <p className="footnote" style={{margin:'2px 0 0'}}>
              La línea discontinua funciona como guía visual entre ambos patrones.
            </p>
          </div>
        </div>
        <div style={{height:430, minWidth:0}}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{top:18, right:28, bottom:56, left:62}}>
              <CartesianGrid stroke={C.paperLine} strokeDasharray="2 4"/>
              <XAxis type="number" dataKey="x" name="Duración total"
                     domain={[9, 22]}
                     tick={{fill:C.muted, fontSize:10.5, fontFamily:'JetBrains Mono'}}
                     axisLine={{stroke:C.rule}} tickLine={{stroke:C.rule}}
                     label={{value:'Duración total (s)', position:'bottom', offset:18, fill:C.ink2, fontSize:11.5, fontFamily:'IBM Plex Sans'}}/>
              <YAxis type="number" dataKey="y" name="Velocidad giro final"
                     domain={[80, 290]}
                     tick={{fill:C.muted, fontSize:10.5, fontFamily:'JetBrains Mono'}}
                     axisLine={false} tickLine={false}
                     label={{value:'Velocidad máxima giro final (°/s)', angle:-90, position:'insideLeft', offset:-32, fill:C.ink2, fontSize:11.5, fontFamily:'IBM Plex Sans'}}/>
              <ReferenceLine segment={[{x:bx[0], y:by[0]}, {x:bx[1], y:by[1]}]}
                             stroke={C.ink} strokeDasharray="5 4" strokeWidth={1.2}/>
              <ReferenceArea x1={9} x2={(bx[0]+bx[1])/2 - 0.5} y1={80} y2={290}
                             fill={C.hemipBg} fillOpacity={0.0}/>
              <Tooltip cursor={{strokeDasharray:'2 2'}}
                       formatter={(v,n)=>{
                         if(n==='x') return [`${v.toFixed(2)} s`, 'Duración total'];
                         if(n==='y') return [`${v.toFixed(1)} °/s`, 'Velocidad giro final'];
                         return v;
                       }}
                       labelFormatter={(_,p)=>p?.[0]?.payload?.full + ' · ' + p?.[0]?.payload?.side}/>
              <Scatter data={pts.filter(p=>p.group==='healthy')} fill={C.healthy}
                       shape={(props)=>(
                         <g>
                           <circle cx={props.cx} cy={props.cy} r={7} fill={C.healthy} stroke={C.cream} strokeWidth={1.5}/>
                         </g>
                       )}/>
              <Scatter data={pts.filter(p=>p.group==='hemiplegia')} fill={C.hemip}
                       shape={(props)=>(
                         <g>
                           <circle cx={props.cx} cy={props.cy} r={7} fill={C.hemip} stroke={C.cream} strokeWidth={1.5}/>
                         </g>
                       )}/>
              {/* class centroids */}
              <ReferenceDot x={ch.x} y={ch.y} r={4} fill={C.healthy2}/>
              <ReferenceDot x={cp.x} y={cp.y} r={4} fill={C.hemip2}/>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}


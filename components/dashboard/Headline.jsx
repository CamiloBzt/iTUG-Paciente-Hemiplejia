import {
  BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,
  ReferenceLine
} from 'recharts';
import { TRIALS } from '../../data/itug-trials';
import { C } from '../../lib/colors';
import { HEALTHY, mean } from '../../lib/stats';
export default function Headline() {
  const controlBySide = ['der','izq'].map(side => ({
    name: `Control ${side === 'der' ? 'derecha' : 'izquierda'}`,
    sub: 'Grupo de control',
    side,
    value: mean(TRIALS.filter(t=>t.group==='healthy' && t.side===side).map(t=>t.total)),
    group: 'healthy',
  }));
  const sofiaBySide = TRIALS.filter(t=>t.group==='hemiplegia').map(t => ({
    name: `Sofía ${t.side === 'der' ? 'derecha' : 'izquierda'}`,
    sub: 'Sofía Sandoval',
    side: t.side,
    value: t.total,
    group: t.group,
  }));
  const data = [...controlBySide, ...sofiaBySide];

  const healthyMean = mean(HEALTHY.map(t=>t.total));
  const sofiaMean = mean(TRIALS.filter(t=>t.group==='hemiplegia').map(t=>t.total));
  const durationPct = Math.floor(((sofiaMean - healthyMean) / healthyMean) * 100);
  const cutoff = 13.5; // umbral clínico de referencia para riesgo de caídas

  return (
    <section style={{padding:'48px 56px 40px', borderBottom:`1px solid ${C.rule}`}}>
      <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:48, alignItems:'flex-start'}}>
        <div>
          <div className="label">Hallazgo principal</div>
          <h2 className="serif" style={{fontSize:30, margin:'10px 0 14px', lineHeight:1.15, fontWeight:400, letterSpacing:'-0.015em'}}>
            La paciente tarda <span style={{color:C.hemip, fontStyle:'italic'}}>74%</span> más en completar la prueba
          </h2>
          <p className="small" style={{fontSize:13, lineHeight:1.55, color:C.ink2}}>
            La duración total del iTUG es el descriptor más simple del rendimiento funcional.
            Sofía promedia <strong className="mono" style={{color:C.hemip}}>18.96 s</strong> frente a
            <strong className="mono" style={{color:C.healthy}}> 10.86 s</strong> del grupo de control sano.
            El ensayo derecho (20.21 s) la clasifica como <em>semi-independiente</em>; supera además
            el umbral clínico de 13.5 s asociado a riesgo aumentado de caídas en adultos.
          </p>
          <div style={{marginTop:18, display:'flex', gap:18}}>
            <div>
              <div className="label" style={{fontSize:9.5}}>Promedio control</div>
              <div className="mono" style={{fontSize:22, color:C.healthy, fontWeight:500}}>10.86 s</div>
            </div>
            <div>
              <div className="label" style={{fontSize:9.5}}>Promedio Sofía</div>
              <div className="mono" style={{fontSize:22, color:C.hemip, fontWeight:500}}>18.96 s</div>
            </div>
            <div>
              <div className="label" style={{fontSize:9.5}}>Diferencia</div>
              <div className="mono" style={{fontSize:22, color:C.hemip, fontWeight:500}}>+{durationPct}%</div>
            </div>
          </div>
        </div>
        <div style={{height:280}}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{top:10, right:20, bottom:30, left:0}} barCategoryGap="22%">
              <CartesianGrid stroke={C.paperLine} strokeDasharray="2 4" vertical={false}/>
              <XAxis dataKey="name" tick={{fill:C.ink2, fontSize:10.5, fontFamily:'JetBrains Mono'}}
                     axisLine={{stroke:C.rule}} tickLine={false} height={42}/>
              <YAxis tick={{fill:C.muted, fontSize:10.5, fontFamily:'JetBrains Mono'}}
                     axisLine={false} tickLine={false}
                     label={{value:'segundos', angle:-90, position:'insideLeft', offset:14, fill:C.muted, fontSize:11}}/>
              <Tooltip cursor={{fill:'rgba(0,0,0,0.04)'}}
                       formatter={(v)=>[`${v.toFixed(2)} s`, 'Duración total']}
                       labelFormatter={(_, p)=>p?.[0]?.payload?.sub}/>
              <ReferenceLine y={cutoff} stroke={C.clay} strokeDasharray="4 3"
                             label={{value:'Umbral riesgo 13.5 s', position:'insideTopRight', fill:C.clay, fontSize:10}}/>
              <ReferenceLine y={healthyMean} stroke={C.healthy} strokeWidth={1}
                             label={{value:'Promedio control 10.86 s', position:'insideTopLeft', fill:C.healthy, fontSize:10}}/>
              <Bar dataKey="value" radius={[1,1,0,0]}>
                {data.map((d,i)=>(
                  <Cell key={i} fill={d.group==='hemiplegia'?C.hemip:C.healthy}/>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}


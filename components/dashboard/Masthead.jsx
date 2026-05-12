import { C } from '../../lib/colors';
export default function Masthead() {
  return (
    <header style={{padding:'48px 56px 32px', borderBottom:`1px solid ${C.rule}`}}>
      <div className="masthead-layout" style={{display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:32}}>
        <div style={{maxWidth: 680}}>
          <div className="label" style={{marginBottom:14}}>
            Análisis instrumentado — Timed Up &amp; Go · v1.0
          </div>
          <h1 className="serif masthead-title" style={{margin:'0 0 14px', fontSize:54, fontWeight:400, lineHeight:1.02, letterSpacing:'-0.025em'}}>
            Comparación de movilidad en una paciente con <em style={{fontStyle:'italic', color:C.hemip}}>hemiplejia</em>
            <br/>en la prueba iTUG
          </h1>
          <p className="small" style={{maxWidth:560, fontSize:14, lineHeight:1.55, color:C.ink2, marginTop:8}}>
            Comparación entre una paciente con hemiplejia y un grupo de control de tres sujetos sanos
            mediante sensores de movimiento. Cada sujeto
            ejecutó la prueba en ambos sentidos de giro (derecho e izquierdo).
          </p>
        </div>
        <div className="masthead-stats" style={{textAlign:'right', minWidth:220}}>
          <div className="label">Muestra analizada</div>
          <div className="num-xl" style={{margin:'8px 0 2px'}}>4 <span style={{fontSize:18, color:C.muted, letterSpacing:0}}>sujetos</span></div>
          <div className="mono" style={{fontSize:11, color:C.muted, marginTop:12}}>
            8 ensayos · 17,209 muestras · 100 Hz
          </div>
          <div className="mono" style={{fontSize:11, color:C.muted, marginTop:4}}>
            Bogotá · 23–24 abr 2026
          </div>
        </div>
      </div>
    </header>
  );
}

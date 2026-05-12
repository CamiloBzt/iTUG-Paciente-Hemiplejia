import { C } from '../../lib/colors';
export default function Findings() {
  const findings = [
    { num:'01', title:'Tiempo total más alto', body:'Sofía promedia 18.96 s frente a 10.86 s del grupo de control: tarda cerca de 74% más en completar la prueba. Incluso su mejor ensayo supera el punto de referencia clínico de 13.5 s.' },
    { num:'02', title:'Giro final más lento', body:'La velocidad máxima del giro final en el lado derecho es 113.9 °/s. En el grupo de control, los valores más altos superan los 240 °/s. El giro parece ser una de las partes más exigentes para Sofía.' },
    { num:'03', title:'Diferencia clara entre lados', body:'En la duración del giro final, Sofía muestra 51% de diferencia entre derecha e izquierda. En el grupo de control esa diferencia promedio es menor.' },
    { num:'04', title:'Mayor uso del tronco al levantarse', body:'Al levantarse, Sofía alcanza 48.5° de flexión del tronco. Esto puede sugerir que usa más el tronco para compensar la dificultad en miembros inferiores.' },
  ];

  const treatment = [
    { phase:'A · Inicio', focus:'Movilidad funcional segura', items:['Practicar levantarse y sentarse con apoyo','Entrenar el giro en pasos cortos y controlados','Trabajar el control del tronco al levantarse'] },
    { phase:'B · Progreso', focus:'Velocidad y simetría', items:['Practicar giros hacia ambos lados con retroalimentación visual','Caminar con ritmo marcado para mejorar cadencia','Fortalecimiento progresivo del lado más comprometido'] },
    { phase:'C · Seguimiento', focus:'Doble tarea y reintegración', items:['Repetir la prueba con una tarea mental simple','Caminar en entornos cotidianos y no controlados','Reevaluación instrumentada cada 6 semanas'] },
  ];

  return (
    <section style={{padding:'42px 56px 60px'}}>
      <div className="label">05 · Síntesis</div>
      <h2 className="serif findings-title" style={{fontSize:34, margin:'10px 0 28px', fontWeight:400, letterSpacing:'-0.015em', maxWidth:760, lineHeight:1.15}}>
        Hallazgos clínicos y propuesta de tratamiento personalizado
      </h2>

      <div className="findings-grid" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16, marginBottom:36}}>
        {findings.map(f=>(
          <div key={f.num} style={{borderTop:`2px solid ${C.hemip}`, paddingTop:14}}>
            <div className="mono" style={{fontSize:11, color:C.hemip, fontWeight:500, marginBottom:6}}>{f.num}</div>
            <div className="serif" style={{fontSize:17, lineHeight:1.25, marginBottom:8, fontWeight:400}}>{f.title}</div>
            <p className="small" style={{margin:0, fontSize:12.5, color:C.ink2, lineHeight:1.5}}>{f.body}</p>
          </div>
        ))}
      </div>

      <div className="hairline" style={{paddingTop:24}}>
        <div className="label" style={{marginBottom:14}}>Programa propuesto · 3 fases</div>
        <div className="treatment-grid" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, background:C.rule, border:`1px solid ${C.rule}`}}>
          {treatment.map(p=>(
            <div key={p.phase} style={{background:C.cream, padding:'18px 20px'}}>
              <div className="mono" style={{fontSize:10.5, color:C.muted, marginBottom:6, letterSpacing:'0.08em', textTransform:'uppercase'}}>{p.phase}</div>
              <div className="serif" style={{fontSize:20, marginBottom:10, fontWeight:400, color:C.healthy2}}>{p.focus}</div>
              <ul style={{margin:0, padding:'0 0 0 14px', listStyle:'none'}}>
                {p.items.map((it,i)=>(
                  <li key={i} style={{fontSize:12.5, color:C.ink2, lineHeight:1.55, marginBottom:6, position:'relative', paddingLeft:14}}>
                    <span style={{position:'absolute', left:0, top:9, width:6, height:1, background:C.healthy}}/>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

// ============================================================
// MAIN

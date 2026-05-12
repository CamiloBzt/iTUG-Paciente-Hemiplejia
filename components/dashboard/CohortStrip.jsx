import { TRIALS } from '../../data/itug-trials';
import { SUBJECTS } from '../../data/subjects';
import { C } from '../../lib/colors';
import { mean } from '../../lib/stats';
export default function CohortStrip() {
  const patient = SUBJECTS.find(s => s.group === 'hemiplegia');
  const controls = SUBJECTS.filter(s => s.group === 'healthy');
  const cards = [
    {
      key: 'patient',
      chip: 'caso',
      number: '#01',
      title: patient.name,
      meta: `F · ${patient.age} años · ${patient.weight} kg · ${patient.height} cm`,
      meanDur: mean(TRIALS.filter(t=>t.subject===patient.name).map(t=>t.total)),
      trialsLabel: '2 (derecha · izquierda)',
      isPatient: true,
    },
    {
      key: 'control-group',
      chip: 'grupo de control',
      number: '#02',
      title: 'Grupo de control',
      meta: `3 sujetos sanos · ${mean(controls.map(s=>s.age)).toFixed(1)} años · ${mean(controls.map(s=>s.weight)).toFixed(1)} kg · ${mean(controls.map(s=>s.height)).toFixed(1)} cm`,
      meanDur: mean(TRIALS.filter(t=>t.group==='healthy').map(t=>t.total)),
      trialsLabel: '6 (3 sujetos · derecha/izquierda)',
      isPatient: false,
    },
  ];

  return (
    <section style={{padding:'28px 56px 36px', borderBottom:`1px solid ${C.rule}`}}>
      <div className="cohort-grid" style={{display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:1, background:C.rule, border:`1px solid ${C.rule}`}}>
        {cards.map(card => {
          return (
            <div key={card.key} style={{
              background: card.isPatient ? C.hemipBg : C.cream,
              padding:'18px 18px 16px',
              borderLeft: card.isPatient ? `3px solid ${C.hemip}` : `3px solid transparent`,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <span className={`chip ${card.isPatient?'chip-hemip':'chip-healthy'}`}>{card.chip}</span>
                <span className="mono" style={{fontSize:10, color:C.muted}}>{card.number}</span>
              </div>
              <div className="serif" style={{fontSize:20, marginTop:10, lineHeight:1.15, fontWeight:400, color: card.isPatient?C.hemip2:C.ink}}>
                {card.title}
              </div>
              <div className="small" style={{marginTop:4, fontSize:11.5, color:C.muted}}>
                {card.meta}
              </div>
              <div className="cohort-card-metrics" style={{marginTop:12, display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
                <div>
                  <div className="label" style={{fontSize:9.5}}>TUG promedio</div>
                  <div className="mono" style={{fontSize:18, fontWeight:500, color:card.isPatient?C.hemip:C.healthy, marginTop:2}}>
                    {card.meanDur.toFixed(2)}<span style={{fontSize:11, color:C.muted, marginLeft:3}}>s</span>
                  </div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="label" style={{fontSize:9.5}}>Ensayos</div>
                  <div className="mono" style={{fontSize:13, marginTop:4, color:C.ink2}}>{card.trialsLabel}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}


export const METRIC_DEFS = [
  { key:'total',       label:'Duración total',                 unit:'s',    direction:'higher_worse' },
  { key:'stand_dur',   label:'Fase levantarse',                unit:'s',    direction:'higher_worse' },
  { key:'sit_dur',     label:'Fase sentarse',                  unit:'s',    direction:'higher_worse' },
  { key:'mid_dur',     label:'Giro medio (duración)',          unit:'s',    direction:'higher_worse' },
  { key:'final_dur',   label:'Giro final (duración)',          unit:'s',    direction:'higher_worse' },
  { key:'mid_max',     label:'Velocidad máxima giro medio',    unit:'°/s',  direction:'lower_worse' },
  { key:'final_max',   label:'Velocidad máxima giro final',    unit:'°/s',  direction:'lower_worse' },
  { key:'final_avg',   label:'Velocidad promedio giro final',  unit:'°/s',  direction:'lower_worse' },
  { key:'stand_vert',  label:'Impulso vertical al levantarse', unit:'m/s²', direction:'lower_worse' },
  { key:'sit_vert',    label:'Impulso vertical al sentarse',   unit:'m/s²', direction:'lower_worse' },
  { key:'s_flex_peak', label:'Mayor flexión al levantarse',    unit:'°',    direction:'context' },
  { key:'si_flex_peak',label:'Mayor flexión al sentarse',      unit:'°',    direction:'context' },
];

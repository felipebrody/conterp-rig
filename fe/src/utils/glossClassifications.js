export const glossClassification = [
  {
    id: Math.random(),
    name: "Mão de Obra",
    value: "labor",
  },
  { id: Math.random(), name: "Processo ou Procedimento", value: "process" },
  { id: Math.random(), name: "Logística", value: "logistics" },
  { id: Math.random(), name: "Segurança", value: "security" },
];

export const repairClassification = [
  { id: Math.random(), name: "Carro Sonda", value: "rig_car" },
  { id: Math.random(), name: "Mastro", value: "mast" },
  { id: Math.random(), name: "Guincho Sonda", value: "rig_winch" },
  { id: Math.random(), name: "Transmissão Sonda", value: "rig_transmission" },
  { id: Math.random(), name: "UCI", value: "uci" },
  { id: Math.random(), name: "Tanque de Lama", value: "mud_tank" },
  { id: Math.random(), name: "Trailer", value: "trailer" },
  { id: Math.random(), name: "Bomba de Lama", value: "mud_bomb" },
  { id: Math.random(), name: "Pipe Rack", value: "pipe_rack" },
  { id: Math.random(), name: "BOP", value: "bop" },
  { id: Math.random(), name: "Choke Manifold", value: "choke_manifold" },
  { id: Math.random(), name: "Mangueiras", value: "hoses" },
  { id: Math.random(), name: "Chave Hidráulica", value: "hydraulic_wrench" },
  {
    id: Math.random(),
    name: "Ferramentas de Manuseio",
    value: "handling_tools",
  },
  { id: Math.random(), name: "Outros", value: "others" },
];

export const distanceClassification = [
  {
    id: "less_than_20",
    name: "Menor que 20",
    value: "less_than_20",
  },
  {
    id: "between_20_and_50",
    name: "Maior que 20 e menor que 50",
    value: "between_20_and_50",
  },
  {
    id: "greater_than_50",
    name: "Maior que 50",
    value: "greater_than_50",
  },
];

export const oilWells = [
  {
    id: "MBW-46",
    name: "MBW-46",
    value: "MBW-46",
  },
  {
    id: "MBW-54",
    name: "MBW-54",
    value: "MBW-54",
  },
  {
    id: "MBW-32",
    name: "MBW-32",
    value: "MBW-32",
  },
];

export const periodType = [
  {
    id: "working",
    name: "Operando",
    value: "working",
  },
  {
    id: "dtm",
    name: "DTM",
    value: "dtm",
  },
  {
    id: "gloss",
    name: "Glosa",
    value: "gloss",
  },
  {
    id: "repair",
    name: "Reparo",
    value: "repair",
  },
];

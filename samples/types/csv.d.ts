interface Row {
  '애플리케이션': string;
  'Domain': string;
  'Instance': string;
  '클라이언트 IP': string;
  '시작 시간': string;
  '종료 시간': string;
  '응답시간': number;
  '메서드 시간': number;
  'SQL 시간': number;
  'External Call 시간': number;
  'Batch 시간': number;
  'Fetch시간': number;
  'CPU 시간': number;
  'ERROR': string;
}
type Column = keyof Row;

declare module '*.csv' {
  const rows: Row[];
  export default rows;
}

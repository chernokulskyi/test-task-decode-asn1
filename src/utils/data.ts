export interface CertificateData {
  commonName: string;
  issuerCN: string;
  validFrom: string;
  validTill: string;
}

const data: CertificateData[] = [
  {
    commonName: 'Іванов Іван Іванович',
    issuerCN: 'АЦСК MASTERKEY',
    validFrom: '2016-12-18',
    validTill: '2017-12-18',
  },
  {
    commonName: 'Петров Петро Петрович',
    issuerCN: 'ЦСК ПрАТ "ІВК"',
    validFrom: '2016-09-06',
    validTill: '2017-09-06',
  },
  {
    commonName: 'Сидоров Сидор Сидорович',
    issuerCN: 'КНЕДП ІДД ДПС',
    validFrom: '2017-12-25',
    validTill: '2018-03-25',
  },
];

export default data;

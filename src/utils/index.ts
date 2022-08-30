import { Dispatch, SetStateAction } from 'react';
import { CertificateData } from './data';

// @ts-ignore
import ASN1 from '@lapo/asn1js';

const readFileAsString = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();

    fr.onerror = reject;
    fr.onload = () => resolve(fr.result as string);

    fr.readAsBinaryString(file);
  });

export const getValuesFromCertificate = async (
  certificate: File
): Promise<CertificateData> => {
  const string = await readFileAsString(certificate);
  const result = ASN1.decode(string);

  const commonName = result.sub[0].sub[5].sub[1].sub[0].sub[1].content();
  const issuerCN = result.sub[0].sub[3].sub[2].sub[0].sub[1].content();
  const validFrom = result.sub[0].sub[4].sub[0].content().split(' ')[0];
  const validTill = result.sub[0].sub[4].sub[1].content().split(' ')[0];

  return { commonName, issuerCN, validFrom, validTill };
};

export const addCertificate = (
  certificate: CertificateData,
  setData: Dispatch<SetStateAction<CertificateData[]>>
) => {
  setData((prevData) => {
    const isUnique = !prevData.some(
      (c) => c.commonName === certificate.commonName
    );

    !isUnique && alert('Подібний сертифікат вже додано');

    return isUnique ? [...prevData, certificate] : prevData;
  });
};

export const prepareKey = (key: string) =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (f) => f.toUpperCase())
    .replace('Cn', 'CN');

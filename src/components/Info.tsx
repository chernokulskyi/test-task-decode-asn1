import React, { Dispatch, SetStateAction, useState } from 'react';
import { CertificateData } from '../utils/data';
import { addCertificate, getValuesFromCertificate, prepareKey } from '../utils';

interface Props {
  setData: Dispatch<SetStateAction<CertificateData[]>>;
  selectedCertificate: CertificateData | null;
  isDragMode: boolean;
  setIsDragMode: Dispatch<SetStateAction<boolean>>;
}

export const Info: React.FC<Props> = ({
  setData,
  selectedCertificate,
  isDragMode,
  setIsDragMode,
}) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const dropHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = [...e.dataTransfer.files];
    const certificate = files[0];

    if (files.length > 1) {
      alert('Будь ласка, виберіть один сертифікат');
      setIsDragActive(false);
      return;
    }

    if (certificate.type !== 'application/x-x509-ca-cert') {
      alert('Некоректний тип файлу');
      setIsDragActive(false);
      return;
    }

    try {
      const data = await getValuesFromCertificate(certificate);
      addCertificate(data, setData);
      setIsDragMode(false);
    } catch (e) {
      alert('Сталася помилка при читанні файлу');
    } finally {
      setIsDragActive(false);
    }
  };

  return (
    <>
      {isDragMode &&
        (!isDragActive ? (
          <div
            className='info-wrapper wrapper dragmode'
            onDragStart={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
          >
            <div className='info-message'>
              <span>Перетягніть файл сертифіката у поле</span>
            </div>
          </div>
        ) : (
          <div
            className='info-wrapper wrapper'
            onDragStart={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
            onDrop={dropHandler}
          >
            <div className='info-message'>
              <span>Відпустіть файл</span>
            </div>
          </div>
        ))}

      {selectedCertificate && (
        <div className='info-wrapper wrapper'>
          {Object.entries(selectedCertificate).map(([key, value]) => (
            <p className='info-text' key={key}>
              {prepareKey(key)}: <span>{value}</span>
            </p>
          ))}
        </div>
      )}

      {!isDragMode && !selectedCertificate && (
        <div className='info-wrapper wrapper'>
          <div className='info-message'>
            <span>Виберіть сертифікат, щоб переглянути інформацію</span>
          </div>
        </div>
      )}
    </>
  );
};

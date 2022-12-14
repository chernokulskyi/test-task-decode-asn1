import React, { Dispatch, SetStateAction } from 'react';
import { CertificateData } from '../utils/data';
import cn from 'classnames';

interface Props {
  data: CertificateData[];
  selectedCertificate: CertificateData | null;
  setSelectedCertificate: Dispatch<SetStateAction<CertificateData | null>>;
  isDragMode: boolean;
  setIsDragMode: Dispatch<SetStateAction<boolean>>;
}

export const List: React.FC<Props> = ({
  data,
  selectedCertificate: selected,
  setSelectedCertificate,
  isDragMode,
  setIsDragMode,
}) => {
  const clickHandler = () => {
    setSelectedCertificate(null);
    setIsDragMode(!isDragMode);
  };

  return (
    <div className='list-wrapper wrapper'>
      <ul className='list'>
        {data.map((с) => (
          <li
            key={с.commonName}
            className={cn(
              'list-item',
              { active: с.commonName === selected?.commonName },
              { dragmode: isDragMode }
            )}
            onClick={() => !isDragMode && setSelectedCertificate(с)}
          >
            <span>{с.commonName}</span>
            <div className='arrow'></div>
          </li>
        ))}
      </ul>

      <button className='toggler' onClick={clickHandler}>
        {isDragMode ? 'Скасувати' : 'Додати'}
      </button>
    </div>
  );
};

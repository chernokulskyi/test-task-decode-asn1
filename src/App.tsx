import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import initialData, { CertificateData } from './utils/data';

import { List } from './components/List';
import { Info } from './components/Info';
import './styles/index.css';

export const App: React.FC = () => {
  const [data, setData] = useLocalStorage('data', initialData);
  const [isDragMode, setIsDragMode] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateData | null>(null);

  return (
    <div className='app'>
      <List
        data={data}
        selectedCertificate={selectedCertificate}
        setSelectedCertificate={setSelectedCertificate}
        isDragMode={isDragMode}
        setIsDragMode={setIsDragMode}
      />

      <Info
        setData={setData}
        selectedCertificate={selectedCertificate}
        isDragMode={isDragMode}
        setIsDragMode={setIsDragMode}
      />
    </div>
  );
};

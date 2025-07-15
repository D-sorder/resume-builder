import { useState, useEffect } from "react"
import Certificate from "./certificate";

function Certificates ({ onDelete, data, onUpdate }) {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (data) {
      setCertificates(data);
    }
  }, [data])

  const handleAddCertificate = () => {
    const newCert = { id: Date.now() }; 
    setCertificates(prev => {
      if (Array.isArray(prev)) {
        const newArray = [...prev, newCert]
        if (onUpdate) onUpdate(newArray)
        return newArray
      } else {
        const newArray = [newCert]
        if (onUpdate) onUpdate(newArray)
        return newArray
      }
    });
  };

  const handleRemoveCertificate = (id) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  const handleCertificateUpdate = (id, updatedData) => {
    setCertificates(prev => {
      const newCers = prev.map(cer =>
        cer.id === id ? { ...cer, data: updatedData } : cer
      );
      
      if (onUpdate) onUpdate(newCers);
      return newCers;
    });
  }

  return (
    <div className="section">
        <div className="section__header">
            <h3 className="section__title">Сертификаты</h3>
            <div className="section__buttons">
                <button className="section__remove" onClick={onDelete}>X</button>
            </div>
        </div>
        <div className="section__certificates">
            {(Array.isArray(certificates) && certificates.length > 0) ? certificates.map((cert) => (
                <Certificate
                    key={cert.id}
                    id={cert.id}
                    onRemove={() => {
                      handleRemoveCertificate(cert.id)
                      if (onUpdate) onUpdate(certificates.filter(e => e.id !== cert.id))
                    }}
                    data = {cert.data}
                    onUpdate = { (updatedCert) => handleCertificateUpdate(cert.id, updatedCert) }
                />
            )) : ''}
        </div>
        <button className="section__add" onClick={handleAddCertificate}>+ Добавить сертификат</button>
    </div>
  );
}

export default Certificates;
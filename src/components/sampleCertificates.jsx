import React from "react"

const CertificatesSample = React.forwardRef(({ data }, ref) => ( 

        <div className="sample__section" ref={ref}>
            <h2 className="sample__section-ttl">Сертификаты</h2>
            <div className="sample__subsections">
                {
                    (Array.isArray(data)) ? data.map((cert) => (
                        <div className="sample__subsection">
                            <h3 className="sample__subtitle">{
                                cert.data ? cert.data.name : ''    
                            }</h3>
                            {
                                cert.data?.year ? (
                                    <span className="sample__txt-line"><span>Год получения: </span>{cert.data.year}</span>
                                ) : ''
                            }
                            {
                                cert.data?.link ? (
                                    <span className="sample__txt-line"><span>Ссылка: </span>{cert.data.link}</span>
                                ) : ''
                            }
                        </div>
                    )) : ''
                }
            </div>
        </div>
));


export default CertificatesSample
import React from "react"

const EducationsSample = React.forwardRef(({ data }, ref) => (
        <div className="sample__section" ref={ref}>
            <h2 className="sample__section-ttl">Образование</h2>
            <div className="sample__subsections">
                {
                    (Array.isArray(data)) ? data.map((edu) => (
                        <div className="sample__subsection">
                            <h3 className="sample__subtitle">{
                                edu.data ? edu.data.name : ''
                            }</h3>
                            {
                                edu.data.faculty ? (
                                    <span className="sample__txt-line"><span>Факультет: </span>{edu.data.faculty}</span>
                                ) : ''
                            }
                            {
                                edu.data.spec ? (
                                    <span className="sample__txt-line"><span>Специализация: </span>{edu.data.spec}</span>
                                ) : ''
                            }
                            {
                                edu.data.year ? (
                                    <span className="sample__txt-line"><span>Год окончания: </span>{edu.data.year}</span>
                                ) : ''
                            }
                        </div>
                    )) : ''
                }
            </div>
        </div>
        
    ));

export default EducationsSample
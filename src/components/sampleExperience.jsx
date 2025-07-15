import React from "react"

const ExperienceSample = React.forwardRef(({ data }, ref) => (
    
        <div className="sample__section" ref={ref}>
            <h2 className="sample__section-ttl">Опыт работы</h2>
            <div className="sample__subsections">
                {
                    (Array.isArray(data)) ? data.map((exp) => (
                        <div className="sample__subsection">
                            <h3 className="sample__subtitle">{
                                exp.data ? exp.data.name : ''
                            }</h3>
                            <span className="sample__txt-line"><span>Период работы: </span>с {
                                exp && exp.data && exp.data.dateStart ? (
                                    exp.data.dateStart.split('-').reverse().join('.')
                                ) : '' 
                            } по {(exp.data.dateNow) ? 'настоящее время' : (
                                exp && exp.data && exp.data.dateEnd ? (
                                    exp.data.dateEnd.split('-').reverse().join('.')
                                ) : '' 
                            )}</span>
                            {
                                exp.data.city ? (
                                    <span className="sample__txt-line"><span>Город: </span>{exp.data.city}</span>
                                ) : ''
                            }
                            {
                                exp.data.activity ? (
                                    <span className="sample__txt-line"><span>Сфера деятельности: </span>{exp.data.activity}</span>
                                ) : ''
                            }
                            {
                                exp.data.link ? (
                                    <span className="sample__txt-line"><span>Сайт компании: </span>{exp.data.link}</span>
                                ) : ''
                            }
                            {
                                exp.data.post ? (
                                    <span className="sample__txt-line"><span>Должность: </span>{exp.data.post}</span>
                                ) : ''
                            }
                            {
                                exp.data.duty ? (
                                    <p className="sample__txt-block"><span>Обязанности: </span>{exp.data.duty}</p>
                                ) : ''
                            }
                            
                        </div>
                    )) : ''
                }
            </div>
        </div>
)) 

export default ExperienceSample
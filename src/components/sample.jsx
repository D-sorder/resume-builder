import React from "react";
import { useState, useRef, useEffect } from "react"
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf'

import ExperienceSample from "./sampleExperience";
import CertificatesSample from "./sampleCertificates";
import EducationsSample from "./sampleEducations";
import AboutSample from "./sampleAbout";
import SkillsSample from "./sampleSkills"

function Sample ({ sections, personal }) {

    const allSectionsRef = useRef(null);
    const sectionRefs = useRef([]);
    const [sectionHeights, setSectionHeights] = useState([]);
    const [pagesSections, setPagesSections] = useState([['test']]);
    const [measured, setMeasured] = useState(false);

    const maxPageHeight = 990

    if (sectionRefs.current.length !== sections.length) {
        sectionRefs.current = Array(sections.length)
            .fill()
            .map((_, i) => sectionRefs.current[i] || React.createRef());
    }

    useEffect(() => {
        if (sections.length === 0) return;

        const heights = sectionRefs.current.map((ref) => {
            if (ref.current) {
                return ref.current.offsetHeight;
            }
            return 0;
        });
        setSectionHeights(heights);
        setMeasured(true);
    }, [sections]);

    useEffect(() => {
        if (!measured || sectionHeights.length === 0) return;

        const pages = [];
        let currentPage = [];
        let currentHeightSum = 0;

        sections.forEach((section, index) => {
            const height = sectionHeights[index];

            if (currentHeightSum + height > maxPageHeight && currentPage.length > 0) {
                pages.push(currentPage);
                currentPage = [section];
                currentHeightSum = height;
            } else {
                currentPage.push(section);
                currentHeightSum += height;
            }
        });

        if (currentPage.length > 0) {
            pages.push(currentPage);
        }

        setPagesSections(pages);
    }, [measured, sectionHeights]);

    const handleDownloadPdf = async () => {
        const pages = document.querySelectorAll('.sample__paper')
        const pdf = new jsPDF('p', 'mm', 'a4')

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i]

            const canvas = await html2canvas(page, { scale: 2 });
            const imgData = canvas.toDataURL('image/png')


            if (i > 0) {
                pdf.addPage()
            }

            pdf.addImage(
                imgData,
                'PNG',
                0,
                0,
                210,
                297
            )
        }

        pdf.save('resume.pdf')
    }

    return (

        <div className="sample">

            <div className="unvisible" style={{ position: "absolute", visibility: "hidden", height: "auto", width:"200mm", overflow:"hidden" }}>
                <div className="sample__inner" ref={allSectionsRef}>
                    <div className="sample__core">
                        <h1 className="sample__fullname">{personal.fullname}</h1>
                        <h4 className="sample__position">{personal.position}</h4>
                    </div>
                    {sections.map((section, index) => {
                        const ref = sectionRefs.current[index];
                        switch (section.type) {
                            case 'experience':
                                return <ExperienceSample key={section.id} data={section.data} ref={ref} />;
                            case 'educations':
                                return <EducationsSample key={section.id} data={section.data} ref={ref} />;
                            case 'certificates':
                                return <CertificatesSample key={section.id} data={section.data} ref={ref} />;
                            case 'about':
                                return <AboutSample key={section.id} data={section.data} ref={ref} />;
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>

            <div className="sample__container">
                {pagesSections.map((pageSections, pageIndex) => (
                    
                    <div key={pageIndex} className="sample__paper" style={{ marginBottom: "20px" }}>
                        <div className="sample__inner">
                            <aside className="aside">
                                {pageIndex === 0 ? <div className="aside__inner">
                                    <div className="aside__image">
                                        <img src={personal.photo} alt="" />
                                    </div>
                                    <div className="aside__contacts">
                                        <span className="aside__txt-line">{personal.phone}</span>
                                        <span className="aside__txt-line">{personal.email}</span>
                                    </div>
                                    <div className="aside__block">
                                        <h5 className="aside__title">Желаемая зарплата:</h5>
                                        <span className="aside__txt-line">{personal.salary} &#8381;</span>
                                    </div>
                                    <div className="aside__block">
                                        <h5 className="aside__title">Желаемый график:</h5>
                                        <ul className="aside__list">{
                                            Array.isArray(personal.schedule) ? (
                                                personal.schedule.map((item) => {
                                                    return <li className="aside__list-itm">{item}</li>
                                                })
                                            ) : ('')
                                        }</ul>
                                    </div>
                                    <div className="aside__block">
                                        <h5 className="aside__title">Тип занятости:</h5>
                                        <ul className="aside__list">{
                                            Array.isArray(personal.type) ? (
                                                personal.type.map((item) => {
                                                    return <li className="aside__list-itm">{item}</li>
                                                })
                                            ) : ('')
                                        }</ul>
                                    </div>
                                    {
                                        sections.map(section => 
                                            section.type === 'skills' ? <SkillsSample key={section.id} data={section.data} /> : null
                                        )
                                    }
                                </div> : ''}
                                <div className="aside__stick"></div>
                            </aside>
                            <div className="sample__sections">
                                {(pageIndex === 0) ? <div>
                                    <div className="sample__core">
                                        <h1 className="sample__fullname">{personal.fullname}</h1>
                                        <h4 className="sample__position">{personal.position}</h4>
                                    </div>
                                    <div className="sample__section">
                                        <h2 className="sample__section-ttl">личная информация</h2>
                                        <span className="sample__txt-line"><span>Гражданство: </span>{personal.citizen}</span>
                                        <span className="sample__txt-line"><span>Дата рождения: </span>{
                                            personal.birth ? personal.birth.split("-").reverse().join('.') : ''
                                        }</span>
                                        <span className="sample__txt-line"><span>Пол: </span>{personal.gender}</span>
                                        <span className="sample__txt-line"><span>Семейное положение: </span>{personal.family}</span>
                                    </div>
                                </div> : ''}
                                {(sections.length > 0) ? pageSections.map((section) => {
                                    switch (section.type) {
                                        case 'experience':
                                            return <ExperienceSample key={section.id} data={section.data} />;
                                        case 'educations':
                                            return <EducationsSample key={section.id} data={section.data} />;
                                        case 'certificates':
                                            return <CertificatesSample key={section.id} data={section.data} />;
                                        case 'about':
                                            return <AboutSample key={section.id} data={section.data} />;
                                        default:
                                            return null;
                                    }
                                }) : ''}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="sample__2pdf" onClick={handleDownloadPdf}>Скачать как PDF</button>
        </div>
    )
}

export default Sample
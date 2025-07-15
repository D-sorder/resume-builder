import { useState, useEffect } from "react"

import Experience from "./sectionExperience";
import Educations from "./sectionEducations";
import Skills from "./sectionSkills";
import Certificates from "./sectionCertificates";
import About from "./sectionAbout";
import Personal from "./personal";

const sectionTypes = [
    { value: 'experience', label: 'Опыт' },
    { value: 'educations', label: 'Образование' },
    { value: 'skills', label: 'Навыки' },
    { value: 'certificates', label: 'Сертификаты' },
    { value: 'about', label: 'О себе' },
]

function EditPanel ({ sections, setSections, personal, setPersonal }) {

    const [draggedItemId, setDraggedItemId] = useState(null);
    const [disabledOptions, setDisabledOptions] = useState([]);

    const addSection = (type) => {
        const newSection = { id: Date.now(), type, data: {} }
        setSections(prev => [...prev, newSection]);
        setDisabledOptions(prev => [...prev, type]);
    }

    const updatePersonalData = (name, value) => {
        setPersonal(prev => ({ ...prev, [name]: value }))
    }

    const updateSectionData = (id, newData) => {
        setSections(prev => prev.map(sec => sec.id === id ? {...sec, data: newData} : sec));
    }

    const handleDeleteSection = (id) => {
        const secToDelete = sections.find(sec => sec.id === id)
        if (secToDelete) {
            setSections(prev => prev.filter(sec => sec.id !== id));
            setDisabledOptions(prev => prev.filter(opt => opt !== secToDelete.type))
        }  
    }
    
    const handleDragStart = (id) => {
        setDraggedItemId(id);
    }

    const handleSelecteChange = (e) => {
        const value = e.target.value;
        if (value) {
            addSection(value)
        }
    }

    const handleDrop = (dropTargetId) => {
        if (draggedItemId === null || draggedItemId === dropTargetId) return;

        setSections(prevSections => {
            const draggedIndex = prevSections.findIndex(sec => sec.id === draggedItemId);
            const dropIndex = prevSections.findIndex(sec => sec.id === dropTargetId);
            if (draggedIndex === -1 || dropIndex === -1) return prevSections;

            const newSections = [...prevSections];
            [newSections[draggedIndex], newSections[dropIndex]] = [newSections[dropIndex], newSections[draggedIndex]];
            return newSections.map(sec => ({...sec}));
        });
        setDraggedItemId(null);
    }


    return (
        <div className="sections">

            <div className="sections__box">
                <Personal onChange={updatePersonalData} data={personal}/>
                {sections.map((section) => {
                    let Component;
                    switch (section.type) {
                        case "experience": Component = Experience; break;
                        case "educations": Component = Educations; break;
                        case "skills": Component = Skills; break;
                        case "certificates": Component = Certificates; break;
                        case "about": Component = About; break;
                        default: return null;
                    }
                    return (
                        <div 
                            className="drag"
                            draggable
                            onDragStart={() => handleDragStart(section.id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(section.id)}
                        >
                            <Component 
                                data={section.data}
                                onUpdate={(newData) => {updateSectionData(section.id, newData)}} 
                                onDelete={() => handleDeleteSection(section.id)} />
                        </div>
                    )
                })}
            </div>
            <select value={''} name="sectionSelect" onChange={handleSelecteChange}>
                <option value="">--Добавить секцию--</option>
                {
                  sectionTypes.map(t => (
                    <option key={t.value} disabled={disabledOptions.includes(t.value)} value={t.value}>{t.label}</option>
                  ))  
                }
            </select>
        </div>
    )

}

export default EditPanel
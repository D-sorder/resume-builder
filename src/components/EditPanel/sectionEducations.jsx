import { useEffect, useState } from "react"
import Education from "./education";

function Educations ({ onDelete, data, onUpdate }) {

    const [educations, setEducations] = useState([]);

    useEffect(() => {
        if (data) {
            setEducations(data);
        }
    }, [data])

    const handleAddEducation = () => {
        const newEdu = { id: Date.now(), data: {} }; 
        setEducations(prev => {
            if (Array.isArray(prev)) {
                const newArray = [...prev, newEdu]
                if (onUpdate) onUpdate(newArray)
                return newArray
            } else {
                const newArray = [newEdu]
                if (onUpdate) onUpdate(newArray)
                return newArray
            }
        });
    };

    const handleRemoveEducation = (id) => {
        setEducations(prev => prev.filter(edu => edu.id !== id));
    };

    const handleEducationUpdate = (id, updatedData) => {
        setEducations(prev => {
            const newEdus = prev.map(edu =>
                edu.id === id ? { ...edu, data: updatedData } : edu
            );
            
            if (onUpdate) onUpdate(newEdus);
            return newEdus;
        });
    }

    return (
        <div className="section">
            <div className="section__header">
                <h3 className="section__title">Образование</h3>
                <div className="section__buttons">
                    <button className="section__remove" onClick={onDelete}>X</button>
                </div>
            </div>
            <div className="section__educations">
                {(Array.isArray(educations) && educations.length > 0) ? educations.map((edu) => (
                    <Education
                        key={edu.id}
                        id={edu.id}
                        data={edu.data}
                        onRemove={() => {
                            handleRemoveEducation(edu.id)
                            if (onUpdate) onUpdate(educations.filter(e => e.id !== edu.id))
                        }}
                        onUpdate = { (updatedData) => 
                            handleEducationUpdate(edu.id, updatedData) }
                    />
                )) : ''}
            </div>
            <button className="section__add" onClick={handleAddEducation}>+ Добавить образование</button>
        </div>
    )

}

export default Educations
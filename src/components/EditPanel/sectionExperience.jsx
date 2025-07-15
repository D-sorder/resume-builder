import { useState, useEffect } from "react"
import Experience from "./experience";

function Experiences ({ onDelete, data, onUpdate }) {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    if (data) {
      setExperiences(data);
    }
  }, [data])

  const handleAddExperience = () => {
    const newExp = { id: Date.now(), data: {} }; 
    setExperiences(prev => {
      if (Array.isArray(prev)) {
        const newArray = [...prev, newExp]
        if (onUpdate) onUpdate(newArray)
        return newArray
      } else {
        const newArray = [newExp]
        if (onUpdate) onUpdate(newArray)
        return newArray
      }
    });;
  };

  const handleRemoveExperience = (id) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleExperienceUpdate = (id, updatedData) => {
    setExperiences(prev => {
      const newExps = prev.map(exp =>
        exp.id === id ? { ...exp, data: updatedData } : exp
      );
      
      if (onUpdate) onUpdate(newExps);
      return newExps;
    });
  };

  return (
    <div className="section">
        <div className="section__header">
            <h3 className="section__title">Опыт работы</h3>
            <div className="section__buttons">
                <button className="section__remove" onClick={onDelete}>X</button>
            </div>
        </div>
        <div className="section__experiences">
            {(Array.isArray(experiences) && experiences.length > 0) ? experiences.map((exp) => (
                <Experience
                    key={exp.id}
                    id={exp.id}
                    onRemove={() => {
                      handleRemoveExperience(exp.id);
                      if (onUpdate) onUpdate(experiences.filter(e => e.id !== exp.id))
                    }}
                    data = {exp.data}
                    onUpdate = { (updatedExp) => handleExperienceUpdate(exp.id, updatedExp) }
                />
            )) : ''}
        </div>
        <button className="section__add" onClick={handleAddExperience}>+ Добавить опыт</button>
    </div>
  );
}

export default Experiences;
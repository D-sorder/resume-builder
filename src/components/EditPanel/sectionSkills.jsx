import { useEffect, useState } from "react"
import Skill from "./skill";

function Skills ({ onDelete, data, onUpdate }) {
  const [Skills, setSkills] = useState([]);

  useEffect(() => {
    if (data) {
      setSkills(data);
    }
  }, [data])

  const handleAddSkill = () => {
    const newSkill = { id: Date.now() }; 
    setSkills(prev => {
      if (Array.isArray(prev)) {
        const newArray = [...prev, newSkill]
        if (onUpdate) onUpdate(newArray)
        return newArray
      } else {
        const newArray = [newSkill]
        if (onUpdate) onUpdate(newArray)
        return newArray
      }
    });
  };

  const handleRemoveSkill = (id) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };

  const handleSkillUpdate = (id, updatedData) => {
    setSkills(prev => {
      const newSkills = prev.map(skill =>
        skill.id === id ? { ...skill, data: updatedData } : skill
      );
      
      if (onUpdate) onUpdate(newSkills);
      return newSkills;
    });
  }

  return (
    <div className="section">
        <div className="section__header">
            <h3 className="section__title">Навыки</h3>
            <div className="section__buttons">
                <button className="section__remove" onClick={onDelete}>X</button>
            </div>
        </div>
        <div className="section__Skills">
            {(Array.isArray(Skills) && Skills.length > 0) ? Skills.map((skill) => (
                <Skill
                    key={skill.id}
                    id={skill.id}
                    onRemove={() => {
                      handleRemoveSkill(skill.id)
                      if (onUpdate) onUpdate(Skills.filter(e => e.id !== skill.id))
                    }}
                    data = {skill.data}
                    onUpdate = { (updatedSkill) => handleSkillUpdate(skill.id, updatedSkill) }
                />
            )) : ''}
        </div>
        <button className="section__add" onClick={handleAddSkill}>+ Добавить навык</button>
    </div>
  );
}

export default Skills;
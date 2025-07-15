import { useState } from "react";

function About ({ onDelete, data, onUpdate }) {
    const [localData, setLocalData] = useState(data || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const updatedData = { ...localData, [name]: value }
        setLocalData(updatedData);
        onUpdate(updatedData);
    }

    return (
        <div className="section">
            <div className="section">
                <div className="section__header">
                    <h3 className="section__title">О себе</h3>
                    <div className="section__buttons">
                        <button className="section__remove" onClick={onDelete}>X</button>
                    </div>
                </div>
                <div className="section__fields">
                    <textarea name="about" value={localData.about || ''} placeholder="О себе" className="section__text-area" onChange={handleInputChange}></textarea>
                </div>
            </div>
        </div>
    )

}

export default About
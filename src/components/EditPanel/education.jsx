import { useState } from "react";

function Education ({ onRemove, id, data = {}, onUpdate }) {
    const [title, setTitle] = useState("Образование");
    const [localData, setLocalData] = useState(data || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const updatedData = { ...localData, [name]: value }
        setLocalData(updatedData);
        if (onUpdate) onUpdate(updatedData);
    }

    return (
        <div className="education">
            <div className="education__header">
                <h5 className="education__title">{title}</h5>
                <button className="education__remove" onClick={onRemove}>X</button>
            </div>
            <div className="education__fields">
                <div className="education__box">
                    <input type="text" value={localData.name || ''} name="name" placeholder="Название учебного заведения" className="education__name" onChange={(e) => {setTitle(e.target.value); handleInputChange(e)}} />
                    <input type="text" value={localData.faculty || ''} name="faculty" placeholder="Факультет" className="education__faculty" onChange={handleInputChange} />
                    <input type="text" value={localData.spec || ''} name="spec" placeholder="Специализация" className="education__spec" onChange={handleInputChange} />
                </div>
                <div className="education__row">
                    <input type="text" value={localData.year || ''} name="year" placeholder="Год окончания" className="education__year" onChange={handleInputChange} />
                    <p className="education__info">Если ещё учитесь, укажите год предполагаемого окончания</p>
                </div>
            </div>
        </div>
    )
}

export default Education
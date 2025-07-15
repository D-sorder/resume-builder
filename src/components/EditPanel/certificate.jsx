import { useState } from "react"

function Certificate ({ onRemove, data, onUpdate }) {
    const [title, setTitle] = useState("Сертификат");
    const [localData, setLocalData] = useState(data || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        const updatedData = { ...localData, [name]: value }
        setLocalData(updatedData);
        onUpdate(updatedData);
    }

    return (
        <div className="certificate">
            <div className="certificate__header">
                <h5 className="certificate__title">{title}</h5>
                <button className="certificate__remove" onClick={onRemove}>X</button>
            </div>
            <div className="certificate__fields">
                <div className="certificate__row">
                    <input type="text" value={localData.name || ''} name="name" placeholder="Название" className="certificate__name" onChange={(e) => {setTitle(e.target.value); handleInputChange(e)}} />
                    <input type="text" value={localData.year || ''} name="year" placeholder="Год получения" className="certificate__year" onChange={handleInputChange} />
                </div>
                <input type="text" value={localData.link || ''} name="link" placeholder="Ссылка, если есть" className="certificate__link" onChange={handleInputChange} />
            </div>
        </div>
    )

}

export default Certificate
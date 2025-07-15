import { useState } from "react"

function Experience ({ onRemove, id, data, onUpdate }) {
    const [title, setTitle] = useState("Опыт");
    const [localData, setLocalData] = useState(data || {});

    const handleCheck = () => {
        const check = document.getElementById('check'+id);
        const elem = document.querySelector('.check'+id);
        if (check.checked) {
            elem.classList.add('none')
        } else {
            elem.classList.remove('none')
        }
    }

    const handleInputChange = (e) => {
        const { name, type, value, checked } = e.target;

        const newValue = type === 'checkbox' ? checked : value

        const updatedData = { ...localData, [name]: newValue }
        setLocalData(updatedData);
        onUpdate(updatedData);
    }

    return (
        <div className="experience">
            <div className="experience__header">
                <h5 className="experience__title">{title}</h5>
                <button className="experience__remove" onClick={onRemove}>X</button>
            </div>
            <div className="experience__fields">
                <div className="experience__box">
                    <input type="text" name="name" value={localData.name || ''} placeholder="Название компании" className="experience__name" onChange={(e) => {setTitle(e.target.value); handleInputChange(e)}} />
                    <input type="text" name="city" value={localData.city || ''} placeholder="Город" className="experience__city" onChange={handleInputChange} />
                </div>
                <div className="experience__box">
                    <input type="text" name="link" value={localData.link || ''} placeholder="Сайт компании" className="experience__link" onChange={handleInputChange} />
                    <input type="text" name="activity" value={localData.activity || ''} placeholder="Сфера деятельности" className="experience__activity" onChange={handleInputChange} />
                </div>
                <input type="text" name="post" value={localData.post || ''} placeholder="Должность" className="experience__post" onChange={handleInputChange} />
                <div className="experience__date-box">
                    <div className="experience__box date">
                        <label For="start" className="experience__date-label">Начало работы:</label>
                        <input type="date" value={localData.dateStart || ''} name="dateStart" id="start" className="experience__date" onChange={handleInputChange} />
                    </div>
                    <div className={`experience__box ${'check'+id} date`}>
                        <label For="end" className="experience__date-label">Окончание:</label>
                        <input type="date" value={localData.dateEnd || ''} name="dateEnd" id="end" className="experience__date" onChange={handleInputChange} />
                    </div>
                    <label className="experience__check">
                        <input type="checkbox" checked={localData.dateNow || false} className="experience__checkbox" id={'check' + id} name="dateNow" onChange={(e) => {handleCheck(); handleInputChange(e)}} />
                        Работаю сейчас
                    </label>
                </div>
                <textarea name="duty" value={localData.duty || ''} placeholder="Расскажите о ваших обязанностях" className="experience__text-area" onChange={handleInputChange}></textarea>
            </div>
        </div>
    )

}

export default Experience
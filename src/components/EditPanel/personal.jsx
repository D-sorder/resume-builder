import { useEffect, useState } from "react"

function Personal ({ onChange, data }) {
    const [image, setImage] = useState(data.photo);
    const [schedles, setSchedules] = useState([]);
    const [types, setTypes] = useState([])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result)
                onChange('photo', reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        if (Array.isArray(data.schedule)) {
            setSchedules(data.schedule)
        }
        if (Array.isArray(data.type)) {
            setTypes(data.type);
        }
    }, [data])

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target

        if (name === 'schedule') {
            if (checked) {
                setSchedules(prev => {
                    const newArr = [...prev, value];
                    onChange('schedule', newArr);
                    return newArr;
                })
            } else {
                setSchedules(prev => {
                    const newArr = prev.filter(v => v !== value)
                    onChange('schedule', newArr)
                    return newArr
                })
            }
        } else if(name === 'type') {
            if(checked) {
                setTypes(prev => {
                    const newArr = [...prev, value];
                    onChange('type', newArr);
                    return newArr;
                })
            } else {
                setTypes(prev => {
                    const newArr = prev.filter(v => v !== value)
                    onChange('type', newArr)
                    return newArr
                })
            }
        } else {
            onChange(name, value)
        }

        
    }

    return (

            <div className="section personal">
                <div className="section__header">
                    <h3 className="section__title">Личная информация</h3>
                </div>
                <div className="section__fields">
                    <div className="section__line">
                        <input type="text" name="fullname" value={data.fullname || ''} placeholder="ФИО" className="section__input-line" onChange={handleInputChange} />
                    </div>
                    <label htmlFor="img" className="section__choose-img">
                        Ваше фото:
                        <input type="file" name="photo" id="img" accept="image/*" className="section__image" onChange={handleImageChange} />
                    </label>
                    <div className="section__box">
                        <input type="text" name="phone" value={data.phone || ''} placeholder="Номер телефона" className="section__input" onChange={handleInputChange} />
                        <input type="text" name="email" value={data.email || ''} placeholder="Электронная почта" className="section__input" onChange={handleInputChange} />
                    </div>
                    <div className="section__box">
                        <input type="text" name="position" value={data.position || ''} placeholder="Должность" className="section__input" onChange={handleInputChange} />
                        <input type="text" name="salary" value={data.salary || ''} placeholder="Желаемая зарплата" className="section__input" onChange={handleInputChange} />
                    </div>
                    <div className="section__check-colls" >
                        <div className="section__coll">
                            <h5 className="section__coll-title">График:</h5>
                            <label className="section__check-label">
                                <input type="checkbox" name="schedule" checked={schedles.includes("полный день")} value="полный день" className="section__check" onChange={handleInputChange} />
                                Полный день
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="schedule" checked={schedles.includes("сменный график")} value="сменный график" className="section__check" onChange={handleInputChange} />
                                Сменный график
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="schedule" checked={schedles.includes("гибкий график")} value="гибкий график" className="section__check" onChange={handleInputChange} />
                                Гибкий график
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="schedule" checked={schedles.includes("удаленная работа")} value="удаленная работа" className="section__check" onChange={handleInputChange} />
                                Удаленная работа
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="schedule" checked={schedles.includes("вахтовый метод")} value="вахтовый метод" className="section__check" onChange={handleInputChange} />
                                Вахтовый метод
                            </label>
                        </div>
                        <div className="section__coll">
                            <h5 className="section__coll-title">Тип занятости:</h5>
                            <label className="section__check-label">
                                <input type="checkbox" name="type" checked={types.includes("полная занятость")} value="полная занятость" className="section__check" onChange={handleInputChange} />
                                Полная занятость
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="type" checked={types.includes("частичная занятость")} value="частичная занятость" className="section__check" onChange={handleInputChange} />
                                Частичная занятость
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="type" checked={types.includes("проектная занятость")} value="проектная занятость" className="section__check" onChange={handleInputChange} />
                                Проектная занятость
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="type" checked={types.includes("волонтерство")} value="волонтерство" className="section__check" onChange={handleInputChange} />
                                Волонтерство
                            </label>
                            <label className="section__check-label">
                                <input type="checkbox" name="type" checked={types.includes("стажировка")} value="стажировка" className="section__check" onChange={handleInputChange} />
                                Стажировка
                            </label>
                        </div>
                    </div>
                    <div className="section__box three">
                        <input type="text" name="citizen" value={data.citizen || ''} placeholder="Гражданство" className="section__input" onChange={handleInputChange} />
                        <input type="text" name="city" value={data.city || ''} placeholder="Город проживания" className="section__input" onChange={handleInputChange} />
                    </div>
                    <input type="date" name="birth" value={data.birth || ''} className="section__date" onChange={handleInputChange} />

                    <div className="section__box gender">
                        <h5 className="section__title">Пол:</h5>
                        <div className="section__radio-box">
                            <label className="section__radio-label">
                                <input type="radio" name="gender" checked={data.gender === "мужской"} value="мужской" className="section__radio" onChange={handleInputChange} />
                                М
                            </label>
                            <label className="section__radio-label">
                                <input type="radio" name="gender" checked={data.gender === "женский"} value="женский" className="section__radio" onChange={handleInputChange} />
                                Ж
                            </label>
                        </div>
                    </div>
                    <input type="text" name="family" value={data.family || ''} placeholder="Семейное положение" className="section__input" onChange={handleInputChange} />
                </div>
            </div>
    )

}

export default Personal
import StarRating from "./stars"
import { useState } from "react"

function Skill ({ onRemove, data, onUpdate }) {
    const [localData, setLocalData] = useState(data || {})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...localData, [name]: value }
        setLocalData(updatedData);
        onUpdate(updatedData);
    }

    const handleStarChange = (e) => {
        const updatedData = { ...localData, stars: e }
        setLocalData(updatedData)
        onUpdate(updatedData)
    }

    return (
        <div className="skill">

            <input type="text" name="name" value={localData.name || ''} className="skill__name" onChange={ handleInputChange } />
            <div className="skill__star-box">
                <StarRating onChange={handleStarChange} savedValue={localData.stars || 0} />
            </div>
            <button className="skill__remove" onClick={onRemove}>X</button>

        </div>
    )

}

export default Skill
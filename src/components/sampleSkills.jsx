function SkillsSample ({ data }) {
    return (
        <div className="aside__skills">
            <h5 className="aside__title">Навыки:</h5>
            <div className="aside__skill-box">
                {
                    (Array.isArray(data)) ? data.map((skill) => (
                        <div className="aside__skill">
                            {
                                skill.data ? skill.data.name : ''
                            }
                            <div className="aside__stars">
                                {
                                    Array.from({ length: skill.data?.stars }).map(() => (
                                        <div className="aside__star active"></div>
                                    ))
                                }
                                {
                                    Array.from({ length: 5 - skill.data?.stars }).map(() => (
                                        <div className="aside__star"></div>
                                    ))
                                }
                            </div>
                        </div>
                    )) : ''
                }
            </div>
        </div>
    )
}

export default SkillsSample
import React from "react"

const AboutSample = React.forwardRef(({ data }, ref) => (

        <div className="sample__section" ref={ref}>
            <h2 className="sample__section-ttl">О себе</h2>
            <p className="sample__text-box">
                {
                  data.about
                }
            </p>
        </div>

)) 

export default AboutSample
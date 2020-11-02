import React from 'react'

const About = () => {
    return (
        <div>
            <h1>About this App</h1>
            <p className="my-1">
                This is a full-stack React app developed with the MERN Stack by Gustavo Velazquez C. 
            </p>
            <p className="bg-dark p">
                <strong>Version: </strong> 1.0.0 <br/>
                <strong>LinkedIn: </strong> <a href="https://www.linkedin.com/in/gustavo-velazquez-calderon" target="_blank"> Gustavo Velazquez Calderon</a><br/>
                <strong>Twitter: </strong> <a href="https://twitter.com/_hellogus" target="_blank">_hellogus</a><br/>
                <strong>Github: </strong><a href="https://github.com/gus616" target="_blank">gus616</a>
            </p>
        </div>
    )
}

export default About

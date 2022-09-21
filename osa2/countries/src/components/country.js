import Weather from "./weather";

const Country = ({name,capital,area,languages,flag}) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>

            <h2>languages</h2>
            <ul>
                {languages.map(language =>
                <li key={language}>{language}</li>
                )}
            </ul>
            <br>
            </br>
            <img src={flag} alt="flag"/>
            <Weather capital={capital}/>
        </div>
    )
}

export default Country;
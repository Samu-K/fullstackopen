import React, { useState } from "react";
import Country from "./country";
import CountryList from "./countlist"

const Countries = ({countries,currentFilter}) => {
    const [showCountry, setShowCountry] = useState()

    const show = event => {
        const cont = countries.filter(country =>
            country.name.common.includes(event.target.value))

    setShowCountry(cont[0])
    }

    const countriesToShow = countries.filter(country => 
        country.name.common.toLowerCase().includes(currentFilter.toLowerCase())
    )

    if (countriesToShow.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }

    if (showCountry !== undefined) {
        return (
            <Country
                key={showCountry.name.common}
                name={showCountry.name.common}
                capital={showCountry.capital}
                area={showCountry.area}
                languages={Object.values(showCountry.languages)}
                flag={showCountry.flag}
            />
        )
    }

    if (countriesToShow.length > 1) {
        return (
            <ul>
                {countries.filter(country => 
                    country.name.common.toLowerCase().includes(currentFilter.toLowerCase())
                )
                .map(country => (
                    <CountryList
                        key={country.name.common}
                        name={country.name.common}
                        country={country}
                        show={show}
                    />
                ))
                }
            </ul>
        )
    }

    return (
        <ul>
            {countries
            .filter(country=> country.name.common.toLowerCase().includes(currentFilter.toLowerCase()))
            .map(country => 
                <Country 
                    key={country.name.common}
                    name={country.name.common}
                    capital={country.capital}
                    area={country.area}
                    languages={Object.values(country.languages)}
                    flag={country.flags.png}
                />
            )
        }
        </ul>    
    )
}

export default Countries;
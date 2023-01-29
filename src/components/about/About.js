import React from 'react'
import './About.css'
import { SiFastapi } from 'react-icons/si';
import { BsSmartwatch } from 'react-icons/bs';
import { BiMoviePlay } from 'react-icons/bi';
import { FaInternetExplorer } from 'react-icons/fa';
import AboutCard from './AboutCard';

const About = () => {
    return (
        <div className='about'>
            <div className="container">
                <h2>Geriausia 5G tiekeja Lietuvoje</h2>
                <p>Neradote atsakymo į iškilusius klausimus? Parašykite mums. Atsakysime jums el. paštu</p>
                <div className="card-container">
                    <div className="card">
                        <AboutCard icon={<SiFastapi className='icon' />} heading='Naujausiu iPhone nuoma' text='Tai paprasta ir lengva! Išsirinkiteįrenginį! Atvykite į mūsų saloną ir mes pasirūpinsime formalumais! Pasirašykite nuomos susitarimą ir gaukite įrenginį' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<BsSmartwatch className='icon' />} heading='"Apple Watch" su eSIM jau biteje!' text='Jūsų laikrodis – jūsų telefonas. Naudodamiesi „Apple Watch“ su eSIM:' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<BiMoviePlay className='icon' />} heading='Dovana - filmu festivalis' text='Jau naudojatės „Go3|BITĖ“? Filmų festivalis jums jau aktyvuotas, tiesiog junkitės į savo „Go3|BITĖ“ paskyrą ir žiūrėkite! Prisijungti' />
                    </div>
                    <div className="card">
                        <AboutCard icon={<FaInternetExplorer className='icon' />} heading='Nuolaidos bites interneto planams' text='Naujiena BITĖJE! 5G namų internetas Rinkitės greičiausią ir stabiliausią BITĖS namų internetą.' />
                    </div>
                </div>
                <a href="/" className="btn">Register/Login</a>
            </div>
        </div>
    )
}

export default About
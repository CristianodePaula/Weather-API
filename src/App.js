import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import background from './video/background.mp4'

const Container = styled.div` 
    height: 100vh;
`
const Video = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit:cover;
    object-fit: cover;
`
const Box = styled.div`
    background-image: linear-gradient(to bottom, grey, white);    
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    text-align: center;
    border: 1px solid black;
    border-radius: 10px;  
    padding: 30px;
    box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);  
`
const H1 = styled.h1`
    font-size: 25px;
    @media(max-width: 600px) { font-size: 20px } }
`
const WealtherContainer = styled.div``

const Search = styled.input`
    width: 200px;
    height: 25px;
    border: 1px solid darkred;
    border-radius: 5px;
`
const City = styled.div`
    margin: 15px;
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    color: darkred;
    sup { 
        padding: 0.2em 0.6em;
        margin-left: 0.2em;
        border-radius: 30px;
        color: #fff;
        background: #ff8c00;
    }
    @media(max-width: 600px) { font-size: 15px } }
`
const Temp = styled.div`
    font-weight: 600;
    padding: 10px;
    font-size: 60px;
    color: white;
    @media(max-width: 600px) { font-size: 50px } }
`
const Img = styled.div`
    text-transform: capitalize;
    font-weight: 600;
    color: darkred;
`
const Icon = styled.img`
    height: 100px;
    widht: 100px;
    margin: -40px 0 -20px 0;
    @media(max-width: 600px) { height: 80px; width: 80px; margin-top: -20px} }
`
const Info = styled.div`
    hr { width: 220px }
`
const H2 = styled.div`
    font-size: 20px;
    font-weight: 600;
    @media(max-width: 600px) { font-size: 16px } }
`
const P = styled.div`
    font-size: 15px;
    margin: 10px;
    @media(max-width: 600px) { font-size: 12px } }
`
const App = () => {

    const [inquiry, setInquiry] = useState('')
    const [weather, setWeather] = useState({})

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await searchWeather(inquiry)
            setWeather(data)
            setInquiry('')
        }
    }

    const API_KEY = '1df3d1228c1b47998ec8a6b9eb1e1536'

    const searchWeather = async (query) => {
        const { data } = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
            params: {
                APPID: API_KEY,
                q: query,
                units: 'metric',
                lang: 'pt',
            }
        })
        return data;
    }

    return (
        <Container>
            <Video autoPlay loop muted src={background}></Video>
            <Box>
                <H1>PREVISÃO DO TEMPO</H1>
                <Search type="text" placeholder="Procurar" value={inquiry} onKeyPress={search} onChange={(e) => setInquiry(e.target.value)} />
                {weather.main && (
                    <WealtherContainer>
                        <City>
                            {weather.name}
                            <sup>{weather.sys.country}</sup>
                        </City>
                        <Temp>
                            {Math.round(weather.main.temp)}
                            <sup>&deg;C</sup>
                        </Temp>
                        <Img>
                            <Icon src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                            <p>{weather.weather[0].description}</p>
                        </Img>
                        <Info>
                            <hr />
                            <H2>Informações Adicionais</H2>
                            <P>Temperatura máxima: {weather.main.temp_max}°</P>
                            <P>Temperatura mínima: {weather.main.temp_min}°</P>
                            <P> Unidade do ar: {weather.main.humidity}°</P>
                            <P>Pressão atmosférica: {weather.main.pressure}hPa</P>
                        </Info>
                    </WealtherContainer>
                )}
            </Box>
        </Container>
    )
}
export default App
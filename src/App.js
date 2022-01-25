import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './Components/Header/Header'
import List from './Components/List/List'
import Map from './Components/Map/Map'

import { getPlaceData } from './api/index'

const App = () => {
    const [places, setPlaces] = useState([])
    const [filteredPlaces, setFilterPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restraurants');
    const [rating, setRating] = useState('')

    useEffect(() => {
        const filteredPlace = places.filter((place) => place.rating > rating)
        setFilterPlaces(filteredPlace)
    }, [rating])


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        setIsLoading(true)
        getPlaceData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
                setFilterPlaces([]);
                setRating('');
                setIsLoading(false);
            });
    }, [bounds, type])
return (
    <>
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{ width: '100%' }}>
            <Grid xs={12} md={4}>
                <List
                    places={filteredPlaces.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                />
            </Grid>
            <Grid xs={12} md={8}>
                <Map
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                    places={filteredPlaces.length ? filteredPlaces : places}
                    setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
    </>
)
};

export default App;
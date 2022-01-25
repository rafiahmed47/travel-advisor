import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails'

import useStyles from './styles';
const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles()
    console.log({places})
    return (
        <div className={classes.container}>
            <Typography variant="h4">Restaurants, Hotels & Attraction around you</Typography>
            {
                isLoading ? (
                    <div className={classes.loading}>
                        <CircularProgress size='5rem' />
                    </div>
                ) : (
                    <>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Type</InputLabel>
                            <Select value={type} onChange={(e) => setType(e.target.value)}>
                                <MenuItem value='restraurants'>Restraurants</MenuItem>
                                <MenuItem value='hotels'>Hotels</MenuItem>
                                <MenuItem value='attraction'>Attraction</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Ratings</InputLabel>
                            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                                <MenuItem value={0}>All</MenuItem>
                                <MenuItem value={3}>Above 3.0</MenuItem>
                                <MenuItem value={4}>Above 4.0</MenuItem>
                                <MenuItem value={4.5}>Above 4.5</MenuItem>
                            </Select>
                        </FormControl>
                       {!places ? 
                           <h1>there is no places in your region</h1>
                       : 
                           <Grid container spacing={3} className={classes.list}>
                            {
                                places?.map((place, i) => (
                                    <Grid item key={i} xs={12}>
                                        <PlaceDetails
                                            place={place}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>}
                    </>
                )}
        </div>
    );
};

export default List;
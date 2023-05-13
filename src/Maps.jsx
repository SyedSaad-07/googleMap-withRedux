import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

import { connect } from 'react-redux'

const Maps = (props) => {
  const [center, setCenter] = useState({ lat: 24.8607, lng: 67.0011 })
  const [address, setAddress] = useState('')
  const [map, setMap] = useState(null)

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value)
    const ll = await getLatLng(result[0])
    setCenter(ll)
    setAddress(value)
  }

  const handleLoad = (autocomplete) => {
    setMap(autocomplete)
  }

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  }

  useEffect(() => {
  }, [center])

  const handleSave = () => {
    props.userLocation(address)
  }

  return (
    <>
      <div className="flexClass">
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                className="inputField"
                {...getInputProps({
                  placeholder: 'Search Location',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <li key={index}>{suggestion.description}</li>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

         {/*Button to show User Address onClick which is saved in Redux Store  */}
        <button className="button" onClick={handleSave}>
          Save your Address
        </button>
      </div>

      {/* Simple Text to show the address - not necessary to show but to demonstrate that the redux store is implemented and the value is updating */}
      <h2 className="text">Current Address: {props.location}</h2>

      {/* Google Map */}

      <div className="map">
        <GoogleMap
          className="gmap"
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onLoad={handleLoad}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  location: state.location,
})

const mapDispatchToProps = (dispatch) => ({
  userLocation: (location) =>
    dispatch({ type: 'UPDATE_LOCATION', payload: location }),
})
export default connect(mapStateToProps, mapDispatchToProps) (Maps)
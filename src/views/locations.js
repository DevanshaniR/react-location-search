import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import strings from "../localization/locations";
import AddressDetails from "../Components/AddressDetails";
import Header from "../Components/Header";
import FuncUtils from "../Config/FuncUtils";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import customStyles from "../styles/customStyles";

function LocationsView() {
  const classes = customStyles();
  const [selected_address_item, setSelectedAddress] = useState("");

  const locations = useSelector((state) => state.Locations);

  const { address_data = [], geo_codes = {} } = locations;
  console.log(geo_codes, "hhhhhhhhhhhhhhhhhhhhh");

  const dispatch = useDispatch();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className={classes.App}>
      <Header header={strings.header} />
      <AddressDetails
        onChangeAddressSearch={(e, x) => onChangeAddressSearch(e, x)}
        onInputChangeAddressDropDown={onInputChangeAddressDropDown}
        addressSearchData={address_data}
        selected_address_item={selected_address_item}
      />
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName={classes.mapContainer}
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: geo_codes[1], lng: geo_codes[0] }} />
        </GoogleMap>
      )}
    </div>
  );

  function onChangeAddressSearch(event, values) {
    console.log("onChangeAddressSearch", event);
    if (!FuncUtils.isNullOrUndefined(event)) {
      let selected_item = _.find(address_data, { id: event.id });
      console.log(
        "onChangeAddressSearch :: selected_address_item::",
        selected_item
      );
      setSelectedAddress(selected_item);
    }
  }
  function onInputChangeAddressDropDown(event, values) {
    console.log("onInputChangeAddressDropDown", event, values);
    if (!FuncUtils.isNullOrUndefined(values) && values.length > 3) {
      dispatch(actions.locationsGetAddressDetails(values));
    } else {
      dispatch(actions.locationsSetAddressData([]));
    }
  }
}

export default LocationsView;

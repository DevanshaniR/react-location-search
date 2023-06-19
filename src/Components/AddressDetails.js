import React from "react";
import { TextField } from "@material-ui/core";
import AutoComplete from "@material-ui/lab/Autocomplete";
import strings from "../localization/locations";
import customStyles from "../styles/customStyles";

function AddressDetails(props) {
  const classes = customStyles();

  const { addressSearchData = [] } = props;
  console.log("AddressDetails :: addressSearchData", addressSearchData);

  return (
    <div className={classes.addressSearchContainer}>
      <AutoComplete
        freeSolo
        options={addressSearchData}
        getOptionLabel={(option) => option.address_comma_separated}
        id="address-select"
        onChange={(event, value) => props.onChangeAddressSearch(value)}
        onInputChange={props.onInputChangeAddressDropDown}
        renderInput={(params) => (
          <TextField
            fullWidth
            multiline
            {...params}
            label={strings.address_search_text}
          />
        )}
      />
    </div>
  );
}
export default AddressDetails;

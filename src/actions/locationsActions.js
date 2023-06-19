import FuncUtils from "../Config/FuncUtils";
import _ from "lodash";
import validateFunctions from "../Functions/commonFunctions";
import ApiRequestUtils from "../utils/ApiRequestUtils";
import { ADDRESS_DATA_API, getApiUrl } from "../utils/config";

/**
 * This function is use to get address details from API based on search text
 *
 */
export const getAddressDetails = (search_text) => {
  let url = getApiUrl(search_text, ADDRESS_DATA_API);
  return (dispatch) => {
    try {
      const successCb = function (response) {
        console.log("Redux :: getAddressDetails :: successCb ", response);
        if (response) {
          console.log("Redux :: getAddressDetails - SUCCESS", response);
          if (!FuncUtils.isNullOrUndefined(response)) {
            const { features = [] } = response;
            let address_array = [];
            let i = 0;
            _.forEach(features, function (feature_item) {
              console.log("getAddressDetails :: value", feature_item);
              let address_obj =
                validateFunctions.formatAddressDetails(feature_item);
              address_array.push(address_obj);
              i++;
              if (i > 5) {
                return false;
              }
            });
            dispatch(SetGeoCodes(features[0].geometry.coordinates));
            dispatch(setAddressData(address_array));
          }
        } else {
          console.log("Redux :: getAddressDetails - FAIL");
        }
      };
      const failureCb = function (response) {
        console.log("Redux :: getAddressDetails :: failureCb ", response);
      };
      ApiRequestUtils.apiGet(url, successCb, failureCb);
    } catch (e) {
      console.log("Redux :: getAddressDetails :: EXCEPTION ", e);
    }
  };
};

/**
 * This function is use to set address data to the address fields
 *
 */
export const setAddressData = (data) => {
  return (dispatch) => {
    if (!FuncUtils.isNullOrUndefined(data)) {
      console.log("setAddressData ::", data);
      dispatch({ type: "SET_ADDRESS_DATA", payLoad: data });
    }
  };
};

export const SetGeoCodes = (data) => {
  return (dispatch) => {
    if (!FuncUtils.isNullOrUndefined(data)) {
      console.log("SetGeoCodes ::", data);
      dispatch({ type: "SET_GEO_CODES", payLoad: data });
    }
  };
};

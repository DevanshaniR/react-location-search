const INITIAL_STATE = {
  country_data: [],
  address_data: [],
};
const Locations = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ADDRESS_DATA":
      return {
        ...state,
        address_data: action.payLoad,
      };
    case "SET_GEO_CODES":
      return {
        ...state,
        geo_codes: action.payLoad,
      };

    default:
      return state;
  }
};

export default Locations;

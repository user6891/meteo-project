const SET_SEARCH_ERROR = 'SET_SEARCH_ERROR';
const SET_INITIALIZE_APP = 'SET_INITIALIZE_APP';
const SET_FOCUS_TAB = 'SET_FOCUS_TAB';
const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
const SET_TAB_DEFAULT = 'SET_TAB_DEFAULT';

const initialState = {
  searchError: false,
  initializeApp: false,
  focusTab: 1,
  selectedTab: 0,
};

export const appStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_ERROR:
      return { ...state, searchError: action.payload };
    case SET_INITIALIZE_APP:
      return { ...state, initializeApp: true };
    case SET_FOCUS_TAB:
      return { ...state, focusTab: action.payload };
    case SET_SELECTED_TAB:
      return { ...state, selectedTab: action.payload };
    case SET_TAB_DEFAULT:
      return { ...state, selectedTab: 0, focusTab: 1 };

    default:
      return state;
  }
};

export const setSearchErrorAC = (payload) => ({ type: SET_SEARCH_ERROR, payload });
export const setInitializeAppAC = () => ({ type: SET_INITIALIZE_APP });
export const setFocusTabAC = (payload) => ({ type: SET_FOCUS_TAB, payload });
export const setSelectedTabAC = (payload) => ({ type: SET_SELECTED_TAB, payload });
export const setTabDefault = () => ({ type: SET_TAB_DEFAULT });

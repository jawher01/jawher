//import constants
import {
    GET_PUBLICATIONS_FAILED,
    GET_PUBLICATIONS_SUCCESS,
    GET_PUBLICATIONS_LOAD,
    GET_PUBLICATION,
    EDIT_PUBLICATION
} from "../const/publication"
//initial state
const initialeState = {
    publication: [],
    loadPublications: false,
    errors: null,
    user: [],
    editPublication: ""
};


export const publicationReducer = (state = initialeState, { type, payload }) => {
    switch (type) {
        case GET_PUBLICATIONS_LOAD:
            return { ...state, loadPublications: true };
        case GET_PUBLICATIONS_SUCCESS:
            return { ...state, publication: payload, loadPublications: false };
        case GET_PUBLICATIONS_FAILED:
            return { ...state, loadPublications: false, error: payload };
        case GET_PUBLICATION:
            return { ...state, user: payload };
        case EDIT_PUBLICATION:            
            return {
                ...state,
                publication:
                    state
                        .publication
                        .map(p => p._id != payload._id ? p : {...p, ...payload})
            };


        default: return state;

    }
}
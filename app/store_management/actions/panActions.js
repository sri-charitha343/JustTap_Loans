export const STORE_PAN_FRONT_IMAGE = 'STORE_PAN_FRONT_IMAGE';
export const STORE_PAN_BACK_IMAGE = 'STORE_PAN_BACK_IMAGE';
export const SET_PAN_VERIFIED = 'SET_PAN_VERIFIED';

export const storePanFrontImage = (image) => ({
    type: STORE_PAN_FRONT_IMAGE,
    payload: image,
});

export const storePanBackImage = (image) => ({
    type: STORE_PAN_BACK_IMAGE,
    payload: image,
});

export const setPanVerified = (isVerified) => ({ // New action creator
    type: SET_PAN_VERIFIED,
    payload: isVerified,
});


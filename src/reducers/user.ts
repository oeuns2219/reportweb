//export const SET_JWT_TOKEN = 'SET_JWT_TOKEN' as const;
//export const INCREASE = 'INCREASE' as const;

export const setuid = (uid:number) => ({
    type: 'SET_UID',//SET_JWT_TOKEN,
    payload: uid,
});

type UserInitialType = {
    uid: number | null,
    cnt: number,
}

const initialState = {
    uid: null,
	cnt: 0,
}

type UserActionType =
    | ReturnType<typeof setuid>

const user = (state:UserInitialType = initialState, action:UserActionType) => {
    switch (action.type) {
        case 'SET_UID':{
            return {
                ...state,
                uid: action.payload,
            }
        }

		case 'INCREASE': {
			return {
				...state,
				cnt: state.cnt + 1
			}
		}
        default:
            return state;
    }
};

export default user;
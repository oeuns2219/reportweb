//export const SET_JWT_TOKEN = 'SET_JWT_TOKEN' as const;
//export const INCREASE = 'INCREASE' as const;

export const setuid = (uid:number) => ({
    type: 'SET_UID',//SET_JWT_TOKEN,
    payload: uid,
});

export const setcode = (code:number) => ({
    type: 'SET_CODE',
    payload: code,
});

export const setpos = (pos:string) => ({
    type: 'SET_POS',
    payload: pos,
});

type UserInitialType = {
    uid: number | null,
    code: number | null,
    pos: string | null,
}

const initialState = {
    uid: null,
	code: null,
    pos: null,
}

type UserActionType =
    | ReturnType<typeof setuid>
    | ReturnType<typeof setcode>
    | ReturnType<typeof setpos>

const user = (state:UserInitialType = initialState, action:UserActionType) => {
    switch (action.type) {
        case 'SET_UID':{
            return {
                ...state,
                uid: action.payload,
            }
        }
		case 'SET_CODE': {
			return {
				...state,
				code: action.payload,
			}
		}
        case 'SET_POS': {
			return {
				...state,
				pos: action.payload,
			}
		}
        default:
            return state;
    }
};

export default user;
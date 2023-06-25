import { SET_POPUS_STATUS } from "./type"

let dPopupsStatus = { status: "" }
export const popupsStatus = ( preState:any = dPopupsStatus, action:any ) => {
    const { type, data } = action
    switch (type) {
        case SET_POPUS_STATUS:
            return { status:data }
        default:
            return preState
    }
}

// const initStatus = {
//     key: false,
//   }
//   export const walletStatusReducer = (state = initStatus, action:any) => {
//     switch (action.type) {
//       case 'change-status':
//         return {
//           key: action.key,
//         }
//       default:
//         return state
//     }
//   }
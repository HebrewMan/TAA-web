import { SET_POPUS_STATUS } from "./type"

let dPopupsStatus = ""
export const popupsStatus = ( preState:any = dPopupsStatus, action:any ) => {

    const { type, data } = action
    switch (type) {
        case SET_POPUS_STATUS:
            return data
        default:
            return preState
    }
}
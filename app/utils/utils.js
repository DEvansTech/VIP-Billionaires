import {Platform} from 'react-native';


export const formatNumber = (number) => {
    if (!number) return "";
    
    if (number > 9) {
        return number;
    } else {
        let changed = ("0" + number).slice(-2);
        return changed;
    }
}
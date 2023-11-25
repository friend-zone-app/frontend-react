import { ImageSourcePropType } from "react-native"

const path: {
    [key in '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12']: ImageSourcePropType;
} = {
    '1': require('../assets/create-event-selfie-poses/1.png'),
    '2': require('../assets/create-event-selfie-poses/2.png'),
    '3': require('../assets/create-event-selfie-poses/3.png'),
    '4': require('../assets/create-event-selfie-poses/4.png'),
    '5': require('../assets/create-event-selfie-poses/5.png'),
    '6': require('../assets/create-event-selfie-poses/6.png'),
    '7': require('../assets/create-event-selfie-poses/7.png'),
    '8': require('../assets/create-event-selfie-poses/8.png'),
    '9': require('../assets/create-event-selfie-poses/9.png'),
    '10': require('../assets/create-event-selfie-poses/10.png'),
    '11': require('../assets/create-event-selfie-poses/11.png'),
    '12': require('../assets/create-event-selfie-poses/12.png')
}

export function generateSelfieSequence():
| "1"
| "2"
| "3"
| "4"
| "5"
| "6"
| "7"
| "8"
| "9"
| "10"
| "11"
| "12" {
const randomValue = Math.floor(Math.random() * 12) + 1;
return String(randomValue) as
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
}

export default path
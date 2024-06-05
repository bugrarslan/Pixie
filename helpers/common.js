import { Dimensions } from "react-native";

const {width: deviceWith, height: deviceHeight} = Dimensions.get('window');

export const wp = percentage => {
    const width = deviceWith;
    return (percentage * width) / 100;
}

export const hp = percentage => {
    const height = deviceHeight;
    return (percentage * height) / 100;
}

export const getColumnCount = () => {
    if(deviceWith >= 1024){
        //desktop
        return 4;
    } else if (deviceWith >= 768){
        //tablet
        return 3;
    } else {
        //mobile
        return 2;
    }
}

export const getImageSize = (height, width) => {
    if (width > height) {
        return 250;
    } else if (height > width) {
        return 300;
    } else {
        return 200;
    }
}
import { Vibration } from 'react-native'

const HandleVibration = (time) => {
    // Vibrate for 500 milliseconds
    Vibration.vibrate(time);
    return '';
  };

export default HandleVibration;
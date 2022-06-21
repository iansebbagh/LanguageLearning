import Toast from 'react-native-tiny-toast';

let toast: any;

export default function showToast(
  message: string,
  type: string,
  duration = 2000,
) {
  Toast.show(message, {
    position: -1,
    duration: duration,
    textColor: 'black',

    containerStyle: {
      backgroundColor:
        type == 'success'
          ? '#00ff00'
          : type == 'error'
          ? '#ff0000'
          : type == 'info'
          ? '#0000ff'
          : '#ffffff',

      padding: 20,
      margin: 10,
    },
  });
}

export function hideLoading() {
  console.log('this is hide loading');
  console.log(toast);
  Toast.hide(toast);
}

export function showLoading(message = '') {
  toast = Toast.showLoading(message, {
    position: 0,
    containerStyle: {
      padding: 30,
      backgroundColor: 'rgba(0,0,0, 0.7)',
    },
    textColor: 'white',
    textStyle: {fontSize: 16},
    // maskColor:'rgba(10, 10, 10, 0.5)'
  });
  console.log('this is show loading');
  console.log(toast);
}

export function showErrorToast(message: string) {
  Toast.show(message, {
    position: -1,
    containerStyle: {
      padding: 20,
      margin: 10,
    },
  });
}

export function showSuccessToast(message: string) {
  Toast.showSuccess(message);
}

export function showInfoToast(message: string) {
  Toast.show(message, {
    position: -1,
    containerStyle: {
      margin: 20,
      paddingHorizontal: 30,
    },
  });
}

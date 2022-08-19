import Toast from 'react-native-toast-message';

type Props = {
  type: string;
  text1: string;
  text2?: string;
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
};

const Toastify = ({
  visibilityTime = 2500,
  autoHide = true,
  topOffset = 60,
  ...props
}: Props) => {
  return Toast.show({
    visibilityTime,
    autoHide,
    topOffset,
    ...props,
  });
};

export default Toastify;

// if lib support typescript
// import ToastProps from '@types/react-native-toast-message';

// const Toastify1 = (props: ToastProps) => {
//   return Toast.show(props);
// };

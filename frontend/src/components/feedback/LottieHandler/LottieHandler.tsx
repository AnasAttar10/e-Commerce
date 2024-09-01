import Lottie from 'lottie-react';
import empty from '@assets/lottieFiles/empty.json';
import error from '@assets/lottieFiles/error.json';
import loading from '@assets/lottieFiles/loading.json';
import notFound from '@assets/lottieFiles/notFound.json';
import success from '@assets/lottieFiles/success.json';
import mainLoading from '@assets/lottieFiles/mainLoading.json';

const LoattiHandlerMap = {
  empty,
  error,
  loading,
  notFound,
  mainLoading,
  success,
};
interface ILoattiHandler {
  type: keyof typeof LoattiHandlerMap;
  message?: string;
}
const LottieHandler = ({ type, message }: ILoattiHandler) => {
  const targetLottie = LoattiHandlerMap[type];
  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center h-25">
        <div className="w-25">
          <Lottie animationData={targetLottie} />
        </div>
      </div>
      {message && (
        <h3
          style={{
            textAlign: 'center',
            marginTop: '20px',
          }}
        >
          {message}
        </h3>
      )}
    </>
  );
};

export default LottieHandler;

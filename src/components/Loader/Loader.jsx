import css from './Loader.module.css';
import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ isLoading }) => {
  return (
    <div>
      <RotatingLines
        visible={isLoading}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        // wrapperStyle={{}}
        // wrapperClass=""
      />
    </div>
  );
};
export default Loader;

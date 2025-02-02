import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.ErrorMessage}>
      Something went wrong... Try again later!
    </div>
  );
};
export default ErrorMessage;

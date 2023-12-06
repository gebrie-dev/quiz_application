/* eslint-disable react/prop-types */
const Button = ({ onClickEvent, children, classes, selectedAnswerIndex, ...props }) => {
  return (
    <div className={classes}>
      <button
        onClick={onClickEvent}
        className={`bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-2 rounded-lg text-white mt-5 transition duration-300 ${
          selectedAnswerIndex === null ? "cursor-not-allowed" : ""
        } hover:bg-blue-600 hover:opacity-80`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;


import PropTypes from "prop-types";

const Button = ({ buttonText, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;

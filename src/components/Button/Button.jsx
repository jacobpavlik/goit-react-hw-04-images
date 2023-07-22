import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ label, action }) => {
  return (
    <button className={css.button} type="submit" onClick={action}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  action: PropTypes.func,
};

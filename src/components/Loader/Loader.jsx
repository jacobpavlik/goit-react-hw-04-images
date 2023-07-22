import { Dna } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.overlay}>
      <div>
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    </div>
  );
};

Loader.propTypes = {
  name: PropTypes.string,
};

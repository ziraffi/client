import { PropTypes } from 'prop-types';

function Spacer({ height }) {
  return (
    <div style={{ height: `${height}px` }}>
      {/* Spacer content */}
    </div>
  );
}

Spacer.defaultProps = {
  height: 20,
};

Spacer.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Spacer;

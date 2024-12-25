import { PropTypes } from 'prop-types';

function Spacer({ height = 20 }) {
  return (
    <div style={{ height: `${height}px` }}>
      {/* Spacer content */}
    </div>
  );
}

Spacer.propTypes = {
  height: PropTypes.number,
};

export default Spacer;


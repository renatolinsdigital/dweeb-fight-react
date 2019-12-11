import PropTypes from "prop-types";

const dweebType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  blockChance: PropTypes.number.isRequired,
  hpPlus: PropTypes.number.isRequired,
  criticalChance: PropTypes.number.isRequired,
  life: PropTypes.number,
  baseLife: PropTypes.number,
  totalLife: PropTypes.number
});

export default dweebType;

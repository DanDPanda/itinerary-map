import './Spinner.css';

const Spinner = ({ size = 18 }) => (
  <div className="spinner" style={{ width: size, height: size }} aria-hidden>
    <svg viewBox="0 0 50 50" className="spinner-svg">
      <circle className="spinner-track" cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
      <path className="spinner-head" d="M45 25a20 20 0 0 1-20 20" fill="none" strokeWidth="4" strokeLinecap="round" />
    </svg>
  </div>
);

export default Spinner;

import './style.css';

export const Spinner = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  return <div className={`spinner ${size}`} />;
};

export default Spinner;

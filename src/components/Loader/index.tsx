import { FC } from 'react';
import './style.css';

const Loader: FC<{ active?: boolean }> = ({ active }) => {
  if (!active) {
    return;
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center absolute z-50 bg-white bg-opacity-25'>
      <div className='loader'></div>
    </div>
  );
};

export default Loader;

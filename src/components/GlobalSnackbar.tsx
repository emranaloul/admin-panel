import MDSnackbar from './MDSnackbar';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { clearSnackbar } from 'store/snackbar';
import { useDispatch } from 'react-redux';
import { ColorType } from 'types';

export const GlobalSnackbar = () => {
  const { color, content, title, open } = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch();
  type Icons = {
    [K in ColorType]?: K extends 'success' | 'error' ? string : never;
  };
  const icons: Icons = {
    success: 'check_circle',
    error: 'error_outline',
  };
  return (
    <MDSnackbar
      open={open}
      title={title}
      content={content}
      icon={icons[color!]}
      color={color}
      close={() => dispatch(clearSnackbar())}
      onClose={() => dispatch(clearSnackbar())}
    />
  );
};

export default GlobalSnackbar;

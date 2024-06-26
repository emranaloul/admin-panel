import MDSnackbar from './MDSnackbar';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { clearSnackbar } from 'store/snackbar';
import { useDispatch } from 'react-redux';

export const GlobalSnackbar = () => {
  const { color, content, title, open, icon } = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch();
  return (
    <MDSnackbar
      open={open}
      title={title}
      content={content}
      icon={icon}
      color={color}
      close={() => dispatch(clearSnackbar())}
      onClose={() => dispatch(clearSnackbar())}
    />
  );
};

export default GlobalSnackbar;

import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';

export const ModalIngredientDetails: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleClose = () => {
    if (background) {
      navigate(background.pathname || '/', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetails />
    </Modal>
  );
};

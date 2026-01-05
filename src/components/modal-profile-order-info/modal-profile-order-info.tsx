import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

export const ModalProfileOrderInfo: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleClose = () => {
    if (background) {
      navigate(background.pathname || '/profile/orders', { replace: true });
    } else {
      navigate('/profile/orders', { replace: true });
    }
  };

  return (
    <Modal title='' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

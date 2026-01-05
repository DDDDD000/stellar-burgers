import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

type ModalOrderInfoProps = {
  defaultPath?: string;
};

export const ModalOrderInfo: FC<ModalOrderInfoProps> = ({
  defaultPath = '/feed'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleClose = () => {
    if (background) {
      navigate(background.pathname || defaultPath, { replace: true });
    } else {
      navigate(defaultPath, { replace: true });
    }
  };

  return (
    <Modal title='' onClose={handleClose}>
      <OrderInfo />
    </Modal>
  );
};

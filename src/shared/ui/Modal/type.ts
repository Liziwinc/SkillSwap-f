export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title: string;
  message: string;
  primaryButton?: string;
  secondaryButton?: string;
  onPrimaryClick?: () => void;
}

export interface ModalUIProps extends Omit<ModalProps, 'isOpen'> {
  onPrimaryClick: () => void;
}

export interface ModalUIProps extends Omit<ModalProps, 'isOpen'> {
  onPrimaryClick: () => void;
}

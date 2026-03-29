import React from 'react';
import styles from './ImageInput.module.css';
import UploadIcon from '../../../assets/icons/gallery-add.svg';

interface ImageInputProps {
  id: string;
  onChange?: (files: FileList | null) => void;
  multiple?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  id,
  onChange,
  multiple = false
}) => {
  return (
    <label htmlFor={id} className={styles.wrapper}>
      <input
        id={id}
        type='file'
        accept='image/*'
        multiple={multiple}
        className={styles.hiddenInput}
        onChange={(e) => onChange?.(e.target.files)}
      />
      <p className={styles.description}>
        Перетащите или выберите изображения навыка
      </p>
      <div className={styles.chooseBlock}>
        <img src='src/assets/icons/gallery-add.svg' alt='Иконка загрузки' className={styles.icon} />
        <span className={styles.chooseText}>Выбрать изображение</span>
      </div>
    </label>
  );
};

export default ImageInput;

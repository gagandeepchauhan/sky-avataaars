import React from 'react';
import styles from './Avatar.module.css';

interface IProps{
    url: string;
}

const Avatar:React.FC<IProps> = ({
    url
}) => {
  return (
    <div className={styles.avatar}>
        <img
            src={url}
            alt={'avatar'}
        />
    </div>
  )
}

export default Avatar;
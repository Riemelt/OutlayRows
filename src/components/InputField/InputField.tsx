import { ComponentPropsWithoutRef, FC, useId } from 'react';
import cn from 'classnames';

import styles from './InputField.module.scss';

type InputProps = ComponentPropsWithoutRef<'input'>;

type Props = InputProps & {
  isActive: boolean;
  title: string;
};

export const InputField: FC<Props> = ({ isActive, title, ...rest }) => {
  const id = useId();

  if (!isActive)
    return (
      <div
        className={styles.blank}
        title={rest.defaultValue?.toLocaleString('ru-RU')}
      >
        {rest.defaultValue?.toLocaleString('ru-RU')}
      </div>
    );

  return (
    <label className={styles.label} htmlFor={id}>
      <span className={styles.title}>{title}</span>
      <input
        className={cn(styles.input, {
          [styles.input_textType]: rest.type === 'text',
        })}
        id={id}
        {...rest}
      />
    </label>
  );
};

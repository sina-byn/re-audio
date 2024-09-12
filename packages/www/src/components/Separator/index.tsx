// * clsx
import clsx from 'clsx';

// * styles
import styles from './Separator.module.css';

// * types
type SeparatorProps = { className?: string };

const Separator = ({ className }: SeparatorProps) => {
  return (
    <>
      <div className={clsx(styles.separator, className)}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>

      <svg width='0' height='0' className='svg'>
        <defs>
          <filter id='uib-jelly-ooze'>
            <feGaussianBlur in='SourceGraphic' stdDeviation='3' result='blur' />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7'
              result='ooze'
            />
            <feBlend in='SourceGraphic' in2='ooze' />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default Separator;

import React, {
  MouseEvent as ReactMouseEvent,
  useState,
  useCallback,
} from 'react';

import styles from './TiltCard.module.css';

export const TiltCard: React.FC = () => {
  const [bounds, setBounds] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [transform, setTransform] = useState('');
  const [background, setBackground] = useState('');
  const [glow, setGlow] = useState('');

  const rotateToMouse = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;

      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2,
      };

      const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

      setTransform(`
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `);

      setGlow(`
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `);
    },
    [bounds],
  );

  const handleMouseEnter = (e: ReactMouseEvent<HTMLElement>) => {
    setBounds(e.currentTarget.getBoundingClientRect());
  };

  const handleMouseLeave = () => {
    setTransform('');
    setBackground('');
  };

  return (
    <div
      className={styles.card}
      style={{
        transform,
        background,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={rotateToMouse}
      onMouseLeave={handleMouseLeave}>
      card
      <div
        className={styles.glow}
        style={{
          backgroundImage: glow,
        }}
      />
    </div>
  );
};

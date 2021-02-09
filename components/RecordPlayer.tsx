import { useState } from "react";

import styles from "@styles/RecordPlayer.module.scss";

interface RecordPlayerProps {
  percentageProgress?: number;
  playing?: boolean;
  labelImage?: string;
  pause: () => void;
}
export default function RecordPlayer({
  percentageProgress = 0,
  playing = false,
  labelImage = null,
  pause,
}: RecordPlayerProps) {
  const minAngle = 14;
  const maxAngle = 35;
  const difference = maxAngle - minAngle;
  const rotationDegree =
    playing && percentageProgress > 0
      ? minAngle + percentageProgress * difference
      : 0;
  return (
    <>
      <div className={`${styles.recordContainer}`}>
        <div
          className={`${styles.record}  ${playing ? styles.playing : ""}`}
        ></div>
        <div
          className={`${styles.recordLabel}  ${playing ? styles.playing : ""}`}
          style={{
            backgroundImage: `url('${labelImage}')`,
          }}
        ></div>
        <div
          className={styles.recordArm}
          style={{
            transform: `rotate(${rotationDegree}deg)`,
          }}
        >
          <div className={styles.armPivot}></div>
          <div className={styles.arm}></div>
          <div className={styles.armElbow}>
            <div className={styles.tip}>
              <div className={styles.needle}></div>
            </div>
          </div>
        </div>
        <div className={styles.pauseButton} onClick={() => pause()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
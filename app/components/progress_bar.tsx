import { useEffect, useState } from "react";

type ProgressBarProps = {
  timeout: number;
  reset?: boolean;
};

export function ProgressBar({ timeout, reset }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100 / (timeout / 100));
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timeout]);

  useEffect(() => {
    if (reset) {
      setProgress(0);
    }
    if (progress >= 100) {
      setProgress(0);
    }
  }, [progress, reset]);

  return (
    <div
      className="dark:bg-neutral-200 dark:bg-opacity-30"
      style={{
        right: 0,
        left: `${100 - progress}%`,
        height: "3px",
        position: "absolute",
        transition: "all 0.1s linear",
        zIndex: 30,
      }}
    ></div>
  );
}

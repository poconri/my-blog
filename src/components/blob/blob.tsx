import styles from "./blob.module.scss";
import parse from "html-react-parser";
import classNames from "classnames";
import { useEffect, useState } from "react";

interface BlobProps {
  parentRef: React.RefObject<HTMLDivElement>;
}

const stringifiedSVG = `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
<defs>
  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color: rgb(233, 100, 67);"></stop>
    <stop offset="100%" style="stop-color: rgb(144, 78, 149);"></stop>
  </linearGradient>
</defs>
<path fill="url(#gradient)">
    <animate attributeName="d"
        dur="20000ms"
        repeatCount="indefinite"

        values="
        M462,300.5Q425,351,386,385Q347,419,298.5,431.5Q250,444,196,441Q142,438,101,398.5Q60,359,62,304.5Q64,250,71.5,200.5Q79,151,107,100.5Q135,50,192.5,41.5Q250,33,297,60Q344,87,392,113.5Q440,140,469.5,195Q499,250,462,300.5Z;
        M423.5,294.5Q404,339,377,381Q350,423,300,424.5Q250,426,192,438.5Q134,451,96,406Q58,361,35,305.5Q12,250,23.5,188Q35,126,98,111Q161,96,205.5,84Q250,72,312.5,53Q375,34,419,80.5Q463,127,453,188.5Q443,250,423.5,294.5Z;
        M425.60644,295.55322Q408.21288,341.10644,380.15966,384.15966Q352.10644,427.21288,301.05322,431.87255Q250,436.53221,197.26611,434.81373Q144.53221,433.09524,120.7507,385.46219Q96.96918,337.82913,74.49579,293.91457Q52.0224,250,59.83613,197.47899Q67.64986,144.95798,99.05322,93.62185Q130.45659,42.28572,190.22829,20.80673Q250,-0.67226,297.22829,42.46779Q344.45659,85.60784,385.29692,116.83613Q426.13726,148.06442,434.56863,199.03221Q443,250,425.60644,295.55322Z;
        M437.74918,294.98962Q404.9377,339.97923,380.51038,387.0623Q356.08306,434.14536,303.04153,429.96885Q250,425.79235,198.02077,427.85464Q146.04153,429.91694,92.44972,400.79071Q38.85791,371.66449,29.11748,310.83224Q19.37704,250,54.9377,204.14536Q90.49837,158.29071,110.22842,100.11421Q129.95847,41.9377,189.97923,20.9377Q250,-0.0623,309.7388,21.05355Q369.4776,42.16939,400.78033,93.56393Q432.08306,144.95847,451.32186,197.47923Q470.56066,250,437.74918,294.98962Z";
        M453.29832,297.63305Q415.53221,345.26611,376.81373,373.83474Q338.09524,402.40336,294.04762,421.04762Q250,439.69188,205.37255,422.20728Q160.7451,404.72269,100.37255,387.86135Q40,371,51.06442,310.5Q62.12885,250,75.53781,203.47339Q88.94678,156.94678,124.21849,124.7507Q159.49019,92.55462,204.7451,67.34173Q250,42.12885,308.97339,44.14426Q367.94678,46.15966,397.34034,97.15966Q426.73389,148.15966,458.89916,199.07983Q491.06442,250,453.29832,297.63305Z;
        M462,300.5Q425,351,386,385Q347,419,298.5,431.5Q250,444,196,441Q142,438,101,398.5Q60,359,62,304.5Q64,250,71.5,200.5Q79,151,107,100.5Q135,50,192.5,41.5Q250,33,297,60Q344,87,392,113.5Q440,140,469.5,195Q499,250,462,300.5Z"
    ></animate>
</path>
</svg>`;

export const Blob = (props: BlobProps) => {
  const [posicion, setPosicion] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const x = Math.floor(
        Math.random() * (props.parentRef.current?.offsetWidth ?? 0)
      );
      const y = Math.floor(
        Math.random() * (props.parentRef.current?.offsetHeight ?? 0)
      );

      setPosicion({ x, y });
    }, 5000);

    return () => clearInterval(interval);
  }, [props.parentRef]);

  return (
    <div
      className={classNames(styles.blob)}
      style={{
        left: posicion.x,
        top: posicion.y,
        transition: "all 6s ease-in-out",
      }}
    >
      {parse(stringifiedSVG)}
    </div>
  );
};

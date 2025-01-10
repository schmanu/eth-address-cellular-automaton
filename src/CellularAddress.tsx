import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import tinycolor from "tinycolor2";
import { randomFromAddress } from "./utils/random";

interface CellularAddressProps extends React.SVGProps<SVGSVGElement> {
  address: string;
  /** pixels per row / column */
  pixels?: number;
  /** if true the svg will be animated on hover */
  animate?: boolean;
  /** animation speed in ms */
  animationSpeed?: number;
}

const CellularAddress = ({
  address,
  pixels = 32,
  animate = true,
  animationSpeed = 200,
  ...props
}: CellularAddressProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const lastUpdateRef = useRef(0);
  const animationRef = useRef<number>();
  const [rows, setRows] = useState<number[][]>([]);

  address = address.replace("0x", "");

  const random = useMemo(() => randomFromAddress(address), [address]);
  // As we use the address as seed the order in which we generate numbers is important to maintain the same color and same rules / pattern

  const ruleSet: number[] = useMemo(() => {
    const rules = new Array<number>(8);
    // derive rules
    for (let i = 0; i < 8; i++) {
      rules[i] = Math.floor(random.nextNumber() * 2);
    }
    return rules;
  }, [random]);

  // derive colors
  const fillColor = useMemo(
    () =>
      tinycolor(
        `rgb(${Math.floor(random.nextNumber() * 256)},${Math.floor(
          random.nextNumber() * 256
        )},${Math.floor(random.nextNumber() * 256)})`
      ),
    [random]
  );
  const emptyColor = fillColor.complement();

  // re-init when address changes
  useEffect(() => {
    const iv: number[] = new Array<number>(pixels);
    for (let i = 0; i < pixels; i++) {
      iv[i] = Math.floor(random.nextNumber() * 2);
    }

    const initialRows: number[][] = new Array<number[]>(pixels);
    initialRows[0] = iv;

    for (let i = 1; i < pixels; i++) {
      initialRows[i] = computeRow(initialRows[i - 1], ruleSet);
    }

    setRows(initialRows);
  }, [pixels, random, ruleSet]);

  // Animate rows if active using requestAnimationFrame
  const animateRows: FrameRequestCallback = useCallback(
    (now) => {
      if (now - lastUpdateRef.current > animationSpeed) {
        // update rows and lastUpdateRef
        lastUpdateRef.current = now;
        setRows((prev) => {
          const newRows = [...prev];
          newRows.shift();
          newRows.push(computeRow(newRows[newRows.length - 1], ruleSet));
          return newRows;
        });
      }
      animationRef.current = requestAnimationFrame(animateRows);
    },
    [animationSpeed, ruleSet]
  );

  useEffect(() => {
    if (animate && isAnimating) {
      animationRef.current = requestAnimationFrame(animateRows);
    }

    return () => {
      animationRef.current !== undefined &&
        cancelAnimationFrame(animationRef.current);
    };
  }, [animate, animateRows, isAnimating]);

  if (address.length !== 40) {
    return <div>INVALID ADDRESS</div>;
  }

  return (
    <svg
      {...props}
      viewBox={`0 0 ${pixels} ${pixels}`}
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => setIsAnimating(false)}
    >
      {rows.map((row, idy) =>
        row.map((number, idx) => (
          <rect
            x={idx}
            y={idy}
            fill={
              number === 0 ? `#${fillColor.toHex()}` : `#${emptyColor.toHex()}`
            }
            strokeWidth={0}
            stroke={"transparent"}
            width={1}
            height={1}
          />
        ))
      )}
    </svg>
  );
};

const computeRow = (previousRow: number[], ruleSet: number[]) => {
  const row: number[] = new Array<number>(previousRow.length);
  for (let i = 0; i < previousRow.length; i++) {
    let binaryString: string;
    if (i === 0) {
      binaryString = `0${previousRow[i]}${previousRow[i + 1]}`;
    } else if (i === previousRow.length - 1) {
      binaryString = `${previousRow[i - 1]}${previousRow[i]}0`;
    } else {
      binaryString = `${previousRow[i - 1]}${previousRow[i]}${
        previousRow[i + 1]
      }`;
    }

    row[i] = ruleSet[parseInt(binaryString, 2)];
  }

  return row;
};

export default CellularAddress;

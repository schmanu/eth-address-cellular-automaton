import React from 'react';
import tinycolor from 'tinycolor2';

interface CellularAddressProps {
    address: string;
    scale?: number;
    rounded?: boolean;
}

const CellularAddress = (props: CellularAddressProps) => {

    let {address, scale, rounded} = props;

    const definedScale = scale ? scale : 2;
    address = address.replace("0x", "");
    
    console.log(address.length);

    if (address.length !== 40) {
        throw new Error("Address is invalid!");
    }
    if (typeof rounded === "undefined") {
        rounded = false;
    }

    const iv : number[] = new Array<number>(32);
    const ruleSet : number[] = new Array<number>(8);
    // initial values
    for (let i = 0; i < 32; i++) {
        iv[i] = parseInt(address.charAt(i), 16) % 2;
    }

    // derive rules
    for (let i = 0; i < 8; i++) {
        ruleSet[i] = parseInt(address.charAt(32 + i), 16) % 2;
    }

    const rows : number[][] = new Array<number[]>(32);
    rows[0] = iv;
    
    for (let i = 1; i < 32; i++) {
        rows[i] = computeRow(rows[i - 1], ruleSet);
    }

    const fillColor = tinycolor(`#${(parseInt(address, 16) % parseInt("FFFFFF", 16)).toString(16)}`);
    const emptyColor = fillColor.complement();

    return (
    <div style={{borderRadius: rounded ? 100 : 4,
        width: definedScale * 16,
        height: definedScale * 16,
        overflow: "hidden"}}>
        <svg width={`${definedScale * 16}px`} height={`${definedScale * 16}px`}>
            <pattern id={"fillPattern"}>

            </pattern>
            {rows.map((row, idy) => row.map(
                (number, idx) => <rect x={idx * definedScale} y={idy * definedScale} fill={number === 0 ? `#${fillColor.toHex()}` : `#${emptyColor.toHex()}`} 
                strokeWidth={0}
                stroke={"transparent"}
                width={definedScale} height={definedScale} />
                
            ))}
        </svg>
    </div>);
}



const computeRow = (previousRow: number[], ruleSet: number[]) => {
    const row : number[] = new Array<number>(32);
    for (let i = 0; i < 32; i++) {
        let binaryString : string;
        if (i === 0) {
            binaryString = `0${previousRow[i]}${previousRow[i + 1]}`;
        } else if (i === 31) {
            binaryString = `${previousRow[i - 1]}${previousRow[i]}0`;
        } else {
            binaryString = `${previousRow[i -1]}${previousRow[i]}${previousRow[i + 1]}`;
        }

        row[i] = ruleSet[parseInt(binaryString, 2)];
    }

    return row;
}

export default CellularAddress;
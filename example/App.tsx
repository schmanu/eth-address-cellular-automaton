import React from "react";
import { useState } from "react";
import CellularAddress from "./../src/CellularAddress";

function App() {
  const [ethAddress, setEthAddress] = useState(
    "0x15FC97934BD2D140cd1CCBf7B164DEc7fF64E667"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2>Try it out</h2>
      <div style={{ flex: 1 }}>
        <label htmlFor="address">ETH Address</label>
        <input
          type="text"
          id="address"
          value={ethAddress}
          onInput={(value) => setEthAddress(value.currentTarget.value)}
          style={{ width: 315, marginLeft: 16 }}
          minLength={42}
          maxLength={42}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label>Resulting Address Icon</label>
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address={ethAddress}
            pixels={16}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
      </div>
      <h2>More examples</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address="0x4Fc312b2B6e068B6363077b452aB6d1A15b7EBf9"
            pixels={32}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address="0x6E1348924Ee87A91864a44F01d523df6c05E875a"
            pixels={32}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address="0x09CFFdD53f0825bf591CA216A3afd857648918ad"
            pixels={32}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address="0xE82c373925FD4D8234eB78ef0a82Aa33036f9635"
            pixels={32}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address="0xA8837211e46aAb8E8F0B5788fEaf6465b3912acb"
            pixels={32}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address="0xdb7fAF39D5a955d2688542247dd709a67D0eab82"
            pixels={32}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
        <div
          style={{ borderRadius: "8px", width: "128px", overflow: "hidden" }}
        >
          <CellularAddress
            address="0xD7a0D67e565Be0ACaeF7eD6049b9E55EbeA9bdEF"
            pixels={32}
            width={128}
            height={128}
            animationSpeed={50}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

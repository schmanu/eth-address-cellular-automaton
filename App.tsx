import React from 'react';
import { useState } from 'react';
import CellularAddress from './../src/CellularAddress';



function App() {
  const [ethAddress, setEthAddress] = useState("0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b");

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "16px"}}> 
      <div style={{flex: 1}}>
        <label htmlFor="address">ETH Address</label>
        <input type="text" id="address" value={ethAddress} onInput={(value) => setEthAddress(value.currentTarget.value)} style={{width: 315, marginLeft: 16}} minLength={42} maxLength={42}/>
      </div>
      <div style={{flex: 1}}>
        <label>Resulting Address Icon</label>
        <CellularAddress address={ethAddress} scale={8} />
      </div>
    </div>
  );
}

export default App;

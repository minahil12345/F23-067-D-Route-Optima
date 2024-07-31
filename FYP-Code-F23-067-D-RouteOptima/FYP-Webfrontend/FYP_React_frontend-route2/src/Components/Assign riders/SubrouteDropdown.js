// SubrouteDropdown.js
import React from 'react';

const SubrouteDropdown = ({ subrouteId, riders, selectedRider, onChange }) => {
  return (
    <select value={selectedRider} onChange={(e) => onChange(subrouteId, e.target.value)}>
       {/* <option value="">Select Rider</option>  */}
      {riders.map((rider, index) => (
        index === 0 ?
        
        <option selected key={rider.id} value={rider.id}>
          {rider.data.name}
        </option>
        :

        <option key={rider.id} value={rider.id}>
           {rider.data.name}
        </option>
      ))}
    </select>
  );
};

export default SubrouteDropdown;

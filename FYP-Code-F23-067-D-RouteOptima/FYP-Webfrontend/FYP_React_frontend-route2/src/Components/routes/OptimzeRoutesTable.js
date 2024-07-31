import React from "react";
import {Card} from 'antd';

const OptimizeRoutesTable = ({ optimizeRoutesData }) => {
  if (!optimizeRoutesData || !optimizeRoutesData.subroutes) {
    return null;
  }

  // Function to handle the click event for the "View" button
  const handleViewClick = (subrouteId) => {
    // Implement logic to handle the view action, e.g., navigate to a detailed view page
    console.log(`View button clicked for subroute ID: ${subrouteId}`);
  };

  const renderTableRows = () => {
    // Extract relevant data from optimizeRoutesData
    const { subroutes } = optimizeRoutesData;

    // Render table rows based on the subroutes
    return subroutes.map((subroute) => (
      <tr key={subroute.subroute_id}>
        <td>{subroute.subroute_id}</td>
        <td>{subroute.subroute_cost}</td>
        <td>{subroute.subroute_TWV}</td>
        <td>{subroute.subroute_startTime}</td>
        <td>{subroute.subroute_endTime}</td>
        <td>{subroute.subroute}</td>
        {/* <td>{riders.id}</td> */}
        <td>
          {/* View button for each row */}
          <button onClick={() => handleViewClick(subroute.subroute_id)}>
            View
          </button>
        </td>
        {/* Render more columns as needed */}
      </tr>
    ));
  };

  return (
    <div >
      <table className="table table-hover table-bordered">
        <tbody>
          <caption>Results</caption>
          <tr>
            <th scope="row">Total Distance</th>
            <td>{optimizeRoutesData.totalDistance} Km</td>
          </tr>
          <tr>
            <th scope="row">Time Window Violation</th>
            <td>{optimizeRoutesData.time_window_violation} Minutes</td>
          </tr>
          <tr>
            <th scope="row">Number of Trips</th>
            <td>{optimizeRoutesData.nRiders}</td>
          </tr>
          <tr>
            <th scope="row">Number of Parcels</th>
            <td>{optimizeRoutesData.nParcels}</td>
          </tr>
          <tr>
            <th scope="row">Number of Time Window Violations</th>
            <td>{optimizeRoutesData.nTWV}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OptimizeRoutesTable;
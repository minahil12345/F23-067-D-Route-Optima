// frontend/src/utils/api.js
import axios from 'axios';

export const getRiderLocations = async () => {
  try {
    const response = await axios.get(`http://localhost:9000/api/riderLocation`);
    console.log("Response's Data of Maps Location:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rider locations:', error);
    throw error;
  }
};

export const getMapsLocations = async () => {
  try {
    const response = await axios.get(`http://localhost:9000/api/riderLocation`);
    console.log("Response's Data of Maps Location:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rider locations:', error);
    throw error;
  }
};
export const getParcelsLocations = async () => {
  try {
    const response = await axios.get(`http://localhost:9000/api/assignments`);
    console.log("Response's Data of Parcels Assignment:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rider locations:', error);
    throw error;
  }
};
export const fetchRiderLocations = async (riderId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/riderLocation?id=${riderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch rider locations');
    }    
    const data = await response.json();
    console.log("API locations from api.js: ", data);
    return data;
  } catch (error) {
    console.error('That same error: Error fetching rider locations:', error);
    return [];
  }
};
export const fetchAssignmentsLocations = async (riderId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/assignments?id=${riderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Assignments by ID');
    }    
    const data = await response.json();
    console.log("API assignments from api.js: ", data);
    return data;
  } catch (error) {
    console.error('That same error: Error fetching rider locations:', error);
    return [];
  }
};

export const fetchParcelLocation = async (riderId) => {
  try {
    const response = await fetch(`http://localhost:9000/api/assignments?id=${riderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch parcel locations');
    }
    
     const data = response.json();
    console.log("API Parcels: ", data);
    return data;
  } catch (error) {
    console.error('Error fetching parcel locations:', error);
    return []; 
  }
};
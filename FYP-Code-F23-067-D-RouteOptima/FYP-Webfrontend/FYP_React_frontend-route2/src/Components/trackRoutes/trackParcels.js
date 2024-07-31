import React, { useState } from 'react';
import { Input, Card, Table } from 'antd';
import axios from 'axios';

const { Search } = Input;

const TrackParcelsPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchBarPosition, setSearchBarPosition] = useState('middle');
  const [deliveryProof, setDeliveryProof] = useState(null);
  document.body.style.overflow = "hidden";
  const handleSearch = async (value) => {
    setSearchValue(value);
    setSearchBarPosition('top');

    try {
      const response = await axios.get('http://localhost:9000/api/assignments');
      const assignments = response.data;

      // Find the parcel with the matching ID
      const matchingParcel = assignments.find(assignment =>
        assignment.data.parcels.some(parcel => parcel.parcelId === value)
      );

      if (matchingParcel) {
        // Get the first matching parcel
        const matchedParcel = matchingParcel.data.parcels.find(parcel => parcel.parcelId === value);
        console.log("Matched Parcel: ", matchedParcel);
        // Extract receiver's name, CNIC, and delivery proof link
        const receiverName = matchedParcel.receiverName;
        const receiverCNIC = matchedParcel.receiver.cnic;
        const deliveryProofLink = matchedParcel.deliveryProofLink;

        // Set delivery proof data
        setDeliveryProof({ receiverName, receiverCNIC, deliveryProofLink });
      } else {
        // If parcel ID is not found, set delivery proof data to null
        setDeliveryProof(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };// Define columns and data for the table
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const data = [
    { key: '1', title: 'Name', value: deliveryProof ? deliveryProof.receiverName : '-' },
    { key: '2', title: 'CNIC', value: deliveryProof ? deliveryProof.receiverCNIC : '-' },
  ];

  return (
    <div className="proof-container" style={{ padding: '20px' }}>
      <h1 className="proof-title" style={{ marginBottom: '2px', fontFamily: 'Inter, sans-serif', textAlign: 'left', color: 'black', fontSize: '32px', marginTop: '24px' }}>
        Track Parcel
      </h1>
      <hr style={{ width: '100%', borderTop: '1px solid #D3D3D3', margin: '0' }} />
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: searchBarPosition === 'middle' ? 'center' : 'flex-start', paddingTop: searchBarPosition === 'top' ? '30px' : 0 }}>
        {/* Render "Find Parcel through ID" above search bar when it's in the middle */}
        {searchBarPosition === 'middle' && (
          <p style={{ marginBottom: '5px', marginTop: '-50px' }}>Find Parcel through ID</p>
        )}
        {/* Render typed text above search bar when it's in the middle */}
        {searchBarPosition === 'middle' && searchValue && (
          <p style={{ marginBottom: '10px' }}>You searched for: {searchValue}</p>
        )}
        <div style={{ width: '70%' }}>
          <Search
            placeholder="Search parcels..."
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
            style={{ width: '100%', height: '50px', borderRadius: '25px' }}
          />
        </div>
        {/* Render card below the search bar when it's in the top position */}
        {searchBarPosition === 'top' && deliveryProof && (
          <div style={{ marginTop: '30px', width: '70%' }}>
            <Card title="Track Parcels Proofs" style={{ width: '100%', border: 'none' }}>
              {/* Display receiver's name and CNIC in a table */}
              <Table dataSource={data} columns={columns} pagination={false} />
              {/* Display delivery proof */}
              <p style={{ marginTop: '20px', fontFamily: 'Inter, sans-serif', fontSize: '17px' }}><bold>Delivery Proof:</bold> </p>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left column for signature */}
                <div style={{ width: '48%' }}>
                  <h3>Signature</h3>
                  <img src={deliveryProof.deliveryProofLink} alt="Signature" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
                {/* Right column for CNIC pic */}
                <div style={{ width: '48%' }}>
                  <h3>CNIC Pic</h3>
                  {/* Assuming you have a separate URL for CNIC pic, replace 'cnicPicLink' with the actual URL */}
                  <img src="cnicPicLink" alt="CNIC Pic" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </div>
              </div>
             
            </Card>
          </div>
        )}
        {/* Render message if parcel ID not found */}
        {searchBarPosition === 'top' && !deliveryProof && (
          <div style={{ marginTop: '30px', width: '70%' }}>
            <Card title="Track Parcels Proofs" style={{ width: '100%', border: 'none' }}>
              <p>No data found for the entered parcel ID.</p>
            </Card>
          </div>
        )}
      </div>
    </div>
);
};

export default TrackParcelsPage;

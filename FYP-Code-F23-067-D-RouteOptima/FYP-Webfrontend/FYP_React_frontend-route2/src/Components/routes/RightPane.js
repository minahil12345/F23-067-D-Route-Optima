import React from 'react';
import { Button, Modal, Table } from 'antd';
import { Link } from 'react-router-dom';

class RightPane extends React.Component {
  render() {
    const { data, visible, onClose } = this.props;

    // Transforming the data into rows
    const dataSource = [
      { key: 'totalDistance', label: 'Total Distance', value: `${data?.totalDistance} m`},
      { key: 'nRiders', label: 'Trips', value: `${data?.subroutes.length} Trips` },
      { key: 'nParcels', label: 'Parcels', value: `${data?.nParcels} Parcels` },
      { key: 'nTWV', label: 'Late Deliveries', value: `${data?.nTWV} Late deliveries` },
    ];

    // Define columns for the Table
    const columns = [
      {
        title: <span style={{ fontFamily: 'Inter, sans-serif',fontSize: '19px'}}>Label</span>,
        dataIndex: 'label',
        key: 'label',
        align: 'center',
        render: text => <text style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>{text}</text>,
      },
      {
        title: <span style={{ fontFamily: 'Inter, sans-serif',fontSize: '19px' }}>Value</span>,
        dataIndex: 'value',
        key: 'value',
        align: 'center',
        render: text => <text style={{fontFamily: 'Inter, sans-serif',fontSize: '17px'}}>{text}</text>,
      },
    ];

    return (
      <Modal
      title={<span style={{ fontFamily: 'Inter, sans-serif', fontSize: '22px'}}>Trip Summary</span>}
        visible={visible} // Use the visible prop to control visibility
        footer={null} // No footer
        onCancel={onClose} // Close modal when clicking outside or on cancel button
        centered // Center modal vertically
        maskClosable={false} // Disable closing modal when clicking on the mask
      >
        {data ? (
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
          />
        ) : (
          <p>Waiting for the algorithm to do its magic...</p>
        )}

        <div style={{ marginTop:'25px',textAlign: 'center' }}>
          <Button type='primary'style={{ width: 'fit-content', display:'fit',lineHeight: '10px', fontSize: '18px', padding:'10px',color: 'white', textAlign: 'center',  backgroundColor: 'black' }}>
            <Link to="/assignriders" state={{ sub_routes: data }} style={{ textDecoration: 'none', color: 'white' }}>
              Assign Riders
            </Link>
          </Button>
        </div>
      </Modal>
    );
  }
}

export default RightPane;

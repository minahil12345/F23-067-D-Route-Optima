import React from 'react';
import LeftPane from './LeftPane'; // Importing the LeftPane component
import RightPane from './RightPane'; // Importing the RightPane component

class App extends React.Component {
  state = {
    data: null, // State to hold data
    showModal: false // State to control modal visibility
  };

  // Function to update data in the state
  updateData = (newData) => {
    this.setState({ data: newData, showModal: !!newData });
  };

  // Function to toggle modal visibility
  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  componentDidMount() {
    // Disable scrolling on mount
    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = 'no'; // For Safari
  }

  componentWillUnmount() {
    // Enable scrolling on unmount
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = 'yes'; // For Safari
  }

  render() {
    const containerStyle = {
      display: 'flex',
      height: '100vh', // Adjust to your desired height
      backgroundColor: '#ffffff', // White background
    };

    const leftPaneStyle = {
      flex: 1,
    };

    return (
      <div style={containerStyle}>
        <div style={leftPaneStyle}>
          {/* Pass the updateData function as prop */}
          <LeftPane updateData={this.updateData} /> 
        </div>
        {/* Display RightPane as modal */}
        <RightPane 
          data={this.state.data} 
          visible={this.state.showModal} 
          onClose={this.toggleModal} 
        /> 
      </div>
    );
  }
}

export default App;

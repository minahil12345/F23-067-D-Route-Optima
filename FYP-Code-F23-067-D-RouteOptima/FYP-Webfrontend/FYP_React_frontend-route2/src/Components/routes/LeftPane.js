import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message, InputNumber, Button } from "antd";
import { TypeAnimation } from "react-type-animation";
import { Spin } from "antd"; // Import Spin component for loading animation

const { Dragger } = Upload;

class LeftPane extends React.Component {
  state = {
    csvFile: null,
    nRiders: 1,
    isLoading: false, // State variable to track loading state
  };


  handleFileUpload = () => {
    this.setState({ isLoading: true }); // Set loading state to true

    const { csvFile, nRiders } = this.state;
    const formData = new FormData();
    formData.append("csvFile", csvFile);
    formData.append("nRiders", nRiders);

    fetch("http://localhost:9000/trip/optimizeRoutes", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log("Upload successful");
        response.json().then((data) => {
          this.props.updateData(data);
          console.log(data);
          this.setState({ isLoading: false }); // Set loading state to false after data is received
        });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        this.setState({ isLoading: false }); // Set loading state to false in case of error
        message.error("There was a problem uploading the file. Please try again.");
      });
  };

  render() {
    const paneStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%", // Adjust to your desired height
      textAlign: "left",
    };

    const formStyle = {
      width: "50%",
      marginBottom: "8px", // Adjust margin as needed
      // textAlign: "center",
    };

    const uploadStyle = {
      marginBottom: "10px", // Adjust margin as needed
    };

    const props = {
      name: "csvFile",
      multiple: false, // Only allow single file upload
      action: "",
      beforeUpload: (file) => {
        this.setState({ csvFile: file });
        return false; // Prevent default upload behavior
      },
      onChange: (info) => {
        const { file } = info;
        // Update state with uploaded file
        this.setState({ csvFile: file });
      },
    };

    const downloadSampleCSV = () => {
      // Create a sample CSV file content based on the format
      const csvContent = `ParcelID,Name,Address,Phone,Email,Desired Time,Weight\n`;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
  
      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.csv");
      document.body.appendChild(link);
      link.click();
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
        }}
      >
        <div
          className="animations"
          style={{ ...paneStyle, height: "36vh", textAlign: "left" }}
        >
          {this.state.isLoading ? (
            // Display loading animation while loading
            <Spin size="large" />
          ) : (
            // Display original text animation when not loading
            <div>
              <TypeAnimation
                preRenderFirstString={true}
                sequence={[
                  500,
                  "never Late.", // initially rendered starting point
                  1000,
                  "never Early.", // initially rendered starting point
                  1000,
                  "never Lost\nwith Route Optima.", // initially rendered starting point
                  1000,
                  "Let's Get started  !",
                  1000,
                ]}
                wrapper="h1"
                // repeat={1}
                style={{ whiteSpace: "pre-line", fontSize: "4em", fontFamily:'Inter, sans-serif' }}
              />
            </div>
          )}
        </div>
        <div style={paneStyle}>
          <div style={formStyle}>
            <Dragger {...props} style={uploadStyle}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text" style={{fontFamily: 'Inter, sans-serif', fontSize: '20px'}}>
                Click or drag CSV file to this area to upload
              </p>
              <p className="ant-upload-hint" style={{fontFamily: 'Inter, sans-serif', fontSize: '17px'}}>
                File Format: ParcelID | Name | Address | Phone | Email | Desired
                Time | Weight
              </p>
              <p>
                <Button type="link" onClick={downloadSampleCSV} style={{ display: 'inline-block', textAlign: 'center', fontSize: '17px', width: '100%' }}>
                  Download sample file
                </Button>
              </p>
            </Dragger>
            <div style={{ margin: "8px 0" }}>
              <label
                htmlFor="nRiders"
                className="form-label"
                style={{ontFamily: 'Inter, sans-serif', fontSize: '17px', textAlign: "left" }}
              >
                Riders
              </label>{" "}
              <InputNumber
                min={1}
                max={10}
                defaultValue={1}
                onChange={(value) => this.setState({ nRiders: value })}
                style={{ ontFamily: 'Inter, sans-serif', fontSize: '17px', width: "100%", margin: "8px 0" }} // Set width to 100%
              />
            </div>
            <div style={{ textAlign: "center", marginTop:'25px'}}>
              <Button
                type="primary"
                onClick={this.handleFileUpload}
                style={{ width: 'fit-content', display:'fit',lineHeight: '10px', fontSize: '18px', padding:'10px',color: 'white', textAlign: 'center',  backgroundColor: 'black' }}
                disabled={this.state.isLoading}
              >
                Optimize
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftPane;

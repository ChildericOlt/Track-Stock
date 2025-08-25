import React, { useState } from 'react';
import { useMutation, gql } from 'urql';

// 1. Define the GraphQL mutation for file upload
const UPLOAD_FILE_MUTATION = gql`
  mutation UploadSalesData($fileInput: FileUploadInput!) {
    uploadSalesData(fileInput: $fileInput) {
      success
      message
      filePath
    }
  }
`;

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // 2. Use the `useMutation` hook from urql
  const [uploadFileResult, uploadFile] = useMutation(UPLOAD_FILE_MUTATION);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    // Call the mutation with the file content
    const variables = {
      fileInput: {
        filename: file.name,
        file_content: file,
      },
    };

    const { data, error } = await uploadFile(variables);

    if (error) {
      setMessage(`An error occurred: ${error.message}`);
      console.error('Upload error:', error);
    } else if (data.uploadSalesData.success) {
      setMessage(`File uploaded successfully to: ${data.uploadSalesData.filePath}`);
      setFile(null);
    } else {
      setMessage(`Error uploading file: ${data.uploadSalesData.message}`);
    }
  };

  return (
    <div>
      <h2>Import your sales data</h2>
      <p>Please select a CSV or Excel file containing your sales history.</p>
      <input type="file" onChange={handleFileChange} accept=".csv, .xlsx" />
      <button onClick={handleUpload} disabled={uploadFileResult.fetching || !file}>
        {uploadFileResult.fetching ? "Uploading..." : "Start Analysis"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DataUpload;
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

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
  const [uploading, setUploading] = useState(false);

  // 2. Use the `useMutation` hook from Apollo Client
  const [uploadFile, { loading }] = useMutation(UPLOAD_FILE_MUTATION);
const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage(''); // Clear message on new file selection
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      // 3. Call the mutation
      const { data } = await uploadFile({
        variables: {
          fileInput: {
            filename: file.name,
            file_content: file,
          },
        },
      });

      // 4. Handle the response from the GraphQL API
      if (data.uploadSalesData.success) {
        setMessage(`File uploaded successfully to: ${data.uploadSalesData.filePath}`);
        setFile(null); // Clear file input
      } else {
        setMessage(`Error uploading file: ${data.uploadSalesData.message}`);
      }
    } catch (error) {
      setMessage(`An error occurred: ${error.message}`);
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <h2>Import your sales data</h2>
      <p>Please select a CSV or Excel file containing your sales history.</p>
      <input type="file" onChange={handleFileChange} accept=".csv, .xlsx" />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Uploading..." : "Start Analysis"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DataUpload;
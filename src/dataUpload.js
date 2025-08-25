import React, { useState } from 'react';

const DataUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Veuillez d'abord sélectionner un fichier.");
      return;
    }

    setUploading(true);
    // Ici, le code pour uploader vers GCP
    // Nous l'ajouterons à l'étape suivante.
    console.log("Fichier à uploader:", file.name);

    // Placeholder pour le résultat de l'upload
    // Le véritable code d'upload viendra ici.
    setTimeout(() => {
      setUploading(false);
      alert("Fichier uploadé avec succès ! (Simulé)");
    }, 2000);
  };

  return (
    <div>
      <h2>Importer vos données de ventes</h2>
      <p>
        Veuillez sélectionner un fichier CSV ou Excel contenant votre historique de ventes.
      </p>
      <input type="file" onChange={handleFileChange} accept=".csv, .xlsx" />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? "Envoi en cours..." : "Lancer l'analyse"}
      </button>
      {uploading && <p>Votre fichier est en cours d'envoi. Cela peut prendre un moment.</p>}
    </div>
  );
};

export default DataUpload;
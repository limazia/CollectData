import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ onFileUploaded }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);

      setSelectedFileUrl(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: ["image/jpeg", "image/pjpeg", "image/png"],
  });

  if (isDragReject) {
    return alert("Tipo de arquivo não suportado");
  }

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/jpeg, image/pjpeg, image/png" />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt />
      ) : (
        <p>
          <i className="fas fa-file-upload fa-4x pb-2"></i>
          <span>
            <b>Escolha um arquivo</b> ou arraste-o aqui.
          </span>
        </p>
      )}
    </div>
  );
}

export default Dropzone;

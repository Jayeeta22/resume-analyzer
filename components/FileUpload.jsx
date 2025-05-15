"use client";
import { useState } from "react";

export default function FileUpload({ onChange }) {
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/analyze/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("data.text",data)
    if (data?.parsedText) {
        
      onChange(data?.parsedText);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {fileName && <p className="text-sm text-gray-500">Uploaded: {fileName}</p>}
    </div>
  );
}

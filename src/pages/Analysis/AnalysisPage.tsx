import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import { useEffect, useRef, useState } from "react";
import { registerPlugin } from "react-filepond";
registerPlugin(FilePondPluginImagePreview);

const Analysis = () => {
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [files, setFiles] = useState<any>([]);
  const inputRef = useRef<any>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  const handleDisplayFileDetails = () => {
    inputRef.current?.files &&
      setUploadedFileName(inputRef.current.files[0].name);
  };
  const handleTest = () => {
    setUploadedFileName(inputRef.current.files[0].name);
  };

  return (
    <div className="m-3">
      <div>
        <ImageUpload />
      </div>
    </div>
  );
};

export default Analysis;

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<any>();
  const [showPreview, setShowPreview] = useState(false);

  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const inputRef = useRef<any>(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);

    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setUploadedFileName(e.target.files[0].name);
    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="text-center mt-4">
      <input
        ref={inputRef}
        onChange={onSelectFile}
        className="d-none"
        type="file"
      />
      <button
        onClick={handleUpload}
        className={` btn btn-outline-${
          uploadedFileName ? "success" : "primary"
        }`}
      >
        {uploadedFileName ? uploadedFileName : "Upload"}
      </button>

      <button
        className="btn btn-success mx-4"
        onClick={() => setShowPreview(!showPreview)}
        disabled={!selectedFile}
      >
        Preview
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          setSelectedFile(undefined);
          setUploadedFileName("");
        }}
        disabled={!selectedFile}
      >
        Discard
      </button>
      <div className="mt-5">
        {showPreview && <img src={preview} width="600px" />}
      </div>
    </div>
  );
};

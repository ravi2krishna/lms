import clsx from "clsx";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Text from "./Text";

export function UpdateFiles() {
  const [files, setFiles] = useState<File[]>();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    onError(err) {
      toast("Failed to upload the files", {
        type: "error",
      });
    },
  });
  console.log({ files });

  return (
    <div className="max-w-2xl">
      <div className="w-100 h-100">
        {files && files.length > 0 ? (
          <div>
            <ul>
              {files.map((file) => (
                <li
                  key={file.name}
                  className="flex items-center justify-between"
                >
                  <span className="truncate">{file.name}</span>
                  <button className="text-red-400">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setFiles([]);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-primary">Upload</button>
            </div>
          </div>
        ) : (
          <form className="border">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p
                className={clsx(
                  "flex h-40 cursor-pointer items-center justify-center",
                  isDragActive
                    ? "border-primary bg-gray-50 font-semibold"
                    : "border-dotted"
                )}
              >
                {isDragActive
                  ? "Drop the files here ..."
                  : "Drag and drop some files here, or click to select files"}
              </p>
            </div>
            {/* <button className="btn btn-primary">Upload</button> */}
          </form>
        )}
      </div>
    </div>
  );
}

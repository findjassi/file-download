import { useEffect, useState } from "react";
import { fetchFiles } from "../../services/fileService";
import ListHeader from "../common/ListHeader/ListHeader";
import Table from "../common/Table/Table";
import { File } from "../../types/types";

const columns: any = [
  { header: "Name", key: "name" },
  { header: "Device", key: "device" },
  { header: "Path", key: "path" },
  { header: "Status", key: "status" },
];

const FileDownloadComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchFiles().then(setFiles);
  }, []);

  const toggleFileSelection = (file: File) => {
    const updatedSelected = selectedFiles.includes(file)
      ? selectedFiles.filter((f) => f !== file)
      : [...selectedFiles, file];
    setSelectedFiles(updatedSelected);
  };

  return (
    <div>
      <h1>File Download Component</h1>

      {/* ListHeader */}
      <ListHeader />

      {/* Table Component */}
      <Table
        items={files}
        columns={columns}
        selectedItems={selectedFiles}
        onSelectItem={toggleFileSelection}
      />
    </div>
  );
};

export default FileDownloadComponent;

import { useEffect, useState } from "react";
import { fetchFiles } from "../../services/fileService";
import ListHeader from "../common/ListHeader/ListHeader";
import Table from "../common/Table/Table";
import { File } from "../../types/types";
import "./FileDownloadComponent.css";
import { faCircle, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const columns: any = [
  { header: "Name", key: "name" },
  { header: "Device", key: "device" },
  { header: "Path", key: "path" },
  {
    header: "Status",
    key: "status",
    render: (file: File) =>
      file.status === "available" ? (
        <span>
          <FontAwesomeIcon icon={faCircle} color="green" /> Available
        </span>
      ) : (
        <span>Scheduled</span>
      ),
  },
];

const FileDownloadComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const availableFiles = files.filter((file) => file.status === "available");

  useEffect(() => {
    fetchFiles().then(setFiles);
  }, []);

  const toggleFileSelection = (file: File) => {
    const updatedSelected = selectedFiles.includes(file)
      ? selectedFiles.filter((f) => f !== file)
      : [...selectedFiles, file];
    setSelectedFiles(updatedSelected);
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === availableFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(availableFiles);
    }
  };

  const handleDownload = () => {
    const downloadFiles = selectedFiles.map(
      (file) => `${file.device}: ${file.path}`
    );
    alert(`Downloading: \n${downloadFiles.join("\n")}`);
  };

  const isAllSelected = selectedFiles.length === availableFiles.length;
  const isIndeterminate = selectedFiles.length > 0 && !isAllSelected;

  return (
    <div className="file-download-component">
      <h1>File Download Component</h1>

      {/* ListHeader */}
      <ListHeader
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        selectedCount={selectedFiles.length}
        actionLabel="Download Selected"
        actionIcon={faDownload}
        toggleSelectAll={toggleSelectAll}
        onAction={handleDownload}
      />

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

export const fetchFiles = async () => {
    const response = await fetch('/files.json');
    if (!response.ok) {
        throw new Error('Failed to fetch files');
    }
    const data = await response.json();
    return data;
};
  
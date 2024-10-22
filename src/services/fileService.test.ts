import { fetchFiles } from './fileService';

global.fetch = jest.fn();

describe('fetchFiles', () => {
    const mockData = [
        { name: 'netsh.exe', device: 'Luigi', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available' },
        { name: 'smss.exe', device: 'Mario', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled' }
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch files successfully', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
        });

        const files = await fetchFiles();
        expect(global.fetch).toHaveBeenCalledWith('/files.json');
        expect(files).toEqual(mockData);
    });

    test('should throw an error when fetch fails', async () => {
        (global.fetch as jest.Mock).mockResolvedValue({
            ok: false,
        });

        await expect(fetchFiles()).rejects.toThrow('Failed to fetch files');
        expect(global.fetch).toHaveBeenCalledWith('/files.json');
    });
});

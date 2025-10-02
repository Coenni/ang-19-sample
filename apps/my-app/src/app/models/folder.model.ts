export interface FileItem {
  id: string;
  name: string;
  size: string;
  uploaded: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

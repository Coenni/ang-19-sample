const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory folder/file structure
const folders = [
  {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    children: [
      {
        id: 'angular',
        name: 'Angular',
        type: 'folder',
        children: [
          { id: 'readme', name: 'README.md', type: 'file' },
          { id: 'src', name: 'src', type: 'folder', children: [] }
        ]
      }
    ]
  },
  {
    id: 'invoices',
    name: 'Invoices',
    type: 'folder',
    children: [
      { id: 'invoice2025', name: 'invoice-2025.pdf', type: 'file' }
    ]
  }
];

// Helper: find folder by id recursively
function findFolderById(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.type === 'folder' && item.children) {
      const found = findFolderById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

// GET /folders - entire tree
app.get('/folders', (req, res) => {
  res.json(folders);
});

// GET /folders/:id - contents of a folder
app.get('/folders/:id', (req, res) => {
  const folder = findFolderById(folders, req.params.id);
  if (!folder || folder.type !== 'folder') {
    return res.status(404).json({ error: 'Folder not found' });
  }
  res.json(folder.children || []);
});

// Root health check
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
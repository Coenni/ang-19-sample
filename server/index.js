const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory folder/file structure with more detail
const fileSystem = [
  // ... (unchanged)
];

// Helper: find an item (file or folder) by id recursively
function findItemById(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.type === 'folder' && item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

// --- 4-second delay (first call only) logic ---
let firstFoldersCall = true;
let firstFolderContentsCall = true;

// GET /folders - entire tree
app.get('/folders', (req, res) => {
  const sendResponse = () => res.json(fileSystem);

  if (firstFoldersCall) {
    firstFoldersCall = false;
    setTimeout(sendResponse, 4000);
  } else {
    sendResponse();
  }
});

// GET /folders/:id - contents of a specific folder
app.get('/folders/:id', (req, res) => {
  const folder = findItemById(fileSystem, req.params.id);
  const sendResponse = () => {
    if (!folder || folder.type !== 'folder') {
      return res.status(404).json({ error: 'Folder not found' });
    }
    res.json(folder.children || []);
  };

  if (firstFolderContentsCall) {
    firstFolderContentsCall = false;
    setTimeout(sendResponse, 4000);
  } else {
    sendResponse();
  }
});

// GET /files/:id/download - download a dummy file
app.get('/files/:id/download', (req, res) => {
  const file = findItemById(fileSystem, req.params.id);

  if (!file || file.type !== 'file') {
    return res.status(404).json({ error: 'File not found' });
  }

  // Generate some dummy content for the file
  const dummyContent = `This is the dummy content for the file: ${file.name}.

Downloaded at: ${new Date().toISOString()}`;

  // Set response headers to trigger a file download in the browser
  res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
  res.setHeader('Content-Type', 'text/plain'); // Using text/plain for simplicity

  // Send the dummy content as the file body
  res.send(dummyContent);
});

// Root health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'File server is running.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

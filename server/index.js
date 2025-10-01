const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory folder/file structure with more detail
const fileSystem = [
  {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    children: [
      {
        id: 'project-alpha',
        name: 'Project Alpha (Web App)',
        type: 'folder',
        children: [
          { id: 'alpha-readme', name: 'README.md', type: 'file' },
          {
            id: 'alpha-src',
            name: 'src',
            type: 'folder',
            children: [
              { id: 'alpha-main-js', name: 'main.js', type: 'file' },
              { id: 'alpha-styles-css', name: 'styles.css', type: 'file' },
              { id: 'alpha-index-html', name: 'index.html', type: 'file' },
            ]
          },
          {
            id: 'alpha-assets',
            name: 'assets',
            type: 'folder',
            children: [
              { id: 'logo-svg', name: 'logo.svg', type: 'file'}
            ]
          }
        ]
      },
      {
        id: 'project-beta',
        name: 'Project Beta (Mobile App)',
        type: 'folder',
        children: [
          { id: 'beta-planning-docx', name: 'planning.docx', type: 'file' },
          { id: 'beta-spec-pdf', name: 'specifications.pdf', type: 'file' }
        ]
      }
    ]
  },
  {
    id: 'invoices',
    name: 'Invoices',
    type: 'folder',
    children: [
      {
        id: 'invoices-2024',
        name: '2024',
        type: 'folder',
        children: [
          { id: 'inv-jan-2024', name: 'invoice-jan-2024.pdf', type: 'file' },
          { id: 'inv-feb-2024', name: 'invoice-feb-2024.pdf', type: 'file' }
        ]
      },
      { id: 'inv-q1-2025', name: 'invoice-q1-2025.pdf', type: 'file' }
    ]
  },
  {
    id: 'photos',
    name: 'Photos',
    type: 'folder',
    children: [
      {
        id: 'vacation-2025',
        name: 'Vacation 2025',
        type: 'folder',
        children: [
          { id: 'beach-photo-jpg', name: 'beach.jpg', type: 'file' },
          { id: 'mountain-photo-png', name: 'mountains.png', type: 'file' }
        ]
      },
      { id: 'family-gathering-jpg', name: 'family-gathering.jpg', type: 'file' }
    ]
  },
  {
    id: 'notes-txt', name: 'notes.txt', type: 'file'
  }
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

// GET /folders - entire tree
app.get('/folders', (req, res) => {
  res.json(fileSystem);
});

// GET /folders/:id - contents of a specific folder
app.get('/folders/:id', (req, res) => {
  const folder = findItemById(fileSystem, req.params.id);
  if (!folder || folder.type !== 'folder') {
    return res.status(404).json({ error: 'Folder not found' });
  }
  res.json(folder.children || []);
});

// GET /files/:id/download - download a dummy file
app.get('/files/:id/download', (req, res) => {
  const file = findItemById(fileSystem, req.params.id);

  if (!file || file.type !== 'file') {
    return res.status(404).json({ error: 'File not found' });
  }

  // Generate some dummy content for the file
  const dummyContent = `This is the dummy content for the file: ${file.name}.\n\nDownloaded at: ${new Date().toISOString()}`;

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

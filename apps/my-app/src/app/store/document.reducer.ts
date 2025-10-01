import { createReducer, on } from '@ngrx/store';
import { loadFoldersSuccess, selectFolder, loadFolderContentsSuccess } from './document.actions';
import { FileItem } from '../models/folder.model';

export interface DocumentState {
  folders: FileItem[];
  selectedFolderId: string | null;
  selectedFolderContents: FileItem[];
}
const initialState: DocumentState = { folders: [], selectedFolderId: null, selectedFolderContents: [] };

export const documentReducer = createReducer(
  initialState,
  on(loadFoldersSuccess, (state, { folders }) => ({ ...state, folders })),
  on(selectFolder, (state, { folderId }) => ({ ...state, selectedFolderId: folderId })),
  on(loadFolderContentsSuccess, (state, { contents }) => ({ ...state, selectedFolderContents: contents }))
);

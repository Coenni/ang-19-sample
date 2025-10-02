import { createAction, props } from '@ngrx/store';
import { FileItem } from '../models/folder.model';

export const loadFolders = createAction('[Document] Load Folders');
export const loadFoldersSuccess = createAction('[Document] Load Folders Success', props<{ folders: FileItem[] }>());
export const selectFolder = createAction('[Document] Select Folder', props<{ folderId: string|null }>());
export const loadFolderContentsSuccess = createAction('[Document] Load Folder Contents Success', props<{ contents: FileItem[] }>());

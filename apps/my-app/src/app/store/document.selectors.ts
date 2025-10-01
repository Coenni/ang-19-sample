import { createSelector } from '@ngrx/store';
import { DocumentState } from './document.reducer';

export const selectDocumentState = (state: any) => state.document;
export const selectFolders = createSelector(selectDocumentState, (state: DocumentState) => state.folders);
export const selectSelectedFolderId = createSelector(selectDocumentState, (state: DocumentState) => state.selectedFolderId);
export const selectSelectedFolderContents = createSelector(selectDocumentState, (state: DocumentState) => state.selectedFolderContents);

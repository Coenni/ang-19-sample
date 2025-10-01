// document.selectors.ts content goes here

import { createSelector } from '@ngrx/store';
import { State } from './document.reducer';

export const selectDocuments = (state: State) => state.documents;

export const selectDocumentById = (id: number) => createSelector(
    selectDocuments,
    (documents) => documents.find(doc => doc.id === id)
);
// Additional selectors here
}
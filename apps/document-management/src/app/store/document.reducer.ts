// document.reducer.ts content goes here

import { createReducer, on } from '@ngrx/store';
import { loadDocuments, loadDocumentsSuccess } from './document.actions';
import { Document } from '../models/document.model';

export interface State {
    documents: Document[];
    // Additional state properties here
}

export const initialState: State = {
    documents: [],
};

export const documentReducer = createReducer(
    initialState,
    on(loadDocumentsSuccess, (state, { documents }) => ({ ...state, documents }))
    // Additional reducer logic here
);
}
// document.actions.ts content goes here

import { createAction, props } from '@ngrx/store';
import { Document } from '../models/document.model';

export const loadDocuments = createAction('[Document] Load Documents');
export const loadDocumentsSuccess = createAction('[Document] Load Documents Success', props<{ documents: Document[] }>());
export const loadDocumentsFailure = createAction('[Document] Load Documents Failure', props<{ error: any }>());
// Additional actions here
}
// document.effects.ts content goes here

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DocumentService } from '../services/document.service';
import { loadDocuments, loadDocumentsSuccess, loadDocumentsFailure } from './document.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class DocumentEffects {
    constructor(private actions$: Actions, private documentService: DocumentService) {}

    loadDocuments$ = createEffect(() => this.actions$.pipe(
        ofType(loadDocuments),
        mergeMap(() => this.documentService.getDocuments().pipe(
            map(documents => loadDocumentsSuccess({ documents })),
            catchError(error => loadDocumentsFailure({ error }))
        ))
    ));
    // Additional effects here
}
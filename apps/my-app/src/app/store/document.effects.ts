import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DocumentService } from '../services/document.service';
import { loadFolders, loadFoldersSuccess, selectFolder, loadFolderContentsSuccess } from './document.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class DocumentEffects {
  loadFolders$;
  loadFolderContents$;

  constructor(
    private actions$: Actions,
    private documentService: DocumentService
  ) {
    this.loadFolders$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadFolders),
        mergeMap(() => this.documentService.getFolders()
          .pipe(map(folders => loadFoldersSuccess({ folders })))
        )
      )
    );

    this.loadFolderContents$ = createEffect(() =>
      this.actions$.pipe(
        ofType(selectFolder),
        mergeMap(action =>
          this.documentService.getFolderContents(action.folderId)
            .pipe(map(contents => loadFolderContentsSuccess({ contents })))
        )
      )
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FileItem } from './models/folder.model';
import { selectFolders, selectSelectedFolderId, selectSelectedFolderContents } from './store/document.selectors';
import { loadFolders, selectFolder } from './store/document.actions';
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentViewComponent } from './components/content-view/content-view.component';

@Component({
  selector: 'app-root',
  standalone: false,
  // imports: [AsyncPipe, SidebarComponent, ContentViewComponent],
  template: `
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <app-sidebar
            [folders]="folders$ | async"
            [selectedId]="selectedId$ | async"
            (folderSelected)="onFolderSelected($event)"
          >
          </app-sidebar>
        </div>
        <div class="col-9">
          <app-content-view [contents]="contents$ | async"></app-content-view>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  folders$: Observable<FileItem[]>;
  selectedId$: Observable<string | null>;
  contents$: Observable<FileItem[]>;

  constructor(private store: Store) {
    this.folders$ = this.store.select(selectFolders);
    this.selectedId$ = this.store.select(selectSelectedFolderId);
    this.contents$ = this.store.select(selectSelectedFolderContents);
  }

  ngOnInit() {
    this.store.dispatch(loadFolders());
  }
  onFolderSelected(folderId: string|null) {
    this.store.dispatch(selectFolder({ folderId }));
  }
}

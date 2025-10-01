import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContentViewComponent } from './components/content-view/content-view.component';
import { StoreModule } from '@ngrx/store';
import { documentReducer } from './store/document.reducer';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from './store/document.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, SidebarComponent, ContentViewComponent],
  imports: [BrowserModule, CommonModule , RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ document: documentReducer }),
    EffectsModule.forRoot([DocumentEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}

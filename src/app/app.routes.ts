import { Routes } from '@angular/router';
import { VcardComponent } from './pages/vcard/vcard.component';

export const routes: Routes = [
  { path: 'id/:slug', component: VcardComponent },
  { path: '', redirectTo: 'id/ejemplo', pathMatch: 'full' }, // Temporal para pruebas
  { path: '**', redirectTo: '' }
];
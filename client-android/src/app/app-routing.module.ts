import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileHistoryComponent } from './components/profile-history/profile-history.component';
import { BookSingleComponent } from './components/book-single/book-single.component';
import { ProfileBooksComponent } from './components/profile-books/profile-books.component';
import { ProfileReportsComponent } from './components/profile-reports/profile-reports.component';
import { UsersChatComponent } from './components/users-chat/users-chat.component';
import { ReaderComponent } from './components/reader/reader.component';


const routes: Routes = [
  {path: '', redirectTo: 'libros', pathMatch: 'full'},
  {path: 'libros', component: BooksComponent, pathMatch: 'full'},
  {path: 'libros/:id', component: BookSingleComponent},
  {path: 'perfil', component: ProfileComponent, pathMatch: 'full'},
  {path: 'perfil/historial', component: ProfileHistoryComponent, pathMatch: 'full'},
  {path: 'perfil/libros', component: ProfileBooksComponent, pathMatch: 'full'},
  {path: 'perfil/reportes', component: ProfileReportsComponent, pathMatch: 'full'},
  {path: 'usuarios/chat', component: UsersChatComponent, pathMatch: 'full'},
  {path: 'libros/lectura/:id', component: ReaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [BooksComponent, ProfileComponent, ProfileHistoryComponent, BookSingleComponent, ProfileBooksComponent, ProfileReportsComponent, UsersChatComponent]
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderRecentBooksComponent } from './components/header-recent-books/header-recent-books.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookSingleComponent } from './components/book-single/book-single.component';
// import { BooksComponent } from './components/books/books.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FooterComponent } from './components/footer/footer.component';
// import { ProfileComponent } from './components/profile/profile.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileSidenavComponent } from './components/profile-sidenav/profile-sidenav.component';
import { ModalComponent } from './components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import { UsersChatComponent } from './components/users-chat/users-chat.component';
// import { ProfileReportsComponent } from './components/profile-reports/profile-reports.component';
// import { ProfileBooksComponent } from './components/profile-books/profile-books.component';
// import { ProfileHistoryComponent } from './components/profile-history/profile-history.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderRecentBooksComponent,
    BookCardComponent,
    BookSingleComponent,
    // BooksComponent,
    CategoriesComponent,
    PaginationComponent,
    FooterComponent,
    // ProfileComponent,
    ProfileHeaderComponent,
    ProfileSidenavComponent,
    // ProfileHistoryComponent,
    routingComponents,
    ModalComponent,
    // UsersChatComponent,
    // ProfileReportsComponent,
    // ProfileBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

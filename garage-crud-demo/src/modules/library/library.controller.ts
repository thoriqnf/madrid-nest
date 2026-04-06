import { Controller, Get } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get('books-with-authors')
  async getBooksWithAuthors() {
    return this.libraryService.findBooksWithAuthors();
  }

  @Get('members-loans')
  async getMembersWithLoans() {
    return this.libraryService.findMembersWithLoansStatus();
  }

  @Get('active-loans')
  async getActiveLoans() {
    return this.libraryService.findActiveLoanDetails();
  }

  @Get('unread-books')
  async getUnreadBooks() {
    return this.libraryService.findBooksNeverBorrowed();
  }
}

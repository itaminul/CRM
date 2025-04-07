import { Controller, Get, HttpStatus, UseFilters } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ExceptionsFilter } from 'src/filters/all-exceptions';
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
    @UseFilters(new ExceptionsFilter())
  async getAll() {
    try {
      const contacts = await this.contactService.getAll();
      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: contacts.length
          ? 'Contacts retrieved successfully'
          : 'No contacts found',
        data: contacts
      };
    } catch (error) {
      return {
        success: false,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to retrieve contacts',
        error: error.message
      }
    }
  }
}

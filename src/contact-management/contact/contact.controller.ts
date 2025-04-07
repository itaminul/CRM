import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
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

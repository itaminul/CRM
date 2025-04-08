import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactCreateDto } from './dto/create.contact.dto';
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getAll() {
    try {
      const contacts = await this.contactService.getAll();
      if (!contacts || contacts.length === 0) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Data not found',
        };
      }

      // Map the contacts to include the fullName property
      const contactsWithFullName = contacts.map((contact) => ({
        ...contact,
        fullName: contact.fullName, // Include the computed fullName property
      }));

      return contactsWithFullName;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async create(@Body() contactDto: ContactCreateDto) {
    try {
      const contactData = await this.contactService.create(contactDto);
      return contactData;
    } catch (error) {
      throw error;
    }
  }
}

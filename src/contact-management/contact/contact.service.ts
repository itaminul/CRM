import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { Repository } from 'typeorm';
import { ContactCreateDto } from './dto/create.contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async getAll() {
    try {
      return await this.contactRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async create(contactDto: ContactCreateDto) {
    try {
      const contactData = await this.contactRepository.create(contactDto);
      return this.contactRepository.save(contactData);
    } catch (error) {
      throw error;
    }
  }
}

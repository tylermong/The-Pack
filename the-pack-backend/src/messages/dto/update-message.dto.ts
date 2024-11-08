import { PartialType } from '@nestjs/mapped-types';
import { CreateMessagesDto } from './create-message.dto';

export class UpdateMessagesDto extends PartialType(CreateMessagesDto) {}

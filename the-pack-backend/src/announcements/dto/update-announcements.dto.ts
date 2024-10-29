import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementsDto } from './create-announcements.dto';

export class UpdateAnnouncementsDto extends PartialType(CreateAnnouncementsDto) {}
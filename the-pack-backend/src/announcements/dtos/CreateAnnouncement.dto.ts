export class CreateAnnouncementDto {
    title: string;
    content: string;
    coach: { connect: { id: string } }; 
  }
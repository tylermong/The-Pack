import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomController } from './chatroom.controller';
import { ChatroomService } from './chatroom.service';

describe('ChatroomController', () => {
  let controller: ChatroomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomController],
      providers: [ChatroomService],
    }).compile();

    controller = module.get<ChatroomController>(ChatroomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

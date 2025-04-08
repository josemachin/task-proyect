import { validate } from 'class-validator';
import { TaskDto } from './task.dto';
import { ImageDto } from './image.dto';

describe('TaskDto', () => {

  it('should be valid with correct values', async () => {
    const imageDto = new ImageDto();
    imageDto.path = '/path/to/image/file.jpg';
    imageDto.resolution = '800px';
    imageDto.md5 = '8e358ac881c51d27249bdc4f44904397';

    const taskDto = new TaskDto();
    taskDto.taskId = '604b2f549c1d2e0eef2686ac';
    taskDto.status = 'completed';
    taskDto.price = 29.99;
    taskDto.images = [imageDto];

    const errors = await validate(taskDto);
    expect(errors.length).toBe(0); // Should have no validation errors
  });

  it('should throw an error if taskId is not a string', async () => {
    const taskDto = new TaskDto();
    (taskDto as any).taskId = 12345;

    const errors = await validate(taskDto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors.some(e => e.property === 'taskId')).toBe(true);
  });

  it('should throw an error if status is not a string', async () => {
    const taskDto = new TaskDto();
    (taskDto as any).status = false;

    const errors = await validate(taskDto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors.some(e => e.property === 'status')).toBe(true);
  });

  it('should throw an error if price is not a number', async () => {
    const taskDto = new TaskDto();
    (taskDto as any).price = 'free';

    const errors = await validate(taskDto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors.some(e => e.property === 'price')).toBe(true);
  });

  it('should be valid without images', async () => {
    const taskDto = new TaskDto();
    taskDto.taskId = '604b2f549c1d2e0eef2686ac';
    taskDto.status = 'completed';
    taskDto.price = 29.99;

    const errors = await validate(taskDto);
    expect(errors.length).toBe(0); // Should have no validation errors
  });

  it('should throw an error if images is not an array', async () => {
    const taskDto = new TaskDto();
    (taskDto as any).images = {};

    const errors = await validate(taskDto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors.some(e => e.property === 'images')).toBe(true);
  });

});

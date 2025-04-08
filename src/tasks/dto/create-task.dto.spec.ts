import { validate } from 'class-validator';
import { CreateTaskDto } from './createTask.dto';

describe('CreateTaskDto', () => {

  it('should be valid when pathOrUrl is a non-empty string', async () => {
    const dto = new CreateTaskDto();
    dto.pathOrUrl = '/path/to/original/file.jpg';

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Should have no validation errors
  });

  it('should throw an error if pathOrUrl is not a string', async () => {
    const dto = new CreateTaskDto();
    (dto as any).pathOrUrl = 12345;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors[0].constraints?.isString).toBe('pathOrUrl must be a string');
  });

  it('should throw an error if pathOrUrl is empty', async () => {
    const dto = new CreateTaskDto();
    dto.pathOrUrl = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors[0].constraints?.isNotEmpty).toBe('pathOrUrl should not be empty');
  });

});

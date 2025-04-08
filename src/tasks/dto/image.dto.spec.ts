import { validate } from 'class-validator';
import { ImageDto } from './image.dto';

describe('ImageDto', () => {

  it('should be valid when all properties are strings', async () => {
    const dto = new ImageDto();
    dto.path = '/path/to/image/file.jpg';
    dto.resolution = '800px';
    dto.md5 = '8e358ac881c51d27249bdc4f44904397';

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Should have no validation errors
  });

  it('should throw an error if path is not a string', async () => {
    const dto = new ImageDto();
    (dto as any).path = 12345;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors.some(e => e.property === 'path')).toBe(true);
  });

  it('should throw an error if resolution is not a string', async () => {
    const dto = new ImageDto();
    (dto as any).resolution = 600;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors.some(e => e.property === 'resolution')).toBe(true);
  });

  it('should throw an error if md5 is not a string', async () => {
    const dto = new ImageDto();
    (dto as any).md5 = true;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Should have validation errors
    expect(errors.some(e => e.property === 'md5')).toBe(true);
  });

});

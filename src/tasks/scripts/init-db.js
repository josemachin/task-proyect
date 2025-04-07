import mongoose, { connect, model, Types, connection } from 'mongoose';
const { Schema } = mongoose;
import { TaskSchema } from '../tasks/schemas/task.schema';
import { ImageSchema } from '../tasks/schemas/image.schema';

// Conectar a la base de datos
connect('mongodb://localhost:27017/nest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Task = model('Task', TaskSchema);
const Image = model('Image', ImageSchema);

async function initializeDb() {
  try {
    const tasksData = [];
    const imagesData = [];

    for (let i = 1; i <= 10; i++) {
      const taskId = new Types.ObjectId();
      const imageId1 = new Types.ObjectId();
      const imageId2 = new Types.ObjectId();

      tasksData.push({
        _id: taskId,
        status: i % 2 === 0 ? 'completed' : 'pending',
        price: 20 + i * 5,
        originalPath: `/input/image${i}.jpg`,
        images: [imageId1, imageId2],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      imagesData.push(
        {
          _id: imageId1,
          path: `/output/image${i}/1024/f322b730b287.jpg`,
          resolution: '1024',
          md5: `md5hash${i}01`,
          task: taskId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: imageId2,
          path: `/output/image${i}/800/202fd8b3174.jpg`,
          resolution: '800',
          md5: `md5hash${i}02`,
          task: taskId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      );
    }

    await Task.create(tasksData);
    await Image.create(imagesData);

    console.log('Database initialized with sample data!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    connection.close();
  }
}

initializeDb();

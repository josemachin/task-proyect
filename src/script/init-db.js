const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TaskSchema } = require('../tasks/schemas/task.schema');
const { ImageSchema } = require('../tasks/schemas/image.schema');

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/nest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Task = mongoose.model('Task', TaskSchema);
const Image = mongoose.model('Image', ImageSchema);

async function initializeDb() {
  try {
    const completedTaskId = new mongoose.Types.ObjectId();
    const image1Id = new mongoose.Types.ObjectId();
    const image2Id = new mongoose.Types.ObjectId();

    const taskData = {
      _id: completedTaskId,
      status: 'completed',
      price: 25.5,
      originalPath: '/input/image1.jpg',
      images: [image1Id, image2Id],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const image1Data = {
      _id: image1Id,
      path: '/output/image1/1024/f322b730b287.jpg',
      resolution: '1024',
      md5: 'f322b730b287da77e1c519c7ffef4fc2',
      task: completedTaskId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const image2Data = {
      _id: image2Id,
      path: '/output/image1/800/202fd8b3174.jpg',
      resolution: '800',
      md5: '202fd8b3174a774bac24428e8cb230a1',
      task: completedTaskId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await Task.create([taskData]);
    await Image.create([image1Data, image2Data]);

    console.log('Database initialized with sample data!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
}

initializeDb();

import fs from 'fs';
import util from 'util';

const unlinkAsync = util.promisify(fs.unlink);

class ImageDeleter {
    async deleteImage(imagePath: string): Promise<void> {
        try {
            await unlinkAsync(imagePath);
        } catch (error) {
            throw new Error('Erro ao excluir a imagem');
        }
    }
}

export default new ImageDeleter();

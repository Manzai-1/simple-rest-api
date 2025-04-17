import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'data', 'vehicles.json');

export const getContent = async () => {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return response(true, await JSON.parse(fileContent));
    } catch ( error ) {
        console.error(error);
        return response(false, `Could not read from storage.`);
    }
}

export const setContent = async (content) => {
    try {
        await fs.writeFile(filePath, JSON.stringify(content), 'utf-8');
        return response(true);
    } catch ( error ) {
        console.error(error);
        return response(false, `Could not write to storage.`);
    }
}

const response = (bool, data=null) => {
    return {ok: bool, data: data};
}

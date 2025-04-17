import express from 'express';
import { 
    addVehicle, 
    deleteVehicle, 
    getVehicle, 
    getVehicleByID, 
    updateVehicle, 
    updateVehicleNull 
} from './serverHelper.mjs';

const app = express();

//Middleware
app.use(express.json());

app.get('/api/vehicles', async (req, res)=>{
    const result = await getVehicle();
    res.status(result.statusCode).json(result.body);
});

app.get('/api/vehicles/:id', async (req, res)=>{
    const {id} = req.params;
    const result = await getVehicleByID(id);
    res.status(result.statusCode).json(result.body);
});

app.post('/api/vehicles', async (req, res)=>{
    const result = await addVehicle(req.body);
    res.status(result.statusCode).json(result.body);
});

app.delete('/api/vehicles/:id', async (req, res) => {
    const {id} = req.params;
    const result = await deleteVehicle(id);
    res.status(result.statusCode).json(result.body);
});

app.patch('/api/vehicles', async (req, res) => {
    const result = await updateVehicle(req.body);
    res.status(result.statusCode).json(result.body);
});

app.put('/api/vehicles', async (req, res) => {
    const result = await updateVehicleNull(req.body);
    res.status(result.statusCode).json(result.body);
});

const PORT = 3000;
app.listen(PORT, ()=>{console.log(`Servern lyssnar på port ${PORT}`)});


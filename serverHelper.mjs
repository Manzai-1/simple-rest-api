import { v4 as uuidv4 } from 'uuid';
import { result } from "./result.mjs";
import { getContent, setContent } from "./storage.mjs"

export const getVehicle = async () => {
    const response = await getContent();

    return response.ok ? 
        result(true, 200, response.data): 
        result(false, 500, response.data);
}

export const getVehicleByID = async (id) => {
    if (!id) return result(false, 400, "Request is missing an ID");

    const response = await getContent();
    if (!response.ok) return result(false, 500, response.data);

    const vehicle = findByID(response.data, id);
    if (!vehicle) return result(false, 404, `No vehicle with ID [${id}] exists.`);

    return result(true, 200, vehicle);
}

export const addVehicle = async (vehicle) => {
    if (!isValidVehicle(vehicle)) {
        return result(false, 400, "Request is missing required information.");
    }

    let response = await getContent();
    if (!response.ok) return result(false, 500, response.data);

    vehicle.id = generateID();
    const vehicles = response.data;
    vehicles.push(vehicle);

    response = await setContent(vehicles);
    return response.ok ? 
        result(true, 201, vehicle): 
        result(false, 500, response.data);
}

export const updateVehicle = async (vehicle) => {
    if (!vehicle.id) return result(false, 400, "Request is missing an ID");

    let response = await getContent();
    if (!response.ok) return result(false, 500, response.data);

    if (!findByID(response.data, vehicle.id)) {
        return result(false, 404, `No vehicle with ID [${vehicle.id}] exists.`);
    }

    const vehicles = updateByObjectID(response.data, vehicle);

    response = await setContent(vehicles);
    return response.ok ? 
        result(true, 204): 
        result(false, 500, response.data);
}

export const updateVehicleNull = async (vehicle) => {
    const fields = 
    [
        "registrationNo",
        "make",
        "model",
        "modelYear",
        "imageUrl",
        "mileage",
        "value"
    ];

    fields.forEach((field) => {
        vehicle[field] = vehicle[field] ? 
            vehicle[field] : null;
    });

    return await updateVehicle(vehicle);
}

export const deleteVehicle = async (id) => {
    if (!id) return result(false, 400, "Request is missing an ID");

    let response = await getContent();
    if (!response.ok) return result(false, 500, response.data);

    if (!findByID(response.data, id)) {
        return result(false, 404, `No vehicle with ID [${id}] exists.`);
    }

    const vehicles = deleteByID(response.data, id);
    response = await setContent(vehicles);
    
    return response.ok ? 
        result(true, 204): 
        result(false, 500, response.data);
}

const generateID = () => {
    return uuidv4().replaceAll('-','');
}

const findByID = (list, id) => {
    return list.find((item) => item.id === id);
}

const deleteByID = (list, id) => {
    return list.filter((item) => item.id !== id);
}

const updateByObjectID = (list, obj) => {
    return list.map((item) => item.id !== obj.id ? 
        item : {...item, ...obj});
}

const isValidVehicle = (vehicle) => {
    return (
        !vehicle 
        || !vehicle.registrationNo 
        || !vehicle.make
        || !vehicle.model
        || !vehicle.modelYear
        || !vehicle.imageUrl 
        || !vehicle.mileage
        || !vehicle.value
    ) ? false : true;
}
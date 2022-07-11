import * as employeeRepository from "./../repositories/employeeRepository.js";

export async function findEmployeeId (id : number) {
    const checkId = await employeeRepository.findById(id);
    return checkId;
}
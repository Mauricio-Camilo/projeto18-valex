import * as companyRepository from "./../repositories/companyRepository.js";

export async function findCompanyAPI (API_Key : string) {
    const checkAPI_Key = await companyRepository.findByApiKey(API_Key);
    return checkAPI_Key;
}
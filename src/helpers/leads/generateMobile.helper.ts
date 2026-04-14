import { faker } from "@faker-js/faker";

export function generateMobile(){
    return `9${faker.string.numeric(9)}`;
}
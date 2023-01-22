import * as joi from 'joi';


const UUID_PATTERN = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;

export const USER_SCHEMA = joi.object({
    login: joi.string()
        .alphanum()
        .min(3).max(20)
        .required(),
    password: joi.string()
            .alphanum()
            .min(8)
            .max(16)
            .required(),
    age: joi.number()
            .less(130)
            .greater(3)
            .required(),
    id: joi.string().pattern(UUID_PATTERN).required(),
    isDeleted: joi.boolean().required(),
});
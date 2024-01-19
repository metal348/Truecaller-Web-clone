const zod = require("zod")

const signup = zod.object({
    phone : zod.string().regex(/^\d{1,15}$/),
    email : zod.string().email(),
    password : zod.string().refine((value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return regex.test(value);
      })
})

const userDetails = zod.object({
    Name : zod.string(),
    phone: zod.string().regex(/^\d{10}$/),
    city: zod.string(),
    State : zod.string(),
    simCompany: zod.string()
})

const searchUser = zod.object({
    phone: zod.string().regex(/^\d{10}$/),
})

module.exports = {
    searchUser: searchUser,
    userDetails: userDetails,
    signup: signup
}
export const asyncHandler = (asyncFunction) => {
    return async (req, res, next) => {
        try {
            await asyncFunction(req, res, next);
        }
        catch (error) {
            next(error)
        }
    }
}

//* higher order function this will help us to deal with asynchronus function 
//* here an asynchronus function will be passed and generally for the request we are dealing 
//* so we will get the access to a req res and next(for middlewares)

//*! here we have to define the asyncFunction actually
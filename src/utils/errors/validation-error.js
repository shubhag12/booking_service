const {StatusCodes}=require('http-status-codes');
class ValidationError extends Error{
    constructor(mesage,explanation,statusCodes) {
        
    }
}
// creat a custom express Error class

class expressError extends Error{
    constructor(statusCode,message){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = expressError;

export const result = (status, statusCode, data=null) => {
    const res = {
        statusCode: statusCode, 
        body: {success: status}
    };

    if( data ) {
        status ? res.body.data = data : res.body.error = data;
    }

    return res;
}
export const result = (status, statusCode, data=null) => {
    const res = { statusCode: statusCode };

    if( data ) {
        res.body = {success: status};
        status ? res.body.data = data : res.body.error = data;
    }

    return res;
}
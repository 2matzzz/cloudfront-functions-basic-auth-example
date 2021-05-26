var user = 'CHANGEME';
var password = 'CHANGEME';

function base64urlDecode(str) {
    return String.bytesFrom(str, 'base64url').trim()
}

function auth(authString) {
    var segments = authString.split(' ');
    if (segments.length !== 2) {
        return false;
    }
    var requestBase64DecodedAuthString = base64urlDecode(segments[1]);
    var expectedAuthString = user + ':' + password;
    if (requestBase64DecodedAuthString === expectedAuthString) {
        return true;
    }
    return false;
}
function handler(event) {
    // // Require Basic authentication
    if (event.request.headers.authorization && event.request.headers.authorization.value !== '') {
        if (auth(event.request.headers.authorization.value)){
            console.log('Pass');
            return event.request;
        }
    }
    console.log('Unauthorized');
    var response = {
        statusCode: 401,
        statusDescription: 'Unauthorized',
        headers:
            { "www-authenticate": { "value": 'Basic realm="restricted area", charset="UTF-8"' } }
    }
    return response;
}
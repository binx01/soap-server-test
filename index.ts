import * as http from 'http';
import * as soap from 'soap';
import * as fs from 'fs';

const soapService = {
    SoapService: {
        SoapService_Port: {
            Login: (args) => {
                console.log(args.User);
                console.log(args.Password);
                return {
                    LoginResult: 'some-token'
                }
            }
        }
    }
}
const wsdl = fs.readFileSync('wsdl.wsdl', 'utf-8');
const server = http.createServer((request, response) => {
    response.end("404: Not found: " + request.url);
});
server.listen(8000);

const soapServer = soap.listen(server, '/soapserver', soapService, wsdl);
console.log(soapServer.path);
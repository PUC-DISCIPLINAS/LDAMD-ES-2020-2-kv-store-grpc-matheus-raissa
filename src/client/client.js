const PROTO = '././clients.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
}

let packageDefinition  = protoLoader.loadSync(PROTO, options);
const clientServer = grpc.loadPackageDefinition(packageDefinition).ClientService;
const client = new ClientService("localhost:50051", grpc.credentials.createInsecure());

module.exports = client;
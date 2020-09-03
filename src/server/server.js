const PROTO = "././clients.proto";

let grpc = require("grpc");
let protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true
}

let packageDefinition  = protoLoader.loadSync(PROTO, options);
let clientsProto = grpc.loadPackageDefinition(packageDefinition);

const { v4 : uuidv4 } = require("uuid");

const server = new grpc.Server();
/**
 * database in memory
 */
const clients = [
  {
    id: "790073e6-ee1a-11ea-adc1-0242ac120002",
    name: "Matheus Santos Rosa Carneiro",
    age: 21,
    address: "Coreu"
  },
  {
    id: "938b6c7a-ee1a-11ea-adc1-0242ac120002",
    name: "Raissa Carolina Vilela da Silva",
    age: 21,
    address: "Liba"
  }
];

server.addService(clientsProto.ClientService.service, {
  
  getAll: (_, callback) => {
    callback(null, { clients });
  },

  get: (call, callback) => {
    let client = clients.find(
      n => n.id == call.request.id
    );
    
    if(client) {
      callback(null, client);
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "Not found!" });
    }
  },

  insert: (call, callback) => {
    let client = call.request;
    client.id = uuidv4();
    clients.push(client);
    callback(null, client);
  },

  update: (call, callback) => {
    let clientExists = clients.find(
      n => n.id == call.request.id
    );
    
    if(clientExists) {
      clientExists.name = call.request.name;
      clientExists.age = call.request.age;
      clientExists.address = call.request.address;
      callback(null, clientExists);
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "Not found!" });
    }
  }
});

server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://0.0.0.0:50051");
server.start();
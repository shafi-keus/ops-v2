// /// <reference path="../generated/broker_pb.d.ts" />
// import Client from '../';
// import { Any } from 'google-protobuf/google/protobuf/any_pb';
// import { DefaultServiceRequest, ValidationRequest } from '../generated/broker_pb';
// import { TypeConversionUtils } from '../utils/TypeConversionUtils';
// // import { TypeRegistry } from '../constants/type-registry';

// const client = new Client('localhost', 6020);
// // TypeConversionUtils.getInstance().buildRegistry(TypeRegistry);

// const validation = new ValidationRequest();
// validation.setJsonBody(
//   JSON.stringify({
//     type: 'USER',
//     deviceKey: '1e1dff5c7c84ca5a9a7bd8643a4fe1528720ea30',
//     secretKey: 'oUxYo9Wmvs',
//   })
// );

// client.start(validation, (err: Error, resp: object) => {
//   //err will be error type, resp will login resp type
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(resp);
//     const defaultService = new DefaultServiceRequest();
//     defaultService.setDefaultServiceName('DefaultService');
//     defaultService.setServicePassword('ABCDE');
//     client.registerDefaultService(
//       defaultService,
//       async function (arg: Any) {
//         console.log('This is default service');
//         return new Any();
//       },
//       function (err, resp) {
//         console.log(err ? err.message : err, resp);
//       }
//     );

//     client.registerService('Test', function (arg: Any): Promise<Any> {
//       let unpackedObj = TypeConversionUtils.getInstance().unpackFromAny(arg);
//       switch (unpackedObj.constructor) {
//         default:
//           //default handler
//           return new Promise<Any>((resolve, reject) => {
//             resolve(new Any());
//           });
//       }
//     });
//     console.log('Service Registered');
//   }
// });

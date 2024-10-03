// /// <reference path="../generated/broker_pb.d.ts" />

// import { Any } from 'google-protobuf/google/protobuf/any_pb';
// import Client from '../';
// // import { ResponseData } from "../generated/broker_pb";
// // import { TypeRegistry } from '../constants/type-registry';
// import { ValidationRequest } from '../generated/broker_pb';
// import { RequestOtp, LoginUser, LoginUserResponse } from './user_pb';

// const client = new Client('0.0.0.0', 6020);
// // TypeConversionUtils.getInstance().buildRegistry(TypeRegistry);

// console.log('Logging in');

// const validation = new ValidationRequest();
// validation.setJsonBody(
//   JSON.stringify({
//     type: 'USER',
//     deviceKey: 'd9c4e328ecb8a40f793631a334c7f19af11cb99e',
//     secretKey: 'ACmzT5lD3i',
//   })
// );

// client.start(validation, (err: unknown, resp: object) => {
//   // err will be error type, resp will login resp type
//   console.log('Conn established');
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log('Res', resp);
//     // const sendObj = getRequestObj();
//     // client.makeRPC('Test', sendObj, (error: Error | null, res: Any): void => {
//     //   console.log('Got res', res);
//     //   let obj = TypeConversionUtils.getInstance().unpackFromAny(
//     //     res ? res : new Any()
//     //   );
//     //   console.log('GOT THE RPC RESPONSE', obj, error);
//     // });
//   }
// });

// //OTP
// // const otpReq = new RequestOtp();
// // otpReq.setPhone('+919704945899');
// // var anyObj = new Any();
// // anyObj.pack(otpReq.serializeBinary(), 'com.keus.cloud.RequestOtp');

// //LOGIN
// // const loginUserReq = new LoginUser();
// // loginUserReq.setDeviceId('ABC');
// // loginUserReq.setPhone('+919704945899');
// // loginUserReq.setDeviceName('Samsung');
// // loginUserReq.setDeviceType('AN');
// // loginUserReq.setOtp(416695);
// // loginUserReq.setRemember(true);
// // let anyObj = new Any();
// // anyObj.pack(loginUserReq.serializeBinary(), 'com.keus.cloud.LoginUser');

// // client.makeRPC('CLOUD-UN-AUTH-GATEWAY', anyObj, function (err, resp) {
// //   let unpackObj = new Any();

// //   let response = resp.unpack(LoginUserResponse.deserializeBinary, 'com.keus.cloud.LoginUserResponse');

// //   console.log('unpacked response', err, response.getMessage(), response.getUserdata());
// //   console.log('normal response', resp);
// // });

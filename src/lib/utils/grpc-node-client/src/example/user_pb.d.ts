// package: com.keus.cloud
// file: cloud/user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class LoginData extends jspb.Message { 
    getUserPhone(): string;
    setUserPhone(value: string): void;

    getUserEmail(): string;
    setUserEmail(value: string): void;

    getUserName(): string;
    setUserName(value: string): void;

    getDateOfBirth(): string;
    setDateOfBirth(value: string): void;

    getDeviceKey(): string;
    setDeviceKey(value: string): void;

    getSecretKey(): string;
    setSecretKey(value: string): void;

    getValidity(): number;
    setValidity(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginData.AsObject;
    static toObject(includeInstance: boolean, msg: LoginData): LoginData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginData;
    static deserializeBinaryFromReader(message: LoginData, reader: jspb.BinaryReader): LoginData;
}

export namespace LoginData {
    export type AsObject = {
        userPhone: string,
        userEmail: string,
        userName: string,
        dateOfBirth: string,
        deviceKey: string,
        secretKey: string,
        validity: number,
    }
}

export class GetOtp extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetOtp.AsObject;
    static toObject(includeInstance: boolean, msg: GetOtp): GetOtp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetOtp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetOtp;
    static deserializeBinaryFromReader(message: GetOtp, reader: jspb.BinaryReader): GetOtp;
}

export namespace GetOtp {
    export type AsObject = {
        phone: string,
    }
}

export class GetOtpResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetOtpResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetOtpResponse): GetOtpResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetOtpResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetOtpResponse;
    static deserializeBinaryFromReader(message: GetOtpResponse, reader: jspb.BinaryReader): GetOtpResponse;
}

export namespace GetOtpResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

export class LoginUser extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    getOtp(): number;
    setOtp(value: number): void;

    getDeviceId(): string;
    setDeviceId(value: string): void;

    getDeviceType(): string;
    setDeviceType(value: string): void;

    getDeviceName(): string;
    setDeviceName(value: string): void;

    getRemember(): boolean;
    setRemember(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginUser.AsObject;
    static toObject(includeInstance: boolean, msg: LoginUser): LoginUser.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginUser, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginUser;
    static deserializeBinaryFromReader(message: LoginUser, reader: jspb.BinaryReader): LoginUser;
}

export namespace LoginUser {
    export type AsObject = {
        phone: string,
        email: string,
        otp: number,
        deviceId: string,
        deviceType: string,
        deviceName: string,
        remember: boolean,
    }
}

export class LoginUserResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasUserdata(): boolean;
    clearUserdata(): void;
    getUserdata(): LoginData | undefined;
    setUserdata(value?: LoginData): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoginUserResponse): LoginUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginUserResponse;
    static deserializeBinaryFromReader(message: LoginUserResponse, reader: jspb.BinaryReader): LoginUserResponse;
}

export namespace LoginUserResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
        userdata?: LoginData.AsObject,
    }
}

export class AssignSuperUser extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;

    getTargetPhone(): string;
    setTargetPhone(value: string): void;

    getGatewayId(): string;
    setGatewayId(value: string): void;

    getGatewayKey(): string;
    setGatewayKey(value: string): void;

    getOtp(): number;
    setOtp(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssignSuperUser.AsObject;
    static toObject(includeInstance: boolean, msg: AssignSuperUser): AssignSuperUser.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssignSuperUser, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssignSuperUser;
    static deserializeBinaryFromReader(message: AssignSuperUser, reader: jspb.BinaryReader): AssignSuperUser;
}

export namespace AssignSuperUser {
    export type AsObject = {
        phone: string,
        targetPhone: string,
        gatewayId: string,
        gatewayKey: string,
        otp: number,
    }
}

export class AssignSuperUserResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;

    getUserInfo(): string;
    setUserInfo(value: string): void;

    getTargetUserInfo(): string;
    setTargetUserInfo(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AssignSuperUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AssignSuperUserResponse): AssignSuperUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AssignSuperUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AssignSuperUserResponse;
    static deserializeBinaryFromReader(message: AssignSuperUserResponse, reader: jspb.BinaryReader): AssignSuperUserResponse;
}

export namespace AssignSuperUserResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
        userInfo: string,
        targetUserInfo: string,
    }
}

export class UpdateUserProfile extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;

    getUserName(): string;
    setUserName(value: string): void;

    getGender(): string;
    setGender(value: string): void;

    getDateOfBirth(): number;
    setDateOfBirth(value: number): void;

    getLocation(): string;
    setLocation(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateUserProfile.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateUserProfile): UpdateUserProfile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateUserProfile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateUserProfile;
    static deserializeBinaryFromReader(message: UpdateUserProfile, reader: jspb.BinaryReader): UpdateUserProfile;
}

export namespace UpdateUserProfile {
    export type AsObject = {
        phone: string,
        userName: string,
        gender: string,
        dateOfBirth: number,
        location: string,
    }
}

export class UpdateUserProfileResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateUserProfileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateUserProfileResponse): UpdateUserProfileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateUserProfileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateUserProfileResponse;
    static deserializeBinaryFromReader(message: UpdateUserProfileResponse, reader: jspb.BinaryReader): UpdateUserProfileResponse;
}

export namespace UpdateUserProfileResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

export class GetUserProfile extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserProfile.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserProfile): GetUserProfile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserProfile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserProfile;
    static deserializeBinaryFromReader(message: GetUserProfile, reader: jspb.BinaryReader): GetUserProfile;
}

export namespace GetUserProfile {
    export type AsObject = {
        phone: string,
    }
}

export class Profile extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): void;

    getUserName(): string;
    setUserName(value: string): void;

    getGender(): string;
    setGender(value: string): void;

    getDateOfBirth(): number;
    setDateOfBirth(value: number): void;

    getLocation(): string;
    setLocation(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Profile.AsObject;
    static toObject(includeInstance: boolean, msg: Profile): Profile.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Profile, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Profile;
    static deserializeBinaryFromReader(message: Profile, reader: jspb.BinaryReader): Profile;
}

export namespace Profile {
    export type AsObject = {
        email: string,
        userName: string,
        gender: string,
        dateOfBirth: number,
        location: string,
    }
}

export class GetUserProfileResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): Profile | undefined;
    setData(value?: Profile): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserProfileResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserProfileResponse): GetUserProfileResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserProfileResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserProfileResponse;
    static deserializeBinaryFromReader(message: GetUserProfileResponse, reader: jspb.BinaryReader): GetUserProfileResponse;
}

export namespace GetUserProfileResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
        data?: Profile.AsObject,
    }
}

export class GetHomesList extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHomesList.AsObject;
    static toObject(includeInstance: boolean, msg: GetHomesList): GetHomesList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHomesList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHomesList;
    static deserializeBinaryFromReader(message: GetHomesList, reader: jspb.BinaryReader): GetHomesList;
}

export namespace GetHomesList {
    export type AsObject = {
        phone: string,
    }
}

export class GetHomesListResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;

    getHomesList(): string;
    setHomesList(value: string): void;

    getFavoriteHome(): string;
    setFavoriteHome(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHomesListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetHomesListResponse): GetHomesListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHomesListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHomesListResponse;
    static deserializeBinaryFromReader(message: GetHomesListResponse, reader: jspb.BinaryReader): GetHomesListResponse;
}

export namespace GetHomesListResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
        homesList: string,
        favoriteHome: string,
    }
}

export class LoggedInDevices extends jspb.Message { 
    getDeviceType(): string;
    setDeviceType(value: string): void;

    getDeviceId(): string;
    setDeviceId(value: string): void;

    getDeviceName(): string;
    setDeviceName(value: string): void;

    getRemember(): boolean;
    setRemember(value: boolean): void;

    getLastAccessTime(): number;
    setLastAccessTime(value: number): void;

    getValidity(): number;
    setValidity(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoggedInDevices.AsObject;
    static toObject(includeInstance: boolean, msg: LoggedInDevices): LoggedInDevices.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoggedInDevices, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoggedInDevices;
    static deserializeBinaryFromReader(message: LoggedInDevices, reader: jspb.BinaryReader): LoggedInDevices;
}

export namespace LoggedInDevices {
    export type AsObject = {
        deviceType: string,
        deviceId: string,
        deviceName: string,
        remember: boolean,
        lastAccessTime: number,
        validity: number,
    }
}

export class GetLoggedInDevices extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLoggedInDevices.AsObject;
    static toObject(includeInstance: boolean, msg: GetLoggedInDevices): GetLoggedInDevices.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLoggedInDevices, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLoggedInDevices;
    static deserializeBinaryFromReader(message: GetLoggedInDevices, reader: jspb.BinaryReader): GetLoggedInDevices;
}

export namespace GetLoggedInDevices {
    export type AsObject = {
        phone: string,
    }
}

export class GetLoggedInDevicesResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;

    clearListList(): void;
    getListList(): Array<LoggedInDevices>;
    setListList(value: Array<LoggedInDevices>): void;
    addList(value?: LoggedInDevices, index?: number): LoggedInDevices;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetLoggedInDevicesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetLoggedInDevicesResponse): GetLoggedInDevicesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetLoggedInDevicesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetLoggedInDevicesResponse;
    static deserializeBinaryFromReader(message: GetLoggedInDevicesResponse, reader: jspb.BinaryReader): GetLoggedInDevicesResponse;
}

export namespace GetLoggedInDevicesResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
        listList: Array<LoggedInDevices.AsObject>,
    }
}

export class InvalidateAllUserDevices extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;

    getDeviceKey(): string;
    setDeviceKey(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvalidateAllUserDevices.AsObject;
    static toObject(includeInstance: boolean, msg: InvalidateAllUserDevices): InvalidateAllUserDevices.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvalidateAllUserDevices, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvalidateAllUserDevices;
    static deserializeBinaryFromReader(message: InvalidateAllUserDevices, reader: jspb.BinaryReader): InvalidateAllUserDevices;
}

export namespace InvalidateAllUserDevices {
    export type AsObject = {
        phone: string,
        deviceKey: string,
    }
}

export class InvalidateAllUserDevicesResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvalidateAllUserDevicesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: InvalidateAllUserDevicesResponse): InvalidateAllUserDevicesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvalidateAllUserDevicesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvalidateAllUserDevicesResponse;
    static deserializeBinaryFromReader(message: InvalidateAllUserDevicesResponse, reader: jspb.BinaryReader): InvalidateAllUserDevicesResponse;
}

export namespace InvalidateAllUserDevicesResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

export class InvalidateUserDevice extends jspb.Message { 
    getDeviceKey(): string;
    setDeviceKey(value: string): void;

    getSecretKey(): string;
    setSecretKey(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvalidateUserDevice.AsObject;
    static toObject(includeInstance: boolean, msg: InvalidateUserDevice): InvalidateUserDevice.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvalidateUserDevice, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvalidateUserDevice;
    static deserializeBinaryFromReader(message: InvalidateUserDevice, reader: jspb.BinaryReader): InvalidateUserDevice;
}

export namespace InvalidateUserDevice {
    export type AsObject = {
        deviceKey: string,
        secretKey: string,
    }
}

export class InvalidateUserDeviceResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InvalidateUserDeviceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: InvalidateUserDeviceResponse): InvalidateUserDeviceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InvalidateUserDeviceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InvalidateUserDeviceResponse;
    static deserializeBinaryFromReader(message: InvalidateUserDeviceResponse, reader: jspb.BinaryReader): InvalidateUserDeviceResponse;
}

export namespace InvalidateUserDeviceResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

export class SetFavoriteHome extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;

    getFavoriteHome(): string;
    setFavoriteHome(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetFavoriteHome.AsObject;
    static toObject(includeInstance: boolean, msg: SetFavoriteHome): SetFavoriteHome.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetFavoriteHome, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetFavoriteHome;
    static deserializeBinaryFromReader(message: SetFavoriteHome, reader: jspb.BinaryReader): SetFavoriteHome;
}

export namespace SetFavoriteHome {
    export type AsObject = {
        phone: string,
        favoriteHome: string,
    }
}

export class SetFavoriteHomeResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetFavoriteHomeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetFavoriteHomeResponse): SetFavoriteHomeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetFavoriteHomeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetFavoriteHomeResponse;
    static deserializeBinaryFromReader(message: SetFavoriteHomeResponse, reader: jspb.BinaryReader): SetFavoriteHomeResponse;
}

export namespace SetFavoriteHomeResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

export class UpdateEmail extends jspb.Message { 
    getPhone(): string;
    setPhone(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateEmail.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateEmail): UpdateEmail.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateEmail, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateEmail;
    static deserializeBinaryFromReader(message: UpdateEmail, reader: jspb.BinaryReader): UpdateEmail;
}

export namespace UpdateEmail {
    export type AsObject = {
        phone: string,
        email: string,
    }
}

export class UpdateEmailResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateEmailResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateEmailResponse): UpdateEmailResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateEmailResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateEmailResponse;
    static deserializeBinaryFromReader(message: UpdateEmailResponse, reader: jspb.BinaryReader): UpdateEmailResponse;
}

export namespace UpdateEmailResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

export class PushNotification extends jspb.Message { 
    getGatewayId(): string;
    setGatewayId(value: string): void;

    getDataPayload(): string;
    setDataPayload(value: string): void;

    getNotificationPayload(): string;
    setNotificationPayload(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushNotification.AsObject;
    static toObject(includeInstance: boolean, msg: PushNotification): PushNotification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushNotification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushNotification;
    static deserializeBinaryFromReader(message: PushNotification, reader: jspb.BinaryReader): PushNotification;
}

export namespace PushNotification {
    export type AsObject = {
        gatewayId: string,
        dataPayload: string,
        notificationPayload: string,
    }
}

export class PushNotificationResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushNotificationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PushNotificationResponse): PushNotificationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushNotificationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushNotificationResponse;
    static deserializeBinaryFromReader(message: PushNotificationResponse, reader: jspb.BinaryReader): PushNotificationResponse;
}

export namespace PushNotificationResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

export class RequestOtp extends jspb.Message { 

    hasPhone(): boolean;
    clearPhone(): void;
    getPhone(): string;
    setPhone(value: string): void;


    hasEmail(): boolean;
    clearEmail(): void;
    getEmail(): string;
    setEmail(value: string): void;


    getUserInputCase(): RequestOtp.UserInputCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RequestOtp.AsObject;
    static toObject(includeInstance: boolean, msg: RequestOtp): RequestOtp.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RequestOtp, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RequestOtp;
    static deserializeBinaryFromReader(message: RequestOtp, reader: jspb.BinaryReader): RequestOtp;
}

export namespace RequestOtp {
    export type AsObject = {
        phone: string,
        email: string,
    }

    export enum UserInputCase {
        USER_INPUT_NOT_SET = 0,
    
    PHONE = 1,

    EMAIL = 2,

    }

}

export class RequestOtpResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getCode(): number;
    setCode(value: number): void;

    getMessage(): string;
    setMessage(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RequestOtpResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RequestOtpResponse): RequestOtpResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RequestOtpResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RequestOtpResponse;
    static deserializeBinaryFromReader(message: RequestOtpResponse, reader: jspb.BinaryReader): RequestOtpResponse;
}

export namespace RequestOtpResponse {
    export type AsObject = {
        success: boolean,
        code: number,
        message: string,
    }
}

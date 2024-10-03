/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.11.2
 * source: hub/gateway-models/protocols/Ip/device/ip_device.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./device-types/hvac_cm";
import * as pb_1 from "google-protobuf";
export namespace com.keus.gateway {
    export class IpDeviceControlInfo extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            device_ip?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("device_ip" in data && data.device_ip != undefined) {
                    this.device_ip = data.device_ip;
                }
            }
        }
        get device_ip() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set device_ip(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            device_ip?: string;
        }): IpDeviceControlInfo {
            const message = new IpDeviceControlInfo({});
            if (data.device_ip != null) {
                message.device_ip = data.device_ip;
            }
            return message;
        }
        toObject() {
            const data: {
                device_ip?: string;
            } = {};
            if (this.device_ip != null) {
                data.device_ip = this.device_ip;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.device_ip.length)
                writer.writeString(1, this.device_ip);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IpDeviceControlInfo {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IpDeviceControlInfo();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.device_ip = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IpDeviceControlInfo {
            return IpDeviceControlInfo.deserialize(bytes);
        }
    }
    export class IpDeviceProperties extends pb_1.Message {
        #one_of_decls: number[][] = [[102]];
        constructor(data?: any[] | ({} & (({
            hvac_properties?: dependency_1.com.keus.gateway.HVACCMProperties;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("hvac_properties" in data && data.hvac_properties != undefined) {
                    this.hvac_properties = data.hvac_properties;
                }
            }
        }
        get hvac_properties() {
            return pb_1.Message.getWrapperField(this, dependency_1.com.keus.gateway.HVACCMProperties, 102) as dependency_1.com.keus.gateway.HVACCMProperties;
        }
        set hvac_properties(value: dependency_1.com.keus.gateway.HVACCMProperties) {
            pb_1.Message.setOneofWrapperField(this, 102, this.#one_of_decls[0], value);
        }
        get has_hvac_properties() {
            return pb_1.Message.getField(this, 102) != null;
        }
        get device_properties() {
            const cases: {
                [index: number]: "none" | "hvac_properties";
            } = {
                0: "none",
                102: "hvac_properties"
            };
            return cases[pb_1.Message.computeOneofCase(this, [102])];
        }
        static fromObject(data: {
            hvac_properties?: ReturnType<typeof dependency_1.com.keus.gateway.HVACCMProperties.prototype.toObject>;
        }): IpDeviceProperties {
            const message = new IpDeviceProperties({});
            if (data.hvac_properties != null) {
                message.hvac_properties = dependency_1.com.keus.gateway.HVACCMProperties.fromObject(data.hvac_properties);
            }
            return message;
        }
        toObject() {
            const data: {
                hvac_properties?: ReturnType<typeof dependency_1.com.keus.gateway.HVACCMProperties.prototype.toObject>;
            } = {};
            if (this.hvac_properties != null) {
                data.hvac_properties = this.hvac_properties.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_hvac_properties)
                writer.writeMessage(102, this.hvac_properties, () => this.hvac_properties.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IpDeviceProperties {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IpDeviceProperties();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 102:
                        reader.readMessage(message.hvac_properties, () => message.hvac_properties = dependency_1.com.keus.gateway.HVACCMProperties.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IpDeviceProperties {
            return IpDeviceProperties.deserialize(bytes);
        }
    }
    export class IpDeviceInfo extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            device_type?: string;
            device_category?: string;
            ip_device_properties?: IpDeviceProperties;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("device_type" in data && data.device_type != undefined) {
                    this.device_type = data.device_type;
                }
                if ("device_category" in data && data.device_category != undefined) {
                    this.device_category = data.device_category;
                }
                if ("ip_device_properties" in data && data.ip_device_properties != undefined) {
                    this.ip_device_properties = data.ip_device_properties;
                }
            }
        }
        get device_type() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set device_type(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get device_category() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set device_category(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get ip_device_properties() {
            return pb_1.Message.getWrapperField(this, IpDeviceProperties, 3) as IpDeviceProperties;
        }
        set ip_device_properties(value: IpDeviceProperties) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get has_ip_device_properties() {
            return pb_1.Message.getField(this, 3) != null;
        }
        static fromObject(data: {
            device_type?: string;
            device_category?: string;
            ip_device_properties?: ReturnType<typeof IpDeviceProperties.prototype.toObject>;
        }): IpDeviceInfo {
            const message = new IpDeviceInfo({});
            if (data.device_type != null) {
                message.device_type = data.device_type;
            }
            if (data.device_category != null) {
                message.device_category = data.device_category;
            }
            if (data.ip_device_properties != null) {
                message.ip_device_properties = IpDeviceProperties.fromObject(data.ip_device_properties);
            }
            return message;
        }
        toObject() {
            const data: {
                device_type?: string;
                device_category?: string;
                ip_device_properties?: ReturnType<typeof IpDeviceProperties.prototype.toObject>;
            } = {};
            if (this.device_type != null) {
                data.device_type = this.device_type;
            }
            if (this.device_category != null) {
                data.device_category = this.device_category;
            }
            if (this.ip_device_properties != null) {
                data.ip_device_properties = this.ip_device_properties.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.device_type.length)
                writer.writeString(1, this.device_type);
            if (this.device_category.length)
                writer.writeString(2, this.device_category);
            if (this.has_ip_device_properties)
                writer.writeMessage(3, this.ip_device_properties, () => this.ip_device_properties.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IpDeviceInfo {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IpDeviceInfo();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.device_type = reader.readString();
                        break;
                    case 2:
                        message.device_category = reader.readString();
                        break;
                    case 3:
                        reader.readMessage(message.ip_device_properties, () => message.ip_device_properties = IpDeviceProperties.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IpDeviceInfo {
            return IpDeviceInfo.deserialize(bytes);
        }
    }
    export class IpDeviceState extends pb_1.Message {
        #one_of_decls: number[][] = [[101]];
        constructor(data?: any[] | ({} & (({
            hVAC_indoor_unit_state?: dependency_1.com.keus.gateway.HVACCMIndoorunitState;
        })))) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("hVAC_indoor_unit_state" in data && data.hVAC_indoor_unit_state != undefined) {
                    this.hVAC_indoor_unit_state = data.hVAC_indoor_unit_state;
                }
            }
        }
        get hVAC_indoor_unit_state() {
            return pb_1.Message.getWrapperField(this, dependency_1.com.keus.gateway.HVACCMIndoorunitState, 101) as dependency_1.com.keus.gateway.HVACCMIndoorunitState;
        }
        set hVAC_indoor_unit_state(value: dependency_1.com.keus.gateway.HVACCMIndoorunitState) {
            pb_1.Message.setOneofWrapperField(this, 101, this.#one_of_decls[0], value);
        }
        get has_hVAC_indoor_unit_state() {
            return pb_1.Message.getField(this, 101) != null;
        }
        get device_state() {
            const cases: {
                [index: number]: "none" | "hVAC_indoor_unit_state";
            } = {
                0: "none",
                101: "hVAC_indoor_unit_state"
            };
            return cases[pb_1.Message.computeOneofCase(this, [101])];
        }
        static fromObject(data: {
            hVAC_indoor_unit_state?: ReturnType<typeof dependency_1.com.keus.gateway.HVACCMIndoorunitState.prototype.toObject>;
        }): IpDeviceState {
            const message = new IpDeviceState({});
            if (data.hVAC_indoor_unit_state != null) {
                message.hVAC_indoor_unit_state = dependency_1.com.keus.gateway.HVACCMIndoorunitState.fromObject(data.hVAC_indoor_unit_state);
            }
            return message;
        }
        toObject() {
            const data: {
                hVAC_indoor_unit_state?: ReturnType<typeof dependency_1.com.keus.gateway.HVACCMIndoorunitState.prototype.toObject>;
            } = {};
            if (this.hVAC_indoor_unit_state != null) {
                data.hVAC_indoor_unit_state = this.hVAC_indoor_unit_state.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_hVAC_indoor_unit_state)
                writer.writeMessage(101, this.hVAC_indoor_unit_state, () => this.hVAC_indoor_unit_state.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IpDeviceState {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IpDeviceState();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 101:
                        reader.readMessage(message.hVAC_indoor_unit_state, () => message.hVAC_indoor_unit_state = dependency_1.com.keus.gateway.HVACCMIndoorunitState.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IpDeviceState {
            return IpDeviceState.deserialize(bytes);
        }
    }
    export class IpDeviceStateInfo extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            device_type?: string;
            ip_device_state?: IpDeviceState;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("device_type" in data && data.device_type != undefined) {
                    this.device_type = data.device_type;
                }
                if ("ip_device_state" in data && data.ip_device_state != undefined) {
                    this.ip_device_state = data.ip_device_state;
                }
            }
        }
        get device_type() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set device_type(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get ip_device_state() {
            return pb_1.Message.getWrapperField(this, IpDeviceState, 2) as IpDeviceState;
        }
        set ip_device_state(value: IpDeviceState) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_ip_device_state() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data: {
            device_type?: string;
            ip_device_state?: ReturnType<typeof IpDeviceState.prototype.toObject>;
        }): IpDeviceStateInfo {
            const message = new IpDeviceStateInfo({});
            if (data.device_type != null) {
                message.device_type = data.device_type;
            }
            if (data.ip_device_state != null) {
                message.ip_device_state = IpDeviceState.fromObject(data.ip_device_state);
            }
            return message;
        }
        toObject() {
            const data: {
                device_type?: string;
                ip_device_state?: ReturnType<typeof IpDeviceState.prototype.toObject>;
            } = {};
            if (this.device_type != null) {
                data.device_type = this.device_type;
            }
            if (this.ip_device_state != null) {
                data.ip_device_state = this.ip_device_state.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.device_type.length)
                writer.writeString(1, this.device_type);
            if (this.has_ip_device_state)
                writer.writeMessage(2, this.ip_device_state, () => this.ip_device_state.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): IpDeviceStateInfo {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new IpDeviceStateInfo();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.device_type = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.ip_device_state, () => message.ip_device_state = IpDeviceState.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): IpDeviceStateInfo {
            return IpDeviceStateInfo.deserialize(bytes);
        }
    }
}

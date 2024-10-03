/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.11.2
 * source: hub/gateway-models/protocols/keus-zigbee/device/device-types/cv6_strip_controller.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace com.keus.gateway {
    export class CV6StripState extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            port_id?: number;
            port_state?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("port_id" in data && data.port_id != undefined) {
                    this.port_id = data.port_id;
                }
                if ("port_state" in data && data.port_state != undefined) {
                    this.port_state = data.port_state;
                }
            }
        }
        get port_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set port_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get port_state() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set port_state(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: {
            port_id?: number;
            port_state?: number;
        }): CV6StripState {
            const message = new CV6StripState({});
            if (data.port_id != null) {
                message.port_id = data.port_id;
            }
            if (data.port_state != null) {
                message.port_state = data.port_state;
            }
            return message;
        }
        toObject() {
            const data: {
                port_id?: number;
                port_state?: number;
            } = {};
            if (this.port_id != null) {
                data.port_id = this.port_id;
            }
            if (this.port_state != null) {
                data.port_state = this.port_state;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.port_id != 0)
                writer.writeInt32(1, this.port_id);
            if (this.port_state != 0)
                writer.writeInt32(2, this.port_state);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CV6StripState {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CV6StripState();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.port_id = reader.readInt32();
                        break;
                    case 2:
                        message.port_state = reader.readInt32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): CV6StripState {
            return CV6StripState.deserialize(bytes);
        }
    }
    export class CV6StripPort extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            port_id?: number;
            port_state?: number;
            is_assigned?: boolean;
            assigned_to_appliance?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("port_id" in data && data.port_id != undefined) {
                    this.port_id = data.port_id;
                }
                if ("port_state" in data && data.port_state != undefined) {
                    this.port_state = data.port_state;
                }
                if ("is_assigned" in data && data.is_assigned != undefined) {
                    this.is_assigned = data.is_assigned;
                }
                if ("assigned_to_appliance" in data && data.assigned_to_appliance != undefined) {
                    this.assigned_to_appliance = data.assigned_to_appliance;
                }
            }
        }
        get port_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set port_id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get port_state() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set port_state(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get is_assigned() {
            return pb_1.Message.getFieldWithDefault(this, 3, false) as boolean;
        }
        set is_assigned(value: boolean) {
            pb_1.Message.setField(this, 3, value);
        }
        get assigned_to_appliance() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set assigned_to_appliance(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            port_id?: number;
            port_state?: number;
            is_assigned?: boolean;
            assigned_to_appliance?: string;
        }): CV6StripPort {
            const message = new CV6StripPort({});
            if (data.port_id != null) {
                message.port_id = data.port_id;
            }
            if (data.port_state != null) {
                message.port_state = data.port_state;
            }
            if (data.is_assigned != null) {
                message.is_assigned = data.is_assigned;
            }
            if (data.assigned_to_appliance != null) {
                message.assigned_to_appliance = data.assigned_to_appliance;
            }
            return message;
        }
        toObject() {
            const data: {
                port_id?: number;
                port_state?: number;
                is_assigned?: boolean;
                assigned_to_appliance?: string;
            } = {};
            if (this.port_id != null) {
                data.port_id = this.port_id;
            }
            if (this.port_state != null) {
                data.port_state = this.port_state;
            }
            if (this.is_assigned != null) {
                data.is_assigned = this.is_assigned;
            }
            if (this.assigned_to_appliance != null) {
                data.assigned_to_appliance = this.assigned_to_appliance;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.port_id != 0)
                writer.writeInt32(1, this.port_id);
            if (this.port_state != 0)
                writer.writeInt32(2, this.port_state);
            if (this.is_assigned != false)
                writer.writeBool(3, this.is_assigned);
            if (this.assigned_to_appliance.length)
                writer.writeString(4, this.assigned_to_appliance);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CV6StripPort {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CV6StripPort();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.port_id = reader.readInt32();
                        break;
                    case 2:
                        message.port_state = reader.readInt32();
                        break;
                    case 3:
                        message.is_assigned = reader.readBool();
                        break;
                    case 4:
                        message.assigned_to_appliance = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): CV6StripPort {
            return CV6StripPort.deserialize(bytes);
        }
    }
    export class CV6StripControllerProperties extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            output_ports?: CV6StripPort[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("output_ports" in data && data.output_ports != undefined) {
                    this.output_ports = data.output_ports;
                }
            }
        }
        get output_ports() {
            return pb_1.Message.getRepeatedWrapperField(this, CV6StripPort, 1) as CV6StripPort[];
        }
        set output_ports(value: CV6StripPort[]) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data: {
            output_ports?: ReturnType<typeof CV6StripPort.prototype.toObject>[];
        }): CV6StripControllerProperties {
            const message = new CV6StripControllerProperties({});
            if (data.output_ports != null) {
                message.output_ports = data.output_ports.map(item => CV6StripPort.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data: {
                output_ports?: ReturnType<typeof CV6StripPort.prototype.toObject>[];
            } = {};
            if (this.output_ports != null) {
                data.output_ports = this.output_ports.map((item: CV6StripPort) => item.toObject());
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.output_ports.length)
                writer.writeRepeatedMessage(1, this.output_ports, (item: CV6StripPort) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CV6StripControllerProperties {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CV6StripControllerProperties();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.output_ports, () => pb_1.Message.addToRepeatedWrapperField(message, 1, CV6StripPort.deserialize(reader), CV6StripPort));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): CV6StripControllerProperties {
            return CV6StripControllerProperties.deserialize(bytes);
        }
    }
}

/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.11.2
 * source: hub/voice/google.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace com.keus.hub {
    export enum GH_EXECUTE_ACTIONS {
        GH_ONOFF = 0,
        GH_BRIGHTNESS_ABSOLUTE = 1,
        GH_ACTIVATE_SCENE = 2,
        GH_SET_FAN_SPEED = 3,
        GH_OPENCLOSE = 4,
        GH_TS_TEMPSETPOINT = 5,
        GH_TS_SETMODE = 6,
        GH_COLOR_ABSOLUTE = 7
    }
    export class GoogleHomeSyncDevices extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            phone?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("phone" in data && data.phone != undefined) {
                    this.phone = data.phone;
                }
            }
        }
        get phone() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set phone(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            phone?: string;
        }): GoogleHomeSyncDevices {
            const message = new GoogleHomeSyncDevices({});
            if (data.phone != null) {
                message.phone = data.phone;
            }
            return message;
        }
        toObject() {
            const data: {
                phone?: string;
            } = {};
            if (this.phone != null) {
                data.phone = this.phone;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.phone.length)
                writer.writeString(1, this.phone);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeSyncDevices {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeSyncDevices();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.phone = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeSyncDevices {
            return GoogleHomeSyncDevices.deserialize(bytes);
        }
    }
    export class GoogleHomeSyncDevicesResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            success?: boolean;
            code?: number;
            message?: string;
            google_device?: string[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("success" in data && data.success != undefined) {
                    this.success = data.success;
                }
                if ("code" in data && data.code != undefined) {
                    this.code = data.code;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
                if ("google_device" in data && data.google_device != undefined) {
                    this.google_device = data.google_device;
                }
            }
        }
        get success() {
            return pb_1.Message.getFieldWithDefault(this, 1, false) as boolean;
        }
        set success(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get code() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set code(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get message() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set message(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get google_device() {
            return pb_1.Message.getFieldWithDefault(this, 4, []) as string[];
        }
        set google_device(value: string[]) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            success?: boolean;
            code?: number;
            message?: string;
            google_device?: string[];
        }): GoogleHomeSyncDevicesResponse {
            const message = new GoogleHomeSyncDevicesResponse({});
            if (data.success != null) {
                message.success = data.success;
            }
            if (data.code != null) {
                message.code = data.code;
            }
            if (data.message != null) {
                message.message = data.message;
            }
            if (data.google_device != null) {
                message.google_device = data.google_device;
            }
            return message;
        }
        toObject() {
            const data: {
                success?: boolean;
                code?: number;
                message?: string;
                google_device?: string[];
            } = {};
            if (this.success != null) {
                data.success = this.success;
            }
            if (this.code != null) {
                data.code = this.code;
            }
            if (this.message != null) {
                data.message = this.message;
            }
            if (this.google_device != null) {
                data.google_device = this.google_device;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.success != false)
                writer.writeBool(1, this.success);
            if (this.code != 0)
                writer.writeInt32(2, this.code);
            if (this.message.length)
                writer.writeString(3, this.message);
            if (this.google_device.length)
                writer.writeRepeatedString(4, this.google_device);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeSyncDevicesResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeSyncDevicesResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.success = reader.readBool();
                        break;
                    case 2:
                        message.code = reader.readInt32();
                        break;
                    case 3:
                        message.message = reader.readString();
                        break;
                    case 4:
                        pb_1.Message.addToRepeatedField(message, 4, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeSyncDevicesResponse {
            return GoogleHomeSyncDevicesResponse.deserialize(bytes);
        }
    }
    export class GoogleHomeExecuteCommand extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            phone?: string;
            google_action_type?: GH_EXECUTE_ACTIONS;
            google_device_id?: string;
            action_params?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("phone" in data && data.phone != undefined) {
                    this.phone = data.phone;
                }
                if ("google_action_type" in data && data.google_action_type != undefined) {
                    this.google_action_type = data.google_action_type;
                }
                if ("google_device_id" in data && data.google_device_id != undefined) {
                    this.google_device_id = data.google_device_id;
                }
                if ("action_params" in data && data.action_params != undefined) {
                    this.action_params = data.action_params;
                }
            }
        }
        get phone() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set phone(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get google_action_type() {
            return pb_1.Message.getFieldWithDefault(this, 2, GH_EXECUTE_ACTIONS.GH_ONOFF) as GH_EXECUTE_ACTIONS;
        }
        set google_action_type(value: GH_EXECUTE_ACTIONS) {
            pb_1.Message.setField(this, 2, value);
        }
        get google_device_id() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set google_device_id(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get action_params() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set action_params(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            phone?: string;
            google_action_type?: GH_EXECUTE_ACTIONS;
            google_device_id?: string;
            action_params?: string;
        }): GoogleHomeExecuteCommand {
            const message = new GoogleHomeExecuteCommand({});
            if (data.phone != null) {
                message.phone = data.phone;
            }
            if (data.google_action_type != null) {
                message.google_action_type = data.google_action_type;
            }
            if (data.google_device_id != null) {
                message.google_device_id = data.google_device_id;
            }
            if (data.action_params != null) {
                message.action_params = data.action_params;
            }
            return message;
        }
        toObject() {
            const data: {
                phone?: string;
                google_action_type?: GH_EXECUTE_ACTIONS;
                google_device_id?: string;
                action_params?: string;
            } = {};
            if (this.phone != null) {
                data.phone = this.phone;
            }
            if (this.google_action_type != null) {
                data.google_action_type = this.google_action_type;
            }
            if (this.google_device_id != null) {
                data.google_device_id = this.google_device_id;
            }
            if (this.action_params != null) {
                data.action_params = this.action_params;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.phone.length)
                writer.writeString(1, this.phone);
            if (this.google_action_type != GH_EXECUTE_ACTIONS.GH_ONOFF)
                writer.writeEnum(2, this.google_action_type);
            if (this.google_device_id.length)
                writer.writeString(3, this.google_device_id);
            if (this.action_params.length)
                writer.writeString(4, this.action_params);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeExecuteCommand {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeExecuteCommand();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.phone = reader.readString();
                        break;
                    case 2:
                        message.google_action_type = reader.readEnum();
                        break;
                    case 3:
                        message.google_device_id = reader.readString();
                        break;
                    case 4:
                        message.action_params = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeExecuteCommand {
            return GoogleHomeExecuteCommand.deserialize(bytes);
        }
    }
    export class GoogleHomeExecuteCommandResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            success?: boolean;
            code?: number;
            message?: string;
            device_status_response?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("success" in data && data.success != undefined) {
                    this.success = data.success;
                }
                if ("code" in data && data.code != undefined) {
                    this.code = data.code;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
                if ("device_status_response" in data && data.device_status_response != undefined) {
                    this.device_status_response = data.device_status_response;
                }
            }
        }
        get success() {
            return pb_1.Message.getFieldWithDefault(this, 1, false) as boolean;
        }
        set success(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get code() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set code(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get message() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set message(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get device_status_response() {
            return pb_1.Message.getFieldWithDefault(this, 4, "") as string;
        }
        set device_status_response(value: string) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            success?: boolean;
            code?: number;
            message?: string;
            device_status_response?: string;
        }): GoogleHomeExecuteCommandResponse {
            const message = new GoogleHomeExecuteCommandResponse({});
            if (data.success != null) {
                message.success = data.success;
            }
            if (data.code != null) {
                message.code = data.code;
            }
            if (data.message != null) {
                message.message = data.message;
            }
            if (data.device_status_response != null) {
                message.device_status_response = data.device_status_response;
            }
            return message;
        }
        toObject() {
            const data: {
                success?: boolean;
                code?: number;
                message?: string;
                device_status_response?: string;
            } = {};
            if (this.success != null) {
                data.success = this.success;
            }
            if (this.code != null) {
                data.code = this.code;
            }
            if (this.message != null) {
                data.message = this.message;
            }
            if (this.device_status_response != null) {
                data.device_status_response = this.device_status_response;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.success != false)
                writer.writeBool(1, this.success);
            if (this.code != 0)
                writer.writeInt32(2, this.code);
            if (this.message.length)
                writer.writeString(3, this.message);
            if (this.device_status_response.length)
                writer.writeString(4, this.device_status_response);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeExecuteCommandResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeExecuteCommandResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.success = reader.readBool();
                        break;
                    case 2:
                        message.code = reader.readInt32();
                        break;
                    case 3:
                        message.message = reader.readString();
                        break;
                    case 4:
                        message.device_status_response = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeExecuteCommandResponse {
            return GoogleHomeExecuteCommandResponse.deserialize(bytes);
        }
    }
    export class GoogleHomeDisconnectDevices extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            phone?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("phone" in data && data.phone != undefined) {
                    this.phone = data.phone;
                }
            }
        }
        get phone() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set phone(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            phone?: string;
        }): GoogleHomeDisconnectDevices {
            const message = new GoogleHomeDisconnectDevices({});
            if (data.phone != null) {
                message.phone = data.phone;
            }
            return message;
        }
        toObject() {
            const data: {
                phone?: string;
            } = {};
            if (this.phone != null) {
                data.phone = this.phone;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.phone.length)
                writer.writeString(1, this.phone);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeDisconnectDevices {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeDisconnectDevices();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.phone = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeDisconnectDevices {
            return GoogleHomeDisconnectDevices.deserialize(bytes);
        }
    }
    export class GoogleHomeDisconnectDevicesResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            success?: boolean;
            code?: number;
            message?: string;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("success" in data && data.success != undefined) {
                    this.success = data.success;
                }
                if ("code" in data && data.code != undefined) {
                    this.code = data.code;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
            }
        }
        get success() {
            return pb_1.Message.getFieldWithDefault(this, 1, false) as boolean;
        }
        set success(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get code() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set code(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get message() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set message(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data: {
            success?: boolean;
            code?: number;
            message?: string;
        }): GoogleHomeDisconnectDevicesResponse {
            const message = new GoogleHomeDisconnectDevicesResponse({});
            if (data.success != null) {
                message.success = data.success;
            }
            if (data.code != null) {
                message.code = data.code;
            }
            if (data.message != null) {
                message.message = data.message;
            }
            return message;
        }
        toObject() {
            const data: {
                success?: boolean;
                code?: number;
                message?: string;
            } = {};
            if (this.success != null) {
                data.success = this.success;
            }
            if (this.code != null) {
                data.code = this.code;
            }
            if (this.message != null) {
                data.message = this.message;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.success != false)
                writer.writeBool(1, this.success);
            if (this.code != 0)
                writer.writeInt32(2, this.code);
            if (this.message.length)
                writer.writeString(3, this.message);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeDisconnectDevicesResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeDisconnectDevicesResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.success = reader.readBool();
                        break;
                    case 2:
                        message.code = reader.readInt32();
                        break;
                    case 3:
                        message.message = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeDisconnectDevicesResponse {
            return GoogleHomeDisconnectDevicesResponse.deserialize(bytes);
        }
    }
    export class GoogleHomeQueryState extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            phone?: string;
            google_device_id?: string[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("phone" in data && data.phone != undefined) {
                    this.phone = data.phone;
                }
                if ("google_device_id" in data && data.google_device_id != undefined) {
                    this.google_device_id = data.google_device_id;
                }
            }
        }
        get phone() {
            return pb_1.Message.getFieldWithDefault(this, 1, "") as string;
        }
        set phone(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get google_device_id() {
            return pb_1.Message.getFieldWithDefault(this, 2, []) as string[];
        }
        set google_device_id(value: string[]) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data: {
            phone?: string;
            google_device_id?: string[];
        }): GoogleHomeQueryState {
            const message = new GoogleHomeQueryState({});
            if (data.phone != null) {
                message.phone = data.phone;
            }
            if (data.google_device_id != null) {
                message.google_device_id = data.google_device_id;
            }
            return message;
        }
        toObject() {
            const data: {
                phone?: string;
                google_device_id?: string[];
            } = {};
            if (this.phone != null) {
                data.phone = this.phone;
            }
            if (this.google_device_id != null) {
                data.google_device_id = this.google_device_id;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.phone.length)
                writer.writeString(1, this.phone);
            if (this.google_device_id.length)
                writer.writeRepeatedString(2, this.google_device_id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeQueryState {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeQueryState();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.phone = reader.readString();
                        break;
                    case 2:
                        pb_1.Message.addToRepeatedField(message, 2, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeQueryState {
            return GoogleHomeQueryState.deserialize(bytes);
        }
    }
    export class GoogleHomeQueryStateResponse extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            success?: boolean;
            code?: number;
            message?: string;
            device_status_response?: string[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("success" in data && data.success != undefined) {
                    this.success = data.success;
                }
                if ("code" in data && data.code != undefined) {
                    this.code = data.code;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
                if ("device_status_response" in data && data.device_status_response != undefined) {
                    this.device_status_response = data.device_status_response;
                }
            }
        }
        get success() {
            return pb_1.Message.getFieldWithDefault(this, 1, false) as boolean;
        }
        set success(value: boolean) {
            pb_1.Message.setField(this, 1, value);
        }
        get code() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0) as number;
        }
        set code(value: number) {
            pb_1.Message.setField(this, 2, value);
        }
        get message() {
            return pb_1.Message.getFieldWithDefault(this, 3, "") as string;
        }
        set message(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get device_status_response() {
            return pb_1.Message.getFieldWithDefault(this, 4, []) as string[];
        }
        set device_status_response(value: string[]) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data: {
            success?: boolean;
            code?: number;
            message?: string;
            device_status_response?: string[];
        }): GoogleHomeQueryStateResponse {
            const message = new GoogleHomeQueryStateResponse({});
            if (data.success != null) {
                message.success = data.success;
            }
            if (data.code != null) {
                message.code = data.code;
            }
            if (data.message != null) {
                message.message = data.message;
            }
            if (data.device_status_response != null) {
                message.device_status_response = data.device_status_response;
            }
            return message;
        }
        toObject() {
            const data: {
                success?: boolean;
                code?: number;
                message?: string;
                device_status_response?: string[];
            } = {};
            if (this.success != null) {
                data.success = this.success;
            }
            if (this.code != null) {
                data.code = this.code;
            }
            if (this.message != null) {
                data.message = this.message;
            }
            if (this.device_status_response != null) {
                data.device_status_response = this.device_status_response;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.success != false)
                writer.writeBool(1, this.success);
            if (this.code != 0)
                writer.writeInt32(2, this.code);
            if (this.message.length)
                writer.writeString(3, this.message);
            if (this.device_status_response.length)
                writer.writeRepeatedString(4, this.device_status_response);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeQueryStateResponse {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeQueryStateResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.success = reader.readBool();
                        break;
                    case 2:
                        message.code = reader.readInt32();
                        break;
                    case 3:
                        message.message = reader.readString();
                        break;
                    case 4:
                        pb_1.Message.addToRepeatedField(message, 4, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeQueryStateResponse {
            return GoogleHomeQueryStateResponse.deserialize(bytes);
        }
    }
    export class GoogleHomeReportEvent extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            agent_user_id?: string[];
            request_id?: string;
            device_status?: string[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 3], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("agent_user_id" in data && data.agent_user_id != undefined) {
                    this.agent_user_id = data.agent_user_id;
                }
                if ("request_id" in data && data.request_id != undefined) {
                    this.request_id = data.request_id;
                }
                if ("device_status" in data && data.device_status != undefined) {
                    this.device_status = data.device_status;
                }
            }
        }
        get agent_user_id() {
            return pb_1.Message.getFieldWithDefault(this, 1, []) as string[];
        }
        set agent_user_id(value: string[]) {
            pb_1.Message.setField(this, 1, value);
        }
        get request_id() {
            return pb_1.Message.getFieldWithDefault(this, 2, "") as string;
        }
        set request_id(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get device_status() {
            return pb_1.Message.getFieldWithDefault(this, 3, []) as string[];
        }
        set device_status(value: string[]) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data: {
            agent_user_id?: string[];
            request_id?: string;
            device_status?: string[];
        }): GoogleHomeReportEvent {
            const message = new GoogleHomeReportEvent({});
            if (data.agent_user_id != null) {
                message.agent_user_id = data.agent_user_id;
            }
            if (data.request_id != null) {
                message.request_id = data.request_id;
            }
            if (data.device_status != null) {
                message.device_status = data.device_status;
            }
            return message;
        }
        toObject() {
            const data: {
                agent_user_id?: string[];
                request_id?: string;
                device_status?: string[];
            } = {};
            if (this.agent_user_id != null) {
                data.agent_user_id = this.agent_user_id;
            }
            if (this.request_id != null) {
                data.request_id = this.request_id;
            }
            if (this.device_status != null) {
                data.device_status = this.device_status;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.agent_user_id.length)
                writer.writeRepeatedString(1, this.agent_user_id);
            if (this.request_id.length)
                writer.writeString(2, this.request_id);
            if (this.device_status.length)
                writer.writeRepeatedString(3, this.device_status);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GoogleHomeReportEvent {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GoogleHomeReportEvent();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        pb_1.Message.addToRepeatedField(message, 1, reader.readString());
                        break;
                    case 2:
                        message.request_id = reader.readString();
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): GoogleHomeReportEvent {
            return GoogleHomeReportEvent.deserialize(bytes);
        }
    }
}

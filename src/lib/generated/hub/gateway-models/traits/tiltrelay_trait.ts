/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.11.2
 * source: hub/gateway-models/traits/tiltrelay_trait.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace com.keus.gateway {
    export class TiltRelayTraitState extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {}) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        static fromObject(data: {}): TiltRelayTraitState {
            const message = new TiltRelayTraitState({});
            return message;
        }
        toObject() {
            const data: {} = {};
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TiltRelayTraitState {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TiltRelayTraitState();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): TiltRelayTraitState {
            return TiltRelayTraitState.deserialize(bytes);
        }
    }
    export class TiltRelayTraitProperties extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            full_tilt_duration?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("full_tilt_duration" in data && data.full_tilt_duration != undefined) {
                    this.full_tilt_duration = data.full_tilt_duration;
                }
            }
        }
        get full_tilt_duration() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0) as number;
        }
        set full_tilt_duration(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data: {
            full_tilt_duration?: number;
        }): TiltRelayTraitProperties {
            const message = new TiltRelayTraitProperties({});
            if (data.full_tilt_duration != null) {
                message.full_tilt_duration = data.full_tilt_duration;
            }
            return message;
        }
        toObject() {
            const data: {
                full_tilt_duration?: number;
            } = {};
            if (this.full_tilt_duration != null) {
                data.full_tilt_duration = this.full_tilt_duration;
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.full_tilt_duration != 0)
                writer.writeUint32(1, this.full_tilt_duration);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): TiltRelayTraitProperties {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TiltRelayTraitProperties();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.full_tilt_duration = reader.readUint32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): TiltRelayTraitProperties {
            return TiltRelayTraitProperties.deserialize(bytes);
        }
    }
}

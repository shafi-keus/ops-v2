/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.11.2
 * source: hub/gateway-models/appliances/appliance-types/dimmer.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./../../traits/onoff_trait";
import * as dependency_2 from "./../../traits/brightness_trait";
import * as pb_1 from "google-protobuf";
export namespace com.keus.gateway {
    export class DimmerApplianceState extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            onoff_state?: dependency_1.com.keus.gateway.OnOffTraitState;
            brightness_state?: dependency_2.com.keus.gateway.BrightnessTraitState;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("onoff_state" in data && data.onoff_state != undefined) {
                    this.onoff_state = data.onoff_state;
                }
                if ("brightness_state" in data && data.brightness_state != undefined) {
                    this.brightness_state = data.brightness_state;
                }
            }
        }
        get onoff_state() {
            return pb_1.Message.getWrapperField(this, dependency_1.com.keus.gateway.OnOffTraitState, 1) as dependency_1.com.keus.gateway.OnOffTraitState;
        }
        set onoff_state(value: dependency_1.com.keus.gateway.OnOffTraitState) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_onoff_state() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get brightness_state() {
            return pb_1.Message.getWrapperField(this, dependency_2.com.keus.gateway.BrightnessTraitState, 2) as dependency_2.com.keus.gateway.BrightnessTraitState;
        }
        set brightness_state(value: dependency_2.com.keus.gateway.BrightnessTraitState) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_brightness_state() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data: {
            onoff_state?: ReturnType<typeof dependency_1.com.keus.gateway.OnOffTraitState.prototype.toObject>;
            brightness_state?: ReturnType<typeof dependency_2.com.keus.gateway.BrightnessTraitState.prototype.toObject>;
        }): DimmerApplianceState {
            const message = new DimmerApplianceState({});
            if (data.onoff_state != null) {
                message.onoff_state = dependency_1.com.keus.gateway.OnOffTraitState.fromObject(data.onoff_state);
            }
            if (data.brightness_state != null) {
                message.brightness_state = dependency_2.com.keus.gateway.BrightnessTraitState.fromObject(data.brightness_state);
            }
            return message;
        }
        toObject() {
            const data: {
                onoff_state?: ReturnType<typeof dependency_1.com.keus.gateway.OnOffTraitState.prototype.toObject>;
                brightness_state?: ReturnType<typeof dependency_2.com.keus.gateway.BrightnessTraitState.prototype.toObject>;
            } = {};
            if (this.onoff_state != null) {
                data.onoff_state = this.onoff_state.toObject();
            }
            if (this.brightness_state != null) {
                data.brightness_state = this.brightness_state.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_onoff_state)
                writer.writeMessage(1, this.onoff_state, () => this.onoff_state.serialize(writer));
            if (this.has_brightness_state)
                writer.writeMessage(2, this.brightness_state, () => this.brightness_state.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DimmerApplianceState {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DimmerApplianceState();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.onoff_state, () => message.onoff_state = dependency_1.com.keus.gateway.OnOffTraitState.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.brightness_state, () => message.brightness_state = dependency_2.com.keus.gateway.BrightnessTraitState.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): DimmerApplianceState {
            return DimmerApplianceState.deserialize(bytes);
        }
    }
    export class DimmerApplianceProperties extends pb_1.Message {
        #one_of_decls: number[][] = [];
        constructor(data?: any[] | {
            onoff_properties?: dependency_1.com.keus.gateway.OnOffTraitProperties;
            brightness_properties?: dependency_2.com.keus.gateway.BrightnessTraitProperties;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], this.#one_of_decls);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("onoff_properties" in data && data.onoff_properties != undefined) {
                    this.onoff_properties = data.onoff_properties;
                }
                if ("brightness_properties" in data && data.brightness_properties != undefined) {
                    this.brightness_properties = data.brightness_properties;
                }
            }
        }
        get onoff_properties() {
            return pb_1.Message.getWrapperField(this, dependency_1.com.keus.gateway.OnOffTraitProperties, 1) as dependency_1.com.keus.gateway.OnOffTraitProperties;
        }
        set onoff_properties(value: dependency_1.com.keus.gateway.OnOffTraitProperties) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_onoff_properties() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get brightness_properties() {
            return pb_1.Message.getWrapperField(this, dependency_2.com.keus.gateway.BrightnessTraitProperties, 2) as dependency_2.com.keus.gateway.BrightnessTraitProperties;
        }
        set brightness_properties(value: dependency_2.com.keus.gateway.BrightnessTraitProperties) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_brightness_properties() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data: {
            onoff_properties?: ReturnType<typeof dependency_1.com.keus.gateway.OnOffTraitProperties.prototype.toObject>;
            brightness_properties?: ReturnType<typeof dependency_2.com.keus.gateway.BrightnessTraitProperties.prototype.toObject>;
        }): DimmerApplianceProperties {
            const message = new DimmerApplianceProperties({});
            if (data.onoff_properties != null) {
                message.onoff_properties = dependency_1.com.keus.gateway.OnOffTraitProperties.fromObject(data.onoff_properties);
            }
            if (data.brightness_properties != null) {
                message.brightness_properties = dependency_2.com.keus.gateway.BrightnessTraitProperties.fromObject(data.brightness_properties);
            }
            return message;
        }
        toObject() {
            const data: {
                onoff_properties?: ReturnType<typeof dependency_1.com.keus.gateway.OnOffTraitProperties.prototype.toObject>;
                brightness_properties?: ReturnType<typeof dependency_2.com.keus.gateway.BrightnessTraitProperties.prototype.toObject>;
            } = {};
            if (this.onoff_properties != null) {
                data.onoff_properties = this.onoff_properties.toObject();
            }
            if (this.brightness_properties != null) {
                data.brightness_properties = this.brightness_properties.toObject();
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_onoff_properties)
                writer.writeMessage(1, this.onoff_properties, () => this.onoff_properties.serialize(writer));
            if (this.has_brightness_properties)
                writer.writeMessage(2, this.brightness_properties, () => this.brightness_properties.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DimmerApplianceProperties {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DimmerApplianceProperties();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.onoff_properties, () => message.onoff_properties = dependency_1.com.keus.gateway.OnOffTraitProperties.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.brightness_properties, () => message.brightness_properties = dependency_2.com.keus.gateway.BrightnessTraitProperties.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): DimmerApplianceProperties {
            return DimmerApplianceProperties.deserialize(bytes);
        }
    }
}

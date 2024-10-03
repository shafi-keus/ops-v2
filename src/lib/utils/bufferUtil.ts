import { TypeConversionUtils } from "./grpc-node-client/src/utils/TypeConversionUtils";
import TypeRegistry from "../generated/type-registry"
import * as buffer from "buffer";
import { Any } from 'google-protobuf/google/protobuf/any_pb';

const Buffer = buffer.Buffer;

class NatsTypeConversionUtils {
    registerTypes() {
        TypeConversionUtils.getInstance().buildRegistry(TypeRegistry);
    }

    packAnyToBuffer(obj: any, typeURL: string) {
        const resultantBuffer = Buffer.concat([
            Buffer.from(typeURL),
            Buffer.from([0x09]),
            Buffer.from(obj.serializeBinary())
        ]);
        return resultantBuffer;

    }

    unpackBufferToAny(bufferData: Buffer) {
        let data = bufferData;
        let typeUrl = "";
        let dataStartIndex = -1;
        try {
            for (let i = 0; i < data.length; i++) {
                if (data[i] == 0x09) {
                    dataStartIndex = i + 1;
                    break;
                } else {
                    typeUrl += String.fromCharCode(data[i]);
                }
            }

            const protoValue = data.slice(dataStartIndex, data.length);
            const anyBuffer = new Any();
            anyBuffer.setTypeUrl(typeUrl);
            anyBuffer.setValue(protoValue);

            const resp = TypeConversionUtils.getInstance().unpackFromAny(anyBuffer)
            // console.log(resp.toObject())
            // console.log(typeUrl, protoData.toString());
            return resp;
        } catch (e) {
            console.log("Error while unpacking buffer to any", e);
            throw e;
        }
    }
}

export const natsTypeConversionUtils = new NatsTypeConversionUtils();
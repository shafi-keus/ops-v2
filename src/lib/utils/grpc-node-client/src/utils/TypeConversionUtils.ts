import { Message } from 'google-protobuf';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import * as errors from '../errors/errors';

export interface MessageInfo {
  msgName: string;
  packageName: string;
  deserializeFunc: (bytes: Uint8Array) => any;
}

const pbuffURLPrefix: string = 'type.googleapis.com/';

export class TypeConversionUtils {
  private static instance: TypeConversionUtils;
  private typeMap: Map<string, MessageInfo>;

  private constructor() {
    this.typeMap = new Map();
  }

  static getInstance(): TypeConversionUtils {
    console.log('Getting instance');
    if (!TypeConversionUtils.instance) {
      TypeConversionUtils.instance = new TypeConversionUtils();
    }
    return TypeConversionUtils.instance;
  }

  buildRegistry(typesInfo: MessageInfo[]) {
    typesInfo.forEach((msgInfo) => {
      this.registerClass(
        msgInfo.msgName,
        msgInfo.packageName,
        msgInfo.deserializeFunc
      );
    });
  }

  getTypeName(msgName: string, packageName: string): string {
    return packageName + '.' + msgName;
  }

  getTypeUrl(msgName: string, packageName: string): string {
    return pbuffURLPrefix + packageName + '.' + msgName;
  }

  registerClass(
    msgName: string,
    packageName: string,
    deserializeBinary: (bytes: Uint8Array) => any
  ): void {
    const typeInfo: MessageInfo = {
      msgName,
      packageName,
      deserializeFunc: deserializeBinary,
    };

    this.typeMap.set(this.getTypeName(msgName, packageName), typeInfo);
  }

  packIntoAny<T extends Message>(obj: T, typeURL: string): Any {
    const anyObj = new Any();
    anyObj.pack(obj.serializeBinary(), typeURL);
    return anyObj;
  }

  unpackFromAny(obj: Any): any {
    console.log(
      '---------------------Type Name is---------------------------',
      obj.getTypeName()
    );
    const typeInfo = this.typeMap.get(obj.getTypeName());
    console.log('typeInfo', typeInfo);
    if (typeInfo) {
      console.log(this.getTypeName(typeInfo.msgName, typeInfo.packageName));
      const unpackedObj = obj.unpack(
        typeInfo.deserializeFunc,
        this.getTypeName(typeInfo.msgName, typeInfo.packageName)
      );
      return unpackedObj;
    } else {
      throw new errors.NoTypeDeclaration();
    }
  }
}

import * as protoRpcRegistry from './proto-rpc-registry';
import { ProtoPackageName, ProtoCloudPackageName, GMProtoPackageName } from '../constants/gateway/system-contants';

const TypeRegistry: Array<any> = [
    //Voice Handlers - Google
    {
        msgName: 'GoogleHomeSyncDevices',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeSyncDevices.deserializeBinary
    },
    {
        msgName: 'GoogleHomeSyncDevicesResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeSyncDevicesResponse.deserializeBinary
    },
    {
        msgName: 'GoogleHomeExecuteCommand',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeExecuteCommand.deserializeBinary
    },
    {
        msgName: 'GoogleHomeExecuteCommandResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeExecuteCommandResponse.deserializeBinary
    },
    {
        msgName: 'GoogleHomeDisconnectDevices',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeDisconnectDevices.deserializeBinary
    },
    {
        msgName: 'GoogleHomeDisconnectDevicesResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeDisconnectDevicesResponse.deserializeBinary
    },
    {
        msgName: 'GoogleHomeQueryState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeQueryState.deserializeBinary
    },
    {
        msgName: 'GoogleHomeQueryStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.googleVoiceTypes.com.keus.hub.GoogleHomeQueryStateResponse.deserializeBinary
    },

    //voice handlers alexa

    {
        msgName: 'AlexaDiscoverDevices',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.alexaRpcTypes.com.keus.hub.AlexaDiscoverDevices.deserializeBinary
    },
    {
        msgName: 'AlexaDiscoverDevicesResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.alexaRpcTypes.com.keus.hub.AlexaDiscoverDevicesResponse.deserializeBinary
    },

    {
        msgName: 'AlexaExecuteCommand',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.alexaRpcTypes.com.keus.hub.AlexaExecuteCommand.deserializeBinary
    },
    {
        msgName: 'AlexaExecuteCommandResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.alexaRpcTypes.com.keus.hub.AlexaExecuteCommandResponse.deserializeBinary
    },
    //voice handlers homebridge-homekit
    {
        msgName: 'GetHomebridgePin',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homekitTypes.com.keus.hub.GetHomebridgePin.deserializeBinary
    },
    {
        msgName: 'GetHomebridgePinResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homekitTypes.com.keus.hub.GetHomebridgePinResponse.deserializeBinary
    },
    //Activity Handlers
    {
        msgName: 'GetActivityLog',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.activityRpcTypes.com.keus.hub.GetActivityLog.deserializeBinary
    },
    {
        msgName: 'GetActivityLogResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.activityRpcTypes.com.keus.hub.GetActivityLogResponse.deserializeBinary
    },
    {
        msgName: 'ReportJobCompletion',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.jobCompletionRpcTypes.com.keus.hub.ReportJobCompletion.deserializeBinary
    },
    {
        msgName: 'ReportJobCompletionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.jobCompletionRpcTypes.com.keus.hub.ReportJobCompletionResponse.deserializeBinary
    },
    {
        msgName: 'ReportSystemActivity',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.activityRpcTypes.com.keus.hub.ReportSystemActivity.deserializeBinary
    },
    {
        msgName: 'ReportSystemActivityResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.activityRpcTypes.com.keus.hub.ReportSystemActivityResponse.deserializeBinary
    },

    //Device Common
    {
        msgName: 'EnterPairMode',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.EnterPairMode.deserializeBinary
    },
    {
        msgName: 'EnterPairModeResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.EnterPairModeResponse.deserializeBinary
    },
    {
        msgName: 'RegisterDevice',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.RegisterDevice.deserializeBinary
    },
    {
        msgName: 'RegisterDeviceResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.RegisterDeviceResponse.deserializeBinary
    },
    {
        msgName: 'ResetDevice',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.ResetDevice.deserializeBinary
    },
    {
        msgName: 'ResetDeviceResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.ResetDeviceResponse.deserializeBinary
    },
    {
        msgName: 'ReplaceDevice',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.ReplaceDevice.deserializeBinary
    },
    {
        msgName: 'ReplaceDeviceResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.ReplaceDeviceResponse.deserializeBinary
    },
    {
        msgName: 'ReplaceDeviceBackend',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.ReplaceDeviceBackend.deserializeBinary
    },
    {
        msgName: 'ReplaceDeviceBackendResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.ReplaceDeviceBackendResponse.deserializeBinary
    },

    //Dimmable Drivers
    {
        msgName: 'ConfigureZigbeeDimmableDriver',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.ConfigureZigbeeDimmableDriver.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeDimmableDriverResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.ConfigureZigbeeDimmableDriverResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeDimmableDriverRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.MoveZigbeeDimmableDriverRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeDimmableDriverRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.MoveZigbeeDimmableDriverRoomResponse.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeDimmableDriverState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.UpdateZigbeeDimmableDriverState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeDimmableDriverStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.UpdateZigbeeDimmableDriverStateResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureDaliDimmableDriver',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliDimmableDriverTypes.com.keus.hub.ConfigureDaliDimmableDriver.deserializeBinary
    },
    {
        msgName: 'ConfigureDaliDimmableDriverResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliDimmableDriverTypes.com.keus.hub.ConfigureDaliDimmableDriverResponse.deserializeBinary
    },
    {
        msgName: 'MoveDaliDimmableDriverRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliDimmableDriverTypes.com.keus.hub.MoveDaliDimmableDriverRoom.deserializeBinary
    },
    {
        msgName: 'MoveDaliDimmableDriverRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliDimmableDriverTypes.com.keus.hub.MoveDaliDimmableDriverRoomResponse.deserializeBinary
    },
    {
        msgName: 'UpdateDaliDimmableDriverState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliDimmableDriverTypes.com.keus.hub.UpdateDaliDimmableDriverState.deserializeBinary
    },
    {
        msgName: 'UpdateDaliDimmableDriverStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.daliDimmableDriverTypes.com.keus.hub.UpdateDaliDimmableDriverStateResponse.deserializeBinary
    },

    //Dali color tunable
    {
        msgName: 'CheckDaliDriverType',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.CheckDaliDriverType.deserializeBinary
    },
    {
        msgName: 'CheckDaliDriverTypeResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.CheckDaliDriverTypeResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureDaliColorTunableProperties',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.ConfigureDaliColorTunableProperties.deserializeBinary
    },
    {
        msgName: 'ConfigureDaliColorTunablePropertiesResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.ConfigureDaliColorTunablePropertiesResponse.deserializeBinary
    },
    {
        msgName: 'MoveDaliColorTunableDriverRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.MoveDaliColorTunableDriverRoom.deserializeBinary
    },
    {
        msgName: 'MoveDaliColorTunableRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.MoveDaliColorTunableRoomResponse.deserializeBinary
    },
    {
        msgName: 'SetDaliColorTunableDriverNameLocation',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.SetDaliColorTunableDriverNameLocation.deserializeBinary
    },
    {
        msgName: 'SetDaliColorTunableDriverNameLocationResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.SetDaliColorTunableDriverNameLocationResponse.deserializeBinary
    },
    {
        msgName: 'UpdateDaliDriverType',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.UpdateDaliDriverType.deserializeBinary
    },
    {
        msgName: 'UpdateDaliDriverTypeResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.UpdateDaliDriverTypeResponse.deserializeBinary
    },
    {
        msgName: 'UpdateDaliColorTunableDriverState',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.UpdateDaliColorTunableDriverState.deserializeBinary
    },
    {
        msgName: 'UpdateDaliColorTunableDriverStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.daliColorTunableDriverTypes.com.keus.hub.UpdateDaliColorTunableDriverStateResponse.deserializeBinary
    },

    //Scene Wizard
    {
        msgName: 'MoveSceneWizardRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneWizardTypes.com.keus.hub.MoveSceneWizardRoom.deserializeBinary
    },
    {
        msgName: 'MoveSceneWizardRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneWizardTypes.com.keus.hub.MoveSceneWizardRoomResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureSceneWizardButtons',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneWizardTypes.com.keus.hub.ConfigureSceneWizardButtons.deserializeBinary
    },
    {
        msgName: 'ConfigureSceneWizardButtonsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneWizardTypes.com.keus.hub.ConfigureSceneWizardButtonsResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureSceneWizard',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneWizardTypes.com.keus.hub.ConfigureSceneWizard.deserializeBinary
    },
    {
        msgName: 'ConfigureSceneWizardResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneWizardTypes.com.keus.hub.ConfigureSceneWizardResponse.deserializeBinary
    },

    //Smart Consoles
    {
        msgName: 'ClearConsoleData',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ClearConsoleData.deserializeBinary
    },
    {
        msgName: 'ClearConsoleDataResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ClearConsoleDataResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureConsoleButtons',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ConfigureConsoleButtons.deserializeBinary
    },
    {
        msgName: 'ConfigureConsoleButtonsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ConfigureConsoleButtonsResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureSmartConsole',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ConfigureSmartConsole.deserializeBinary
    },
    {
        msgName: 'ConfigureSmartConsoleResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ConfigureSmartConsoleResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureSmartConsoleRelay',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ConfigureSmartConsoleRelay.deserializeBinary
    },
    {
        msgName: 'ConfigureSmartConsoleRelayResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ConfigureSmartConsoleRelayResponse.deserializeBinary
    },
    {
        msgName: 'RenameSmartConsole',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.RenameSmartConsole.deserializeBinary
    },
    {
        msgName: 'RenameSmartConsoleResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.RenameSmartConsoleResponse.deserializeBinary
    },
    {
        msgName: 'ChangeSmartConsoleRelayApplianceType',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ChangeSmartConsoleRelayApplianceType.deserializeBinary
    },
    {
        msgName: 'ChangeSmartConsoleRelayApplianceTypeResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ChangeSmartConsoleRelayApplianceTypeResponse.deserializeBinary
    },
    {
        msgName: 'DaliSetRestoreLastLevel',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.DaliSetRestoreLastLevel.deserializeBinary
    },
    {
        msgName: 'DaliSetRestoreLastLevelResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.DaliSetRestoreLastLevelResponse.deserializeBinary
    },
    {
        msgName: 'DiscoverDaliDevices',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.DiscoverDaliDevices.deserializeBinary
    },
    {
        msgName: 'DiscoverDaliDevicesResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.DiscoverDaliDevicesResponse.deserializeBinary
    },
    {
        msgName: 'FlashConsoleButtons',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.FlashConsoleButtons.deserializeBinary
    },
    {
        msgName: 'FlashConsoleButtonsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.FlashConsoleButtonsResponse.deserializeBinary
    },
    {
        msgName: 'MoveSmartConsoleRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.MoveSmartConsoleRoom.deserializeBinary
    },
    {
        msgName: 'MoveSmartConsoleRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.MoveSmartConsoleRoomResponse.deserializeBinary
    },
    {
        msgName: 'SetAreaMaster',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SetAreaMaster.deserializeBinary
    },
    {
        msgName: 'SetAreaMasterResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SetAreaMasterResponse.deserializeBinary
    },
    {
        msgName: 'SetConsoleRelayState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SetConsoleRelayState.deserializeBinary
    },
    {
        msgName: 'SetConsoleRelayStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SetConsoleRelayStateResponse.deserializeBinary
    },
    {
        msgName: 'SetDaliMaster',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SetDaliMaster.deserializeBinary
    },
    {
        msgName: 'SetDaliMasterResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SetDaliMasterResponse.deserializeBinary
    },
    {
        msgName: 'SyncSceneUIData',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SyncSceneUIData.deserializeBinary
    },
    {
        msgName: 'SyncSceneUIDataResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SyncSceneUIDataResponse.deserializeBinary
    },
    {
        msgName: 'SetAreaMasterEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.SetAreaMasterEvent.deserializeBinary//SetAreaMasterEvent.deserializeBinary
    },

    //Zigbee Curtain Controller
    {
        msgName: 'ConfigureZigbeeCurtainController',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.ConfigureZigbeeCurtainController.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeCurtainControllerResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.ConfigureZigbeeCurtainControllerResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeCurtainControllerRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.MoveZigbeeCurtainControllerRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeCurtainControllerRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.MoveZigbeeCurtainControllerRoomResponse.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeCurtainControllerState',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.UpdateZigbeeCurtainControllerState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeCurtainControllerStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.UpdateZigbeeCurtainControllerStateResponse.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeCurtainController',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.RenameZigbeeCurtainController.deserializeBinary
    },
    {

        msgName: 'RenameZigbeeCurtainControllerResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.RenameZigbeeCurtainControllerResponse.deserializeBinary
    },

    //Fan Controllers
    {
        msgName: 'ConfigureZigbeeACFanController',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.ConfigureZigbeeACFanController.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeACFanControllerResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.ConfigureZigbeeACFanControllerResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeACFanControllerRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.MoveZigbeeACFanControllerRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeACFanControllerRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.MoveZigbeeACFanControllerRoomResponse.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeACFanControllerState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.UpdateZigbeeACFanControllerState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeACFanControllerStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.UpdateZigbeeACFanControllerStateResponse.deserializeBinary
    },

    //IR Blaster
    {
        msgName: 'GetIRRemoteList',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.GetIRRemoteList.deserializeBinary
    },
    {
        msgName: 'GetIRRemoteListResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.GetIRRemoteListResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeIRBlaster',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.ConfigureZigbeeIRBlaster.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeIRBlasterResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.ConfigureZigbeeIRBlasterResponse.deserializeBinary
    },
    {
        msgName: 'AddRemoteToZigbeeIRBlaster',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.AddRemoteToZigbeeIRBlaster.deserializeBinary
    },
    {
        msgName: 'AddRemoteToZigbeeIRBlasterResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.AddRemoteToZigbeeIRBlasterResponse.deserializeBinary
    },
    {
        msgName: 'BlastIRCommand',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.BlastIRCommand.deserializeBinary
    },
    {
        msgName: 'BlastIRCommandResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.BlastIRCommandResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeIRBlasterRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.MoveZigbeeIRBlasterRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeIRBlasterRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.MoveZigbeeIRBlasterRoomResponse.deserializeBinary
    },
    {
        msgName: 'RemoveRemoteFromZigbeeIRBlaster',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.RemoveRemoteFromZigbeeIRBlaster.deserializeBinary
    },
    {
        msgName: 'RemoveRemoteFromZigbeeIRBlasterResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.RemoveRemoteFromZigbeeIRBlasterResponse.deserializeBinary
    },
    {
        msgName: 'RenameIrRemote',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.RenameIrRemote.deserializeBinary
    },
    {
        msgName: 'RenameIrRemoteResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.RenameIrRemoteResponse.deserializeBinary
    },
    {
        msgName: 'ReDownloadIrRemote',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.ReDownloadIrRemote.deserializeBinary
    },
    {
        msgName: 'ReDownloadIrRemoteResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.ReDownloadIrRemoteResponse.deserializeBinary
    },

    //Groups
    {
        msgName: 'AddDeviceToGroup',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.AddDeviceToGroup.deserializeBinary
    },
    {
        msgName: 'AddDeviceToGroupResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.AddDeviceToGroupResponse.deserializeBinary
    },
    {
        msgName: 'ChangeGroupName',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.ChangeGroupName.deserializeBinary
    },
    {
        msgName: 'ChangeGroupNameResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.ChangeGroupNameResponse.deserializeBinary
    },
    {
        msgName: 'ChangeGroupIconType',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.ChangeGroupIconType.deserializeBinary
    },
    {
        msgName: 'ChangeGroupIconTypeResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.ChangeGroupIconTypeResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureGroupProperties',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.ConfigureGroupProperties.deserializeBinary
    },
    {
        msgName: 'ConfigureGroupPropertiesResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.ConfigureGroupPropertiesResponse.deserializeBinary
    },
    {
        msgName: 'CreateGroup',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.CreateGroup.deserializeBinary
    },
    {
        msgName: 'CreateGroupResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.CreateGroupResponse.deserializeBinary
    },
    {
        msgName: 'DeleteGroup',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.DeleteGroup.deserializeBinary
    },
    {
        msgName: 'DeleteGroupResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.DeleteGroupResponse.deserializeBinary
    },
    {
        msgName: 'RemoveDeviceFromGroup',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.RemoveDeviceFromGroup.deserializeBinary
    },
    {
        msgName: 'RemoveDeviceFromGroupResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.RemoveDeviceFromGroupResponse.deserializeBinary
    },
    {
        msgName: 'UpdateGroupState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.UpdateGroupState.deserializeBinary
    },
    {
        msgName: 'UpdateGroupStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.UpdateGroupStateResponse.deserializeBinary
    },
    {
        msgName: 'PushNotification',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.PushNotification.deserializeBinary
    },
    {
        msgName: 'PushNotificationResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.PushNotificationResponse.deserializeBinary
    },

    {
        msgName: 'AssignSuperUser',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.AssignSuperUser.deserializeBinary
    },
    {
        msgName: 'AssignSuperUserResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.AssignSuperUserResponse.deserializeBinary
    },
    {
        msgName: 'GetUserDetails',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetUserDetails.deserializeBinary
    },

    {
        msgName: 'GetUserDetailsResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetUserDetailsResponse.deserializeBinary
    },
    {
        msgName: 'GetUsersDetails',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetUsersDetails.deserializeBinary
    },

    {
        msgName: 'GetUsersDetailsResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetUsersDetailsResponse.deserializeBinary
    },
    {
        msgName: 'GrantUserPermission',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GrantUserPermission.deserializeBinary
    },
    {
        msgName: 'RequestOtpFromGateway',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.RequestOtpFromGateway.deserializeBinary
    },
    {
        msgName: 'RequestOtpFromGatewayResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.RequestOtpFromGatewayResponse.deserializeBinary
    },

    {
        msgName: 'RemoveHomeFromUser',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.RemoveHomeFromUser.deserializeBinary
    },
    {
        msgName: 'RemoveHomeFromUserResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.RemoveHomeFromUserResponse.deserializeBinary
    },

    {
        msgName: 'GrantUserPermissionResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GrantUserPermissionResponse.deserializeBinary
    },
    {
        msgName: 'GetRemoteList',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetRemoteList.deserializeBinary
    },
    {
        msgName: 'GetRemoteListResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetRemoteListResponse.deserializeBinary
    },
    {
        msgName: 'GetRemoteFileLink',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetRemoteFileLink.deserializeBinary
    },
    {
        msgName: 'GetRemoteFileLinkResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetRemoteFileLinkResponse.deserializeBinary
    },
    // gateway setup protos
    {
        msgName: 'ConfigureGateway',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.ConfigureGateway.deserializeBinary
    },

    {
        msgName: 'ConfigureGatewayResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.ConfigureGatewayResponse.deserializeBinary
    },
    {
        msgName: 'GetGatewayStatus',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.GetGatewayStatus.deserializeBinary
    },

    {
        msgName: 'GetGatewayStatusResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.GetGatewayStatusResponse.deserializeBinary
    },
    {
        msgName: 'RegisterGatewayToCloud',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.RegisterGatewayToCloud.deserializeBinary
    },

    {
        msgName: 'RegisterGatewayToCloudResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.RegisterGatewayToCloudResponse.deserializeBinary
    },
    {
        msgName: 'ServiceLogin',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.ServiceLogin.deserializeBinary
    },

    {
        msgName: 'ServiceLoginResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.ServiceLoginResponse.deserializeBinary
    },
    {
        msgName: 'GetGatewayZigbeeChannels',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.GetGatewayZigbeeChannels.deserializeBinary
    },
    {
        msgName: 'GetGatewayZigbeeChannelsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.GatewaySetupRpcTypes.com.keus.hub.GetGatewayZigbeeChannelsResponse.deserializeBinary
    },
    //Home Protos
    {
        msgName: 'GetHubData',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetHubData.deserializeBinary
    },
    {
        msgName: 'GetHubDataResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetHubDataResponse.deserializeBinary
    },
    {
        msgName: 'GetSecurityData',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub//GetSecurityData.deserializeBinary
    },
    // {
    //     msgName: 'GetSecurityDataResponse',
    //     packageName: ProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.homeRpcTypes.GetSecurityDataResponse.deserializeBinary
    // },
    {
        msgName: 'GetAreas',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetAreas.deserializeBinary
    },
    {
        msgName: 'GetAreasResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetAreasResponse.deserializeBinary
    },
    {
        msgName: 'CreateArea',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.CreateArea.deserializeBinary
    },
    {
        msgName: 'CreateAreaResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.CreateAreaResponse.deserializeBinary
    },
    {
        msgName: 'EditArea',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditArea.deserializeBinary
    },
    {
        msgName: 'EditAreaResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditAreaResponse.deserializeBinary
    },
    {
        msgName: 'DeleteArea',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteArea.deserializeBinary
    },
    {
        msgName: 'DeleteAreaResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteAreaResponse.deserializeBinary
    },
    {
        msgName: 'GetFloors',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetFloors.deserializeBinary
    },
    {
        msgName: 'GetFloorsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetFloorsResponse.deserializeBinary
    },
    {
        msgName: 'CreateFloor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.CreateFloor.deserializeBinary
    },
    {
        msgName: 'CreateFloorResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.CreateFloorResponse.deserializeBinary
    },
    {
        msgName: 'DeleteFloor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteFloor.deserializeBinary
    },
    {
        msgName: 'DeleteFloorResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteFloorResponse.deserializeBinary
    },
    {
        msgName: 'EditFloor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditFloor.deserializeBinary
    },
    {
        msgName: 'EditFloorResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditFloorResponse.deserializeBinary
    },
    {
        msgName: 'UpdateGatewayColor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.UpdateGatewayColor.deserializeBinary
    },
    {
        msgName: 'UpdateGatewayColorResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.UpdateGatewayColorResponse.deserializeBinary
    },

    //permission
    {
        msgName: 'AssignSuperUser',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.AssignSuperUser.deserializeBinary
    },
    {
        msgName: 'AssignSuperUserResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.AssignSuperUserResponse.deserializeBinary
    },
    {
        msgName: 'GetUserPermissionList',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.GetUserPermissionList.deserializeBinary
    },
    {
        msgName: 'GetUserPermissionListResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.GetUserPermissionListResponse.deserializeBinary
    },
    {
        msgName: 'GrantUserPermission',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.GrantUserPermission.deserializeBinary
    },
    {
        msgName: 'GrantUserPermissionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.GrantUserPermissionResponse.deserializeBinary
    },
    {
        msgName: 'RemoveUserPermission',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.RemoveUserPermission.deserializeBinary
    },
    {
        msgName: 'RemoveUserPermissionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.RemoveUserPermissionResponse.deserializeBinary
    },
    // {
    //     msgName: 'GrantSecurityApplianceAccess',
    //     packageName: ProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.GrantSecurityApplianceAccess.deserializeBinary

    // },
    // {
    //     msgName: 'GrantSecurityApplianceAccessResponse',
    //     packageName: ProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.permissionRpcTypes.com.keus.hub.GrantSecurityApplianceAccessResponse.deserializeBinary

    // },

    //users

    {
        msgName: 'RequestOtp',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.RequestOtp.deserializeBinary
    },
    {
        msgName: 'RequestOtpResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.RequestOtpResponse.deserializeBinary
    },
    // {
    //     msgName: 'UpdateUserPreferences',
    //     packageName: ProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.UpdateUserPreferences.deserializeBinary
    // },
    // {
    //     msgName: 'UpdateUserPreferencesResponse',
    //     packageName: ProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.UpdateUserPreferencesResponse.deserializeBinary
    // },
    {
        msgName: 'GetUserInfo',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.GetUserInfo.deserializeBinary
    },
    {
        msgName: 'GetUserInfoResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.GetUserInfoResponse.deserializeBinary
    },
    {
        msgName: 'TotpLogin',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.TotpLogin.deserializeBinary
    },
    {
        msgName: 'TotpLoginResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.userRpcTypes.com.keus.hub.TotpLoginResponse.deserializeBinary
    },

    //Rooms
    {
        msgName: 'GetRooms',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetRooms.deserializeBinary
    },
    {
        msgName: 'GetRoomsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetRoomsResponse.deserializeBinary
    },
    {
        msgName: 'CreateRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.CreateRoom.deserializeBinary
    },
    {
        msgName: 'CreateRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.CreateRoomResponse.deserializeBinary
    },
    {
        msgName: 'EditRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditRoom.deserializeBinary
    },
    {
        msgName: 'EditRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditRoomResponse.deserializeBinary
    },
    {
        msgName: 'DeleteRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteRoom.deserializeBinary
    },
    {
        msgName: 'DeleteRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteRoomResponse.deserializeBinary
    },
    {
        msgName: 'EditRoomName',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditRoomName.deserializeBinary
    },
    {
        msgName: 'EditRoomNameResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditRoomNameResponse.deserializeBinary
    },
    {
        msgName: 'SetRoomColor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.SetRoomColor.deserializeBinary
    },
    {
        msgName: 'SetRoomColorResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.SetRoomColorResponse.deserializeBinary
    },
    {
        msgName: 'RoomReorder',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.RoomReorder.deserializeBinary
    },
    {
        msgName: 'RoomReorderResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.RoomReorderResponse.deserializeBinary
    },
    // {
    //     msgName: 'GetSecurityData',
    //     packageName: ProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetSecurityData.deserializeBinary
    // },
    // {
    //     msgName: 'GetSecurityDataResponse',
    //     packageName: ProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetSecurityDataResponse.deserializeBinary
    // },

    //Sections
    {
        msgName: 'AddSection',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.AddSection.deserializeBinary
    },
    {
        msgName: 'AddSectionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.AddSectionResponse.deserializeBinary
    },
    {
        msgName: 'DeleteSection',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteSection.deserializeBinary
    },
    {
        msgName: 'DeleteSectionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.DeleteSectionResponse.deserializeBinary
    },
    {
        msgName: 'EditSection',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditSection.deserializeBinary
    },
    {
        msgName: 'EditSectionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.EditSectionResponse.deserializeBinary
    },
    {
        msgName: 'ControlBrightness',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.ControlBrightness.deserializeBinary
    },
    {
        msgName: 'ControlBrightnessResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.ControlBrightnessResponse.deserializeBinary
    },
    {
        msgName: 'ControlAreaBrightness',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.ControlAreaBrightness.deserializeBinary
    },
    {
        msgName: 'ControlAreaBrightnessResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.ControlAreaBrightnessResponse.deserializeBinary
    },
    {
        msgName: 'GetContactSensorList',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetContactSensorList.deserializeBinary
    },
    {
        msgName: 'GetContactSensorListResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.GetContactSensorListResponse.deserializeBinary
    },
    // Scenes
    {
        msgName: 'CreateScene',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.CreateScene.deserializeBinary
    },
    {
        msgName: 'CreateSceneResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.CreateSceneResponse.deserializeBinary
    },
    {
        msgName: 'DeleteScene',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.DeleteScene.deserializeBinary
    },
    {
        msgName: 'DeleteSceneResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.DeleteSceneResponse.deserializeBinary
    },
    {
        msgName: 'AddActionToScene',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.AddActionToScene.deserializeBinary
    },
    {
        msgName: 'AddActionToSceneResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.AddActionToSceneResponse.deserializeBinary
    },
    {
        msgName: 'RemoveActionFromScene',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.RemoveActionFromScene.deserializeBinary
    },
    {
        msgName: 'RemoveActionFromSceneResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.RemoveActionFromSceneResponse.deserializeBinary
    },
    {
        msgName: 'ExecuteScene',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.ExecuteScene.deserializeBinary
    },
    {
        msgName: 'ExecuteSceneResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.ExecuteSceneResponse.deserializeBinary
    },
    {
        msgName: 'EditSceneName',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.EditSceneName.deserializeBinary
    },
    {
        msgName: 'EditSceneNameResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.EditSceneNameResponse.deserializeBinary
    },
    {
        msgName: 'MoveSceneToRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.MoveSceneToRoom.deserializeBinary
    },
    {
        msgName: 'MoveSceneToRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.MoveSceneToRoomResponse.deserializeBinary
    },
    {
        msgName: 'AddTimeslotToScene',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.AddTimeslotToScene.deserializeBinary
    },
    {
        msgName: 'AddTimeslotToSceneResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.AddActionToSceneResponse.deserializeBinary
    },
    {
        msgName: 'RemoveTimeslotFromScene',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.RemoveTimeslotFromScene.deserializeBinary
    },
    {
        msgName: 'RemoveTimeslotFromSceneResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.RemoveTimeslotFromSceneResponse.deserializeBinary
    },
    {
        msgName: 'AdjustTimeslotDelay',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.AdjustTimeslotDelay.deserializeBinary
    },
    {
        msgName: 'AdjustTimeslotDelayResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.AdjustTimeslotDelayResponse.deserializeBinary
    },
    {
        msgName: 'SyncAreaSceneUIData',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.SyncAreaSceneUIData.deserializeBinary
    },
    {
        msgName: 'SyncAreaSceneUIDataResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.SyncAreaSceneUIDataResponse.deserializeBinary
    },
    {
        msgName: 'ControlSceneBrightness',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.ControlSceneBrightness.deserializeBinary
    },
    {
        msgName: 'ControlSceneBrightnessResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.ControlSceneBrightnessResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeRgbwwaResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.ConfigureZigbeeDimmableDriver.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeDimmableDriverState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.UpdateZigbeeDimmableDriverState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeDimmableDriverStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.UpdateZigbeeDimmableDriverStateResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeDimmableDriverRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.MoveZigbeeDimmableDriverRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeDimmableDriverRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDimmableDriverTypes.com.keus.hub.MoveZigbeeDimmableDriverRoomResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeRgbwwa',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.ConfigureZigbeeRgbwwa.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeRgbwwaResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.ConfigureZigbeeRgbwwaResponse.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeRgbwwaState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.UpdateZigbeeRgbwwaState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeRgbwwaStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.UpdateZigbeeRgbwwaStateResponse.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeRgbwwaChannelState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.UpdateZigbeeRgbwwaChannelState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeRgbwwaChannelStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.UpdateZigbeeRgbwwaChannelStateResponse.deserializeBinary
    },
    {
        msgName: 'SetZigbeeRgbwwaDefaultAction',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.SetZigbeeRgbwwaDefaultAction.deserializeBinary
    },
    {
        msgName: 'SetZigbeeRgbwwaDefaultActionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.SetZigbeeRgbwwaDefaultActionResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeRgbwwaRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.MoveZigbeeRgbwwaRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeRgbwwaRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.MoveZigbeeRgbwwaRoomResponse.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeRgbwwa',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.RenameZigbeeRgbwwa.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeRgbwwaResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.RenameZigbeeRgbwwaResponse.deserializeBinary
    },
    {
        msgName: 'ChangeZigbeeRGBWWAIcon',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.ChangeZigbeeRGBWWAIcon.deserializeBinary
    },
    {
        msgName: 'ChangeZigbeeRGBWWAIconResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRgbwwaTypes.com.keus.hub.ChangeZigbeeRGBWWAIconResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureEmbeddedSwitches',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.ConfigureEmbeddedSwitches.deserializeBinary
    },
    {
        msgName: 'ConfigureEmbeddedSwitchesResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.ConfigureEmbeddedSwitchesResponse.deserializeBinary
    },
    {
        msgName: 'AddEditAppliance',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.AddEditAppliance.deserializeBinary
    },
    {
        msgName: 'AddEditApplianceResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.AddEditApplianceResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureAppliance',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.ConfigureAppliance.deserializeBinary
    },
    {
        msgName: 'ConfigureApplianceResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.ConfigureApplianceResponse.deserializeBinary
    },
    {
        msgName: 'DeleteAppliance',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.DeleteAppliance.deserializeBinary
    },
    {
        msgName: 'DeleteApplianceResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.DeleteApplianceResponse.deserializeBinary
    },
    {
        msgName: 'EditEmbeddedSwitchDetails',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.EditEmbeddedSwitchDetails.deserializeBinary
    },
    {
        msgName: 'EditEmbeddedSwitchDetailsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.EditEmbeddedSwitchDetailsResponse.deserializeBinary
    },
    {
        msgName: 'UpdateApplianceState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.UpdateApplianceState.deserializeBinary
    },
    {
        msgName: 'UpdateApplianceStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.UpdateApplianceStateResponse.deserializeBinary
    },
    {
        msgName: 'UpdatePortState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.UpdatePortState.deserializeBinary
    },
    {
        msgName: 'UpdatePortStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.UpdatePortStateResponse.deserializeBinary
    },
    {
        msgName: 'MoveEmbeddedSwitchRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.MoveEmbeddedSwitchRoom.deserializeBinary
    },
    {
        msgName: 'MoveEmbeddedSwitchRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.MoveEmbeddedSwitchRoomResponse.deserializeBinary
    },
    {
        msgName: 'SetEmbeddedSwitchAreaMaster',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.SetEmbeddedSwitchAreaMaster.deserializeBinary
    },
    {
        msgName: 'SetEmbeddedSwitchAreaMasterResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.SetEmbeddedSwitchAreaMasterResponse.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeEmbeddedSwitchAppliance',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.RenameZigbeeEmbeddedSwitchAppliance.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeEmbeddedSwitchApplianceResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.RenameZigbeeEmbeddedSwitchApplianceResponse.deserializeBinary
    },
    {
        msgName: 'ChangeZigbeeEmbeddedSwitchApplianceIcon',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.ChangeZigbeeEmbeddedSwitchApplianceIcon.deserializeBinary
    },
    {
        msgName: 'ChangeZigbeeEmbeddedSwitchApplianceIconResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.ChangeZigbeeEmbeddedSwitchApplianceIconResponse.deserializeBinary
    },
    {
        msgName: 'SetEmbeddedSwitchAreaMasterEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.SetEmbeddedSwitchAreaMasterEvent.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeEmbeddedSceneSwitch',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.ConfigureZigbeeEmbeddedSceneSwitch.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeEmbeddedSceneSwitchResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.ConfigureZigbeeEmbeddedSceneSwitchResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeEmbeddedSceneSwitchButtons',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.ConfigureZigbeeEmbeddedSceneSwitchButtons.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeEmbeddedSceneSwitchButtonsResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.ConfigureZigbeeEmbeddedSceneSwitchButtonsResponse
                .deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeEmbeddedGlobalSceneSwitchButtons',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.ConfigureZigbeeEmbeddedGlobalSceneSwitchButtons
                .deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeEmbeddedGlobalSceneSwitchButtonsResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.ConfigureZigbeeEmbeddedGlobalSceneSwitchButtonsResponse
                .deserializeBinary
    },
    {
        msgName: 'MoveZigbeeEmbeddedSceneSwitchRoom',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.MoveZigbeeEmbeddedSceneSwitchRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeEmbeddedSceneSwitchRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeEmbeddedSceneSwitchTypes.com.keus.hub.MoveZigbeeEmbeddedSceneSwitchRoomResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeDCFanController',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.ConfigureZigbeeDCFanController.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeDCFanControllerResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.ConfigureZigbeeDCFanControllerResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeDCFanControllerRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.MoveZigbeeDCFanControllerRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeDCFanControllerRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.MoveZigbeeDCFanControllerRoomResponse.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeDCFanControllerState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.UpdateZigbeeDCFanControllerState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeDCFanControllerStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.UpdateZigbeeDCFanControllerStateResponse.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeDCFanController',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.RenameZigbeeDCFanController.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeDCFanControllerResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.RenameZigbeeDCFanControllerResponse.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeACFanController',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.RenameZigbeeACFanController.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeACFanControllerResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.RenameZigbeeACFanControllerResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureContactSensor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.ConfigureContactSensor.deserializeBinary
    },
    {
        msgName: 'ConfigureContactSensorResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.ConfigureContactSensorResponse.deserializeBinary
    },
    {
        msgName: 'UpdateContactSensorState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.UpdateContactSensorState.deserializeBinary
    },
    {
        msgName: 'UpdateContactSensorStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.UpdateContactSensorStateResponse.deserializeBinary
    },
    {
        msgName: 'MoveContactSensor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.MoveContactSensor.deserializeBinary
    },
    {
        msgName: 'MoveContactSensorResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.MoveContactSensorResponse.deserializeBinary
    },
    {
        msgName: 'SetContactSensorArmState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.SetContactSensorArmState.deserializeBinary
    },
    {
        msgName: 'SetContactSensorArmStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.SetContactSensorArmStateResponse.deserializeBinary
    },
    {
        msgName: 'RenameContactSensor',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.RenameContactSensor.deserializeBinary
    },
    {
        msgName: 'RenameContactSensorResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.RenameContactSensorResponse.deserializeBinary
    },
    {
        msgName: 'UpdateContactSensorBatteryState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.UpdateContactSensorBatteryState.deserializeBinary
    },
    {
        msgName: 'UpdateContactSensorBatteryStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.UpdateContactSensorBatteryStateResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeInlineDimmer',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeInlineDimmerTypes.com.keus.hub.ConfigureZigbeeInlineDimmer.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeInlineDimmerResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeInlineDimmerTypes.com.keus.hub.ConfigureZigbeeInlineDimmerResponse.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeInlineDimmerState',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeInlineDimmerTypes.com.keus.hub.UpdateZigbeeInlineDimmerState.deserializeBinary
    },
    {
        msgName: 'UpdateZigbeeInlineDimmerStateResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.zigbeeInlineDimmerTypes.com.keus.hub.UpdateZigbeeInlineDimmerStateResponse.deserializeBinary
    },
    //scheudle rpc type
    {
        msgName: 'CreateSchedule',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.CreateSchedule.deserializeBinary
    },
    {
        msgName: 'CreateScheduleResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.CreateScheduleResponse.deserializeBinary
    },
    {
        msgName: 'CreatePresetSchedule',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.CreatePresetSchedule.deserializeBinary
    },
    {
        msgName: 'CreatePresetScheduleResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.CreatePresetScheduleResponse.deserializeBinary
    },
    {
        msgName: 'EditSchedule',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EditSchedule.deserializeBinary
    },
    {
        msgName: 'EditScheduleResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EditScheduleResponse.deserializeBinary
    },
    {
        msgName: 'EditScheduleProperties',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EditScheduleProperties.deserializeBinary
    },
    {
        msgName: 'EditSchedulePropertiesResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EditSchedulePropertiesResponse.deserializeBinary
    },
    {
        msgName: 'EditScheduleAction',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EditScheduleAction.deserializeBinary
    },
    {
        msgName: 'EditScheduleActionResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EditScheduleActionResponse.deserializeBinary
    },
    {
        msgName: 'DeleteSchedule',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.DeleteSchedule.deserializeBinary
    },
    {
        msgName: 'DeleteScheduleResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.DeleteScheduleResponse.deserializeBinary
    },
    {
        msgName: 'EnableDisableSchedule',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EnableDisableSchedule.deserializeBinary
    },
    {
        msgName: 'EnableDisableScheduleResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.EnableDisableScheduleResponse.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeRangeExtender',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.RenameZigbeeRangeExtender.deserializeBinary
    },
    {
        msgName: 'RenameZigbeeRangeExtenderResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.RenameZigbeeRangeExtenderResponse.deserializeBinary
    },
    {
        msgName: 'ReplaceZigbeeRangeExtender',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.ReplaceZigbeeRangeExtender.deserializeBinary
    },
    {
        msgName: 'ReplaceZigbeeRangeExtenderResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.ReplaceZigbeeRangeExtenderResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeRangeExtenderRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.MoveZigbeeRangeExtenderRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeRangeExtenderRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.MoveZigbeeRangeExtenderRoomResponse.deserializeBinary
    },
    {
        msgName: 'IdentifyZigbeeRangeExtender',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.IdentifyZigbeeRangeExtender.deserializeBinary
    },
    {
        msgName: 'IdentifyZigbeeRangeExtenderResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeRangeExtender.com.keus.hub.IdentifyZigbeeRangeExtenderResponse.deserializeBinary
    },
    {
        msgName: 'DeleteUserBySelf',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.cloudToGatewayRpcTypes.com.keus.hub.DeleteUserBySelf.deserializeBinary
    },
    {
        msgName: 'DeleteUserBySelfResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.cloudToGatewayRpcTypes.com.keus.hub.DeleteUserBySelfResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeCurtainWizard',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.ZigbeeCurtainWizardTypes.com.keus.hub.ConfigureZigbeeCurtainWizard.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeCurtainWizardResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.ZigbeeCurtainWizardTypes.com.keus.hub.ConfigureZigbeeCurtainWizardResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeCurtainWizardButtons',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.ZigbeeCurtainWizardTypes.com.keus.hub.ConfigureZigbeeCurtainWizardButtons.deserializeBinary
    },
    {
        msgName: 'ConfigureZigbeeCurtainWizardButtonsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.ZigbeeCurtainWizardTypes.com.keus.hub.ConfigureZigbeeCurtainWizardButtonsResponse.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeCurtainWizardRoom',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.ZigbeeCurtainWizardTypes.com.keus.hub.MoveZigbeeCurtainWizardRoom.deserializeBinary
    },
    {
        msgName: 'MoveZigbeeCurtainWizardRoomResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.ZigbeeCurtainWizardTypes.com.keus.hub.MoveZigbeeCurtainWizardRoomResponse.deserializeBinary
    },
    {
        msgName: 'UpdateDeviceBatteryStatus',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.UpdateDeviceBatteryStatus.deserializeBinary
    },
    {
        msgName: 'UpdateDeviceBatteryStatusResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.UpdateDeviceBatteryStatusResponse.deserializeBinary
    },

    {
        msgName: 'GetSchedules',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.scheduleRpcTypes.com.keus.hub.GetSchedules.deserializeBinary
    },
    {
        msgName: 'GetSchedulesResponse',
        packageName: ProtoPackageName,
        deserializeFunc:
            protoRpcRegistry.scheduleRpcTypes.com.keus.hub.GetSchedulesResponse.deserializeBinary
    },

    //Notification types
    {
        msgName: 'FetchContactSensorNotifications',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.notificationRpcTypes.com.keus.hub.FetchContactSensorNotifications.deserializeBinary
    },
    {
        msgName: 'FetchContactSensorNotificationsResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.notificationRpcTypes.com.keus.hub.FetchContactSensorNotificationsResponse.deserializeBinary
    },

    //favorite handlers
    {
        msgName: 'AddFavorite',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.AddFavorite.deserializeBinary
    },
    {
        msgName: 'AddFavoriteResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.AddFavoriteResponse.deserializeBinary
    },
    {
        msgName: 'DeleteFavorite',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.DeleteFavorite.deserializeBinary
    },
    {
        msgName: 'DeleteFavoriteResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.DeleteFavoriteResponse.deserializeBinary
    },
    {
        msgName: 'FetchFavoriteByUser',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.FetchFavoriteByUser.deserializeBinary
    },
    {
        msgName: 'FetchFavoriteByUserResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.FetchFavoriteByUserResponse.deserializeBinary
    },
    {
        msgName: 'FetchFavoriteByRoomName',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.FetchFavoriteByRoomName.deserializeBinary
    },
    {
        msgName: 'FetchFavoriteByRoomNameResponse',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.favoriteRpcTypes.com.keus.hub.FetchFavoriteByRoomNameResponse.deserializeBinary
    },

    //GMAppliance Handlers
    {
        msgName: 'CreateAppliance',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.CreateAppliance.deserializeBinary
    },
    {
        msgName: 'CreateApplianceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.CreateApplianceResponse.deserializeBinary
    },
    {
        msgName: 'DeleteAppliance',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.DeleteAppliance.deserializeBinary
    },
    {
        msgName: 'DeleteApplianceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.DeleteApplianceResponse.deserializeBinary
    },
    {
        msgName: 'DeleteApplianceJobEvent',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.DeleteApplianceJobEvent.deserializeBinary
    },
    {
        msgName: 'ConfigureApplianceProperties',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.ConfigureApplianceProperties.deserializeBinary
    },
    {
        msgName: 'ConfigureAppliancePropertiesResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.ConfigureAppliancePropertiesResponse.deserializeBinary
    },
    {
        msgName: 'RenameAppliance',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.RenameAppliance.deserializeBinary
    },
    {
        msgName: 'RenameApplianceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.RenameApplianceResponse.deserializeBinary
    },
    {
        msgName: 'MoveAppliance',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.MoveAppliance.deserializeBinary
    },
    {
        msgName: 'MoveApplianceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.MoveApplianceResponse.deserializeBinary
    },
    {
        msgName: 'SetApplianceControlInfo',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceControlInfo.deserializeBinary
    },
    {
        msgName: 'SetApplianceControlInfoResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceControlInfoResponse.deserializeBinary
    },
    {
        msgName: 'SetApplianceState',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceState.deserializeBinary
    },
    {
        msgName: 'SetApplianceStateResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceStateResponse.deserializeBinary
    },
    {
        msgName: 'SetApplianceVoiceDiscoverable',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceVoiceDiscoverable.deserializeBinary
    },
    {
        msgName: 'SetApplianceVoiceDiscoverableResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceVoiceDiscoverableResponse.deserializeBinary
    },
    {
        msgName: 'SetApplianceVoiceName',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceVoiceName.deserializeBinary
    },
    {
        msgName: 'SetApplianceVoiceNameResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceVoiceNameResponse.deserializeBinary
    },
    {
        msgName: 'SetApplianceIcon',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceIcon.deserializeBinary
    },
    {
        msgName: 'SetApplianceIconResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceIconResponse.deserializeBinary
    },
    {
        msgName: 'ReportApplianceActivity',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.ReportApplianceActivity.deserializeBinary
    },
    {
        msgName: 'ReportApplianceActivityResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.ReportApplianceActivityResponse.deserializeBinary
    },
    {
        msgName: 'SetApplianceDefaultState',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceDefaultState.deserializeBinary
    },
    {
        msgName: 'SetApplianceDefaultStateResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.SetApplianceDefaultStateResponse.deserializeBinary
    },
    // {
    //     msgName:'PingCamera',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.PingCamera.deserializeBinary
    // },
    // {
    //     msgName:'PingCameraResponse',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.PingCameraResponse.deserializeBinary
    // },
    // {
    //     msgName:'UpdateCameraNotification',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.UpdateCameraNotification.deserializeBinary
    // },
    // {
    //     msgName:'UpdateCameraNotificationResponse',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.UpdateCameraNotificationResponse.deserializeBinary
    // },
    // {
    //     msgName:'ReportCameraLiveEvent',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.ReportCameraLiveEvent.deserializeBinary
    // },
    // {
    //     msgName:'ReportCameraLiveEventResponse',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.ReportCameraLiveEventResponse.deserializeBinary
    // },
    // {
    //     msgName:'GetCameraEvents',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.GetCameraEvents.deserializeBinary
    // },
    // {
    //     msgName:'GetCameraEventsResponse',
    //     packageName:GMProtoPackageName,
    //     deserializeFunc:protoRpcRegistry.unifiApplianceRPCTypes.com.keus.hub.GetCameraEventsResponse.deserializeBinary
    // },


    //GMGroup Handlers
    {
        msgName: 'CreateGMGroup',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.CreateGMGroup.deserializeBinary
    },
    {
        msgName: 'CreateGMGroupResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.CreateGMGroupResponse.deserializeBinary
    },
    {
        msgName: 'MoveGMGroup',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.MoveGMGroup.deserializeBinary
    },
    {
        msgName: 'MoveGMGroupResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.MoveGMGroupResponse.deserializeBinary
    },
    {
        msgName: 'IdentifyGMGroup',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.IdentifyGMGroup.deserializeBinary
    },
    {
        msgName: 'IdentifyGMGroupResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.IdentifyGMGroupResponse.deserializeBinary
    },

    {
        msgName: 'RegisterDevice',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.RegisterDevice.deserializeBinary
    },
    {
        msgName: 'RegisterDeviceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.deviceRpcTypes.com.keus.hub.RegisterDeviceResponse.deserializeBinary
    },
    {
        msgName: 'DiscoverGMDevice',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.DiscoverGMDevice.deserializeBinary
    },
    {
        msgName: 'DiscoverGMDeviceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.DiscoverGMDeviceResponse.deserializeBinary
    },
    {
        msgName: 'UpdateGMDeviceControlInfo',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.UpdateGMDeviceControlInfo.deserializeBinary
    },
    {
        msgName: 'UpdateGMDeviceControlInfoResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.UpdateGMDeviceControlInfoResponse.deserializeBinary
    },
    {
        msgName: 'GetHVACRemoteList',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.GetHVACRemoteList.deserializeBinary
    },
    {
        msgName: 'GetHVACRemoteListResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.GetHVACRemoteListResponse.deserializeBinary
    },
    {
        msgName: 'GetHVACCMRemoteListResponse',
        packageName: ProtoCloudPackageName,
        deserializeFunc: protoRpcRegistry.gatewayToCloudRpcTypes.com.keus.cloud.GetHVACCMRemoteListResponse.deserializeBinary
    },
    {
        msgName: 'ValidateHVACCMIP',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.ValidateHVACCMIP.deserializeBinary
    },
    {
        msgName: 'ValidateHVACCMIPResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.ValidateHVACCMIPResponse.deserializeBinary
    },
    {
        msgName: 'RenameIndoorUnit',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.RenameIndoorUnit.deserializeBinary
    },
    {
        msgName: 'RenameIndoorUnitResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.RenameIndoorUnitResponse.deserializeBinary
    },


    {
        msgName: 'ConfigureIndoorUnit',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.ConfigureIndoorUnit.deserializeBinary
    },
    {
        msgName: 'ConfigureIndoorUnitResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.ConfigureIndoorUnitResponse.deserializeBinary
    },

    // {
    //     msgName: 'DiscoverCameras',
    //     packageName: GMProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.hub.DiscoverCameras.deserializeBinary
    // },
    // {
    //     msgName: 'DiscoverCamerasResponse',
    //     packageName: GMProtoPackageName,
    //     deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.DiscoverCamerasResponse.deserializeBinary
    // },

    {
        msgName: 'RenameGMGroup',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.RenameGMGroup.deserializeBinary
    },
    {
        msgName: 'RenameGMGroupResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.RenameGMGroupResponse.deserializeBinary
    },
    {
        msgName: 'AddApplianceToGMGroup',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.AddApplianceToGMGroup.deserializeBinary
    },
    {
        msgName: 'AddApplianceToGMGroupResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.AddApplianceToGMGroupResponse.deserializeBinary
    },
    {
        msgName: 'RemoveApplianceFromGMGroup',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.RemoveApplianceFromGMGroup.deserializeBinary
    },
    {
        msgName: 'RemoveApplianceFromGMGroupResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.RemoveApplianceFromGMGroupResponse.deserializeBinary
    },
    {
        msgName: 'ConfigureGMGroupProperties',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.ConfigureGMGroupProperties.deserializeBinary
    },
    {
        msgName: 'ConfigureGMGroupPropertiesResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.ConfigureGMGroupPropertiesResponse.deserializeBinary
    },
    {
        msgName: 'GMGroupConfigureEvent',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.GMGroupConfigureEvent.deserializeBinary
    },
    {
        msgName: 'SetGMGroupState',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.SetGMGroupState.deserializeBinary
    },
    {
        msgName: 'SetGMGroupStateResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.SetGMGroupStateResponse.deserializeBinary
    },
    {
        msgName: 'GMGroupControlEvent',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.GMGroupControlEvent.deserializeBinary
    },
    {
        msgName: 'DeleteGMGroup',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.DeleteGMGroup.deserializeBinary
    },
    {
        msgName: 'DeleteGMGroupResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.DeleteGMGroupResponse.deserializeBinary
    },
    {
        msgName: 'GMGroupDeleteEvent',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.GMGroupDeleteEvent.deserializeBinary
    },
    {
        msgName: 'SetGMGroupIcon',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.SetGMGroupIcon.deserializeBinary
    },
    {
        msgName: 'SetGMGroupIconResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.SetGMGroupIconResponse.deserializeBinary
    },
    {
        msgName: 'SetGMGroupDefaultState',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.SetGMGroupDefaultState.deserializeBinary
    },
    {
        msgName: 'SetGMGroupDefaultStateResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.SetGMGroupDefaultStateResponse.deserializeBinary
    },

    //GM Device Handlers
    {
        msgName: 'SetDeviceState',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.SetDeviceState.deserializeBinary
    },
    {
        msgName: 'SetDeviceStateResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.SetDeviceStateResponse.deserializeBinary
    },
    {
        msgName: 'SetDeviceLocation',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.SetDeviceLocation.deserializeBinary
    },
    {
        msgName: 'SetDeviceLocationResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.SetDeviceLocationResponse.deserializeBinary
    },
    {
        msgName: 'RenameDevice',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.RenameDevice.deserializeBinary
    },
    {
        msgName: 'RenameDeviceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.RenameDeviceResponse.deserializeBinary
    },
    {
        msgName: 'DiscoverIndoorUnits',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.DiscoverIndoorUnits.deserializeBinary
    },
    {
        msgName: 'DiscoverIndoorUnitsResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.DiscoverIndoorUnitsResponse.deserializeBinary
    },
    {
        msgName: 'DiscoverIndoorUnitEvent',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.HVACRpcTypes.com.keus.gateway.DiscoverIndoorUnitEvent.deserializeBinary
    },
    {
        msgName: 'MoveDevice',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.MoveDevice.deserializeBinary
    },
    {
        msgName: 'MoveDeviceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.MoveDeviceResponse.deserializeBinary
    },
    {
        msgName: 'IdentifyDevice',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.IdentifyDevice.deserializeBinary
    },
    {
        msgName: 'IdentifyDeviceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.IdentifyDeviceResponse.deserializeBinary
    },
    {
        msgName: 'DeleteDevice',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.DeleteDevice.deserializeBinary
    },
    {
        msgName: 'DeleteDeviceResponse',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMDeviceRpcTypes.com.keus.gateway.DeleteDeviceResponse.deserializeBinary
    },

    //gateway events
    {
        msgName: 'UpdateGroupEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.groupRpcTypes.com.keus.hub.UpdateGroupEvent.deserializeBinary
    },
    {
        msgName: 'SceneExecutionEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.sceneRpcTypes.com.keus.hub.SceneExecutionEvent.deserializeBinary
    },
    {
        msgName: 'ZigbeeACFanControllerEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeAcFanControlerTypes.com.keus.hub.ZigbeeACFanControllerEvent.deserializeBinary
    },
    {
        msgName: 'ZigbeeCurtainControllerEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeCurtainControllerTypes.com.keus.hub.ZigbeeCurtainControllerEvent.deserializeBinary
    },
    {
        msgName: 'ZigbeeDCFanControllerEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeDcFanControlerTypes.com.keus.hub.ZigbeeDCFanControllerEvent.deserializeBinary
    },
    {
        msgName: 'ZigbeeEmbeddedApplianceEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeEmbeddedSwitchTypes.com.keus.hub.ZigbeeEmbeddedApplianceEvent.deserializeBinary
    },
    {
        msgName: 'IRRemoteEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeIRBlasterTypes.com.keus.hub.IRRemoteEvent.deserializeBinary
    },
    {
        msgName: 'ConsoleRelayEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.smartConsoleTypes.com.keus.hub.ConsoleRelayEvent.deserializeBinary
    },
    {
        msgName: 'SetContactSensorArmStateEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.zigbeeContactSensorTypes.com.keus.hub.SetContactSensorArmStateEvent.deserializeBinary
    },
    {
        msgName: 'ControlBrightnessEvent',
        packageName: ProtoPackageName,
        deserializeFunc: protoRpcRegistry.homeRpcTypes.com.keus.hub.ControlBrightnessEvent.deserializeBinary
    },
    {
        msgName: 'GMApplianceControlEvent',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMApplianceRpcTypes.com.keus.gateway.GMApplianceControlEvent.deserializeBinary
    },
    {
        msgName: 'GMGroupControlEvent',
        packageName: GMProtoPackageName,
        deserializeFunc: protoRpcRegistry.GMGroupRpcTypes.com.keus.gateway.GMGroupControlEvent.deserializeBinary
    }
];

export default TypeRegistry;

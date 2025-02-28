/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.11.2
 * source: hub/activity/activity_constants.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as pb_1 from "google-protobuf";
export namespace com.keus.hub {
    export enum ACTIVITY_SOURCE_TYPES {
        MANUAL_TRIGGER = 0,
        ANDROID_TRIGGER = 1,
        IOS_TRIGGER = 2,
        SCHEDULE_TRIGGER = 3,
        SCENE_TRIGGER = 4,
        SYSTEM_TRIGGER = 5,
        ALEXA_TRIGGER = 6,
        GOOGLEASSISTANT_TRIGGER = 7,
        DEVICESYNC_TRIGGER = 8,
        SCENESWITCH_TRIGGER = 9
    }
    export enum REPORT_ACTIVITY_TYPES {
        CURTAIN_DEVICE = 0,
        ACFAN_DEVICE = 1,
        DCFAN_DEVICE = 2,
        SCRELAY_DEVICE = 3,
        ESAPPL_DEVICE = 4,
        UPDATE_GROUP = 5,
        EXECUTE_SCENE = 6,
        GM_APPLIANCE = 7,
        GM_GROUP = 8
    }
    export enum JOB_TYPES_NAME {
        NO_JOB_RUNNING = 0,
        CONFIGURE_GROUP_JOB = 1,
        DELETE_GROUP_JOB = 2,
        SCENE_ADD_ACTION_JOB = 3,
        SCENE_REMOVE_ACTION_JOB = 4,
        SCENE_ADD_TIMESLOT_JOB = 5,
        SCENE_REMOVE_TIME_SLOT_JOB = 6,
        SCENE_DELETE_JOB = 7,
        SYNC_DEVICE_SCENE_UI_JOB = 8,
        SYNC_AREA_SCENE_UI_JOB = 9,
        REPLACE_DEVICE_JOB = 10,
        MOVE_ROOM_JOB = 12,
        SET_AREA_MASTER_JOB = 11
    }
}

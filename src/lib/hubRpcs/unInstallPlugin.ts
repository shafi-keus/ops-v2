import { nc } from "$lib/stores";
import { installingPluigns } from "$lib/stores/node-config";
import { get } from "svelte/store";

interface CallerResponse {
    success: boolean;
    data?: {
        success: boolean;
        actionResponseData?: {
            error?: unknown;
            success: boolean;
        };
    };
    error?: unknown;
}


interface ActionData {
    nodeId: string;
    pluginId: string;
    version: string;
}


export const unInstallPluginThroughNats = async (gatewayId: string, data: ActionData) => {
    try {

        if (!gatewayId) {
            throw new Error('Gateway ID is required');
        }
        const request = {
            serviceName: 'site_manager',
            versionNo: 'v1',
            actionName: 'UninstallPlugin',
            actionData: data,
            timeout: 10000000,
            retries: 1
        };

        const response: CallerResponse = await nc.jsonCallRPC(
            `${gatewayId}-KIOTP`,
            request
        );

        installingPluigns.update(plugins =>
            plugins.filter(plugin => plugin.id !== data.pluginId)
        );

        if (!response || !response?.data?.success) {
            return {
                success: false,
                error: 'unknown error'
            }
        }

        return response.data?.actionResponseData;

    } catch (error) {
        installingPluigns.update(plugins =>
            plugins.filter(plugin => plugin.id !== data.pluginId)
        );
        console.error("Plugin uninstallation failed", get(installingPluigns));

        return {
            success: false,
            error
        };
    }
};


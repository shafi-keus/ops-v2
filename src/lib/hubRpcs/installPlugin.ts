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

type LaunchType = 'INTER_PP' | 'INTRA_PP';


interface ActionData {
    nodeId: string;
    launchType: LaunchType;
    id: string;
    version: string;
}

export const installPluginThroughNats = async (gatewayId: string, data: ActionData) => {
    try {

        if (!gatewayId) {
            throw new Error('Gateway ID is required');
        }
        const request = {
            serviceName: 'site_manager',
            versionNo: 'v1',
            actionName: 'InstallPlugin',
            actionData: data,
            timeout: 10000000,
            retries: 1
        };

        const response: CallerResponse = await nc.jsonCallRPC(
            `${gatewayId}-KIOTP`,
            request
        );

        console.log(response)
        installingPluigns.update(plugins =>
            plugins.filter(plugin => plugin.id !== data.id)
        );

        if (!response || !response.data?.success) {

            return {
                success: false,
                error: 'unknow error'
            }
        }

        return response.data;

    } catch (error) {
        installingPluigns.update(plugins =>
            plugins.filter(plugin => plugin.id !== data.id)
        );
        console.error("Plugin installation failed", get(installingPluigns))

        return {
            success: false,
            error
        };
    }
};


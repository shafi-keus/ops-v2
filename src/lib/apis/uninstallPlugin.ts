import axios from 'axios';
import { installingPluigns } from '$lib/stores/node-config';
import { get } from 'svelte/store';

interface IPluginUninstall {
    nodeId: string;
    pluginId: string;
    version: string;
}

interface Response {
    success: boolean;
    error?: unknown
}

export default async function (ip: string, data: IPluginUninstall): Promise<Response> {
    const addrs = `http://${ip}:3000/keus/v1/site_manager/UninstallPlugin`;

    console.log("Uninstall plugin req data : ", data);

    try {
        const response = await axios.post(
            addrs,
            data,
            { timeout: 10000 }
        );
        console.log(response);

        installingPluigns.update(plugins =>
            plugins.filter(plugin => plugin.id !== data.pluginId)
        );

        if (!response || !response.data.success) {
            return {
                success: false,
                error: 'unknown error'
            }
        }

        return response.data;
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
}
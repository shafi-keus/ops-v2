// api/installPlugin.ts
import axios from 'axios';
import { installingPluigns } from '$lib/stores/node-config';  // Import the store
import { get } from 'svelte/store';

type LaunchType = 'INTER_PP' | 'INTRA_PP';

interface IPluginInstall {
    nodeId: string;
    launchType: LaunchType;
    id: string;
    version: string;
}

interface Response {
    success: boolean;
    error?: unknown
}

export default async function (ip: string, data: IPluginInstall): Promise<Response> {
    const addrs = `http://${ip}:3000/keus/v1/site_manager/InstallPlugin`
    // const addrs = `/keus/v1/site_manager/InstallPlugin`;

    


    try {
        const response = await axios.post(
            addrs,
            data,
            { timeout: 10000000 }
        );
        
        installingPluigns.update(plugins =>
            plugins.filter(plugin => plugin.id !== data.id)
        );

        if (!response || !response.data.success) {

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
}
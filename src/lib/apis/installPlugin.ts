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
    error?: any
}

export default async function (ip: string, data: IPluginInstall): Promise<Response> {
    const addrs = `http://${ip}:3000/keus/v1/site_manager/InstallPlugin`

    try {
        const response = await axios.post(
            addrs,
            data,
            { timeout: 10000 }
        );
        console.log(response)
        
        if (!response || !response.data.success) {
            // Remove failed plugin from installing plugins store
            installingPluigns.update(plugins => 
                plugins.filter(plugin => plugin.id !== data.id)
            );
            return {
                success : false,
                error : 'unknow error'
            }
        }

        console.log("installing plugins in try : ",get(installingPluigns))

        
        return response.data;
    } catch (error) {
        // Remove failed plugin in case of error
        
        installingPluigns.update(plugins => 
            plugins.filter(plugin => plugin.id !== data.id)
        );
        console.log("installing plugins in catch : ",get(installingPluigns))
        
        return {
            success: false,
            error: 'unknown error'
        };
    }
}
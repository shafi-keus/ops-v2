import axios from 'axios';

// Plugin image configuration interface
interface ImageConfig {
    image: string;
}

// Individual plugin interface
interface Plugin {
    _id: string;
    description: string;
    displayName: string;
    imageConfig: ImageConfig;
    name: string;
    pluginCategory: string[];
    pluginType: 'CORE_PLUGIN' | 'DEVICE_PLUGIN' | 'GENERAL_PLUGIN';
    serviceCategory: string[];
    version: string;
}

// Main response interface
interface PluginsResponse {
    success: boolean;
    data: {
        success: boolean
        data: Plugin[];
    }

}

export default async function (): Promise<Plugin[]> {
    try {
        const pluginsData: PluginsResponse = await axios.get(`http://100.120.83.56:3000/keus/v1/Plugins/getAllPlugins`, { timeout: 10000 });
        console.log(pluginsData)
        if (pluginsData?.data?.success)
            return pluginsData?.data?.data;
        else return []


    } catch (e) {
        console.log(e)
        return []
    }
}
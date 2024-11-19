import axios from 'axios';

// Plugin image configuration interface
interface ImageConfig {
    image: string;
}

// Individual plugin interface
interface Plugin {
    _id: string;
    pluginId : string;
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

const addrs = 'https://testapp.keus.in/api/v1/PluginsStore/getAllPlugins'
// const addrs = 'http://10.1.4.160:3040/api/v1/PluginsStore/getAllPlugins'
// const addrs = 'http://localhost:3000/keus/v1/Plugins/getAllPlugins'

export default async function (): Promise<Plugin[]> {
    try {
        const pluginsData: PluginsResponse = await axios.get(`${addrs}`, { timeout: 10000 });
        console.log("Get all plugins data ",pluginsData?.data?.data)
        if (pluginsData?.data?.success)
            return pluginsData?.data?.data;
        else return []


    } catch (e) {
        console.log(e)
        return []
    }
}
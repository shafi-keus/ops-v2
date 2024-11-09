import { writable } from "svelte/store";


export enum PluginType {
    CORE_PLUGIN = 'CORE_PLUGIN',
    DEVICE_PLUGIN = 'DEVICE_PLUGIN',
    GENERAL_PLUGIN = 'GENERAL_PLUGIN'
}

export interface BasePlugin {
    id: string;
    name: string;
    version: string;
    type: PluginType;
    description: string;
    installLocation: string;
    launchType: 'INTRA_PP' | 'INTER_PP';
    localInstall: boolean;
    pluginCategory: string[];
    category: string[];
}

export interface DevicePluginOutput {
    id: string;
    name: string;
    version: string;
    type: PluginType.DEVICE_PLUGIN;
    description: string;
}

export interface PluginBase {
    name: string;
    version: string;
    description: string;
    device_plugins: DevicePluginOutput[];
}

export interface CorePluginOutput extends PluginBase {
    type: PluginType.CORE_PLUGIN;
}

export interface GeneralPluginOutput extends PluginBase {
    type: PluginType.GENERAL_PLUGIN;
}

export interface CategorySection<T extends CorePluginOutput | GeneralPluginOutput> {
    name?: string;
    description?: string;
    plugins: T[];
}

export interface PluginOutput {
    plugins: {
        core: CategorySection<CorePluginOutput>;
        general: CategorySection<GeneralPluginOutput>;
    };
}

export interface InstallingPlugins  {
    name : string;
    version? : string
    progress?: number;
    id : string;
    type : string;
    coreType? : string
}

const isPluginType = (plugin: BasePlugin, type: PluginType): boolean => plugin.type === type;

const isCorePlugin = (plugin: BasePlugin) => isPluginType(plugin, PluginType.CORE_PLUGIN);

const isDevicePlugin = (plugin: BasePlugin) => isPluginType(plugin, PluginType.DEVICE_PLUGIN);

const isGeneralPlugin = (plugin: BasePlugin) => isPluginType(plugin, PluginType.GENERAL_PLUGIN);


const createDevicePlugin = (device: BasePlugin): DevicePluginOutput => ({
    id: device.id,
    name: device.name,
    version: device.version,
    type: PluginType.DEVICE_PLUGIN,
    description: device.description
});

const processPluginSection = <T extends CorePluginOutput | GeneralPluginOutput>(
    mainPlugins: BasePlugin[],
    devicePlugins: BasePlugin[],
    type: T['type']
): CategorySection<T> => {
    // const firstPlugin = mainPlugins[0];

    const processedPlugins = mainPlugins.map(plugin => ({
        name: plugin.name,
        version: plugin.version,
        type,
        description: plugin.description,
        device_plugins: devicePlugins
            .filter(device => device.id.startsWith(plugin.id))
            .map(createDevicePlugin)
    })) as T[];

    return {
        name: type === PluginType.CORE_PLUGIN ? 'Plugin Core' : 'General Utilities',
        description: type == PluginType.GENERAL_PLUGIN ? 'Plugins for general utilites' : '',
        plugins: processedPlugins
    };
};

// Main Processing Function
export async function processMediaData(plugins: BasePlugin[]): Promise<void> {
    const output: PluginOutput = {
        plugins: {
            core: {
                // name: '',
                // description: '',
                plugins: []
            },
            general: {
                name: '',
                description: '',
                plugins: []
            }
        }
    };

    const corePlugins = plugins.filter(isCorePlugin);
    const devicePlugins = plugins.filter(isDevicePlugin);
    const generalPlugins = plugins.filter(isGeneralPlugin);

    if (corePlugins.length > 0) {
        output.plugins.core = processPluginSection<CorePluginOutput>(
            corePlugins,
            devicePlugins,
            PluginType.CORE_PLUGIN
        );
    }

    if (generalPlugins.length > 0) {
        output.plugins.general = processPluginSection<GeneralPluginOutput>(
            generalPlugins,
            devicePlugins,
            PluginType.GENERAL_PLUGIN
        );
    }
    pluginStore.set(output);

    console.log('plugin store : ', output)
}

// Stores
export const pluginStore = writable<PluginOutput>({
    plugins: {
        core: { name: '', description: '', plugins: [] },
        general: { name: '', description: '', plugins: [] }
    }
});

export const installingPluigns = writable<InstallingPlugins[]>([]);
export const availablePluginCategories = writable<string[]>([]);
export const availablePlugins = writable<string[]>([]);
export const nodeData = writable<Record<string, unknown>>({});
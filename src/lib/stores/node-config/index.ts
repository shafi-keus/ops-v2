import { writable, type Writable } from "svelte/store";

// Input types
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

export enum PluginType {
    CORE_PLUGIN = 'CORE_PLUGIN',
    DEVICE_PLUGIN = 'DEVICE_PLUGIN',
    GENERAL_PLUGIN = 'GENERAL_PLUGIN'
}

export interface PluginOutput {
    plugins: {
        core: {
            name: string;  // Added name field
            description: string;
            plugins: CorePluginOutput[];
        };
        general: {
            name: string;  // Added name field
            description: string;
            plugins: GeneralPluginOutput[];
        };
    };
}

export interface CorePluginOutput {
    name: string;
    version: string;
    type: PluginType.CORE_PLUGIN;
    description: string;
    device_plugins: DevicePluginOutput[];
}

export interface GeneralPluginOutput {
    name: string;
    version: string;
    type: PluginType.GENERAL_PLUGIN;
    description: string;
    device_plugins: DevicePluginOutput[];
}

export interface DevicePluginOutput {
    id: string;
    name: string;
    version: string;
    type: PluginType.DEVICE_PLUGIN;
    description: string;
}

export type InstallingPlugins = {
    name: string,
    version?: string,
    progress?: number
}






export async function processMediaData(plugins: BasePlugin[]) {
    // Initialize output with correct typing
    const output: PluginOutput = {
        plugins: {
            core: {
                name: 'Core Plugins',
                description: '',
                plugins: []
            },
            general: {
                name: 'General Plugins',
                description: '',
                plugins: []
            }
        }
    };

    const isCorePlugin = (plugin: BasePlugin): plugin is BasePlugin & { type: PluginType.CORE_PLUGIN } =>
        plugin.type === PluginType.CORE_PLUGIN;

    const isDevicePlugin = (plugin: BasePlugin): plugin is BasePlugin & { type: PluginType.DEVICE_PLUGIN } =>
        plugin.type === PluginType.DEVICE_PLUGIN;

    const isGeneralPlugin = (plugin: BasePlugin): plugin is BasePlugin & { type: PluginType.GENERAL_PLUGIN } =>
        plugin.type === PluginType.GENERAL_PLUGIN;

    // Separate plugins by type
    const corePlugins = plugins.filter(isCorePlugin);
    const devicePlugins = plugins.filter(isDevicePlugin);
    const generalPlugins = plugins.filter(isGeneralPlugin);

    // Process core plugins
    if (corePlugins.length > 0) {
        const corePlugin = corePlugins[0];
        output.plugins.core.name = corePlugin.name;  // You can set this dynamically if needed
        output.plugins.core.description = corePlugin.description;

        output.plugins.core.plugins = corePlugins.map((core) => {
            const coreEntry: CorePluginOutput = {
                name: core.name,
                version: core.version,
                type: PluginType.CORE_PLUGIN,
                description: core.description,
                device_plugins: []
            };

            // Find associated device plugins
            const associatedDevices = devicePlugins
                .filter(device => device.id.startsWith(core.id))
                .map((device): DevicePluginOutput => ({
                    id: device.id,
                    name: device.name,
                    version: device.version,
                    type: PluginType.DEVICE_PLUGIN,
                    description: device.description
                }));

            coreEntry.device_plugins = associatedDevices;
            return coreEntry;
        });
    }

    // Process general plugins
    if (generalPlugins.length > 0) {
        output.plugins.general.name = 'General Utilities';  // You can set this dynamically if needed
        output.plugins.general.description = 'Manage General plugins and utilities';

        output.plugins.general.plugins = generalPlugins.map((general) => {
            const generalEntry: GeneralPluginOutput = {
                name: general.name,
                version: general.version,
                type: PluginType.GENERAL_PLUGIN,
                description: general.description,
                device_plugins: []
            };

            // Find associated device plugins for general plugins
            const associatedDevices = devicePlugins
                .filter(device => device.id.startsWith(general.id))
                .map((device): DevicePluginOutput => ({
                    id: device.id,
                    name: device.name,
                    version: device.version,
                    type: PluginType.DEVICE_PLUGIN,
                    description: device.description
                }));

            generalEntry.device_plugins = associatedDevices;
            return generalEntry;
        });
    }

    console.log('Processed output:', output);
    pluginStore.set(output);
}


// installing plugins
export const installingPluigns: Writable<Array<InstallingPlugins>> = writable([
])

// avalable plugin categories to install
export const availablePluginCategories = writable([])

// avalable plugins to install
export const availablePlugins = writable([])

// node data
export const nodeData = writable({})


// Initial state
const initialState: PluginOutput = {
    plugins: {
        core: {
            name: '',
            description: '',
            plugins: []
        },
        general: {
            name: '',
            description: '',
            plugins: []
        }
    }
};
export const pluginStore = writable<PluginOutput>(initialState);
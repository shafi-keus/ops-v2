import { Capacitor } from '@capacitor/core';

// Check if running on native platform (iOS or Android)
export const isNativePlatform = Capacitor.isNativePlatform();

// Get the specific platform
export const platform = Capacitor.getPlatform();
// Returns: 'ios' | 'android' | 'web'


export const isIOS = Capacitor.getPlatform() === 'ios';
export const isAndroid = Capacitor.getPlatform() === 'android';
export const isWeb = Capacitor.getPlatform() === 'web';




export const truncateText = (text: string, maxLength: number = 15) => {
    if (!text || text?.length == 0) return ''
    if (text?.length <= maxLength) {
        return text;
    }
    return text?.substring(0, maxLength - 3) + '...';
}


// Types for the organized structure
// interface DevicePlugin {
//     id: string;
//     name: string;
//     version: string;
//     type: string;
//     description: string;
// }

// interface Plugin {
//     name: string;
//     version: string;
//     type: string;
//     description: string;
//     device_plugins: DevicePlugin[];
// }

// interface PluginCategory {
//     name: string;
//     description: string;
//     plugins: Plugin[];
// }

// interface OrganizedPlugins {
//     [category: string]: PluginCategory;
// }

// Function to transform cloud plugins to hub format
// export function transformCloudPlugins(cloudPlugins: any[]): OrganizedPlugins {
//     const organized: OrganizedPlugins = {
//         core: {
//             name: "Plugin Core",
//             description: "",
//             plugins: []
//         },
//         general: {
//             name: "General Utilities",
//             description: "Plugins for general utilities",
//             plugins: []
//         }
//     };

//     // First, organize core plugins and collect their device plugins
//     const corePluginsMap = new Map<string, Plugin>();

//     // Find and organize core plugins first
//     cloudPlugins
//         .filter(plugin => plugin.pluginType === 'CORE_PLUGIN')
//         .forEach(corePlugin => {
//             corePluginsMap.set(corePlugin.serviceCategory[0] || 'general', {
//                 name: corePlugin.displayName,
//                 version: corePlugin.version,
//                 type: corePlugin.pluginType,
//                 description: corePlugin.description,
//                 device_plugins: []
//             });
//         });

//     // Add device plugins to their corresponding core plugins
//     cloudPlugins
//         .filter(plugin => plugin.pluginType === 'DEVICE_PLUGIN')
//         .forEach(devicePlugin => {
//             const serviceCategory = devicePlugin.serviceCategory[0];
//             if (serviceCategory) {
//                 const corePlugin = corePluginsMap.get(serviceCategory);
//                 if (corePlugin) {
//                     corePlugin.device_plugins.push({
//                         id: devicePlugin.name,
//                         name: devicePlugin.displayName,
//                         version: devicePlugin.version,
//                         type: devicePlugin.pluginType,
//                         description: devicePlugin.description
//                     });
//                 }
//             }
//         });

//     // Add core plugins to organized structure
//     corePluginsMap.forEach((plugin, serviceCategory) => {
//         if (serviceCategory === 'general') {
//             organized.general.plugins.push(plugin);
//         } else {
//             organized.core.plugins.push(plugin);
//         }
//     });

//     // Add general plugins
//     cloudPlugins
//         .filter(plugin => plugin.pluginType === 'GENERAL_PLUGIN')
//         .forEach(generalPlugin => {
//             organized.general.plugins.push({
//                 name: generalPlugin.displayName,
//                 version: generalPlugin.version,
//                 type: generalPlugin.pluginType,
//                 description: generalPlugin.description,
//                 device_plugins: []
//             });
//         });

//     return organized;
// }


// Plugin interfaces for cloud data
interface CloudImageConfig {
    image: string;
}

interface CloudPlugin {
    _id: string;
    description: string;
    displayName: string;
    imageConfig: CloudImageConfig;
    name: string;
    pluginCategory: string[];
    pluginType: 'CORE_PLUGIN' | 'DEVICE_PLUGIN' | 'GENERAL_PLUGIN';
    serviceCategory: string[];
    version: string;
}

// Interfaces for organized structure
interface DevicePlugin {
    id: string;
    name: string;
    version: string;
    type: string;
    description: string;
}

interface Plugin {
    id : string;
    name: string;
    version: string;
    type: string;
    description: string;
    device_plugins: DevicePlugin[];
}

interface PluginCategory {
    name: string;
    description: string;
    plugins: Plugin[];
}

interface OrganizedPlugins {
    core: PluginCategory;
    general: PluginCategory;
}

// Svelte store for plugins
import { writable } from 'svelte/store';

export const CloudPluginStore = writable<OrganizedPlugins>({
    core: {
        name: "Plugin Core",
        description: "",
        plugins: []
    },
    general: {
        name: "General Utilities",
        description: "Plugins for general utilities",
        plugins: []
    }
});

export function transformCloudPlugins(cloudPlugins: CloudPlugin[]): void {
    const organized: OrganizedPlugins = {
        core: {
            name: "Plugin Core",
            description: "",
            plugins: []
        },
        general: {
            name: "General Utilities",
            description: "Plugins for general utilities",
            plugins: []
        }
    };

    // First, organize core plugins and collect their device plugins
    const corePluginsMap = new Map<string, Plugin>();

    // Find and organize core plugins first
    cloudPlugins
        .filter(plugin => plugin.pluginType === 'CORE_PLUGIN')
        .forEach(corePlugin => {
            corePluginsMap.set(corePlugin.serviceCategory[0] || 'general', {
                name: corePlugin.displayName,
                version: corePlugin.version,
                type: corePlugin.pluginType,
                description: corePlugin.description,
                device_plugins: [],
                id : corePlugin._id
            });
        });

    // Add device plugins to their corresponding core plugins
    cloudPlugins
        .filter(plugin => plugin.pluginType === 'DEVICE_PLUGIN')
        .forEach(devicePlugin => {
            const serviceCategory = devicePlugin.serviceCategory[0];
            if (serviceCategory) {
                const corePlugin = corePluginsMap.get(serviceCategory);
                if (corePlugin) {
                    corePlugin.device_plugins.push({
                        id: devicePlugin.name,
                        name: devicePlugin.displayName,
                        version: devicePlugin.version,
                        type: devicePlugin.pluginType,
                        description: devicePlugin.description
                    });
                }
            }
        });

    // Add core plugins to organized structure
    corePluginsMap.forEach((plugin, serviceCategory) => {
        if (serviceCategory === 'general') {
            organized.general.plugins.push(plugin);
        } else {
            organized.core.plugins.push(plugin);
        }
    });

    // Add general plugins
    cloudPlugins
        .filter(plugin => plugin.pluginType === 'GENERAL_PLUGIN')
        .forEach(generalPlugin => {
            organized.general.plugins.push({
                name: generalPlugin.displayName,
                version: generalPlugin.version,
                type: generalPlugin.pluginType,
                description: generalPlugin.description,
                device_plugins: [],
                id : generalPlugin._id
            });
        });

    // Update the Svelte store
    CloudPluginStore.set(organized);
}


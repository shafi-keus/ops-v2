interface NodeInfo {
    brokerIp: string;
    autoDiscoveryOfBrokerIp: boolean;
}

export interface NodeRegristration {
    siteId: string;
    masterKey: string;
    serviceUser: string;
    serviceUserPassword: string;
    nodeInfo: NodeInfo;
}

interface Service {
    id: string;
    serviceType: 'INTRA_PROCESS' | 'INTER_PROCESS';
    instanceCount: number;
}

export interface ServicesResponse {
    services: Service[];
}

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

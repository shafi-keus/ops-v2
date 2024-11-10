import axios from 'axios';

interface INodeRegistrationRequest {
    siteId: string;
    masterKey: string;
    serviceUser: string;
    serviceUserPassword: string;
    nodeInfo: {
        brokerIp: string;
        autoDiscoveryOfBrokerIp: boolean;
    };
}

interface INodeRegistrationResponse {
    success: boolean;
    nodeId: string;
    error?: any
}

export default async function (ip: string, data: INodeRegistrationRequest): Promise<any> {

    const addrs = `http://${ip}:3000/keus/v1/node_registration/RegisterNode`

    try {
        const response: INodeRegistrationResponse = await axios.post(
            addrs,
            data,
            { timeout: 10000 }
        );
        console.log(response)
        return response;
    } catch (error) {

        return error;

    }
}
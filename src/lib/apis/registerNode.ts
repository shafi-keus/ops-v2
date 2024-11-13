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
    error?: string;
}

interface IRegistrationResult {
    success: boolean;
    nodeId?: string;
    error?: {
        message: string;
        code?: string;
        details?: unknown;
    };
}

export default async function registerNode(
    ip: string,
    data: INodeRegistrationRequest
): Promise<IRegistrationResult> {
    const address = `http://${ip}:3000/keus/v1/node_registration/RegisterNode`;
    // const address = `/keus/v1/node_registration/RegisterNode`;

    console.log('Registration attempt:', {
        endpoint: address,
        requestData: data
    });

    try {
        const response = await axios.post<INodeRegistrationResponse>(
            address,
            data,
            {
                timeout: 50000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Registration successful:', response.data);

        return {
            success: response.data.success,
            nodeId: response.data.nodeId
        };

    } catch (error) {
        console.error(error)

        return {
            success: false,
            error: {
                message: error.message
            }
        }
    }
}
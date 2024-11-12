import { nc } from "$lib/stores";

interface CallerResponse {
    success: boolean;
    data?: {
        success: boolean;
        actionResponseData?: {
            nodesInfo?: unknown;
        };
    };
    error?: unknown;
}

export const getNodes = async (gatewayId: string) => {
    try {
        
        
        // Validate gateway ID
        if (!gatewayId) {
            throw new Error('Gateway ID is required');
        }

        const request = {
            serviceName: 'site_manager',
            versionNo: 'v1',
            actionName: 'GetNodes',
            actionData: {},
            timeout: 30000,
            retries: 1
        };


        const callerRes: CallerResponse = await nc.jsonCallRPC(
            `${gatewayId}-KIOTP`,
            request
        );

        console.log('Raw response:', callerRes);

        // Detailed response validation
        if (!callerRes) {
            throw new Error('No response received from server');
        }

        if (!callerRes?.success) {
            throw new Error(`API call failed: ${JSON.stringify(callerRes.error || 'Unknown error')}`);
        }

        if (!callerRes?.data) {
            throw new Error('Response missing data property');
        }

        if (!callerRes?.data?.success) {
            throw new Error(`Action failed: ${JSON.stringify(callerRes.data)}`);
        }

        if (!callerRes?.data?.actionResponseData?.nodesInfo) {
            throw new Error('Response missing nodesInfo');
        }

        return callerRes.data.actionResponseData.nodesInfo;

    } catch (error) {
        console.error('GetNodes error:', error);
        throw new Error(`Failed to get nodes: error`);
    }
};


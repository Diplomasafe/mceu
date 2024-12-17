import { UserRequests, UserRequestsServiceType } from '../types';

export class RequestsFactory {
    constructor(private readonly serviceMap: UserRequests[]) {}

    create(requestType: UserRequestsServiceType) {
        const userRequestService = this.serviceMap.find((service) => service.type(requestType));

        if (!userRequestService) {
            throw new Error(`Unsupported request: ${requestType}`);
        }

        return userRequestService;
    }
}

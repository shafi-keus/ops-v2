import type { NodeRegristration } from "../interface";

export class MediaHub {
    static async registerNode(data:NodeRegristration){
        try {
            // reg media hub api
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
}
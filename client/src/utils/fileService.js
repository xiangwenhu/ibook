import storageConfig from '../config/storageConfig'

export default class fileService {

    static getInstance() {
        if (!fileService.instance) {
            let serviceUrl = `https://${storageConfig.StorageAccount}.file.core.windows.net`
            return AzureStorage.createFileServiceWithSas(serviceUrl, storageConfig.SASToken)
        }
        return fileService.instance
    }

}



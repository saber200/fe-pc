import { injectable, inject } from "inversify";
import { Container } from "inversify";
import "reflect-metadata";

const  {
  modalService,
  appPermissionService,
  requestService,
  requestGlobalService,
  userService,
  appService,
  themeService,
  stateService,
  eventService,
  pageFooterService,
  pageHeaderService,
  menuService,
  areaService,
  pageService,
  clientService,
  sdkService,
} = window.MochaSDK
const  { Request } = window.MochaRequestSDK

import { appConfigUrl,platformAppConfigUrl}  from '../config'
 
const TYPES = {
  preview: Symbol.for("preview"),
  runtime: Symbol.for("runtime"),
  platform:Symbol.for("platform"),
};

interface IRuntimeService {
  getConfig(app_id: string, realm: string): Promise<any>;
  getAppConfig(app_id: string, realm: string): Promise<any>;
  getAppInfo(app_id: string, realm: string): Promise<any>;
  list(tableName: string, app_id: string, realm: string): Promise<any>;
  getAppModals(app_id: string, version: string, realm: string): Promise<any>;
  getAppEvents(app_id: string, version: string, realm: string): Promise<any>;
  getAppArea(app_id: string, version: string, realm: string): Promise<any>;
  getAppPermissionTree(
    app_id: string,
    version: string,
    realm: string
  ): Promise<any>;
  getRealmPermissionTree(realm: string): Promise<any>;
  getAllRequestWhenRuntime(
    app_id: string,
    version: string,
    realm: string
  ): Promise<any>;
  getAllRequestGlobalWhenRuntime(
    app_id: string,
    version: string,
    realm: string
  ): Promise<any>;

  user_list_group(user_id: string): Promise<any>;
  getGroupsPermission(ids: string, app_id: string): Promise<any>;

  getPageConfig(app_id: string, pageid: string, realm: string): Promise<any>;

  getCurrentClient(): Promise<any>;

  getSdks(app_id: string, version: string, realm: string): Promise<any>;
}

@injectable()
class PreviewService implements IRuntimeService {
  async getConfig(app_id: string, realm: string): Promise<any> {
    let app = await appService.getAppConfig(app_id, realm);

    let clientConfig = JSON.parse(app.config)
    let configData = {
      realm:app.realm,
      guid:app.guid,
      client_id:app.client_id,
      config:clientConfig,
      kc_url:clientConfig['auth-server-url'],
      api_url:''
    }

    return configData
  }
  getAppConfig(app_id: string, realm: string) {
    return appService.getAppConfig(app_id, realm);
  }
  getAppInfo(app_id: string): Promise<any> {
    return appService.getDataByGuid(app_id);
  }
  async list(tableName: string, app_id: string, realm: string) {
    let res = {
      list: [],
    };
    switch (tableName) {
      case "layout":
        res = await themeService.list(app_id);
        break;
      case "header":
        res = await pageHeaderService.getAppHeader(app_id);
        break;
      case "footer":
        res = await pageFooterService.getAppFooter(app_id);
        break;
      case "menu":
        res = await menuService.list(app_id);
        break;
      case "state":
        res = await stateService.list(app_id);
        break;
    }
    return res.list;
  }
  async getAppModals(app_id: string, version: string, realm: string) {
    let res = await modalService.getAppModal(app_id, version);
    return res.list;
  }
  async getAppEvents(app_id: string, version: string, realm: string) {
    let res = await eventService.getAppEvents(app_id, version, realm);

    return res.data;
  }
  async getAppArea(app_id: string, version: string, realm: string) {
    let res = await areaService.getAppArea(app_id, version);
    return res.list;
  }
  async getAppPermissionTree(app_id: string, version: string, realm: string) {
    return appPermissionService.getAppPermissionTree(app_id, version);
  }
  async getRealmPermissionTree(realm: string) {
    return appPermissionService.getRealmPermissionTree(realm);
  }
  async getAllRequestWhenRuntime(
    app_id: string,
    version: string,
    realm: string
  ) {
    let res = await requestService.getAppList(app_id, version);
    return res.list;
  }
  async getAllRequestGlobalWhenRuntime(
    app_id: string,
    version: string,
    realm: string
  ) {
    let res = await requestGlobalService.getAppGlobalData(app_id, version);
    return [res];
  }

  user_list_group(user_id: string): Promise<any> {
    return userService.user_list_group(user_id);
  }
  getGroupsPermission(ids: string, app_id: string): Promise<any> {
    return appPermissionService.getGroupsPermission(ids);
  }
  getCurrentClient() {
    return clientService.getCurrentClient();
  }
  async getPageConfig(
    app_id: string,
    pageid: string,
    realm: string
  ): Promise<any> {
    let data = await pageService.getConfig(pageid);

    let page = null;
    let areas = [];
    let modals = [];
    let events = [];

    if (data.page) {
      page = data.page;
    }
    if (data.areas) {
      areas = data.areas;
    }
    if (data.modals) {
      modals = data.modals;
    }
    if (data.events) {
      events = data.events;
    }

    return {
      page: page,
      areas: areas,
      modals: modals,
      events: events,
    };
  }

  async getSdks(app_id: string, version: string, realm: string) {
    let res =  await sdkService.list(realm, app_id, version)
    return res.list
  }
}

@injectable()
class RuntimeService implements IRuntimeService {
  getConfig(app_id: string, realm: string){
    
    let url = `${appConfigUrl}/data/${realm}/${app_id}/config.json`;

    return Request.get({
      url,
    });
  }
  getAppConfig(app_id: string, realm: string) {
     
    let url = `${appConfigUrl}/data/${realm}/${app_id}/app.json`;

    return Request.get({
      url,
    });
  }
  getCurrentClient() {
    return clientService.getCurrentClient();
  }
  getAppInfo(app_id: string, realm: string): Promise<any> {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/app.json`;

    return Request.get({
      url,
    });
  }
  async list(tableName: string, app_id: string, realm: string) {
    
    let url = `${appConfigUrl}/data/${realm}/${app_id}/${tableName}.json`;

    return Request.get({
      url,
    });
  }
  async getAppModals(app_id: string, version: string, realm: string) {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/modal.json`;

    return Request.get({
      url,
    });
  }
  async getAppEvents(app_id: string, version: string, realm: string) {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/event.json`;

    return Request.get({
      url,
    });
  }
  async getAppArea(app_id: string, version: string, realm: string) {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/area.json`;

    return Request.get({
      url,
    });
  }
  getAppPermissionTree(app_id: string, version: string, realm: string) {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/permissiontree.json`;

    return Request.get({
      url,
    });
  }
  getRealmPermissionTree(realm: string) {
    let url = `${APIURL}/api/app/getRealmPermissionTree`;
    let params = {
      realm,
    };
    return Request.get({
      url,
      params,
    });
  }
  getAllRequestWhenRuntime(app_id: string, version: string, realm: string) {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/request.json`;

    return Request.get({
      url,
    });
  }
  getAllRequestGlobalWhenRuntime(
    app_id: string,
    version: string,
    realm: string
  ) {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/requestglobal.json`;

    return Request.get({
      url,
    });
  }
  user_list_group(user_id: string): Promise<any> {
    return userService.user_list_group(user_id);
  }
  getGroupsPermission(ids: string, app_id: string): Promise<any> {
    return appPermissionService.getGroupsPermission(ids);
  }
  getPageConfig(app_id: string, pageid: string, realm: string): Promise<any> {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/page/${pageid}.json`;

    return Request.get({
      url,
    });
  }
  getSdks(app_id: string, version: string, realm: string) {
    let url = `${appConfigUrl}/data/${realm}/${app_id}/sdk.json`;

    return Request.get({
      url,
    });

     
  }
}
@injectable()
class PlatformRuntimeService implements IRuntimeService {
  getConfig(app_id: string, realm: string){
    
    let url = `${platformAppConfigUrl}/data/${realm}/${app_id}/config.json`;

    return Request.get({
      url,
    });
  }
  getAppConfig(app_id: string, realm: string) {
     
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/app.json`;

    return Request.get({
      url,
    });
  }
  getCurrentClient() {
    return clientService.getCurrentClient();
  }
  getAppInfo(app_id: string, realm: string): Promise<any> {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/app.json`;

    return Request.get({
      url,
    });
  }
  async list(tableName: string, app_id: string, realm: string) {
    
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/${tableName}.json`;

    return Request.get({
      url,
    });
  }
  async getAppModals(app_id: string, version: string, realm: string) {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/modal.json`;

    return Request.get({
      url,
    });
  }
  async getAppEvents(app_id: string, version: string, realm: string) {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/event.json`;

    return Request.get({
      url,
    });
  }
  async getAppArea(app_id: string, version: string, realm: string) {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/area.json`;

    return Request.get({
      url,
    });
  }
  getAppPermissionTree(app_id: string, version: string, realm: string) {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/permissiontree.json`;

    return Request.get({
      url,
    });
  }
  getRealmPermissionTree(realm: string) {
    let url = `${APIURL}/api/app/getRealmPermissionTree`;
    let params = {
      realm,
    };
    return Request.get({
      url,
      params,
    });
  }
  getAllRequestWhenRuntime(app_id: string, version: string, realm: string) {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/request.json`;

    return Request.get({
      url,
    });
  }
  getAllRequestGlobalWhenRuntime(
    app_id: string,
    version: string,
    realm: string
  ) {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/requestglobal.json`;

    return Request.get({
      url,
    });
  }
  user_list_group(user_id: string): Promise<any> {
    return userService.user_list_group(user_id);
  }
  getGroupsPermission(ids: string, app_id: string): Promise<any> {
    return appPermissionService.getGroupsPermission(ids);
  }
  getPageConfig(app_id: string, pageid: string, realm: string): Promise<any> {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/page/${pageid}.json`;

    return Request.get({
      url,
    });
  }
  getSdks(app_id: string, version: string, realm: string) {
    let url = `${platformAppConfigUrl}/platform/data/${app_id}/sdk.json`;

    return Request.get({
      url,
    });

     
  }
}

let container: Container;

const initContainer = () => {
  container = new Container();
  container.bind<IRuntimeService>(TYPES.preview).to(PreviewService);
  container.bind<IRuntimeService>(TYPES.runtime).to(RuntimeService);
  container.bind<IRuntimeService>(TYPES.platform).to(PlatformRuntimeService);
};

export const getService = (mode: string): IRuntimeService => {
  if (!container) {
    initContainer();
  }
  
  if (mode == "preview") {
    return container.get<IRuntimeService>(TYPES.preview);
  }
  else if(mode=='platform'){
    return container.get<IRuntimeService>(TYPES.platform);
  }
  return container.get<IRuntimeService>(TYPES.runtime);
};

import { BehaviorSubject } from "rxjs";
import { getService } from "./runtimeService";

const { SDK, appService, commonBusinessService } = window.MochaSDK;
let currentMode = "platform";
let myService = getService(currentMode);

export const getQuery = () => {
  let query = window.location.search.split("?")[1].split("&");
  
  let result = {};

  query.forEach((item) => {
    let h = item.split("=");
    result[h[0]] = h[1];
  });

  let version = "master";

  return {
    realm: result.realm,
    app_id: result.app_id,
    id: result.id,
    type: result.type,
    version,
  };
};

export const SystemInit = (callback) => {
  const loadUser = async () => {
    let params = getQuery();
    
    const realm = params.realm;

    const appId = "cms";

    return new Promise((resolve, reject) => {
      let s = new window.MochaUserSDK.AppConfigFromPathSercice(
        myService.getConfig,
        appId
      );

      let auth = new window.MochaUserSDK.Auth(
        s,
        null,
        commonBusinessService.initUser,
        "cms",
        realm,
        () => {
          gotoLogin(realm);
        }
      );
      // let auth = new Auth(s);
      auth.onUserChange((user) => {
        SDK.initUser(user);
      });
      auth
        .init()
        .then(async (user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const loadAppData = async () => {
    let params = getQuery();
    const appId = params.app_id;
    const version = params.version;

    const realm = params.realm;

    try {
      let data = await myService.getAppInfo("cms", realm);
      let app = data;

      let data2 = await appService.getDataByGuid(appId, realm);
      let editApp = data2;
      // editApp?.version = "master";

      return {
        editApp: editApp,
        app: app,
      };
    } catch (error) {
      console.log("app init error", error);
    }
  };
  const loadPermissionData = async () => {
    let params = getQuery();
    const appId = params.app_id;
    const version = params.version;

    const { appPermissionService } = window.MochaSDK;

    let data = await appPermissionService.appDesignerPermissionUsercheck(appId);
    data.init = true;

    return data;
  };

  const init = async (callback) => {
    try {
      let user = await loadUser();
      let app = await loadAppData();
      let permission = await loadPermissionData();

      if (callback) {
        callback(true, user, app, permission);
      }
    } catch (error) {
      // debugger;
      console.error("user init error");
    }
  };

  return init(callback);
};

class AppRootState {
  constructor() {
    this.subject = new BehaviorSubject({
      userInit: false,
      appInit: false,
      currentUser: null,
      currentApp: null,

      editApp: null,
      currentPermission: null,
    });
    this.subject.subscribe({
      next: (value) => {
        this.currentValue = value;
      },
    });
  }
  init(callback) {
    SystemInit((succsss, user, app, permission) => {
      let currentValue = this.currentValue;
      currentValue.userInit = true;
      currentValue.appInit = true;
      currentValue.userInit = true;

      currentValue.currentUser = user;
      currentValue.currentApp = app.editApp;
      currentValue.editApp = app.app;
      currentValue.currentPermission = permission;

      this.next(currentValue);
      if (callback) {
        callback(succsss);
      }
    });
  }

  subscribe(param) {
    return this.subject.subscribe(param);
  }
  next(data) {
    this.subject.next(data);
  }
}

export let appState = new AppRootState();

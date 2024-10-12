import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateApp, UpdateUser, UpdateEditApp } from "./actions";
const { SDK, appService, commonBusinessService } = window.MochaSDK;
import { getService } from "./apis/runtimeService";
// import { pathPreFix } from "./config";
const pathPreFix = ''

let currentMode = "platform";
let myService = getService(currentMode);

export const getQuery = () => {
  let usedPath = window.location.pathname.replace(pathPreFix, "");
  const data = usedPath.split("/");
  let realm = data[1];
  let app_id = data[2];

  let version = "master";
  /** 
    if (data.length >= 3) {
      version = data[3]
    }
    */
  return {
    realm,
    app_id,
    version,
  };
};

export const loadConfig = async (realm: string, appId: string) => {
  let res = await myService.getConfig(appId, realm);
  if (!res) {
    return;
  }

  res.config.clientId = res.config.resource;
  res.config.url = res.config["auth-server-url"];

  return res;
};

export const useCurrentApp = (user: any) => {
  const [hasInit, setHasInit] = useState(false);

  const [currentApp, setCurrentApp] = useState(null);

  const dispatch = useDispatch();
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
      editApp.version = "master";

      document.title = "应用设计器-" + editApp.name;

      dispatch(UpdateEditApp(editApp));

      dispatch(UpdateApp(app));
      setCurrentApp(editApp);

      return data;
    } catch (error) {
      console.log("app init error", error);
    }
  };
  useEffect(() => {
    if (!user) {
      return;
    }

    if (hasInit) {
      return;
    }
    loadAppData();
  }, [user]);
  return currentApp;
};

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  const loadUser = async () => {
    let params = getQuery();
    const appId = params.app_id;
    const realm = params.realm;

    // AppConfigFromAbsolutePathService = window.MochaUserSDK.AppConfigFromAbsolutePathService
    let s = new window.MochaUserSDK.AppConfigFromAbsolutePathService(
      myService.getConfig,
      pathPreFix,
      "cms"
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

      dispatch(UpdateUser(user));
    });
    auth
      .init()
      .then(async (user) => {
        setCurrentUser(user);
        dispatch(UpdateUser(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    async () => {
      await loadUser(); 
    }
  }, []);
  return currentUser;
};

export const useUserPermission = (user) => {
  const [p, setP] = useState({
    is_owner: false,
    is_dev: false,
    is_view: false,
    init: false,
  });
  const [hasInit, setHasInit] = useState(false);

  const loadAppData = async () => {
    let params = getQuery();
    const appId = params.app_id;
    const version = params.version;

    const { appPermissionService } = window.MochaSDK;

    let data = await appPermissionService.appDesignerPermissionUsercheck(appId);
    data.init = true;
    setP(data);
    setHasInit(true);
  };
  useEffect(() => {
    if (!user) {
      return;
    }

    if (hasInit) {
      return;
    }
    loadAppData();
  }, [user]);
  return p;
};

export const gotoLogin = (realm: string) => {
  let redirect = window.location.href;

  let url = "";
  if (process.env.NODE_ENV != "development") {
    url =
      window.location.origin +
      `/${realm}/login?redirect=${encodeURIComponent(redirect)}`;
  } else {
    let port = window.location.port;
    let url1 = window.location.origin.replace(port, "3000");
    url = url1 + `/${realm}/login?redirect=${encodeURIComponent(redirect)}`;
  }

  window.location.href = url;
};

export const useLoginStatus = () => {
  const [loginStatus, setLoginStatus] = useState(false);
  useEffect(() => {
    let query = getQuery();
    let realm = query.realm;

    let status = window.MochaUserSDK.AuthByCustom.checkUserLoginStatus(realm);

    setLoginStatus(status);

    if (!status) {
      gotoLogin(realm);
    }
  }, []);
  return loginStatus;
};

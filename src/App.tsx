import { Admin, DataProvider, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import chinesesMessages from "@haxqer/ra-language-chinese";

import { dataProvider } from "./data-provider";
import { authProvider } from "./auth-provider";
import { Dashboard } from "./dashboard";
import { RoomCreate, RoomList, RoomShow } from "./room";

const i18nProvider = polyglotI18nProvider(
  () => ({ ...chinesesMessages, resources: { rooms: { name: "房间" } } }),
  "zh_CN"
);

function App() {
  return (
    <Admin
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
      dataProvider={dataProvider as DataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        show={RoomShow}
      />
      {/* <Resource name="controlLogs" list={ControlLogList}/> */}
    </Admin>
  );
}

export default App;

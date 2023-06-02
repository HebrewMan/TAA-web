import PlayNow from "../pages/playNow/index";
import MyNft from "../pages/myNft/index";
import Tasks from "../pages/tasks/index";

import Text from '../components/test';
import { Route, Routes } from 'react-router-dom';
const Routers: any = () =>
(
    <Routes  >
        <Route  path="/"  element={<PlayNow />} ></Route>
        <Route  path="/playNow"  element={<PlayNow />} ></Route>
        <Route  path="/myNft"  element={<MyNft />} ></Route>
        <Route  path="/tasks"  element={<Tasks />} ></Route>
        <Route  path="/test"  element={<Text />} ></Route>
        {/* <Route replace path='/arena/:id' exact={true} element={<Arena />}></Route> */}
    </Routes>
);

export default Routers;
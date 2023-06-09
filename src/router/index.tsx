import PlayNow from "@/pages/playNow/index";
import MyNft from "@/pages/myNft/index";
import Tasks from "@/pages/tasks/index";
import Introduce from '@/pages/introduce';
import Knapsack from '@/pages/knapsack';

import Market from '@/pages/market';

import Text from '@/components/test';
import { Route, Routes } from 'react-router-dom';
const Routers: any = () =>
(
    <Routes  >
        <Route  path="/"  element={<PlayNow />} />
        <Route  path="/playNow"  element={<PlayNow />}/ >
        <Route  path="/myNft"  element={<MyNft />} />
        <Route  path="/tasks"  element={<Tasks />} />
        <Route  path="/market"  element={<Market />} />
        <Route  path="/introduce" element={<Introduce />} />
        <Route  path="/knapsack" element={<Knapsack />} />
        <Route  path="/test"  element={<Text />} />
        {/* <Route replace path='/arena/:id' exact={true} element={<Arena />}></Route> */}
    </Routes>
);

export default Routers;
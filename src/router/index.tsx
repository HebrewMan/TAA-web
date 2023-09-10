// import PlayNow from "@/pages/playNow/index";
// import MyNft from "@/pages/myNft/index";
// import Tasks from "@/pages/tasks/index";
// import Introduce from '@/pages/introduce';
// import Knapsack from '@/pages/knapsack';

// import Market from '@/pages/market';

// import Text from '@/components/test';
// import { Route, Routes } from 'react-router-dom';
// const Routers: any = () =>
// (
//     <Routes  >
//         <Route  path="/"  element={<PlayNow />} />
//         <Route  path="/playNow"  element={<PlayNow />}/ >
//         <Route  path="/myNft"  element={<MyNft />} />
//         <Route  path="/tasks"  element={<Tasks />} />
//         <Route  path="/market"  element={<Market />} />
//         <Route  path="/introduce" element={<Introduce />} />
//         <Route  path="/knapsack" element={<Knapsack />} />
//         <Route  path="/test"  element={<Text />} />
//         {/* <Route replace path='/arena/:id' exact={true} element={<Arena />}></Route> */}
//     </Routes>
// );

// export default Routers;

/**** TODO: Use Lazy() ****/

import { lazy, Suspense } from "react";
import KeepAlive from "react-activation";

import { Navigate, useRoutes } from "react-router-dom";

const Router = () => {
  const routers = useRoutes([
    {
      path: "/",
      element: <Navigate to={`/PlayNow`}></Navigate>,
    },
    {
      path: "/PlayNow",
      element: <KeepAlive cacheKey="playNow">{LazyLoad("playNow")}</KeepAlive>,
    },
    {
      path: "/MyNft",
      element: <KeepAlive cacheKey="myNft">{LazyLoad("myNft")}</KeepAlive>,
    },
    {
      path: "/Tasks",
      element: <KeepAlive cacheKey="tasks">{LazyLoad("tasks")}</KeepAlive>,
    },
    {
      path: "/Introduction",
      element: LazyLoad("introduce"),
    },
    {
      path: "/my bag",
      element: (
        <KeepAlive cacheKey="knapsack">{LazyLoad("knapsack")}</KeepAlive>
      ),
    },
    {
      path: "/Market",
      element: <KeepAlive cacheKey="market">{LazyLoad("market")}</KeepAlive>,
    },
    // {
    //     path: '/Test',
    //     element: LazyLoad('components/test')
    // },
  ]);
  return routers;
};

const LazyLoad = (path: string) => {
  const Component = lazy(() => import(`@/pages/${path}/index.tsx`));
  return (
    <Suspense fallback={<>Loading......</>}>
      <Component />
    </Suspense>
  );
};

export default Router;

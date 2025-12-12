import React, { Suspense } from "react";
import { Routes, Route } from "react-router";
import Loading from "../components/loading/Loading";

const HomePage = React.lazy( () => import("../pages/HomePage") )
const RecipesPage = React.lazy( () => import("../pages/RecipesPage"))
const RecipeDetailPage = React.lazy( () => import("../pages/RecipeDetailPage"))
const AboutUsPage = React.lazy( () => import("../pages/AboutUsPage"))


const AppRoutes = ({listaRecetas, loading}) => {
  return ( 
    <Suspense fallback={<Loading />} >
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/recipes" element={<RecipesPage listaRecetas={listaRecetas} loading={loading}/>} />
        <Route path="/recipes/:id" element={<RecipeDetailPage listaRecetas={listaRecetas} />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </Suspense>
  );
}
 
export default AppRoutes;
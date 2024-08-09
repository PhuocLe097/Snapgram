import React from "react";
import { Routes, Route } from "react-router-dom";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetail,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const publicRoutes = [
    {
      path: "/sign-in",
      element: <SigninForm />,
    },
    {
      path: "/sign-up",
      element: <SignupForm />,
    },
  ];

  const privateRoutes = [
    {
      path: "/explore",
      element: <Explore />,
    },
    {
      path: "/saved",
      element: <Saved />,
    },
    {
      path: "/all-users",
      element: <AllUsers />,
    },
    {
      path: "/create-post",
      element: <CreatePost />,
    },
    {
      path: "/update-post/:id",
      element: <EditPost />,
    },
    {
      path: "/post/:id",
      element: <PostDetail />,
    },
    {
      path: "/profile/:id",
      element: <Profile />,
    },
    {
      path: "/update-profile/:id",
      element: <UpdateProfile />,
    },
  ];

  return (
    <main className="flex h-screen">
      <Routes>
        {/* public pages */}
        <Route element={<AuthLayout />}>
          {publicRoutes.map((publicRoute) => {
            const Element = publicRoute.element;
            return (
              <Route
                key={publicRoute.path}
                path={publicRoute.path}
                element={Element}
              />
            );
          })}
        </Route>

        {/* private pages */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          {privateRoutes.map((privateRoute) => {
            const Element = privateRoute.element;
            return (
              <Route
                key={privateRoute.path}
                path={privateRoute.path}
                element={Element}
              />
            );
          })}
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginScreen from "./screens/LoginScreen/LoginScreen";
import KakaoLoginRedirectScreen from "./screens/KakaoLogin/KakaoLoginRedirectScreen";
import NaverLoginRedirectScreen from "./screens/NaverLogin/NaverLoginRedirectScreen";
import NaverLoginScreen from "./screens/NaverLogin/NaverLoginScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen/SignUpScreen";
import PaymentScreen from "./screens/Payments/PaymentScreen";

function AppRouter() {
    return (
        <>
            <BrowserRouter basename="/">
                <Routes>
                    <Route path="/" element={<LoginScreen/>} />
                    <Route path="signUp" element={<SignUpScreen/>} />
                    <Route path="signIn" element={<HomeScreen/>} />
                    <Route path="auth/kakao" element={<KakaoLoginRedirectScreen/>} />
                    <Route path="auth/naver" element={<NaverLoginRedirectScreen/>} />

                    <Route path="auth/pay" element={<PaymentScreen/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;

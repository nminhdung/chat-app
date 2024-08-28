import React, { useState } from "react";
import background from "@/assets/login2.png";
import victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleLogin = async () => {};
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div
        className="h-[80vh] bg-white border-2 border-white shadow-2xl 
      w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2"
      >
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex  items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={victory} alt="victory emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90
                  border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold
                  data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-transparent text-black text-opacity-90
                  border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold
                  data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 "
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="mt-6 flex flex-col gap-4" value="login">
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6 outline-none"
                  value={email}
                  onChange={(e) => setPassword(e.target.value)}
                />
            
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="mt-6 flex flex-col gap-4" value="signup">
              <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-full p-6 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="rounded-full p-6 outline-none"
                  value={email}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  className="rounded-full p-6 outline-none"
                  value={email}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="rounded-full p-6" onClick={handleLogin}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='hidden xl:flex justify-center items-center'>
          <img src={background} alt='login image' className='h-full object-cover'/>
        </div>
      </div>
    </div>
  );
}

export default Auth;

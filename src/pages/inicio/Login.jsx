import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserContext";
import config from "../../config.js";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [userActions] = useUserContext();
  const [errorMsg, setErrorMsg] = useState("");

  const getLogin = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const dataForm = Object.fromEntries(formdata.entries());

    const response = await fetch(`${config.url}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });

    const data = await response.json();

    const user = {
      userName: dataForm.username,
      token: data.token,
    };

    if (response.status > 299) {
      setErrorMsg(data.message);
    }
    if (data.token) {
      userActions.setUser(user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Ingresa</CardTitle>
          <CardDescription>
            Ingrese su correo electrónico a continuación para iniciar sesión en
            su cuenta.
          </CardDescription>
        </CardHeader>
        <form onSubmit={getLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Usuario"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
                required
              />
            </div>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full" type="submit">
              Iniciar sesión
            </Button>
            <Link to="/register" className="text-center underline">
              Registrarme
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import config from "../../config";

export function Register() {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataForm = Object.fromEntries(formData.entries());

    if (dataForm.password !== dataForm.repeat) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    const response = await fetch(`${config.url}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataForm),
    });

    const data = await response.json();

    if (response.status > 299) {
      setErrorMsg(data.message);
      return;
    }

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Crear cuenta</CardTitle>
          <CardDescription>
            Ingresa tus datos para crear una cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="user">Usuario</Label>
              <Input
                id="user"
                name="username"
                type="text"
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="repeat">Repetir contraseña</Label>
              <Input
                id="repeat"
                name="repeat"
                type="password"
                placeholder="Repetir contraseña"
              />
            </div>
            {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}
            <Button type="submit" className="w-full">
              Crear cuenta
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/" className="underline">
              Iniciar sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

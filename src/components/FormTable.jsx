/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// COMPONENTES DE ESTILO
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
//

import { useFormTContext } from "../providers/FormTContext";
import { useUserContext } from "../providers/UserContext";
import { useState, useEffect } from "react";
import { ModalForm } from "./ModalForm";
import { insertTable, editeTable } from "../api/inventario";

export const FormTable = (props) => {
  const [userAcctions] = useUserContext();
  const { DATA_FORM, URL_CRUD } = props;
  const [query, setQuery] = useState("");
  const [formActions] = useFormTContext();
  const [state, setState] = useState("Nuevo");
  const [modalStatus, setModalStatus] = useState({
    estado: "oculto",
    item: {},
  });

  useEffect(() => {
    editeForm();
  }, [formActions.form]);

  // RELLENA LOS DATOS DEL FORMULARIO SEGUN SEAN SELECCIONADO SEN EL COMPONENTE SHOWTABLE

  const editeForm = () => {
    if (formActions.form.values) {
      formActions.form.values.forEach((element, index) => {
        let input = document.getElementById(DATA_FORM.campos[index].nameQuery);
        input.value = element;
      });
      setState("Editar");
    } else {
      DATA_FORM.campos.forEach((element) => {
        let input = document.getElementById(element.nameQuery);
        input.value = "";
      });
      setState("Nuevo");
    }
  };

  // EXTRAE LOS CAMPOS DEL FORMULARIO

  const actionForm = (e) => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("form-data"));
    const dataForm = Object.fromEntries(formData.entries());
    actionTable(dataForm);
  };

  // INSERTA O EDITA LOS ITEMS DE LA TABLA DESDE EL RCHIVO INVENTARIO CARPETA API
  const actionTable = async (dataForm) => {
    const request =
      state === "Nuevo"
        ? await insertTable(URL_CRUD, dataForm, userAcctions.user.token)
        : await editeTable(URL_CRUD, dataForm, userAcctions.user.token);

    setQuery(request.data.message);
    if (request.response.status < 299) {
      formActions.setForm({
        values: "",
        rows: formActions.form.rows,
      });
    }
  };

  // LIMPIA EL FORMULARIO
  const cerrar = (e) => {
    e.preventDefault();
    formActions.clearForm();
  };

  // ENCARGADO DEL RENDER DE LA VENTANA MODAL
  const modal = (item) => {
    setModalStatus({ estado: "visible", item });
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle>{DATA_FORM.nombre}</CardTitle>
          <CardDescription>
            Llena el formulario para agregar un nuevo elemento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-data" className="grid gap-4">
            <div className="grid gap-2">
              {DATA_FORM.campos.map((items, x) => {
                return (
                  <div key={x}>
                    <Campos items={items} index={x} modal={modal} />
                  </div>
                );
              })}
            </div>
            <Button onClick={actionForm}>{state}</Button>
            {state == "Editar" ? (
              <Button onClick={cerrar}>Cerrar</Button>
            ) : (
              <></>
            )}
          </form>
        </CardContent>
      <Label>{query}</Label>
      {modalStatus.estado != "oculto" ? (
        <ModalForm setModalStatus={setModalStatus} modalStatus={modalStatus} />
      ) : (
        <></>
      )}
      </Card>
  );
};

// ESTILISA Y DISCRIMINA LOS CAMPOS SEGUN EL DEBER DE SU ESTADO

export const Campos = (props) => {
  const { items, modal } = props;
  const { name, type, subItem, nameQuery, noEnable } = items;
  if (noEnable != true) {
    if (subItem == true) {
      return (
        <div className="flex">
              <Input
                id={nameQuery}
                className="w-12"
                name={nameQuery}
                type="number"
                placeholder="0"
              />
              <Input
                id={`${nameQuery}_aux`}
                className="w-64"
                name={`${nameQuery}_aux`}
                placeholder={name}
                type={type}
              />
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  modal(items);
                }}
              >
                .:.
              </Button>
        </div>
      );
    }
    if (subItem != true) {
      if (type != "textarea")
        return (
          <Input
            id={nameQuery}
            type={type}
            name={nameQuery}
            placeholder={name}
          />
        );

      return <Textarea id={nameQuery} name={nameQuery} placeholder={name} />;
    }
  } else {
    return <></>;
  }
};

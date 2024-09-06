/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { useUserContext } from "../providers/UserContext";
import { useFormTContext } from "../providers/FormTContext";
import { deleteTable, getTable } from "../api/inventario";

export const ShowTable = (props) => {
  const { HEADERS, URL_CRUD } = props;
  const [userAcctions] = useUserContext();
  const [rows, setRows] = useState([]);
  const [formActions] = useFormTContext();

  useEffect(() => {
    showRows();
  }, [formActions.form]);

  // RENDERIZA LAS FILAS EN LA TABLA

  const showRows = async () => {
    const request = await getTable(URL_CRUD, userAcctions.user.token);
    setRows(...[request.data]);
  };

  // ELIMINA LAS TABLAS DE LA LISTA Y LLAMA AL METODO SHOWROWS
  const deleteRows = async (row) => {
    const request = await deleteTable(URL_CRUD, row, userAcctions.user.token);
    if (request.response.status < 299) {
      showRows();
    }
  };

  // SELECIONA VALORES DE UNA FILA Y LOS ENVIA AL FORMULARIO POR MEDIO DEL CONTEXTO FORMACTIONS
  const selectRows = (row) => {
    formActions.setForm({
      values: row,
      headers: {},
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventario</CardTitle>
        <CardDescription>
          Listado de productos en el inventario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {HEADERS.map((item) => {
                return <th key={item}>{item}</th>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  {Object.values(row).map((index, x) => {
                    return <TableCell key={x}>{index}</TableCell>;
                  })}
                  <TableCell>
                    <Button
                      onClick={() => {
                        selectRows(Object.values(row));
                      }}
                      className="w-14 ml-4"
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        deleteRows(Object.values(row)[0]);
                      }}
                      variant="outline"
                      className="w-14"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

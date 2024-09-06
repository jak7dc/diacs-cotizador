/* eslint-disable react/prop-types */

// COMPONENTES DE ESTILO
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//

import { useEffect, useState } from "react";
import { useUserContext } from "../providers/UserContext";
import { getTable } from "../api/inventario";

export const ModalForm = (props) => {
  const { setModalStatus, modalStatus } = props;
  const { item } = modalStatus;
  const [rows, setRows] = useState([]);
  const [userAcctions] = useUserContext();

  useEffect(() => {
    showRows();
  }, []);

  // RENDERIZA LAS FILAS EN LA TABLA

  const showRows = async () => {
    const request = await getTable(item.URL_CRUD, userAcctions.user.token);
    setRows(...[request.data]);
  };

  // SELECCIONA LA FILA Y PASA LOS DATOS AL FORMULARIO

  const selectRow = (row) => {
    const inputId = document.getElementById(item.nameQuery);
    inputId.value = row[0];
    const inputAux = document.getElementById(`${item.nameQuery}_aux`);
    inputAux.value = row[1];
    setModalStatus({ estado: "oculto" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-3">
        <Button>Categorias disponibles</Button>
      </DialogTrigger>
      <Button
        onClick={() => {
          setModalStatus({ estado: "oculto" });
        }}
        className="ml-3 mb-3"
      >
        cerrar
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Categorias</DialogTitle>
          <DialogDescription>Selecciona una categoria</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                {item.HEADERS.map((header, index) => {
                  return <th key={index}>{header}</th>;
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {Object.values(row).map((index, x) => {
                      return <td key={x}>{index}</td>;
                    })}
                    <TableCell>
                      <Button
                        onClick={() => {
                          selectRow(Object.values(row));
                        }}
                      >
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

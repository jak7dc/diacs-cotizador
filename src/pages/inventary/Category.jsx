import "../../styles/index.css";
import { NavBar } from "../../components/NavBar";
import { SideBar } from "../../components/SideBar";
import { FormTable } from "../../components/FormTable";
import { ShowTable } from "../../components/ShowTable";
import config from "../../config.js";
import { FormTContext } from "../../providers/FormTContext.jsx";

const DATA_FORM = {
  nombre: "Categorias",
  campos: [
    { name: "id", type: "number", nameQuery: "id" },
    { name: "name", type: "string", nameQuery: "name" },
    { name: "description", type: "textarea", nameQuery: "description" },
  ],
};

const URL_CRUD = `${config.url}/category`;

const HEADERS = ["id", "name", "description", "acctions"];

export const Category = () => {
  return (
    <>
      <section className=" ml-48 px-4 py-8 mt-14">
        <NavBar />
        <SideBar />
        <h2>categoria</h2>
        <FormTContext>
          <div className=" flex flex-col gap-3">
            <FormTable DATA_FORM={DATA_FORM} URL_CRUD={URL_CRUD} />
            <ShowTable HEADERS={HEADERS} URL_CRUD={URL_CRUD} />
          </div>
        </FormTContext>
      </section>
    </>
  );
};

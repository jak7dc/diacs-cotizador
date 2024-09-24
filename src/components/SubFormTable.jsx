import React from 'react'

const SUB_DATA_FORM = {
    nombre: 'sub tabla'
}


export const SubFormTable = () => {
  return (
    <div>  
        <h3>{SUB_DATA_FORM.nombre}</h3>
        <form id='subform-data'>
            <div className='content-form'> 
              
            </div>
        </form>
    </div>
  )
}

{/* <div>
      <h2>{DATA_FORM.nombre}</h2>
      <form id='form-data'>
        <div className='content-form'>
          {DATA_FORM.campos.map((items, x) => {
            return (
              <div key={x}>
                <Campos items={items} index={x} modal={modal} />
              </div>
            )
          })}
        </div>
        <button onClick={actionForm}>{state}</button>
        {
          state == 'Editar' ?
            (<button onClick={cerrar} >Cerrar</button>) : (<></>)
        }
      </form>
    </div> */}

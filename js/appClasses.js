//Encargado de la cotizacion
class Seguro{
    constructor(marca,anho,tipo){
        this.marca = marca;
        this.anho = anho;
        this.tipo = tipo;
    }

    cotizarSeguro(){
        /*
            1 - Americano = 1.15
            2 - Asiatico = 1.05
            3 - Europeo = 1.35
        */
        let cantidad;
        const base = 2000;
    
        switch (this.marca){
            case '1':
                cantidad = base*1.15;
                break;
            case '2':
                cantidad = base*1.05;
                break;
            case '3':
                cantidad = base*1.35;
                break;
        }
        //Cada año de diferencia se reduce 3% el valor del seguro
        const diferencia = new Date().getFullYear() - this.anho;
    
        cantidad -= ((diferencia*3)*cantidad)/100;
    
        if (this.tipo == 'basico'){
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
    
        return cantidad;
    
    }
}
//Contiene la parte visual
class Interface{
    mostrarMensaje(mensaje,tipo){
        const div = document.createElement('div');
    
        if (tipo === 'error'){
            div.classList.add('mensaje','error');
        } else {
            div.classList.add('mensaje','correcto');
        }
    
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div,document.querySelector('.form-group'));
        
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
    
    mostrarResultado(seguro,cantidad){
        const resultado = document.getElementById('resultado');
        let marca;
    
        switch(seguro.marca){
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
    
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header">Resumen:</p>
            <p>Marca: ${marca}.</p>
            <p>Año: ${seguro.anho}.</p>
            <p>Tipo de Seguro: ${seguro.tipo}.</p>
            <p>Total: $${cantidad}.</p>
            `;
    
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
        },3000)
    }
}

//Event Listeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit',function(e){
    e.preventDefault();

    //Lee la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //Lee el año seleccionado
    const anho = document.getElementById('anio');
    const anhoSeleccionado = anho.options[anho.selectedIndex].value;

    //Lee el tipo de seguro
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Instancia de interfaz
    const interfaz = new Interface();

    //Comprobar los campos
    if(marcaSeleccionada === '' || anhoSeleccionado === '' || tipo === ''){
        
        interfaz.mostrarMensaje('Faltan Datos en el Formulario, revisa y prueba de nuevo','error');

    } else {
        const resultadoExistente = document.querySelector('#resultado div');
        if (resultadoExistente !== null){
            resultadoExistente.remove();
        }

        const seguro = new Seguro(marcaSeleccionada,anhoSeleccionado,tipo);
        const monto = seguro.cotizarSeguro();

        interfaz.mostrarResultado(seguro,monto);
        interfaz.mostrarMensaje('Cotizando...','exito')
    }

});


const max = new Date().getFullYear(),
      min = max-20;

const selectAnhos = document.querySelector('#anio');

for (let i = max; i>=min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnhos.appendChild(option);
}
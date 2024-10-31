<template>
    <div class="customers-container">
        <h1>Customers</h1>
        <form class="customer-form" v-on:submit.prevent="submitForm">
            <input type="text" v-model="idCustomer" placeholder="Introduce un Id de customer" class="form-input" />
            <button type="submit" class="form-button">BUSCAR</button>
        </form>
        <div class="error" v-if="error">
            <h3>Ha habido un error al cargar el customer</h3>
        </div>
        <table v-if="customers.length > 0" class="customers-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Company Name</th>
                    <th>Contact Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(customer, index) in customers" :key="index">
                    <td>{{ customer.id }}</td>
                    <td>{{ customer.companyName }}</td>
                    <td>{{ customer.contactName }}</td>
                    <td>{{ customer.address }}</td>
                    <td>{{ customer.phone }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="!error" class="loader"></div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Global from '../Global';

export default {
    name: 'CustomersComponent',
    data() {
        return {
            customers: [],
            idCustomer: '',
            error: false
        }
    },
    mounted() {
        this.cargarCustomers();
    },
    methods: {
        cargarCustomers() {
            const request = 'customers';
            this.customers = [];
            this.error = false;
            axios.get(Global.apiCustomers + request)
                .then(response => {
                    setTimeout(() => {
                        this.customers = response.data.results;
                    }, 1000);
                })
                .catch(error => {
                    console.error("Error al cargar los customers:", error);
                    this.error = true;
                    this.mostrarAlertaError('Ha habido un error al cargar los customers. Intenta nuevamente más tarde.');
                });
        },
        submitForm() {
            if (this.idCustomer === '') {
                this.cargarCustomers();
            } else {
                const request = `customers/${this.idCustomer.toUpperCase()}`;
                this.customers = [];
                this.error = false;
                axios.get(Global.apiCustomers + request)
                    .then(response => {
                        setTimeout(() => {
                            this.customers.push(response.data.customer);
                        }, 1000);
                    })
                    .catch(error => {
                        console.error("Error al cargar el customer:", error);
                        this.error = true;
                        this.mostrarAlertaError('No se pudo cargar el customer. Verifica el ID e inténtalo de nuevo.');
                    });
            }
        },
        mostrarAlertaError(mensaje) {
            Swal.fire({
                icon: 'error',
                title: '¡Oops!',
                html: `<div style="font-size: 16px; color: #333;">${mensaje}</div>`,
                background: '#f8d7da', // Color de fondo
                color: '#721c24', // Color del texto
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#dc3545', // Color del botón
                customClass: {
                    title: 'swal-title-custom',
                    html: 'swal-html-custom',
                    confirmButton: 'swal-confirm-button-custom'
                },
                backdrop: 'rgba(0,0,0,0.5)' // Color de fondo de la alerta
            });
        }
    }
}
</script>

<style scoped>
.swal-title-custom {
    font-weight: bold;
    font-size: 24px; /* Tamaño del título */
    color: #dc3545; /* Color del título */
}

.swal-html-custom {
    font-size: 18px; /* Tamaño del texto */
}

.swal-confirm-button-custom {
    padding: 10px 20px; /* Relleno del botón */
    border-radius: 5px; /* Bordes redondeados */
    font-size: 16px; /* Tamaño de la fuente */
    transition: background-color 0.3s; /* Efecto de transición */
}

.swal-confirm-button-custom:hover {
    background-color: #c82333; /* Color de fondo al pasar el ratón */
}
</style>



<style scoped>
.customers-container {
    max-width: 900px;
    margin: 30px auto;
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #2c3e50;
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 700;
}

.customer-form {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.form-input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 250px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-button {
    padding: 10px 15px;
    font-size: 16px;
    color: #fff;
    background-color: #4CAF50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.form-button:hover {
    background-color: #45a049;
}

.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    padding: 15px;
    margin: 20px auto;
    width: 80%;
    text-align: center;
}

.customers-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.customers-table th, .customers-table td {
    padding: 12px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.customers-table th {
    background-color: #4CAF50;
    color: #fff;
    font-weight: bold;
}

.customers-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.loader,
.loader:before,
.loader:after {
  background: #4CAF50;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
}
.loader {
  text-indent: -9999em;
  margin: 40% auto;
  position: relative;
  font-size: 11px;
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}
.loader:after {
  left: 1.5em;
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0 #4CAF50;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em #4CAF50;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0 #4CAF50;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em #4CAF50;
    height: 5em;
  }
}
</style>

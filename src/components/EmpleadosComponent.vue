<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Empleados</h1>
        <form class="form-group col-md-6 mx-auto" @submit.prevent="submitForm">
            <label for="empleadoSelect">Selecciona un Empleado:</label>
            <select v-model="selectedId" class="form-control" id="empleadoSelect">
                <option disabled value="">-- Seleccionar --</option>
                <option v-for="(empleado, index) in empleados" :key="index" :value="empleado.idEmpleado">
                    {{ empleado.apellido }}
                </option>
            </select>
            <button type="submit" class="btn btn-outline-primary mt-3">BUSCAR</button>
        </form>
        
        <div v-if="empleado != null" class="mt-4">
            <h3 class="text-primary">Detalles del Empleado</h3>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">ID: {{ empleado.idEmpleado }}</h5>
                    <h5 class="card-text">Apellido: {{ empleado.apellido }}</h5>
                    <h5 class="card-text">Oficio: {{ empleado.oficio }}</h5>
                    <h5 class="card-text">Salario: {{ empleado.salario }}</h5>
                    <h5 class="card-text">Departamento: {{ empleado.departamento }}</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Global from '@/Global'

export default {
    name: 'EmpleadosComponent',
    data() {
        return {
            empleados: [],
            selectedId: '',
            empleado: null
        }
    },
    mounted() {
        this.getEmpleados()
    },
    methods: {
        getEmpleados() {
            const request = 'api/Empleados'
            axios.get(Global.apiEmpleados + request).then(response => {
                this.empleados = response.data
            })
        },
        getEmpleado() {
            const request = `api/Empleados/${this.selectedId}`
            axios.get(Global.apiEmpleados + request).then(response => {
                this.empleado = response.data
            })
        },
        submitForm() {
            this.getEmpleado()
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
}
</style>

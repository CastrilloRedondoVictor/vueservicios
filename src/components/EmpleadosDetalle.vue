<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Detalles de Empleados - {{ this.$route.params.oficio }}</h1>
        
        <table class="table table-striped table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Apellido</th>
                    <th>Oficio</th>
                    <th>Salario</th>
                    <th>Departamento</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="emp in empleados" :key="emp.idEmpleado">
                    <td>{{ emp.apellido }}</td>
                    <td>{{ emp.oficio }}</td>
                    <td>{{ emp.salario }}</td>
                    <td>{{ emp.departamento }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Global from '@/Global';
import axios from 'axios';

    export default {
        name: 'EmpleadosDetalle',
        data(){
            return {
                empleados: []
            }
        },
        methods: {
            getEmpleados() {
                let request = `api/Empleados/EmpleadosOficio/${this.$route.params.oficio}`
                axios.get(Global.apiEmpleados + request).then(response => {
                    this.empleados = response.data
                })
            }
        },
        mounted(){
            this.getEmpleados()
        }
    }
</script>
<template>
    <div class="container mt-5">
        <h1>OFICIOS</h1>
        <form class="form-group col-md-6 mx-auto" v-on:submit.prevent="sendForm">
            <select class="form-control" v-model="oficio">
                <option value="" disabled>-- SELECCIONE UNA OPCION --</option>
                <option v-for="o in oficios" :key="o" :value="o">{{ o }}</option>
            </select>
            <button type="submit" class="btn btn-outline-primary mt-3">VER DETALLES</button>
        </form>
    </div>
</template>

<script>
import Global from '@/Global';
import axios from 'axios';

    export default {
        name: 'OficiosComponent',
        data() {
            return {
                oficios: [],
                oficio: ""
            }
        },
        methods: {
            getOficios() {
                let request = 'api/Empleados/oficios'
                axios.get(Global.apiEmpleados + request).then(response => {
                    this.oficios = response.data
                })
            },
            sendForm() {
                this.$router.push(`/empleadosdetalle/${this.oficio}`)
            }
        },
        mounted() {
            this.getOficios()
        }
    }
</script>
<template>
    <div class="coches-container">
        <h1>Coches Paco</h1>
        <table v-if="coches.length > 0" class="coches-table">
            <thead>
                <tr>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Conductor</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(coche, index) in coches" :key="index">
                    <td>{{ coche.modelo }}</td>
                    <td>{{ coche.marca }}</td>
                    <td>{{ coche.conductor }}</td>
                    <td><img :src="coche.imagen" :alt="coche.modelo" class="coche-image"></td>
                </tr>
            </tbody>
        </table>
        <div v-else class="loader"></div>
    </div>
</template>

<script>
import axios from 'axios';
import Global from '../Global'
export default {
    name: 'CochesComponent',
    data() {
        return {
            coches: []
        }
    },
    mounted() {
        this.cargarCoches();
    },
    methods: {
        cargarCoches() {
            const request = 'webresources/coches';
            axios.get(Global.apiCoches + request)
                .then(response => {
                    setTimeout(() => {
                        this.coches = response.data;
                    }, 1000)
                })
                .catch(error => {
                    console.error("Error al cargar los coches:", error);
                });
        }
    }
}
</script>

<style scoped>
.coches-container {
    max-width: 900px;
    margin: 30px auto;
    text-align: center;
    background-color: #fdfdfd;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #333;
    font-size: 28px;
    margin-bottom: 20px;
    font-weight: 600;
}

.coches-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.coches-table th, .coches-table td {
    padding: 12px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.coches-table th {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
}

.coches-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.coche-image {
    width: 100px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.loader:before,
.loader:after,
.loader {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load7 1.8s infinite ease-in-out;
  animation: load7 1.8s infinite ease-in-out;
}
.loader {
  margin: 8em auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}
.loader:before {
  left: -3.5em;
}
.loader:after {
  left: 3.5em;
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
@-webkit-keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #4CAF50;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #4CAF50;
  }
}
@keyframes load7 {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em #4CAF50;
  }
  40% {
    box-shadow: 0 2.5em 0 0 #4CAF50;
  }
}
</style>

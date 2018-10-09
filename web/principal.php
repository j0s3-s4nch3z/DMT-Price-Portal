<?php
session_start(); 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
?>
<!DOCTYPE html>
<html>
    <head>
        <title>
            Maps
        </title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/estilo.css">
        <link rel="stylesheet" href="css/principal.css">
        <link rel="stylesheet" href="css/loader.css">
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/funciones.js" type="text/javascript"></script>
        <script src="js/principal.js" type="text/javascript"></script>
    </head>
    <body>
        <div class="cabecera" id="cabecera">
            
        </div>
        <div id="menu" class="menu">
           
        </div>
        <div class="contenedor-lateral">
            <div class="lateral">
                <div class="pestana pestana-activa" id="pestanaAsignar">
                    Asignar
                </div>
                <div class="pestana" id="pestanaBuscar">
                    Buscar
                </div>
                <div class="asignar" id="asignar">
                    <div class="contenedor-pre-input">
                        Partida
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="partida" placeholder="Partida">
                        <input type="hidden" id="partida_hidden">
                    </div>
                    <div class="contenedor-pre-input">
                        Destino
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="destino" placeholder="Destino">
                        <input type="hidden" id="destino_hidden">
                    </div>
                    <div class="contenedor-pre-input">
                        Cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Cliente" onkeyup="cargarClientes()">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Usuario
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Usuario"  autocomplete="off">
                        <datalist id="lusuario" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Transportista
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltransportista" id="transportista" placeholder="Transportista" onkeyup="cargarTransportistas()">
                        <datalist id="ltransportista"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        N° movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° Movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tipo servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltipo" id="tipo" placeholder="Tipo Servicio">
                        <datalist id="ltipo">
                            <option value="Recogida">Recogida</option>
                            <option value="Reparto">Reparto</option>
                            <option value="Servicio Especial">Servicio especial</option>
                        </datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Tarifa
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltarifa" id="tarifa" placeholder="Tarifa">
                        <datalist id="ltarifa">
                            <option value="1000">1000</option>
                            <option value="3000">3000</option>
                            <option value="5000">5000</option>
                            <option value="7000">7000</option>
                            <option value="10000">10000</option>
                            <option value="15000">15000</option>
                            <option value="20000">20000</option>
                            <option value="30000">30000</option>
                        </datalist>
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="entrar">
                                ASIGNAR
                            </a>
                        </div>
                    </div>
                </div>
                <div class="buscar" id="buscar">
                    <div class="contenedor-pre-input">
                        Id Servicio
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lids" id="ids" placeholder="Id servicio" onkeyup="cargarIds()">
                        <datalist id="lids"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Cliente
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lcliente" id="cliente" placeholder="Cliente">
                        <datalist id="lcliente" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Usuario
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lusuario" id="usuario" placeholder="Usuario">
                        <datalist id="lusuario" ></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Transportista
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="ltransportista" id="transportista" placeholder="Transportista">
                        <datalist id="ltransportista"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        N° movil
                    </div>
                    <div class="contenedor-input">
                        <input type="text" list="lmovil" id="movil" placeholder="N° movil">
                        <datalist id="lmovil"></datalist>
                    </div>
                    <div class="contenedor-pre-input">
                        Fecha desde
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="desde" placeholder="Fecha desde">
                        
                    </div>
                    <div class="contenedor-pre-input">
                        Fecha hasta
                    </div>
                    <div class="contenedor-input">
                        <input type="text" id="hasta" placeholder="Fecha hasta">
                        
                    </div>
                    <div class="contenedor-boton">
                        <div class="button-succes">
                            <a class="enlace-succes" id="buscar">
                                BUSCAR
                            </a>
                        </div>
                    </div>
                </div>
                <div id="mensaje-error" class="mensaje-error">
                
                </div>
                <div class="contenedor-loader">
                    <div class="loader" id="loader">Loading...</div>
                </div>
            </div>
        </div>
        <div class="contendor_mapa">
            <div class="map" id="map">
                <!--
                aqui va el mapa
                -->
            </div>    
        </div>   
        <script>
            function initMap() {
                var map = new google.maps.Map(document.getElementById('map'), {
                    mapTypeControl: false,
                    center: {lat: -33.440616, lng: -70.6514212},
                    zoom: 13
                });
                new AutocompleteDirectionsHandler(map);
            }

            function AutocompleteDirectionsHandler(map) {
                this.map = map;
                this.originPlaceId = null;
                this.destinationPlaceId = null;
                var originInput = document.getElementById('partida');
                var destinationInput = document.getElementById('destino');
                this.directionsService = new google.maps.DirectionsService;
                this.directionsDisplay = new google.maps.DirectionsRenderer;
                this.directionsDisplay.setMap(map);
                
                var originAutocomplete = new google.maps.places.Autocomplete(
                    originInput, {placeIdOnly: true});
                var destinationAutocomplete = new google.maps.places.Autocomplete(
                    destinationInput, {placeIdOnly: true});
                this.travelMode = 'DRIVING';
                this.route();
                this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
                this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');
                //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
                //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
            }
            
            AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
                var radioButton = document.getElementById(id);
                var me = this;
                radioButton.addEventListener('click', function() {
                me.travelMode = mode;
                    me.route();
                });
            };

      AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
        var me = this;
        autocomplete.bindTo('bounds', this.map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          if (!place.place_id) {
            window.alert("Please select an option from the dropdown list.");
            return;
          }
          if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
            document.getElementById("partida_hidden").value = place.place_id;
          } else {
            me.destinationPlaceId = place.place_id;
            document.getElementById("destino_hidden").value = place.place_id;
          }
          me.route();
        });

      };

      AutocompleteDirectionsHandler.prototype.route = function() {
        if (!this.originPlaceId || !this.destinationPlaceId) {
          return;
        }
        var me = this;

        this.directionsService.route({
          origin: {'placeId': this.originPlaceId},
          destination: {'placeId': this.destinationPlaceId},
          travelMode: this.travelMode
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

    </script>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfPGTUHN5DXdLh9XN52mFKEay6vtTrmos&libraries=places&callback=initMap"></script>
    </body>
</html>
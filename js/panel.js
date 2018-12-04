/* global alertify, directionsDisplay, urlBase, ORIGEN, GESTIONANDO_TICKET */

$(document).ready(function(){
    $("#menu").load("menu.html", function( response, status, xhr ) {
        agregarclase($("#panel"),"menu-activo");
    });    

    $("#entrar").click(function () {
        agregarServicio();
    });
    $("#boton-buscar").click(function () {
        buscarServicio();
    });
    $("#cliente").on('input',function () {
        preCargarUsuarios(); 
    });
    $("#transportista").on('input',function () {
        preCargarMoviles(); 
    });
    $("#cliente").on('input',function () {
        preCargarUsuarios(); 
    });
    $("#transportista").on('input',function () {
        preCargarMoviles(); 
    });
    $("#pestanaBuscar").click(function () {
        cambiarPropiedad($("#asignar"),"display","none");
        cambiarPropiedad($("#buscar"),"display","initial");
        agregarclase($("#pestanaBuscar"),"pestana-activa");
        quitarclase($("#pestanaAsignar"),"pestana-activa");
        $("#cliente").on('input',function () {
            preCargarUsuarios(); 
        });
        $("#transportista").on('input',function () {
            preCargarMoviles(); 
        });
        init();
    });
    $("#pestanaAsignar").click(function () {
        cambiarPropiedad($("#buscar"),"display","none");
        cambiarPropiedad($("#asignar"),"display","initial");
        agregarclase($("#pestanaAsignar"),"pestana-activa");
        quitarclase($("#pestanaBuscar"),"pestana-activa");
        $("#cliente").on('input',function () {
            preCargarUsuarios(); 
        });
        $("#transportista").on('input',function () {
            preCargarMoviles(); 
        });
    });
    init();
});

function init()
{
    cargarIds();
    cargarClientes();
    cargarTransportistas();
    preCargarUsuarios(); 
    preCargarMoviles();
}

function cargarIds()
{
    var id = $("#ids").val();
    var url = urlBase + "/servicio/IdServicios.php?id="+id;
    var success = function(response)
    {
        $("#lids").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].servicio_id;
            $("#lids").append("<option value='"+id+"'>"+id+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function cargarClientes()
{
    var cliente = $("#cliente").val();
    var url = urlBase + "/cliente/Clientes.php?cliente"+cliente;
    var success = function(response)
    {
        $("#lcliente").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].cliente_id;
            var nombre = response[i].cliente_razon;
            clientes[nombre] = id;
            $("#lcliente").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}
function preCargarUsuarios()
{
    var cliente = $('#cliente').val();
    if(cliente === '')
    {
        cargarUsuarios('');
    }
    else
    {
        cargarUsuarios(cliente);
    }
}
function cargarUsuarios(idCliente)
{
    var url = urlBase + "/usuario/Usuarios.php?id="+idCliente;
    var success = function(response)
    {
        $("#usuario").val("");
        $("#lusuario").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].usuario_id;
            var nombre = response[i].usuario_nombre;
            $("#lusuario").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}



function cargarTransportistas()
{
    var transportista = $("#transportista").val();
    var url = urlBase + "/transportista/Transportistas.php?transportista="+transportista;
    var success = function(response)
    {
        $("#ltransportista").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].transportista_id;
            var nombre = response[i].transportista_nombre;
            $("#ltransportista").append("<option value='"+nombre+"'>"+nombre+"</option>");
        }
    };
    getRequest(url,success);
}
function preCargarMoviles()
{
    var transportista = $('#transportista').val();
    cargarMoviles(transportista);
}
function cargarMoviles(idTransportista)
{
    var url = urlBase + "/movil/Moviles.php?id="+idTransportista;
    var success = function(response)
    {
        $("#movil").val("");
        $("#lmovil").html("");
        for(var i = 0 ; i < response.length ; i++)
        {
            var id = response[i].movil_id;
            var nombre = response[i].movil_nombre;
            var lat = response[i].movil_lat;
            var lon = response[i].movil_lon;
            var estado = response[i].movil_estado;
            var servicio = response[i].movil_servicio;
            $("#lmovil").append("<option value='"+nombre+"'>"+nombre+"</option>");
            if(estado !== '0')
            {
                dibujarMarcador(parseFloat(lat),parseFloat(lon),nombre,servicio);
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    getRequest(url,success);
}

function agregarServicio()
{
    var partida = $("#partida").val();
    var partida_id = $("#partida_hidden").val();
    var destino = $("#destino").val();
    var destino_id = $("#destino_hidden").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#movil").val();
    var tipo = $("#tipo").val();
    var tarifa = $("#tarifa").val();
    var array = [partida,partida_id,destino,destino_id,cliente,usuario,transportista,movil,tipo,tarifa];
    if(!validarCamposOr(array))
    {
        alertify.error("Ingrese todos los campos necesarios");
        return;
    }
    var data = "partida="+partida+"&partidaId="+partida_id+"&destino="+destino+"&destinoId="+destino_id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&tipo="+tipo+"&tarifa="+tarifa+"&gestion="+GESTIONANDO_TICKET;
    var url = urlBase + "/servicio/AddServicio.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        GESTIONANDO_TICKET = 0;
        alertify.success('servicio agregado con id '+response);
        vaciarFormulario($("#asignar input"));
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
        init();
        removeMap();
    };
    postRequest(url,success);
}

function buscarServicio()
{
    var id = $("#ids").val();
    var cliente = $("#cliente").val();
    var usuario = $("#usuario").val();
    var transportista = $("#transportista").val();
    var movil = $("#movil").val();
    var desde = $("#tipo").val();
    var hasta = $("#tarifa").val();
    var limit = 1;
    var array = [id,cliente,usuario,transportista,movil,desde,hasta];
    if(!validarCamposAnd(array))
    {
        alertify.error("Ingrese algun criterio de busqueda");
        return;
    }
    var data = "id="+id+"&cliente="+cliente+"&usuario="
            +usuario+"&transportista="+transportista+"&movil="+movil+"&desde="+desde+"&hasta="+hasta+"&limit="+limit;
    var url = urlBase + "/servicio/Servicios.php?"+data;
    var success = function(response)
    {
        cerrarSession(response);
        for(var i = 0 ; i < response.length; i++)
        {
            alertify.success("servicio encontrado con id "+response[i].servicio_id);
            calculateAndDisplayRoute(response[i].servicio_partida, response[i].servicio_destino);

        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
        addTexto($("#mensaje-error"),"");
    };
    getRequest(url,success);
}
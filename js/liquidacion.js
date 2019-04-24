/* global urlBase, alertify, ID_CONDUCTOR */

var MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"

];
var ID_LIQUIDACION;
var MES;
var ANIO;
var RUT;
var NOMBRE;
var PAGINA = "LIQUIDACION";
$(document).ready(function(){
    PAGINA_ANTERIOR = PAGINA;
    getMeses();
    getAnio();
    buscarConductor();
    $("#exportar").click(function(){
        if(typeof ID_LIQUIDACION === "undefined")
        {
            alertify.error("No hay datos para exportar");
            return;
        }
        else
        {
            var params = "mes="+MES+"&anio="+ANIO+"&conductor="+ID_LIQUIDACION+"&rut="+RUT+"&nombre="+NOMBRE;
            exportar('liquidacion/GetExcelLiquidacion',params);
        }
    });
    $("#exportar2").click(function(){
        if(typeof ID_LIQUIDACION === "undefined")
        {
            alertify.error("No hay datos para exportar");
            return;
        }
        else
        {
            var params = "mes="+MES+"&anio="+ANIO+"&conductor="+ID_LIQUIDACION+"&rut="+RUT+"&nombre="+NOMBRE;
            window.open(urlBase+"/liquidacion/GetPdfLiquidacion.php?"+params, '_blank');
        }
    });
    
    $("#busqueda").keyup(function(){
        buscarConductor();
    });
});


function buscarConductor()
{
    var busqueda = $("#busqueda").val();
    var params = {busqueda : busqueda};
    var url = urlBase + "/conductor/GetConductores.php";
    var success = function(response)
    {
        cerrarSession(response);
        var conductores = $("#lista_busqueda_contrato");
        conductores.html("");
        CONDUCTORES = response;
        if(response.length === 0)
        {
            alertify.error("No hay registros que mostrar");
            return;
        }
        for(var i = 0 ; i < response.length; i++)
        {
            var id = response[i].conductor_id;
            var rut = response[i].conductor_rut;
            var nombre = response[i].conductor_nombre;
            var papellido = response[i].conductor_papellido;
            var mapellido = response[i].conductor_mapellido;
            var titulo = recortar(id+" / "+nombre+" "+papellido+" "+ mapellido);            
            if (typeof ID_CONDUCTOR !== "undefined" && ID_CONDUCTOR === id)
            {
                conductores.append("<div class=\"fila_contenedor fila_contenedor_activa\" id=\""+id+"\" onClick=\"generarLiquidacion('"+id+"','"+rut+"','"+nombre+" "+papellido+" "+ mapellido+"')\">"+titulo+"</div>");
            }
            else
            {
            conductores.append("<div class=\"fila_contenedor\" id=\""+id+"\" onClick=\"generarLiquidacion('"+id+"','"+rut+"','"+nombre+" "+papellido+" "+ mapellido+"')\">"+ titulo +"</div>");
            }
        }
        cambiarPropiedad($("#loader"),"visibility","hidden");
    };
    postRequest(url,params,success);
}

function generarLiquidacion(id,rut,nombre)
{
    ID_LIQUIDACION = id;
    RUT = rut;
    NOMBRE = nombre;
    MES = $("#mes").val();
    ANIO =$("#anio").val();
    var d = new Date();
//    if (ANIO > d.getFullYear())
//    {
//        alertify.error("La liquidación no esta lista");
//        return;
//    }
//    if(parseInt(MES) >= (d.getMonth()))
//    {
//        alertify.error("La liquidación no esta lista");
//        return;
//    }
    quitarclase($(".fila_contenedor"),"fila_contenedor_activa");
    agregarclase($("#"+id),"fila_contenedor_activa");
    cambiarPropiedad($(".mensaje_bienvenida"),"display","none");
    $(".contenedor_liquidacion").html("");
    var params = {conductor:id,mes:MES,anio:ANIO};
    var url = urlBase + "/liquidacion/GetLiquidacion.php";
    var success = function(responseLiquidacion)
    {
        quitarclase($("#exportar"),"oculto");
        $(".contenedor_liquidacion").load("html/datos_liquidacion.html", function( response, status, xhr ) {
            $("#subtitulo_liquidacion").text("Periodo: "+MESES[MES] + " " + ANIO);
            $("#nombre_conductor").html("<b>Nombre:</b> "+nombre);
            $("#rut_conductor").html("<b>Rut:</b> "+rut);
            var cont = $("#contenido_tabla_liq_prod");
            var cont2 = $("#contenido_tabla_liq_desc");
            var cont3 = $("#contenido_tabla_liq_rend");
            var totalBruto = 0;
            for(var i = 0 ; i < responseLiquidacion.produccion.length;i++)
            {
                var produccion = responseLiquidacion.produccion[i];
                totalBruto += parseInt(produccion.empresa_valor);
                cont.append("<div class=\"liquidacion_item\">"+produccion.empresa_nombre + "</div>"+
                            "<div class=\"liquidacion_valor\">$  "+produccion.empresa_valor+"</div>");
            }
            var porcentajes = responseLiquidacion.porcentajes;
            var descuentos = responseLiquidacion.descuentos;
            var rendiciones = [];
            var descuento_ad = [];
            for(var j = 0; j < responseLiquidacion.rendiciones.length; j++)
            {
                var rend = responseLiquidacion.rendiciones[j];
                if(rend.rendicion_tipo === '0')
                {
                    rendiciones.push(rend.rendicion_dato+"%"+rend.rendicion_valor);
                }
                else if(rend.rendicion_tipo === '1')
                {
                    descuento_ad.push(rend.rendicion_dato+"%"+rend.rendicion_valor);
                }
            }
            $("#prod_bruta").html("$  "+totalBruto);
            var totalLiquido = Math.round(totalBruto * 0.8);
            $("#prod_liquida").html("$  "+totalLiquido);
            if(responseLiquidacion.produccion.length > 0)
            {
                var afp = totalBruto * ((parseInt(porcentajes.porcentaje_afp) / 100));
                var isapre = totalBruto * ((parseInt(porcentajes.porcentaje_isapre) / 100));
                var mutual = totalBruto * ((parseInt(porcentajes.porcentaje_mutual) / 100));
                var prevision = Math.round(afp) + Math.round(isapre) +Math.round(mutual);
                cont2.append("<div class=\"liquidacion_item\">Pagos Previsionales</div>"+
                                "<div class=\"liquidacion_valor\">$  "+prevision+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro Obligatorio</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuentos.movil_seg_ob_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro RC+DM</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuentos.movil_seg_rcdm_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro Asientos</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuentos.movil_seg_as_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Seguro RC Exceso</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuentos.movil_seg_rcexceso_valor+"</div>");
                cont2.append("<div class=\"liquidacion_item\">GPS</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuentos.movil_gps+"</div>");
                cont2.append("<div class=\"liquidacion_item\">Celular</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuentos.movil_celular+"</div>");
                cont2.append("<div class=\"liquidacion_item\">APP</div>"+
                                "<div class=\"liquidacion_valor\">$  "+descuentos.movil_app+"</div>");
                var totalDesc = 0;
                for(var k = 0; k < descuento_ad.length;k++)
                {
                    var data = descuento_ad[k].split("%");
                    cont2.append("<div class=\"liquidacion_item\">"+data[0]+"</div>"+
                                "<div class=\"liquidacion_valor\">$  "+data[1]+"</div>");
                    totalDesc += parseInt(data[1]);
                }
                totalDesc += prevision + parseInt(descuentos.movil_seg_ob_valor) + parseInt(descuentos.movil_seg_rcdm_valor) + 
                        parseInt(descuentos.movil_seg_as_valor) + parseInt(descuentos.movil_seg_rcexceso_valor) + 
                        parseInt(descuentos.movil_gps) + parseInt(descuentos.movil_celular) + parseInt(descuentos.movil_app);
                $("#total_desc").html("$  "+totalDesc);
                
                var totalRend = 0;
                for(var k = 0; k < rendiciones.length;k++)
                {
                    var data = rendiciones[k].split("%");
                    cont3.append("<div class=\"liquidacion_item\">"+data[0]+"</div>"+
                                "<div class=\"liquidacion_valor\">$  "+data[1]+"</div>");
                    totalRend += parseInt(data[1]);
                }
                
                $("#total_rend").html("$  "+totalRend);
            }
            var total = totalLiquido - totalDesc + totalRend;
            if(isNaN(total))
            {
                $("#liq_pagar").html("$  0");   
            }
            else
            {
                $("#liq_pagar").html("$  "+total);
            }
        });
    };
    postRequest(url,params,success);
}
function getMeses()
{
    var mes = new Date().getMonth()-1;
    if(mes === '0')
    {
        mes = '11';
    }
    $("#mes").val(mes);
}
function getAnio()
{
    var anio = new Date().getFullYear();
    $("#anio").val(anio);
}
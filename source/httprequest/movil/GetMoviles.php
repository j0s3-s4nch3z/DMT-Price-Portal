<?php
include '../../util/validarPeticion.php';

include '../../query/MovilDao.php';

header('Content-Type: application/json');
$busqueda = $_REQUEST['busqueda'];
$movilDao = new MovilDao();
$moviles = $movilDao->getMoviles($busqueda);
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = $moviles[$i]->getId();
    $movilNombre = $moviles[$i]->getNombre();
    $movilPatente = $moviles[$i]->getPatente();
    $movilMarca = $moviles[$i]->getMarca();
    $movilModelo = $moviles[$i]->getModelo();
    $movilTransportista = $moviles[$i]->getTransportista();
    $movilEstado = $moviles[$i]->getEstado();
    $movilLat = $moviles[$i]->getLat();
    $movilLon = $moviles[$i]->getLon();
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_nombre\":\"".$movilNombre."\","
        . "\"movil_patente\":\"".$movilPatente."\","
        . "\"movil_marca\":\"".$movilMarca."\","
        . "\"movil_modelo\":\"".$movilModelo."\","
        . "\"movil_transportista\":\"".$movilTransportista."\","
        . "\"movil_estado\":\"".$movilEstado."\","
        . "\"movil_lat\":\"".$movilLat."\","
        . "\"movil_lon\":\"".$movilLon."\","
        . "\"movil_servicio\":\"".$movilModelo."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
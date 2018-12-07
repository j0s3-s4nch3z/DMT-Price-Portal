<?php
include '../../util/validarPeticion.php';
include '../../query/ConductorDao.php';

header('Content-Type: application/json');
$conductorDao = new ConductorDao();
$moviles = $conductorDao->getMoviles();
echo "[";
for ($i = 0 ; $i < count($moviles); $i++)
{
    $movilId = $moviles[$i]->getId();
    $movilPatente = $moviles[$i]->getPatente();
    $movilMarca = $moviles[$i]->getMarca();
    $movilModelo = $moviles[$i]->getModelo();
    $movilTransportista = $moviles[$i]->getTransportista();
    $movilEstado = $moviles[$i]->getEstado();
    $movilLat = $moviles[$i]->getLat();
    $movilLon = $moviles[$i]->getLon();
    $movilServicio = $moviles[$i]->getServicio();
    echo "{\"movil_id\":\"".$movilId."\","
        . "\"movil_patente\":\"".$movilPatente."\","
        . "\"movil_marca\":\"".$movilMarca."\","
        . "\"movil_modelo\":\"".$movilModelo."\","
        . "\"movil_transportista\":\"".$movilTransportista."\","
        . "\"movil_estado\":\"".$movilEstado."\","
        . "\"movil_lat\":\"".$movilLat."\","
        . "\"movil_lon\":\"".$movilLon."\","
        . "\"movil_servicio\":\"".$movilServicio."\""
        . "}";
    if (($i+1) != count($moviles))
    {
        echo ",";
    }
}
echo "]";
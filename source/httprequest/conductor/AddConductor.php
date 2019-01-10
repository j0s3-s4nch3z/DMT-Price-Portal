<?php
include '../../util/validarPeticion.php';
include '../../util/validarSession.php';
include '../../query/ConductorDao.php';

header('Content-Type: application/json');
$rut = filter_input(INPUT_POST, 'rut');
$nombre = filter_input(INPUT_POST, 'nombre');
$papellido = filter_input(INPUT_POST, 'papellido');
$mapellido = filter_input(INPUT_POST, 'mapellido');
$telefono = filter_input(INPUT_POST, 'telefono');
$celular = filter_input(INPUT_POST, 'celular');
$direccion = filter_input(INPUT_POST, 'direccion');
$nick = filter_input(INPUT_POST, 'nick');
$password = filter_input(INPUT_POST, 'password');
$mail = filter_input(INPUT_POST, 'mail');
$tipoLicencia = filter_input(INPUT_POST, 'tipoLicencia');
$nacimiento = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'nacimiento'))->format('Y/m/d');
$renta = filter_input(INPUT_POST, 'renta');
$contrato = filter_input(INPUT_POST, 'contrato');
$afp = filter_input(INPUT_POST, 'afp');
$isapre = filter_input(INPUT_POST, 'isapre');
$mutual = filter_input(INPUT_POST, 'mutual');
$seguroInicio = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'seguroInicio'))->format('Y/m/d');
$seguroRenovacion = DateTime::createFromFormat('d/m/Y', filter_input(INPUT_POST, 'seguroRenovacion'))->format('Y/m/d');
$descuento = filter_input(INPUT_POST, 'descuento');
$anticipo = filter_input(INPUT_POST, 'anticipo');
$imagen = filter_input(INPUT_POST, 'imagen');
$archivoContrato = filter_input(INPUT_POST, 'archivoContrato');
$conductor = new Conductor();
$conductor->setRut($rut);
$conductor->setNombre($nombre);
$conductor->setPapellido($papellido);
$conductor->setMapellido($mapellido);
$conductor->setTelefono($telefono);
$conductor->setCelular($celular);
$conductor->setDireccion($direccion);
$conductor->setMail($mail);
$conductor->setNick($nick);
$conductor->setPassword($password);
$conductor->setTipoLicencia($tipoLicencia);
$conductor->setNacimiento($nacimiento);
$conductor->setRenta($renta);
$conductor->setContrato($contrato);
$conductor->setAfp($afp);
$conductor->setIsapre($isapre);
$conductor->setMutual($mutual);
$conductor->setSeguroInicio($seguroInicio);
$conductor->setSeguroRenovacion($seguroRenovacion);
$conductor->setDescuento($descuento);
$conductor->setAnticipo($anticipo);
$conductor->setImagenAdjunta($imagen);
$conductor->setContratoAdjunto($archivoContrato);
$conductorDao = new ConductorDao();
$conductorId = $conductorDao->agregarConductor($conductor);
echo "{\"conductor_id\":\"".$conductorId."\"}";


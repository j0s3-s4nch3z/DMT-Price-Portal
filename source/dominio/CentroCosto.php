<?php

class CentroCosto {
    private $id;
    private $nombre;
    private $descripcion;
    private $nivel;
    private $categoria;
    
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function getDescripcion() {
        return $this->descripcion;
    }

    function getNivel() {
        return $this->nivel;
    }

    function getCategoria() {
        return $this->categoria;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    function setDescripcion($descripcion) {
        $this->descripcion = $descripcion;
    }

    function setNivel($nivel) {
        $this->nivel = $nivel;
    }

    function setCategoria($categoria) {
        $this->categoria = $categoria;
    }


}

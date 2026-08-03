<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

$stmt = $pdo->query("SELECT *
FROM services");
$services = $stmt->fetchAll();



header("Content-Type: application/json; charset=utf-8");

echo json_encode($services);
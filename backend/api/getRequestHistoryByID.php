<?php


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

require_once "../auth/auth.php";

requireRole(["employee", "admin"]);

$data = json_decode(file_get_contents("php://input"), true);

$request_id = $data["RequestId"];
$stmt = $pdo->prepare("
    SELECT *
    FROM request_history
    WHERE request_id = :request_id
");

$stmt->bindValue(':request_id', $request_id, PDO::PARAM_INT);

$stmt->execute();

$requests = $stmt->fetchAll();



header("Content-Type: application/json; charset=utf-8");

echo json_encode($requests);